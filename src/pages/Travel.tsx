import { theme } from '../config/theme';
import './Travel.css';

const { venue, venueLocation } = theme.wedding;

const hotels = [
  {
    name: "Landoll's Mohican Castle",
    type: 'Venue Hotel',
    desc: "Stay right on the property — we've reserved a block of 31 suites for our wedding night, including charming castle rooms and romantic woodland cottages. This is the most magical option! See below for details on booking a room.",
    price: 'Varies by room type',
    distance: 'On-site',
    phone: null as string | null,
    url: 'https://www.landollsmohicancastle.com',
    badge: '⭐ Recommended',
    img: 'https://landollsmohicancastle.com/wp-content/uploads/2024/05/2022_12_03-1.jpg',
  },
  {
    name: 'Serenity Hill',
    type: 'Vacation Rental',
    desc: 'A spacious Airbnb just 5 minutes from the castle, perfect for families or groups traveling together. Accommodates up to 10 guests.',
    price: 'Accommodates 10',
    distance: '5 min away',
    phone: null as string | null,
    url: 'https://www.airbnb.com/rooms/44341387',
    badge: null,
    img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'The Hemlock Inn',
    type: 'Nearby Inn',
    desc: 'A charming inn just 6 minutes from the castle — a cozy, convenient option for guests who want to be close to the action.',
    price: null as string | null,
    distance: '6 min away',
    phone: '330.227.2628',
    url: 'https://www.thehemlockinn.com/',
    badge: null,
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Mohican State Park Lodge',
    type: 'Lodge',
    desc: 'A comfortable lodge set within Mohican State Park, with scenic woodland views and easy access to local trails and dining.',
    price: null as string | null,
    distance: '20 min away',
    phone: '419.938.5411',
    url: 'https://www.mohicanlodge.com',
    badge: null,
    img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'The Mount Vernon Grand Hotel',
    type: 'Hotel',
    desc: 'A grand full-service hotel in downtown Mount Vernon — a great fallback if closer options have filled up.',
    price: null as string | null,
    distance: '30 min away',
    phone: '844.700.1717',
    url: 'http://www.mountvernongrand.com',
    badge: null,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80&auto=format&fit=crop',
  },
];

const faqs = [
  {
    q: `Where exactly is ${venue}?`,
    a: `${venue} is located at 561 Township Road 3352, Loudonville, OH 44842 — in the heart of Ohio's scenic Mohican country, about 75 miles northeast of Columbus and 90 miles south of Cleveland. It is about a 3 hour drive from our home in Covington.`,
  },
  {
    q: 'Is there parking at the venue?',
    a: 'Yes! Landoll\'s Mohican Castle has ample free parking on site. Details will be included in your invitation. If you prefer not to drive, we recommend coordinating rides with fellow guests.',
  },
  {
    q: 'When should I book my hotel?',
    a: 'As soon as possible! We have reserved a block of 31 suites at the castle for our wedding night, and these are expected to fill up quickly. If you\'re interested in staying on-site, we recommend booking your suite at the castle as soon as you receive your invitation. If we run out of suites, there are nearby options available as well!',
  },
  {
    q: 'Can I bring my pet?',
    a: 'We kindly ask that guests not bring pets to the castle property. Our dog Mister will be staying with us at the castle, and he is dog-reactive — having other animals on the property could cause him stress. If you need pet-friendly accommodation, the Loudonville area has a number of B&Bs, cabins, and vacation rentals that welcome pets. We appreciate your understanding!',
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
            <div className="ornament">✦</div>
            <p style={{ marginTop: 16 }}>
              Landoll's Mohican Castle is a stunning medieval-inspired castle and resort
              in Loudonville, Ohio, surrounded by over 1,100 acres of rolling woodland.
            </p>
            <a
              href="https://maps.google.com/?q=Landoll's+Mohican+Castle+Loudonville+Ohio"
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
              <p>Loudonville, OH 44842</p>
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
            <p>
              We've reserved a block of <strong>31 suites</strong> at the castle for our wedding night — If the castle fills up, the options below are all close by.
            </p>
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
                    {h.price && <span>👥 {h.price}</span>}
                    {h.phone && <span>📞 {h.phone}</span>}
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

      {/* Booking & Check-In */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="cinzel">Need to Know</p>
            <h2>Booking &amp; Check-In</h2>
            <p>Important details for reserving and checking into your suite at the castle.</p>
          </div>
          <div className="booking-grid">
            <div className="card booking-card">
              <span className="booking-card__icon">📞</span>
              <h3>How to Book a Suite</h3>
              <p>
                We've reserved a block of <strong>31 suites</strong> for our wedding night. These <strong>cannot be booked online</strong> — to reserve your room, call the front desk and provide our last name (<strong>Bridewell / Sheets</strong>) along with the wedding date (<strong>September 11, 2027</strong>).
              </p>
              <ul className="booking-list">
                <li><strong>Front desk hours:</strong> 8:30 am – 10:00 pm daily</li>
                <li>Busiest times are 10–11 am (check-out) and 3–4:30 pm (check-in) — calling outside these windows will get you faster service</li>
                <li>First night's rate is due at the time of booking</li>
                <li>Required at booking: name, address, email, phone number, and a card on file</li>
              </ul>
            </div>
            <div className="card booking-card">
              <span className="booking-card__icon">🏨</span>
              <h3>Check-In</h3>
              <p>Check-in for all suites begins at <strong>3:00 PM</strong>. Early check-in is not available.</p>
              <ul className="booking-list">
                <li>Guests must be <strong>18 or older</strong> to check in or book a room</li>
                <li>Valid photo ID is required at check-in</li>
                <li>The name on the reservation must match your ID — only the named guest may check in</li>
                <li>We strongly recommend adding your spouse or travel companion's name to the reservation so either person can check in</li>
              </ul>
            </div>
            <div className="card booking-card">
              <span className="booking-card__icon">👥</span>
              <h3>Group Reservations</h3>
              <p>
                If you're booking multiple suites for a group, please contact the front desk to assign each room to the appropriate guest. This way everyone can check into their own suite directly rather than one person managing all the keys.
              </p>
              <p style={{ marginTop: 12 }}>
                Regardless of who pays for the room, each guest checking in will be asked to put a card on file for their suite.
              </p>
            </div>
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
