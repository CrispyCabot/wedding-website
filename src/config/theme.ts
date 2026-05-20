/**
 * ============================================================
 *  CENTRAL THEME CONFIGURATION
 *  Edit values here to restyle the entire wedding website.
 * ============================================================
 *
 * All values are injected as CSS custom properties on <html>
 * via applyTheme() called in main.tsx.  Every component and
 * stylesheet consumes var(--…) tokens — nothing is hard-coded.
 *
 * Available themes:
 *   theme        — Lavender · Mauve · Rose Gold (default)
 *   sageTheme    — Sage Green · Ivory · Dusty Rose
 *   navyTheme    — Navy · Gold · Ivory
 *   blushTheme   — Blush · Champagne · Rose
 *
 * To switch the active theme, change the re-export at the bottom.
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
    heading: string;    // large display headings
    subheading: string; // section titles
    body: string;       // body copy
    script: string;     // decorative cursive / monogram
  };
  /** Border-radius tokens */
  radii: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  /** Image URLs used throughout the site */
  images: {
    heroBg: string;   // hero section full-viewport background
  };
  /** Particle effect configuration */
  particles: {
    enabled: boolean;
    count: number;      // total number of particles on screen
    colors: string[];   // hex color values for particles
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
//  THEME 1  –  Lavender · Mauve · Rose Gold  (default)
// ─────────────────────────────────────────────────────────────
export const lavenderTheme: WeddingTheme = {
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

  images: {
    heroBg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop',
  },

  particles: {
    enabled: true,
    count: 65,
    colors: ['#C5B8E8', '#9B8EC4', '#A67C8A', '#C9A96E', '#EDD5DC'],
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
//  THEME 2  –  Sage Green · Ivory · Dusty Rose
// ─────────────────────────────────────────────────────────────
export const sageTheme: WeddingTheme = {
  colors: {
    // Sage (occupies the lavender token slots)
    lavender:       '#8FAF7E',
    lavenderDark:   '#5F7A52',
    lavenderLight:  '#EAF2E5',

    // Dusty rose (occupies mauve slots)
    mauve:          '#B07B7B',
    mauveDark:      '#7A5252',
    mauveLight:     '#F5E4E4',

    // Terracotta warm (occupies rose gold slots)
    roseGold:       '#C49080',
    roseGoldDark:   '#9A6860',
    roseGoldLight:  '#FAF0EC',

    // Gold
    gold:           '#C9A96E',
    goldLight:      '#F4EBD9',

    // Backgrounds
    bgPage:         '#FDFCF7',
    bgSection:      '#F5F2EB',
    bgCard:         '#FFFFFF',
    bgOverlay:      'rgba(47, 70, 40, 0.58)',

    // Text
    textPrimary:    '#2F3F28',
    textSecondary:  '#5A6B52',
    textLight:      '#8FA882',
    textInverse:    '#FDFCF7',

    // UI
    border:         '#D8E4D2',
    borderLight:    '#EAF0E7',
    navBg:          'rgba(253, 252, 247, 0.92)',
    footerBg:       '#1F2E1A',
    shadow:         '0 4px 24px rgba(47, 70, 40, 0.10)',
  },

  fonts: {
    heading:    "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
    subheading: "'Raleway', 'Cinzel', sans-serif",
    body:       "'Raleway', system-ui, sans-serif",
    script:     "'Dancing Script', 'Great Vibes', cursive",
  },

  radii: {
    sm:   '4px',
    md:   '12px',
    lg:   '24px',
    pill: '999px',
  },

  images: {
    heroBg: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80&auto=format&fit=crop',
  },

  particles: {
    enabled: true,
    count: 65,
    colors: ['#8FAF7E', '#5F7A52', '#B07B7B', '#C9A96E', '#EAF2E5'],
  },

  wedding: {
    partner1:       'Maddie Sheets',
    partner2:       'Chris Bridewell',
    date:           'September 11, 2027',
    dateISO:        '2027-09-11T16:00:00',
    venue:          "Landoll's Mohican Castle",
    venueLocation:  'Loudonville, Ohio',
    rsvpUrl:        '#rsvp',
    registryUrl:    '#registry',
  },
};

// ─────────────────────────────────────────────────────────────
//  THEME 3  –  Navy · Gold · Ivory
// ─────────────────────────────────────────────────────────────
export const navyTheme: WeddingTheme = {
  colors: {
    // Steel blue (occupies lavender slots)
    lavender:       '#4A6FA5',
    lavenderDark:   '#1B3566',
    lavenderLight:  '#D6E4F0',

    // Warm gold-brown (occupies mauve slots)
    mauve:          '#B5976C',
    mauveDark:      '#8A6B3E',
    mauveLight:     '#F4EDDF',

    // Gold (occupies rose gold slots)
    roseGold:       '#C9A96E',
    roseGoldDark:   '#9E7D44',
    roseGoldLight:  '#F8F0E3',

    // Gold
    gold:           '#C9A96E',
    goldLight:      '#F9F1DF',

    // Backgrounds
    bgPage:         '#FFFEF5',
    bgSection:      '#F5F2E8',
    bgCard:         '#FFFFFF',
    bgOverlay:      'rgba(27, 53, 102, 0.65)',

    // Text
    textPrimary:    '#1B3566',
    textSecondary:  '#4A5D7A',
    textLight:      '#8A9AB5',
    textInverse:    '#FFFEF5',

    // UI
    border:         '#D5DDE8',
    borderLight:    '#EBF0F7',
    navBg:          'rgba(255, 254, 245, 0.92)',
    footerBg:       '#0D1D3A',
    shadow:         '0 4px 24px rgba(27, 53, 102, 0.10)',
  },

  fonts: {
    heading:    "'Libre Baskerville', 'Cormorant Garamond', Georgia, serif",
    subheading: "'Josefin Sans', 'Cinzel', sans-serif",
    body:       "'Source Sans 3', 'Lato', system-ui, sans-serif",
    script:     "'Alex Brush', 'Great Vibes', cursive",
  },

  radii: {
    sm:   '2px',
    md:   '6px',
    lg:   '12px',
    pill: '999px',
  },

  images: {
    heroBg: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80&auto=format&fit=crop',
  },

  particles: {
    enabled: true,
    count: 65,
    colors: ['#4A6FA5', '#C9A96E', '#B5976C', '#D6E4F0', '#8A9AB5'],
  },

  wedding: {
    partner1:       'Maddie Sheets',
    partner2:       'Chris Bridewell',
    date:           'September 11, 2027',
    dateISO:        '2027-09-11T16:00:00',
    venue:          "Landoll's Mohican Castle",
    venueLocation:  'Loudonville, Ohio',
    rsvpUrl:        '#rsvp',
    registryUrl:    '#registry',
  },
};

// ─────────────────────────────────────────────────────────────
//  THEME 4  –  Blush · Champagne · Rose
// ─────────────────────────────────────────────────────────────
export const blushTheme: WeddingTheme = {
  colors: {
    // Blush (occupies lavender slots)
    lavender:       '#F2B5C0',
    lavenderDark:   '#D4788C',
    lavenderLight:  '#FDE8ED',

    // Dusty rose (occupies mauve slots)
    mauve:          '#C98B99',
    mauveDark:      '#A0637A',
    mauveLight:     '#FAEAEE',

    // Champagne (occupies rose gold slots)
    roseGold:       '#D4A574',
    roseGoldDark:   '#A87A4A',
    roseGoldLight:  '#FAF0E6',

    // Gold
    gold:           '#C9A96E',
    goldLight:      '#F4EBD9',

    // Backgrounds
    bgPage:         '#FFF9FA',
    bgSection:      '#FDF0F3',
    bgCard:         '#FFFFFF',
    bgOverlay:      'rgba(160, 80, 100, 0.55)',

    // Text
    textPrimary:    '#5A3040',
    textSecondary:  '#8A5A6A',
    textLight:      '#C49AB0',
    textInverse:    '#FFF9FA',

    // UI
    border:         '#F0D8DF',
    borderLight:    '#FAF0F4',
    navBg:          'rgba(255, 249, 250, 0.92)',
    footerBg:       '#3A1D28',
    shadow:         '0 4px 24px rgba(90, 48, 64, 0.10)',
  },

  fonts: {
    heading:    "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif",
    subheading: "'Montserrat', 'Cinzel', sans-serif",
    body:       "'Open Sans', 'Lato', system-ui, sans-serif",
    script:     "'Parisienne', 'Great Vibes', cursive",
  },

  radii: {
    sm:   '6px',
    md:   '14px',
    lg:   '28px',
    pill: '999px',
  },

  images: {
    heroBg: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1600&q=80&auto=format&fit=crop',
  },

  particles: {
    enabled: true,
    count: 65,
    colors: ['#F2B5C0', '#C98B99', '#D4A574', '#C9A96E', '#D4788C'],
  },

  wedding: {
    partner1:       'Maddie Sheets',
    partner2:       'Chris Bridewell',
    date:           'September 11, 2027',
    dateISO:        '2027-09-11T16:00:00',
    venue:          "Landoll's Mohican Castle",
    venueLocation:  'Loudonville, Ohio',
    rsvpUrl:        '#rsvp',
    registryUrl:    '#registry',
  },
};

// ─────────────────────────────────────────────────────────────
//  ACTIVE THEME  –  change this export to switch themes
//    Options: lavenderTheme | sageTheme | navyTheme | blushTheme
// ─────────────────────────────────────────────────────────────
export const theme: WeddingTheme = blushTheme;

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

  // Images
  s('--image-hero-bg', `url('${t.images.heroBg}')`);
}
