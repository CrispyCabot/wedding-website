import { RemovalPolicy, Stack, Tags } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

/**
 * Holds photos and other hand-uploaded assets the site references.
 *
 * These cannot live in the web bucket. `deploy.yml` publishes with
 * `aws s3 sync app/dist --delete`, so anything uploaded by hand there is
 * deleted by the next push to `main`. They could live in `app/public/` and ride
 * along in the bundle, but that puts multi-megabyte originals in git history
 * forever and makes swapping a photo a code change.
 */
export class MediaConstruct extends Construct {
  /**
   * Exposed as `IBucket` rather than `Bucket` so the one cast this needs lives
   * here instead of at every call site. Under `exactOptionalPropertyTypes`,
   * `Bucket.isWebsite` is `boolean | undefined` while `IBucket` declares plain
   * `boolean`, so `Bucket` is not assignable to `IBucket` without it.
   */
  readonly mediaBucket: s3.IBucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    Tags.of(this).add('component', 'media');

    const bucket = new s3.Bucket(this, 'MediaBucket', {
      // A predictable name is the point: uploading is a manual `aws s3 cp`, and
      // CDK's generated names are not something anyone will type. The account
      // id keeps it globally unique without leaking anything — bucket names are
      // not secret, and the bucket is private regardless.
      bucketName: `wedding-website-media-${Stack.of(this).account}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      // Unlike the web bucket, nothing here is reproducible from a `git push`.
      // Retain on stack deletion and keep prior versions, so a mistyped `cp`
      // that overwrites the engagement photo is recoverable.
      versioned: true,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    this.mediaBucket = bucket as s3.IBucket;
  }
}
