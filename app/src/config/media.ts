/**
 * Photos live in the media bucket, not in the bundle — see
 * infrastructure/lib/constructs/media.ts. A key uploaded to
 * `s3://wedding-website-media-<account>/media/x.jpg` is served at `/media/x.jpg`.
 */
export const mediaPath = (file: string) => `/media/${file}`;
