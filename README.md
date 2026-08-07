# Wedding Website

Maddie Sheets & Chris Bridewell — September 11, 2027, Landoll's Mohican
Castle, Loudonville, Ohio.

Live at **https://chrismaddie.bridewell.me**

## Layout

An npm workspaces monorepo.

| Workspace | What it is |
|---|---|
| `app/` | The React + TypeScript + Vite SPA |
| `infrastructure/` | AWS CDK app — S3, CloudFront, Route53, ACM |

An `api/` workspace will join them later.

## Development

Run from the repo root; each script delegates to the right workspace.

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # → app/dist/
npm run typecheck  # tsc across app/ and infrastructure/
npm run lint       # ESLint (app/ only)
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which authenticates
to AWS with GitHub OIDC — no stored access keys — deploys the `WeddingWebsite`
stack, syncs `app/dist` to S3, and invalidates the CloudFront distribution.

Infrastructure details, the one-time bootstrap step, and the custom-domain
cutover are in [`infrastructure/README.md`](infrastructure/README.md).

## Documentation

- [`CLAUDE.md`](CLAUDE.md) — theme config, page contents, common tasks
- [`docs/superpowers/specs/`](docs/superpowers/specs/) — design records
