# Wedding Website — CLAUDE.md

> Reference documentation for AI-assisted development on this project.

---

## Project Overview

A custom wedding website for **Maddie Sheets & Chris Bridewell**, wedding date **September 11, 2027** at **Landoll's Mohican Castle, Loudonville, Ohio**.

Built with React 19 + TypeScript + Vite. Designed to be elegant, fairy-tale-like, fast-loading, and fully customizable from a single config file.

---

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | React 19 with TypeScript          |
| Build tool  | Vite 8                            |
| Routing     | react-router-dom v7 (BrowserRouter)|
| Styling     | Plain CSS (no CSS-in-JS or Tailwind) with CSS custom properties |
| Fonts       | Google Fonts (Cormorant Garamond, Cinzel, Great Vibes, Lato) |
| Images      | Unsplash placeholder URLs (replace with real photos) |

---

## Directory Structure

The repo is an npm workspaces monorepo. `app/` is the SPA; `infrastructure/`
is the CDK app that hosts it. An `api/` workspace will join them later.

```
app/src/
├── config/
│   └── theme.ts          ← ⭐ CENTRAL THEME CONFIG — edit here to restyle everything
├── components/
│   ├── Nav.tsx / Nav.css       ← Fixed top navigation with mobile hamburger
│   └── Footer.tsx / Footer.css ← Site-wide footer
├── pages/
│   ├── Home.tsx / Home.css           ← Hero, countdown, venue highlight, quick links
│   ├── OurStory.tsx / OurStory.css   ← Timeline layout (placeholder content)
│   ├── Photos.tsx / Photos.css       ← Photo gallery grid (placeholder images)
│   ├── Travel.tsx / Travel.css       ← Hotels, directions, travel FAQs
│   ├── QA.tsx / QA.css               ← Accordion FAQ by category
│   ├── Registry.tsx / Registry.css   ← Registry links + gift note
│   └── WeddingParty.tsx / WeddingParty.css ← Bridal/groom party + special roles
├── App.tsx          ← BrowserRouter + route definitions
├── App.css          ← Intentionally minimal
├── index.css        ← Global styles (typography, buttons, utilities, layout)
└── main.tsx         ← Calls applyTheme() before first render

infrastructure/
├── bin/app.ts                  ← Stack instantiation; holds the useCustomDomain switch
├── lib/main-stack.ts           ← Hosted zone, certificate, DNS records
├── lib/bootstrap-stack.ts      ← The IAM role GitHub Actions assumes
└── lib/constructs/web.ts       ← S3 bucket + CloudFront distribution
```

---

## Theme Configuration (`app/src/config/theme.ts`)

**This is the single source of truth for all design decisions.**

To restyle the entire site, only edit `app/src/config/theme.ts`.

### What's configurable

```typescript
theme.colors        // All colour tokens (lavender, mauve, rose gold, backgrounds, text, borders…)
theme.fonts         // Font stack for headings, subheadings, body, and script/decorative text
theme.radii         // Border-radius scale (sm, md, lg, pill)
theme.wedding       // Couple names, date, venue, RSVP URL, registry URL
```

### How it works

1. `applyTheme()` in `main.tsx` writes every token as a CSS custom property on `<html>`:
   - `--color-lavender`, `--color-mauve`, `--font-heading`, etc.
2. Every CSS file consumes `var(--…)` tokens — nothing is hard-coded.
3. To swap themes at runtime, call `applyTheme(myCustomTheme)` with any object conforming to the `WeddingTheme` interface.

### Current palette: Lavender · Mauve · Rose Gold

| Token                | Value       | Use                         |
|----------------------|-------------|------------------------------|
| `--color-lavender`   | `#C5B8E8`   | Accents, card backgrounds    |
| `--color-mauve`      | `#A67C8A`   | Primary accent, headings     |
| `--color-rose-gold`  | `#B87E87`   | Buttons, gradients           |
| `--color-gold`       | `#C9A96E`   | Labels, ornaments, badges    |
| `--bg-page`          | `#FDFAFF`   | Page background              |
| `--footer-bg`        | `#2E2438`   | Footer dark background       |

---

## Pages

### Home (`/`)
- Full-viewport hero with castle background image, gradient overlay
- Couple's names in script font, wedding date, venue
- Live countdown timer to 9/11/2027
- RSVP button (placeholder — has "Coming Soon" badge, `href="#rsvp"`)
- Venue highlight section
- Quick-link preview cards for other pages
- "Save the Date" CTA section

**To update the RSVP link:** change `theme.wedding.rsvpUrl` in `theme.ts`.

### Our Story (`/our-story`)
- Intro with placeholder badge
- Alternating left/right timeline with 5 milestone cards (year, title, image, text)
- Closing scripture quote
- **All content is placeholder** — edit the `timeline` array in `OurStory.tsx`

### Photos (`/photos`)
- Three gallery sections: Engagement, Us, The Venue
- Hover overlay effect on each photo
- **All images are Unsplash placeholders** — replace `src` values with real photo URLs
- Post-wedding photo upload CTA section (placeholder link)

### Travel (`/travel`)
- Venue overview with map-style image card
- 3 hotel/accommodation cards (on-site, nearby hotel, B&Bs)
- 4 directions cards (air, car, on-property, shuttle)
- Travel-specific FAQ accordion

### Q&A (`/qa`)
- Accordion FAQ grouped into 4 categories: Ceremony, Reception, RSVP & Gifts, General
- All answers contain `[Placeholder]` markers and `[Date TBD]` / `[Time TBD]` tokens
- **Fill in times, dates, and real answers** directly in the `categories` array in `QA.tsx`

### Registry (`/registry`)
- 3 registry cards (Crate & Barrel, Honeymoon Fund, Amazon) — all placeholder links
- Gift note section
- **To activate:** set `theme.wedding.registryUrl` or change individual `url` values in the `registries` array in `Registry.tsx`

### Wedding Party (`/wedding-party`)
- 4 bridesmaids + 4 groomsmen as photo cards with bios
- 6 "special roles" cards (officiant, flower girl, ring bearer, parents)
- **All names, photos, and bios are placeholders** — edit the `bridalParty`, `groomsParty`, and `others` arrays in `WeddingParty.tsx`

---

## Common Tasks

### Change a colour
Edit the relevant value in `theme.colors` in `app/src/config/theme.ts`. All pages update automatically.

### Change a font
1. Add the Google Font to the `<link>` in `index.html`
2. Update `theme.fonts.heading` / `theme.fonts.body` / etc. in `theme.ts`

### Update wedding details (names, date, venue)
Edit `theme.wedding` in `theme.ts`. These values are used in the Nav, Footer, Home, Travel, and other pages.

### Add the RSVP link
Set `theme.wedding.rsvpUrl` to the real URL. The RSVP button on the Home hero and Nav will update automatically.

### Add the registry link
Set `theme.wedding.registryUrl`, or update individual `url` fields in the `registries` array in `Registry.tsx`.

### Replace placeholder images
Swap the `src` URL strings in each page file. For real photos, upload them to `app/public/` or an image host and reference them directly.

### Add a new timeline entry (Our Story)
Append an object to the `timeline` array in `OurStory.tsx` with `{ year, title, icon, text, img, imgAlt }`.

### Add a wedding party member
Add an object to `bridalParty` or `groomsParty` in `WeddingParty.tsx` with `{ name, role, relation, bio, img }`.

---

## Development

Run these from the repo root; they delegate to the right workspace.

```bash
npm run dev        # Start local dev server (http://localhost:5173)
npm run build      # Production build → app/dist/
npm run typecheck  # tsc across app/ and infrastructure/
npm run preview    # Preview the production build locally
npm run lint       # ESLint (app/ only; not run in CI)
```

---

## Deployment Notes

- **Repo:** `github.com/CrispyCabot/wedding-website`
- **Live URL:** `https://chrismaddie.bridewell.me`
- **Host:** AWS — S3 behind CloudFront, in account `866629517187`, `us-east-1`
- Deployments trigger automatically on every push to `main` via
  `.github/workflows/deploy.yml`, which authenticates to AWS with GitHub OIDC
  (no stored access keys) and assumes `WeddingWebsiteGithubDeploy`.

The site uses `BrowserRouter`, so the host must serve `index.html` for every
path. CloudFront does this via `errorResponses` in
`infrastructure/lib/constructs/web.ts`, which rewrite 403 and 404 to
`/index.html` at status 200.

**Do not reintroduce `public/404.html` or `public/CNAME`.** Both were GitHub
Pages workarounds, removed in the AWS migration. The `404.html` redirect shim
bounced unknown routes through a `?p=` query parameter; CloudFront resolves
deep links on the first request instead.

`vite.config.ts` keeps `base: '/'` and `App.tsx` has no `basename` — the site
is served from the domain root, not a sub-path.

See `infrastructure/README.md` for the stacks, the `useCustomDomain`
two-phase domain switch, and how to read stack outputs.

---

## Placeholder Checklist

Items still needed before the site goes fully live:

- [ ] Real RSVP form URL → `theme.wedding.rsvpUrl`
- [ ] Real registry URLs → `theme.wedding.registryUrl` and `Registry.tsx`
- [ ] Our Story content → `OurStory.tsx` `timeline` array
- [ ] Real engagement / couple photos → `Photos.tsx` and `WeddingParty.tsx`
- [ ] Wedding party names & bios → `WeddingParty.tsx`
- [ ] Ceremony & reception times → `QA.tsx` answers + `Travel.tsx`
- [ ] RSVP deadline date → `QA.tsx`
- [ ] Contact email → `QA.tsx` and footer
- [ ] Mailing address for gifts → `Registry.tsx`
- [ ] Shuttle/transportation details → `Travel.tsx` and `QA.tsx`
- [ ] Dress code confirmation → `QA.tsx`
- [ ] Hero background image → replace Unsplash URL in `Home.css` if desired
