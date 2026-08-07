import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../config/theme';
import ParticleCanvas from '../components/ParticleCanvas';
import './Home.css';

/* ── Countdown helper ─────────────────────────────────────── */
function useCountdown(targetISO: string) {
  const calc = () => {
    const diff = new Date(targetISO).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000)  / 60_000),
      seconds: Math.floor((diff % 60_000)     / 1_000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

/* ── Page preview cards ───────────────────────────────────── */
const previews = [
  { to: '/our-story',     icon: '💌', title: 'Our Story',     desc: 'How two souls found each other.' },
  { to: '/photos',        icon: '📷', title: 'Photos',        desc: 'Moments captured along the way.' },
  { to: '/travel',        icon: '🏰', title: 'Travel',        desc: 'Getting here & where to stay.' },
  { to: '/wedding-party', icon: '🌸', title: 'Wedding Party', desc: 'Meet the people standing beside us.' },
];

export default function Home() {
  const { partner1, partner2, date, venue, venueLocation, rsvpUrl, dateISO } = theme.wedding;
  const { days, hours, minutes, seconds } = useCountdown(dateISO);

  return (
    <main className="home">

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__overlay" />
        <ParticleCanvas />
        <div className="hero__content fade-up">
          <p className="cinzel hero__eyebrow">We're getting married</p>

          <h1 className="hero__names script">
            {partner1.split(' ')[0]}&nbsp;&amp;&nbsp;{partner2.split(' ')[0]}
          </h1>

          <div className="ornament hero__ornament">✦ ✦ ✦</div>

          <p className="hero__date cinzel">{date}</p>
          <p className="hero__venue">{venue} &bull; {venueLocation}</p>

          <div className="hero__actions fade-up fade-up-delay-2">
            <a
              href={rsvpUrl}
              className="btn btn-primary hero__rsvp"
              aria-label="RSVP — link coming soon"
            >
              RSVP
              <span className="hero__rsvp-badge">Coming Soon</span>
            </a>
            <Link to="/travel" className="btn btn-outline">
              Plan Your Trip
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll" aria-hidden>
          <span />
        </div>
      </section>

      {/* ── COUNTDOWN ────────────────────────────────────────── */}
      <section className="section countdown-section">
        <div className="container">
          <p className="cinzel" style={{ textAlign: 'center', marginBottom: 8 }}>
            Counting down to forever
          </p>
          <h2 style={{ textAlign: 'center', marginBottom: 36 }}>
            The Big Day
          </h2>
          <div className="countdown">
            {[
              { value: days,    label: 'Days'    },
              { value: hours,   label: 'Hours'   },
              { value: minutes, label: 'Minutes' },
              { value: seconds, label: 'Seconds' },
            ].map(({ value, label }, i) => (
              <div key={label} className={`countdown__unit fade-up fade-up-delay-${i + 1}`}>
                <span className="countdown__num">{String(value).padStart(2, '0')}</span>
                <span className="countdown__label cinzel">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENUE HIGHLIGHT ──────────────────────────────────── */}
      <section className="section section-alt venue-section">
        <div className="container venue-inner">
          <div className="venue-img-wrap">
            <img
              src="https://landollsmohicancastle.com/wp-content/uploads/2024/05/2022_12_03-1.jpg"
              alt="Elegant castle venue at dusk"
              className="venue-img"
              loading="lazy"
            />
          </div>
          <div className="venue-text">
            <p className="cinzel">Our Venue</p>
            <h2>{venue}</h2>
            <p className="venue-location">{venueLocation}</p>
            <div className="ornament">✦</div>
            <p style={{ marginTop: 16 }}>
              Nestled in the rolling hills of Ohio's Mohican country,{' '}
              {venue} is a breathtaking fairytale castle surrounded by
              lush woodlands, tranquil ponds, and enchanting gardens.
              The perfect backdrop for a once-in-a-lifetime celebration.
            </p>
            <Link to="/travel" className="btn btn-soft" style={{ marginTop: 28, display: 'inline-flex' }}>
              View Travel Details
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="cinzel">Everything you need to know</p>
            <h2>Explore</h2>
          </div>
          <div className="grid-4">
            {previews.map((p, i) => (
              <Link
                key={p.to}
                to={p.to}
                className={`preview-card card fade-up fade-up-delay-${i + 1}`}
              >
                <span className="preview-card__icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAVE THE DATE CTA ────────────────────────────────── */}
      <section className="section section-alt save-date-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="cinzel" style={{ marginBottom: 10 }}>Mark your calendars</p>
          <h2 className="save-date__heading script">Save the Date</h2>
          <p style={{ maxWidth: 480, margin: '16px auto 32px' }}>
            We'd be honoured to have you join us as we begin our forever.
            Details below — please RSVP when the link is ready!
          </p>
          <div className="save-date__info">
            <div><span className="cinzel">Date</span><p>{date}</p></div>
            <div className="save-date__divider" />
            <div><span className="cinzel">Venue</span><p>{venue}</p></div>
            <div className="save-date__divider" />
            <div><span className="cinzel">Location</span><p>{venueLocation}</p></div>
          </div>
          <a href={rsvpUrl} className="btn btn-primary" style={{ marginTop: 36, position: 'relative' }}>
            RSVP
            <span className="placeholder-badge" style={{ marginLeft: 8 }}>Link Coming Soon</span>
          </a>
        </div>
      </section>

    </main>
  );
}
