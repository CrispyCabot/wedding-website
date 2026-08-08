import { Duration, RemovalPolicy, Tags } from 'aws-cdk-lib';
import type * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface WebConstructProps {
  /**
   * Serve the SPA from a custom domain. Omitted until DNS is delegated —
   * CloudFront will not accept an alias without a validated certificate, and
   * the certificate cannot validate until the zone answers.
   */
  readonly domainName?: string;
  readonly certificate?: acm.ICertificate;
}

export class WebConstruct extends Construct {
  readonly webBucket: s3.Bucket;
  readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: WebConstructProps = {}) {
    super(scope, id);

    // Everything this construct owns is static-site delivery: the bucket and
    // the distribution. The auto-delete-objects handler CDK adds behind the
    // bucket stays untagged — `CustomResourceProvider` resources are
    // synthesized outside the construct tree, so tag aspects never visit them.
    Tags.of(this).add('component', 'web');

    // Holds only build output. Every object is reproducible from a `git push`,
    // so the bucket is safe to destroy with the stack.
    this.webBucket = new s3.Bucket(this, 'WebBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Both or neither: CloudFront rejects an alias without a certificate that
    // covers it, so passing one without the other would fail at deploy time.
    const customDomain =
      props.domainName !== undefined && props.certificate !== undefined
        ? {
            domainNames: [props.domainName],
            certificate: props.certificate,
            minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
          }
        : {};

    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      ...customDomain,
      defaultRootObject: 'index.html',
      defaultBehavior: {
        // The `as s3.IBucket` is not redundant: under
        // `exactOptionalPropertyTypes`, `Bucket.isWebsite` is
        // `boolean | undefined` while `IBucket` declares plain `boolean`, so
        // the assignment fails without it.
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.webBucket as s3.IBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      // The SPA owns routing, so unknown paths must return index.html rather
      // than S3's 403/404. This replaces the `404.html` redirect shim GitHub
      // Pages required — deep links like /our-story now resolve on the first
      // request instead of bouncing through a query parameter.
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(5),
        },
      ],
    });
  }
}
