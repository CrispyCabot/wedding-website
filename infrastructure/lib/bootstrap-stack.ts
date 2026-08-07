import { CfnOutput, Stack, type StackProps } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface BootstrapStackProps extends StackProps {
  readonly githubOwner: string;
  readonly githubRepo: string;
  /**
   * Numeric GitHub IDs, from `gh api repos/<owner>/<repo>`
   * (`.owner.id` and `.id`).
   *
   * GitHub emits OIDC subjects using IMMUTABLE IDENTIFIERS:
   *   repo:<owner>@<ownerId>/<repo>@<repoId>:ref:refs/heads/main
   * not the plain `repo:<owner>/<repo>:...` form most examples show. A trust
   * policy written against the plain form silently never matches, and STS
   * reports only "Not authorized to perform sts:AssumeRoleWithWebIdentity".
   *
   * Pinning the numeric IDs is also STRONGER than matching names: renaming the
   * repo or an impostor registering the same name cannot satisfy it.
   */
  readonly githubOwnerId: string;
  readonly githubRepoId: string;
}

/**
 * Deployed once, manually, from a local admin identity. It is what allows
 * GitHub Actions to deploy everything else, so it cannot itself be deployed
 * by GitHub Actions.
 */
export class BootstrapStack extends Stack {
  constructor(scope: Construct, id: string, props: BootstrapStackProps) {
    super(scope, id, props);

    // REFERENCED, not created. An OIDC provider is an account-level singleton
    // keyed on its URL, and this account already has one — the Poster Walls
    // bootstrap stack owns it. Declaring a second `OpenIdConnectProvider` for
    // the same URL fails the deploy with `EntityAlreadyExists`.
    const providerArn = `arn:aws:iam::${this.account}:oidc-provider/token.actions.githubusercontent.com`;

    const role = new iam.Role(this, 'DeployRole', {
      roleName: 'WeddingWebsiteGithubDeploy',
      // Restricted to this repository. Any branch may deploy; the workflow
      // itself only runs the deploy job on main.
      assumedBy: new iam.WebIdentityPrincipal(providerArn, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          // Immutable-identifier subject form. See BootstrapStackProps.
          'token.actions.githubusercontent.com:sub':
            `repo:${props.githubOwner}@${props.githubOwnerId}` +
            `/${props.githubRepo}@${props.githubRepoId}:*`,
        },
      }),
      // CDK deploys assume the CDK bootstrap roles, which requires admin-level
      // reach. Narrowing this is tracked as future work.
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
      ],
    });

    new CfnOutput(this, 'DeployRoleArn', { value: role.roleArn });
  }
}
