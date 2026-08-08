import { CfnOutput, Stack, Tags, type StackProps } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { applyStandardTags } from './tags.js';

export interface BootstrapStackProps extends StackProps {
  readonly githubOwner: string;
  readonly githubRepo: string;
  /**
   * Numeric GitHub IDs, from `gh api repos/<owner>/<repo>`
   * (`.owner.id` and `.id`).
   *
   * GitHub is midway through a rollout that changes the OIDC subject from
   *   repo:<owner>/<repo>:ref:refs/heads/main
   * to an IMMUTABLE-IDENTIFIER form
   *   repo:<owner>@<ownerId>/<repo>@<repoId>:ref:refs/heads/main
   * and which form a repository emits is NOT something you can infer from a
   * sibling repo. As of 2026-08, poster-walls-editor emits the immutable form
   * while wedding-website — same owner, older repo — still emits the plain
   * one. Check before assuming:
   *
   *   gh api repos/<owner>/<repo>/actions/oidc/customization/sub
   *
   * and read `sub_claim_prefix`. Getting this wrong fails closed with nothing
   * but "Not authorized to perform sts:AssumeRoleWithWebIdentity" — STS never
   * reveals the subject it actually received.
   *
   * The trust policy below accepts BOTH forms so the deploy keeps working when
   * the rollout reaches this repository. The immutable form is the stronger of
   * the two: renaming the repo, or an impostor claiming the freed-up name,
   * cannot satisfy it.
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

    applyStandardTags(this);

    // This stack holds nothing the application runs on — only the identity
    // GitHub Actions assumes. Tagging it separately makes the deploy role easy
    // to tell apart from the two accounts' near-identical application roles.
    Tags.of(this).add('component', 'ci-cd');

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
          // Either subject form satisfies this — StringLike against a list is
          // a match if ANY entry matches. See BootstrapStackProps for why both
          // are needed.
          'token.actions.githubusercontent.com:sub': [
            `repo:${props.githubOwner}/${props.githubRepo}:*`,
            `repo:${props.githubOwner}@${props.githubOwnerId}` +
              `/${props.githubRepo}@${props.githubRepoId}:*`,
          ],
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
