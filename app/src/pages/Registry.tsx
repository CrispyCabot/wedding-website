import { theme } from '../config/theme';
import './Registry.css';

const { partner1, partner2, registryUrl } = theme.wedding;

const registries = [
  {
    name: 'Primary Registry',
    store: 'Crate & Barrel',
    desc: 'Kitchen, home, and entertaining essentials to build our life together.',
    icon: '🏠',
    url: registryUrl,
    placeholder: true,
  },
  {
    name: 'Honeymoon Fund',
    store: 'Traveler\'s Joy',
    desc: 'Contribute to our dream honeymoon experience — any amount is appreciated and goes directly toward our adventure!',
    icon: '✈️',
    url: registryUrl,
    placeholder: true,
  },
  {
    name: 'Additional Registry',
    store: 'Amazon',
    desc: 'A curated list of items big and small — from the everyday to the special.',
    icon: '🎁',
    url: registryUrl,
    placeholder: true,
  },
];

export default function Registry() {
  return (
    <main>
      <div className="page-hero">
        <p className="cinzel">Celebrate With Us</p>
        <h1>Registry</h1>
      </div>

      {/* Intro */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
          <span className="placeholder-badge" style={{ marginBottom: 24, display: 'inline-flex' }}>
            🔗 Registry Links Coming Soon
          </span>
          <h2 className="registry-heading script">With Gratitude</h2>
          <div className="ornament">✦ ✦ ✦</div>
          <p style={{ marginTop: 20, fontSize: '1.08rem', fontFamily: 'var(--font-heading)', fontStyle: 'italic', lineHeight: 1.8 }}>
            "Your presence at our wedding is the greatest gift of all."
          </p>
          <p style={{ marginTop: 16 }}>
            For those who have asked, we've put together a few registries to make
            gift-giving easy. Links will be activated as we get closer to the date.
            Any and all generosity is deeply appreciated — thank you from the
            bottom of our hearts.
          </p>
          <p style={{ marginTop: 12 }}>
            — {partner1.split(' ')[0]} &amp; {partner2.split(' ')[0]}
          </p>
        </div>
      </section>

      {/* Registry cards */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="cinzel">Our Wish Lists</p>
            <h2>Where We're Registered</h2>
          </div>

          <div className="registry-grid">
            {registries.map(reg => (
              <div key={reg.name} className="registry-card card fade-up">
                <div className="registry-card__icon-wrap">
                  <span className="registry-card__icon">{reg.icon}</span>
                </div>
                <div className="registry-card__body">
                  <p className="cinzel registry-card__name">{reg.name}</p>
                  <h3>{reg.store}</h3>
                  <p>{reg.desc}</p>
                  {reg.placeholder ? (
                    <div className="registry-card__link-wrap">
                      <span className="placeholder-badge">Link Coming Soon</span>
                    </div>
                  ) : (
                    <a
                      href={reg.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary registry-card__btn"
                    >
                      View Registry →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="section">
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="registry-note card">
            <span className="registry-note__icon">💌</span>
            <div>
              <h3>A Note on Gifts</h3>
              <p>
                We are so grateful to be surrounded by so much love. If you're
                coming from out of town, please don't feel obligated to bring a
                gift to the wedding — your presence and the travel to be with us
                means everything. Cards and online gifts are always welcome and
                can be sent ahead of time or after the wedding.
              </p>
              <p style={{ marginTop: 12 }}>
                <strong>Mailing address:</strong>{' '}
                <span className="placeholder-badge" style={{ marginLeft: 4 }}>Coming Soon</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
