/**
 * ============================================================
 *  CENTRAL THEME CONFIGURATION
 *  Edit values here to restyle the entire wedding website.
 * ============================================================
 *
 * All values are injected as CSS custom properties on <html>
 * via applyTheme() called in main.tsx.  Every component and
 * stylesheet consumes var(--…) tokens — nothing is hard-coded.
 */

export interface WeddingTheme {
  /** Design-token colours */
  colors: {
    // ── Primary palette ──────────────────────────────────────
    lavender: string;
    lavenderDark: string;
    lavenderLight: string;
    mauve: string;
    mauveDark: string;
    mauveLight: string;
    roseGold: string;
    roseGoldDark: string;
    roseGoldLight: string;
    gold: string;
    goldLight: string;
    // ── Backgrounds ──────────────────────────────────────────
    bgPage: string;
    bgSection: string;
    bgCard: string;
    bgOverlay: string;
    // ── Text ─────────────────────────────────────────────────
    textPrimary: string;
    textSecondary: string;
    textLight: string;
    textInverse: string;
    // ── UI ───────────────────────────────────────────────────
    border: string;
    borderLight: string;
    navBg: string;
    footerBg: string;
    shadow: string;
  };
  /** Font stacks — use any Google Fonts listed in index.html */
  fonts: {
    heading: string;   // large display headings
    subheading: string; // section titles
    body: string;      // body copy
    script: string;    // decorative cursive / monogram
  };
  /** Border-radius tokens */
  radii: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  /** Couple & event details */
  wedding: {
    partner1: string;
    partner2: string;
    date: string;          // human-readable
    dateISO: string;       // ISO 8601 for countdown timer
    venue: string;
    venueLocation: string;
    rsvpUrl: string;       // placeholder — fill in when ready
    registryUrl: string;   // placeholder — fill in when ready
  };
}

// ─────────────────────────────────────────────────────────────
//  ACTIVE THEME  –  lavender · mauve · rose gold
// ─────────────────────────────────────────────────────────────
export const theme: WeddingTheme = {
  colors: {
    // Lavender
    lavender:       '#C5B8E8',
    lavenderDark:   '#9B8EC4',
    lavenderLight:  '#EDE8F9',

    // Mauve
    mauve:          '#A67C8A',
    mauveDark:      '#7D5A6A',
    mauveLight:     '#EDD5DC',

    // Rose Gold
    roseGold:       '#B87E87',
    roseGoldDark:   '#8E5A63',
    roseGoldLight:  '#F5E0E3',

    // Gold
    gold:           '#C9A96E',
    goldLight:      '#F4EBD9',

    // Backgrounds
    bgPage:         '#FDFAFF',
    bgSection:      '#FAF5F8',
    bgCard:         '#FFFFFF',
    bgOverlay:      'rgba(74, 63, 92, 0.55)',

    // Text
    textPrimary:    '#4A3F5C',
    textSecondary:  '#7A6A8A',
    textLight:      '#A898BA',
    textInverse:    '#FDFAFF',

    // UI
    border:         '#E2D8ED',
    borderLight:    '#F0EAF7',
    navBg:          'rgba(253, 250, 255, 0.92)',
    footerBg:       '#2E2438',
    shadow:         '0 4px 24px rgba(74, 63, 92, 0.10)',
  },

  fonts: {
    heading:    "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    subheading: "'Cinzel', 'Cormorant Garamond', serif",
    body:       "'Lato', 'Raleway', system-ui, sans-serif",
    script:     "'Great Vibes', 'Dancing Script', cursive",
  },

  radii: {
    sm:   '4px',
    md:   '10px',
    lg:   '20px',
    pill: '999px',
  },

  wedding: {
    partner1:       'Maddie Sheets',
    partner2:       'Chris Bridewell',
    date:           'September 11, 2027',
    dateISO:        '2027-09-11T16:00:00',
    venue:          "Landoll's Mohican Castle",
    venueLocation:  'Loudonville, Ohio',
    rsvpUrl:        '#rsvp',       // TODO: replace with real RSVP link
    registryUrl:    '#registry',   // TODO: replace with real registry link
  },
};

// ─────────────────────────────────────────────────────────────
//  Apply theme → CSS custom properties on <html>
// ─────────────────────────────────────────────────────────────
export function applyTheme(t: WeddingTheme = theme): void {
  const r = document.documentElement;
  const s = (name: string, val: string) => r.style.setProperty(name, val);

  // Colors
  s('--color-lavender',        t.colors.lavender);
  s('--color-lavender-dark',   t.colors.lavenderDark);
  s('--color-lavender-light',  t.colors.lavenderLight);
  s('--color-mauve',           t.colors.mauve);
  s('--color-mauve-dark',      t.colors.mauveDark);
  s('--color-mauve-light',     t.colors.mauveLight);
  s('--color-rose-gold',       t.colors.roseGold);
  s('--color-rose-gold-dark',  t.colors.roseGoldDark);
  s('--color-rose-gold-light', t.colors.roseGoldLight);
  s('--color-gold',            t.colors.gold);
  s('--color-gold-light',      t.colors.goldLight);

  s('--bg-page',               t.colors.bgPage);
  s('--bg-section',            t.colors.bgSection);
  s('--bg-card',               t.colors.bgCard);
  s('--bg-overlay',            t.colors.bgOverlay);

  s('--text-primary',          t.colors.textPrimary);
  s('--text-secondary',        t.colors.textSecondary);
  s('--text-light',            t.colors.textLight);
  s('--text-inverse',          t.colors.textInverse);

  s('--border',                t.colors.border);
  s('--border-light',          t.colors.borderLight);
  s('--nav-bg',                t.colors.navBg);
  s('--footer-bg',             t.colors.footerBg);
  s('--shadow',                t.colors.shadow);

  // Fonts
  s('--font-heading',          t.fonts.heading);
  s('--font-subheading',       t.fonts.subheading);
  s('--font-body',             t.fonts.body);
  s('--font-script',           t.fonts.script);

  // Radii
  s('--radius-sm',             t.radii.sm);
  s('--radius-md',             t.radii.md);
  s('--radius-lg',             t.radii.lg);
  s('--radius-pill',           t.radii.pill);
}
