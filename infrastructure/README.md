# Infrastructure

CDK app defining the AWS footprint for the wedding site. Region is
`us-east-1` — CloudFront requires its certificate there.

## Stacks

### `WeddingWebsiteBootstrap`

The IAM role GitHub Actions assumes. Deployed **once, manually**, from a local
admin identity — it is what lets Actions deploy everything else, so it cannot
deploy itself.

```sh
npx cdk deploy WeddingWebsiteBootstrap --require-approval never
```

It references the account's existing `token.actions.githubusercontent.com`
OIDC provider rather than creating one. That provider is an account-level
singleton keyed on its URL and already exists (Poster Walls' bootstrap stack
owns it); declaring a second fails with `EntityAlreadyExists`.

After deploying, put the `DeployRoleArn` output into the repo:

```sh
gh secret set AWS_DEPLOY_ROLE_ARN -R CrispyCabot/wedding-website -b <arn>
gh variable set AWS_REGION -R CrispyCabot/wedding-website -b us-east-1
```

### `WeddingWebsite`

Hosted zone, ACM certificate, two S3 buckets, and the CloudFront distribution.
Deployed by `.github/workflows/deploy.yml` on every push to `main`.

## The two buckets

They are separate on purpose and behave differently.

| | Web bucket | Media bucket |
|---|---|---|
| Holds | `app/dist` build output | Photos and other hand-uploaded assets |
| Written by | `aws s3 sync --delete` in the deploy workflow | You, by hand |
| Name | CDK-generated | `wedding-website-media-<account>` |
| On stack delete | `DESTROY` + `autoDeleteObjects` | `RETAIN`, and versioned |
| Served at | `/*` | `/media/*` |

**Do not upload photos to the web bucket.** The deploy publishes with
`aws s3 sync app/dist … --delete`, so anything not in the build output is
deleted on the next push to `main`. The media bucket exists because of that.

Keys map 1:1 onto URL paths, `media/` prefix included:

```sh
BUCKET=$(aws cloudformation describe-stacks --stack-name WeddingWebsite \
  --query "Stacks[0].Outputs[?OutputKey=='MediaBucketName'].OutputValue" --output text)

aws s3 cp ./proposal.jpg "s3://$BUCKET/media/story/proposal.jpg"
```

That object is then live at `https://chrismaddie.bridewell.me/media/story/proposal.jpg`.
CloudFront caches aggressively, so invalidate after replacing an existing key:

```sh
aws cloudfront create-invalidation --distribution-id <id> --paths '/media/*'
```

One sharp edge: the distribution's custom error responses are distribution-wide,
so a key that does not exist returns `index.html` with status 200 rather than a
404. `OurStory.tsx` handles this with an `<img onError>` fallback — a missing
photo shows a decorative panel instead of a broken image.

## Tagging

Every taggable resource in both stacks carries three tags. `lib/tags.ts` holds
the two constant ones; the constructs add the third.

| Tag | Value | Why |
|---|---|---|
| `project` | `wedding-website` | The account is shared with poster-walls-editor. This is the only thing separating the two in the console and in Cost Explorer. |
| `environment` | `prd` | There are no lower environments; `main` deploys straight to production. The tag exists so filters written today survive a staging stack appearing later. |
| `component` | `web`, `media`, `dns`, `ci-cd` | Which part of the system a resource belongs to. |

`applyStandardTags(this)` is called from each stack's **constructor**, not once
on the `App` in `bin/app.ts`. Both propagate identically at deploy time, but a
stack that tags itself is still tagged when something other than `bin/app.ts`
instantiates it — a test app, or a future `Stage`.

Two things tag aspects do not reach, and neither is a bug:

- `CustomResourceProvider` resources — the auto-delete-objects handler behind
  the web bucket, and its role. They are synthesized outside the construct
  tree, so no aspect visits them.
- `AWS::Route53::RecordSet`. Record sets are not taggable in CloudFormation at
  all; the hosted zone that holds them is.

Tags apply on the next deploy. They are a template change like any other, so
`cdk diff` shows them before they land.

## The `useCustomDomain` switch

`bin/app.ts` passes `useCustomDomain` to `MainStack`. It is a two-phase
switch and **the order is forced by ACM**:

1. **`false`** — creates the hosted zone and serves the site on the
   CloudFront `*.cloudfront.net` domain. Read `ZoneNameServers` from the
   stack outputs and add those four values as NS records for host
   `chrismaddie` at the `bridewell.me` registrar (Namecheap), replacing the
   old GitHub Pages CNAME.
2. **`true`** — only once that delegation resolves. Issues the certificate,
   attaches the alias, and creates the A/AAAA records.

Flipping to `true` early does not fail fast. The deploy sits for hours
waiting on a DNS validation record that nothing can resolve, then rolls back.

Check delegation before flipping:

```sh
nslookup -type=NS chrismaddie.bridewell.me 8.8.8.8
```

## Reading outputs

```sh
aws cloudformation describe-stacks --stack-name WeddingWebsite \
  --query "Stacks[0].Outputs" --output table
```
