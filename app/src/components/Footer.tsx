import { Link } from 'react-router-dom';
import { theme } from '../config/theme';
import './Footer.css';

export default function Footer() {
  const { partner1, partner2, date, venue, venueLocation } = theme.wedding;

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__monogram script">
              {partner1.split(' ')[0]} &amp; {partner2.split(' ')[0]}
            </span>
            <p className="footer__tagline cinzel">Forever Begins {date}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <Link to="/our-story">Our Story</Link>
            <Link to="/photos">Photos</Link>
            <Link to="/travel">Travel</Link>
            <Link to="/qa">Q&amp;A</Link>
            <Link to="/registry">Registry</Link>
            <Link to="/wedding-party">Wedding Party</Link>
          </nav>

          <div className="footer__details">
            <p className="cinzel" style={{ color: 'var(--color-gold)', marginBottom: 6 }}>
              The Wedding of
            </p>
            <p className="footer__names">{partner1} &amp; {partner2}</p>
            <p>{date}</p>
            <p>{venue}</p>
            <p>{venueLocation}</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>Made with love &hearts; by Maddie &amp; Chris</p>
        </div>
      </div>
    </footer>
  );
}
