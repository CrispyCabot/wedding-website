import { theme } from '../config/theme';
import './Travel.css';

const { venue, venueLocation } = theme.wedding;

const hotels = [
  {
    name: "Landoll's Mohican Castle",
    type: 'Venue Hotel',
    desc: 'Stay right on the property in one of the charming castle suites or romantic cottages nestled in the woods. This is the most magical option and sells out quickly — book early!',
    price: 'Varies by room type',
    distance: 'On-site',
    url: 'https://www.landollsmohicancastle.com',
    badge: '⭐ Recommended',
    img: 'https://images.unsplash.com/photo-1519741347686-c1e331fcde27?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'The Mohican Resort & Conference Center',
    type: 'Nearby Hotel',
    desc: 'A comfortable full-service resort located minutes from the castle, with indoor pool and multiple dining options.',
    price: 'From ~$120/night',
    distance: '~5 miles from venue',
    url: '#',
    badge: null,
    img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Local B&Bs & Cabins',
    type: 'Vacation Rentals',
    desc: 'Loudonville and the surrounding Mohican area have charming bed & breakfasts, rustic cabins, and Airbnb rentals perfect for families and groups.',
    price: 'Varies',
    distance: 'Within 10 miles',
    url: 'https://www.airbnb.com',
    badge: null,
    img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=80&auto=format&fit=crop',
  },
];

const faqs = [
  {
    q: `Where exactly is ${venue}?`,
    a: `${venue} is located at 561 Township Road 3352, Perrysville, OH 44864 — in the heart of Ohio's scenic Mohican country, about 75 miles northeast of Columbus and 90 miles south of Cleveland.`,
  },
  {
    q: 'What is the nearest airport?',
    a: 'The closest major airports are Cleveland Hopkins International (CLE) at ~90 miles and Columbus John Glenn International (CMH) at ~75 miles. Both have rental car options. A smaller regional option is Mansfield Lahm Regional Airport (MFD), about 30 miles away.',
  },
  {
    q: 'Is there parking at the venue?',
    a: 'Yes! Landoll\'s Mohican Castle has ample free parking on site. Details will be included in your invitation. If you prefer not to drive, we recommend coordinating rides with fellow guests.',
  },
  {
    q: 'Is there transportation between the hotel and venue?',
    a: 'If you\'re staying on the castle property, you\'re all set! For guests staying elsewhere, we recommend renting a car or coordinating rideshares. We may arrange a shuttle depending on final guest count — stay tuned.',
  },
  {
    q: 'When should I book my hotel?',
    a: 'As soon as possible! Landoll\'s Mohican Castle is a popular venue and rooms on property fill up fast. We recommend booking within 2–4 weeks of receiving your invitation. Most hotels have free cancellation.',
  },
];

export default function Travel() {
  return (
    <main>
      <div className="page-hero">
        <p className="cinzel">Getting Here</p>
        <h1>Travel &amp; Accommodations</h1>
      </div>

      {/* Venue overview */}
      <section className="section">
        <div className="container travel-intro">
          <div className="travel-intro__text">
            <p className="cinzel">Our Venue</p>
            <h2>{venue}</h2>
            <p className="travel-intro__location">{venueLocation}</p>
            <div className="ornament" style={{ justifyContent: 'flex-start' }}>✦</div>
            <p style={{ marginTop: 16 }}>
              Landoll's Mohican Castle is a stunning medieval-inspired castle and resort
              in Perrysville, Ohio, surrounded by over 1,100 acres of rolling woodland.
              The property features a castle, waterfalls, ponds, and breathtaking natural
              beauty — the perfect fairy-tale setting.
            </p>
            <a
              href="https://maps.google.com/?q=Landoll's+Mohican+Castle+Perrysville+Ohio"
              target="_blank"
              rel="noreferrer"
              className="btn btn-soft"
              style={{ marginTop: 24, display: 'inline-flex' }}
            >
              📍 Open in Google Maps
            </a>
          </div>
          <div className="travel-intro__map card">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop"
              alt="Castle venue exterior"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
            <div className="travel-intro__map-overlay">
              <p className="cinzel">561 Township Road 3352</p>
              <p>Perrysville, OH 44864</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="cinzel">Where to Stay</p>
            <h2>Accommodations</h2>
            <p>We've rounded up our favourite places to rest your head near the castle.</p>
          </div>
          <div className="hotel-grid">
            {hotels.map(h => (
              <div key={h.name} className="hotel-card card fade-up">
                <div className="hotel-card__img-wrap">
                  <img src={h.img} alt={h.name} loading="lazy" />
                  {h.badge && <span className="hotel-card__badge">{h.badge}</span>}
                </div>
                <div className="hotel-card__body">
                  <p className="cinzel hotel-card__type">{h.type}</p>
                  <h3>{h.name}</h3>
                  <p>{h.desc}</p>
                  <div className="hotel-card__meta">
                    <span>🗺 {h.distance}</span>
                    <span>💰 {h.price}</span>
                  </div>
                  <a href={h.url} target="_blank" rel="noreferrer" className="btn btn-soft hotel-card__btn">
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting here */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="cinzel">Directions</p>
            <h2>Getting to the Castle</h2>
          </div>
          <div className="directions-grid">
            {[
              { icon: '✈️', title: 'By Air', body: 'Fly into Cleveland Hopkins (CLE) or Columbus (CMH) — both ~90 min away. Rent a car for the most flexibility in the Mohican area.' },
              { icon: '🚗', title: 'By Car', body: 'From Columbus: Take I-71 N to OH-13 N through Mansfield toward Perrysville (~1.5 hrs). From Cleveland: Take I-71 S or I-77 S to US-30 W (~1.5 hrs).' },
              { icon: '🏨', title: 'On Property', body: 'Stay on-site at the castle and simply walk to the wedding. This is the most magical and stress-free option for out-of-town guests.' },
              { icon: '🚌', title: 'Shuttle Info', body: 'We\'re exploring shuttle options from nearby hotels. Details will be included with your invitation. Sign up for updates on the RSVP form.' },
            ].map(d => (
              <div key={d.title} className="directions-card card">
                <span className="directions-card__icon">{d.icon}</span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel FAQs */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="section-header">
            <p className="cinzel">Common Questions</p>
            <h2>Travel FAQs</h2>
          </div>
          {faqs.map(faq => (
            <div key={faq.q} className="travel-faq card">
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
