import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { theme } from '../config/theme';
import './Nav.css';

const links = [
  { to: '/',             label: 'Home'          },
  { to: '/our-story',    label: 'Our Story'     },
  { to: '/photos',       label: 'Photos'        },
  { to: '/travel',       label: 'Travel'        },
  { to: '/qa',           label: 'Q&A'           },
  { to: '/registry',     label: 'Registry'      },
  { to: '/wedding-party',label: 'Wedding Party' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner">
        {/* Monogram / logo */}
        <Link to="/" className="nav__logo" onClick={() => setOpen(false)}>
          <span className="nav__mono">{theme.wedding.partner1[0]}&amp;{theme.wedding.partner2[0]}</span>
        </Link>

        {/* Desktop links */}
        <nav className="nav__links" aria-label="Main navigation">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `nav__link${isActive ? ' nav__link--active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* RSVP CTA */}
        <a
          href={theme.wedding.rsvpUrl}
          className="btn btn-primary nav__rsvp"
          aria-label="RSVP"
        >
          RSVP
        </a>

        {/* Hamburger */}
        <button
          className={`nav__burger${open ? ' nav__burger--open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`nav__drawer${open ? ' nav__drawer--open' : ''}`} aria-hidden={!open}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `nav__drawer-link${isActive ? ' nav__drawer-link--active' : ''}`
            }
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <a
          href={theme.wedding.rsvpUrl}
          className="btn btn-primary nav__drawer-rsvp"
          onClick={() => setOpen(false)}
        >
          RSVP
        </a>
      </div>
    </header>
  );
}
