import { Tags } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

/**
 * Separates this site's resources from poster-walls-editor's, which share the
 * account. Every taggable resource carries it.
 */
export const PROJECT_TAG = 'wedding-website';

/**
 * The site has no lower environments — main deploys straight to production. The
 * tag exists anyway so that filters and cost reports written today keep working
 * if a staging stack ever appears.
 */
export const ENVIRONMENT_TAG = 'prd';

/**
 * Applies the tags every resource in the project must carry.
 *
 * Call this from each stack's constructor rather than once on the `App` in
 * `bin/app.ts`. Both propagate identically at deploy time, but a stack that
 * tags itself is also tagged when something else instantiates it — a test app
 * or a future parent stage would not inherit app-level tags.
 *
 * Constructs add their own narrower `component` tag. Those land at the same
 * aspect priority but a deeper scope, so they add a key rather than compete
 * with these.
 */
export function applyStandardTags(scope: Construct): void {
  Tags.of(scope).add('project', PROJECT_TAG);
  Tags.of(scope).add('environment', ENVIRONMENT_TAG);
}
