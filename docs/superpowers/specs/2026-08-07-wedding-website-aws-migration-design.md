# Wedding Website — AWS Migration Design

**Date:** 2026-08-07
**Status:** Approved

## Problem

The wedding site is a Vite + React SPA served by GitHub Pages at
`chrismaddie.bridewell.me`. Pages forces two workarounds — a `404.html`
redirect shim for client-side routing and a `CNAME` file for the custom
domain — and offers no path to the API the project will need. Poster Walls
Editor already runs the target architecture in AWS account `866629517187`.
This migration moves the wedding site onto the same footing.

## Goals

- Serve the SPA from S3 + CloudFront under the existing domain.
- Restructure the repo as `app/` + `infrastructure/` npm workspaces, so a
  future `api/` workspace drops in without a retrofit.
- Deploy from GitHub Actions via OIDC, with no long-lived AWS keys.

## Non-goals

- Building the API. Only the structure that will host it.
- Hardening the password gate. It stays client-side (see Decisions).
- Test tooling. No vitest, no ESLint in CI (see Decisions).

## Repository structure

```
package.json              workspaces: ["app", "infrastructure"]
.github/workflows/deploy.yml
app/                      @wedding/app
  index.html · vite.config.ts · eslint.config.js
  tsconfig.json · tsconfig.app.json · tsconfig.node.json
  public/  (favicon.svg, icons.svg)
  src/     (moved verbatim)
infrastructure/           @wedding/infrastructure
  bin/app.ts · cdk.json · tsconfig.json
  lib/main-stack.ts · lib/bootstrap-stack.ts · lib/constructs/web.ts
```

`api/` is not created now; the workspaces array is where it slots in later.
`eslint.config.js` and the `lint` script move to `app/` but are not wired
into CI.

## GitHub Pages artifacts removed

Three items exist only to work around Pages and become wrong on CloudFront:

- `public/CNAME` — Pages-only; on S3 it is a stray object.
- `public/404.html` — the `?p=` redirect shim. CloudFront serves
  `index.html` for unknown paths natively, so keeping this would add a
  round-trip and a visible URL flash.
- The `?p=` history-rewrite `<script>` in `index.html` — dead once the shim
  is gone.

## Infrastructure

### `WeddingWebsiteBootstrap`

Deployed once, manually, from a local admin identity. It is what lets GitHub
Actions deploy everything else, so it cannot itself be deployed by GitHub
Actions.

Creates the `WeddingWebsiteGithubDeploy` role, trusting the OIDC subject
`repo:CrispyCabot@18431358/wedding-website@1242656213:*`. GitHub emits
subjects using immutable numeric IDs, not the plain `repo:<owner>/<repo>`
form most examples show; a trust policy written against the plain form
silently never matches.

The account's `token.actions.githubusercontent.com` OIDC provider **already
exists** — Poster Walls' bootstrap stack owns it. This stack references it by
ARN rather than creating one. A second `OpenIdConnectProvider` for the same
URL fails with `EntityAlreadyExists`.

`CDKToolkit` already exists in `us-east-1`; no re-bootstrap.

### `WeddingWebsite`

A trimmed version of the Poster Walls `MainStack`:

- `route53.PublicHostedZone` for `chrismaddie.bridewell.me`, created in both
  phases so its nameservers can be read from stack outputs.
- `acm.Certificate`, created only when `useCustomDomain` is true.
- `WebConstruct` — a private S3 bucket (block-all public access, S3-managed
  encryption, enforced SSL) fronted by CloudFront with Origin Access Control.
  `defaultRootObject: index.html`; 403 and 404 rewrite to `/index.html` at
  status 200 so the SPA owns routing.
- `ARecord` + `AaaaRecord` aliases to the distribution, when the custom
  domain is on.

No Data, Auth, or Api constructs. No images bucket.

Outputs: `WebBucketName`, `DistributionId`, `WebUrl`, `ZoneNameServers`,
`CustomDomainEnabled`.

### The `useCustomDomain` two-phase switch

The order is forced by ACM. A DNS-validated certificate cannot be issued
until the hosted zone is authoritative for the name. Turning the domain on
before delegation resolves leaves the deploy waiting hours on a validation
record nothing can see, then rolling back.

## Deploy pipeline

`.github/workflows/deploy.yml`, on push to `main` and `workflow_dispatch`:

- **verify** — `npm ci`, `npm run build`, `cdk synth --quiet`.
- **deploy** — needs verify; assumes the role via OIDC, `cdk deploy
  WeddingWebsite`, reads `WebBucketName` and `DistributionId` from stack
  outputs, `s3 sync app/dist --delete`, invalidates `/*`.

Unlike Poster Walls this is **not** a two-phase build. That pipeline builds
the SPA after the infrastructure deploy because the bundle needs the API URL
and Cognito client ID. This SPA consumes no stack outputs, so build order is
free.

Node 24. Concurrency group scoped to this repo.

Repo configuration: `vars.AWS_REGION = us-east-1`, and
`secrets.AWS_DEPLOY_ROLE_ARN` set to the bootstrap stack's role ARN.

## Cutover sequence

| Phase | Action | Site status |
|---|---|---|
| 1 | Deploy `WeddingWebsiteBootstrap` locally | Pages, live |
| 2 | Merge restructure; deploy runs with `useCustomDomain: false` | Pages live; verify on CloudFront URL |
| 3 | Read `ZoneNameServers`; at Namecheap replace the `chrismaddie` CNAME with four NS records | gap begins |
| 4 | Set `useCustomDomain: true`, deploy — cert issues, alias and A/AAAA attach | gap ends |
| 5 | Delete the Pages workflow, disable Pages in repo settings | AWS only |

### Known downtime

Between phases 3 and 4, Route53 is authoritative for
`chrismaddie.bridewell.me` but holds no address record. The gap is bounded by
the old CNAME's TTL plus ACM validation — realistically under an hour, but
not zero.

A zero-downtime variant exists: phase 3 also creates apex `A` records for
GitHub Pages' four IPs (`185.199.108–111.153`), which phase 4 replaces with
the CloudFront alias. It was rejected as unnecessary — the site is a
password-gated "coming soon" page for a September 2027 wedding, and the
variant adds a third stack state to reason about.

## Verification

No unit tests, so verification is behavioral and runs at each phase:

- `cdk synth` in CI catches malformed infrastructure before deploy.
- After phase 2: `/` and a deep route such as `/our-story` both return 200
  with the SPA on the CloudFront URL. The deep route is the meaningful check
  — it proves the CloudFront error-response rewrite replaced the deleted
  `404.html` shim.
- After phase 4: the same checks against `https://chrismaddie.bridewell.me`,
  plus a TLS validity check.

## Decisions

**Password gate stays client-side.** `mohican2027` ships in the JS bundle and
is readable in DevTools. It is a soft gate on a wedding site, not access
control, and changing its behavior mid-migration would confound any
regression. A real gate belongs in the API when that lands.

**Structure-only tooling.** No vitest, no shared `tsconfig.base.json`, no
separate `ci.yml`. `cdk synth` inside `deploy.yml` is the pre-deploy safety
net. The consequence, accepted: pull requests get no automated checks.

**Deploy role uses `AdministratorAccess`,** matching Poster Walls. CDK deploys
assume the CDK bootstrap roles, which requires broad reach. Narrowing both
roles together is future work; diverging here would create two security
postures to reason about for no gain.

**Domain via subdomain delegation,** not moving the `bridewell.me` apex. The
apex has other records that would all need re-creating in Route53 first.

## Cost

Roughly $0.50/month for the hosted zone, plus cents for S3 and CloudFront
under free tier. GitHub Pages was free.
