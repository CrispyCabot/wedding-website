import { CfnOutput, Fn, Stack, type StackProps } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';
import { WebConstruct } from './constructs/web.js';

/** The subdomain the site lives on. Its zone is delegated; the apex is not. */
export const DOMAIN_NAME = 'chrismaddie.bridewell.me';

export interface MainStackProps extends StackProps {
  /**
   * Attach the custom domain.
   *
   * This is a two-phase switch, and the order is forced by ACM. The hosted
   * zone is created either way, so its nameservers can be read from the stack
   * outputs and delegated at the registrar. Only once that delegation resolves
   * can a DNS-validated certificate be issued — turn this on before then and
   * the deploy sits for hours waiting on a validation record nothing can see,
   * then rolls back.
   */
  readonly useCustomDomain: boolean;
}

export class MainStack extends Stack {
  constructor(scope: Construct, id: string, props: MainStackProps) {
    super(scope, id, props);

    // Created in both phases. A zone with no records costs $0.50/month and is
    // what makes the delegation step possible at all.
    const zone = new route53.PublicHostedZone(this, 'Zone', {
      zoneName: DOMAIN_NAME,
      comment: 'Delegated subdomain; bridewell.me stays with the registrar',
    });

    // CloudFront requires its certificate in us-east-1, and the whole stack
    // lives there, so no cross-region stack is needed.
    const certificate = props.useCustomDomain
      ? new acm.Certificate(this, 'Certificate', {
          domainName: DOMAIN_NAME,
          validation: acm.CertificateValidation.fromDns(zone),
        })
      : undefined;

    const web = new WebConstruct(this, 'Web', {
      ...(certificate === undefined ? {} : { domainName: DOMAIN_NAME, certificate }),
    });

    const webUrl = props.useCustomDomain
      ? `https://${DOMAIN_NAME}`
      : `https://${web.distribution.distributionDomainName}`;

    if (props.useCustomDomain) {
      const toDistribution = route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(web.distribution),
      );

      new route53.ARecord(this, 'SiteAlias', { zone, target: toDistribution });
      new route53.AaaaRecord(this, 'SiteAliasV6', { zone, target: toDistribution });
    }

    new CfnOutput(this, 'WebUrl', { value: webUrl });
    new CfnOutput(this, 'WebBucketName', { value: web.webBucket.bucketName });
    new CfnOutput(this, 'DistributionId', { value: web.distribution.distributionId });

    // The whole point of phase one: these four go into the registrar.
    new CfnOutput(this, 'ZoneNameServers', {
      description: 'Add these as NS records for host "chrismaddie" at your registrar',
      value: Fn.join(', ', zone.hostedZoneNameServers ?? []),
    });
    new CfnOutput(this, 'CustomDomainEnabled', {
      value: String(props.useCustomDomain),
    });
  }
}
