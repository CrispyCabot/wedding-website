import { Link } from 'react-router-dom';
import { theme } from '../config/theme';
import FaqAccordion, { type FaqItem } from '../components/FaqAccordion';
import { travelFaqs } from '../data/travelFaqs';
import './QA.css';

const { venue, venueLocation } = theme.wedding;

const CONTACT_EMAIL = 'treaturbridewell27@gmail.com';

const categories: { label: string; icon: string; items: FaqItem[] }[] = [
  {
    label: 'The Ceremony',
    icon: '💍',
    items: [
      {
        q: 'When does the ceremony start?',
        a: (
          <>
            We don't have an exact start time locked in just yet. Once we do, we'll
            post a recommended arrival time on our{' '}
            <Link to="/travel">Travel page</Link> — plan to arrive at or close to
            that time so you don't miss a moment.
          </>
        ),
      },
      { q: 'Where will the ceremony be held?', a: `The ceremony will take place at ${venue} in ${venueLocation}. Detailed directions and parking information can be found on the Travel page.` },
      { q: 'Is the ceremony indoors or outdoors?', a: `We're planning a beautiful outdoor ceremony on the castle grounds, weather permitting. There will be a backup indoor option if needed. We'll keep guests informed of any changes.` },
      { q: 'Will the ceremony be religious?', a: 'No.' },
    ],
  },
  {
    label: 'The Reception',
    icon: '🥂',
    items: [
      {
        q: 'What time does the reception start?',
        a: (
          <>
            We don't have exact times locked in just yet either, but a cocktail hour
            will begin immediately following the ceremony, with dinner and dancing to
            follow. For up-to-date timing, check our{' '}
            <Link to="/day-of-schedule">Day of Schedule</Link> page — we'll share
            exact times there as we get closer to the big day.
          </>
        ),
      },
      { q: 'What is the dress code?', a: `The dress code is **Black Tie Optional** — we'd love for guests to get a little fancy! Think cocktail attire or formal wear. Ladies, please keep in mind the outdoor setting when choosing footwear (block heels or flats are recommended).` },
      { q: 'Will there be a vegetarian / dietary option?', a: `Yes! Maddie's a vegetarian, so of course we've got you covered. Please indicate any dietary restrictions or allergies when you RSVP and we'll have vegetarian, vegan, and gluten-free options available.` },
      { q: 'Is the reception kid-friendly?', a: `Yes, kids are welcome! Just keep in mind there will be an open bar at the reception, so plan accordingly. One nice perk of staying on-site at the castle: you can put the little ones to bed and come right back down to keep celebrating.` },
    ],
  },
  {
    label: 'RSVP & Gifts',
    icon: '📬',
    items: [
      { q: 'When is the RSVP deadline?', a: `We'll share our RSVP deadline once it's finalized. It will be included with your invitation and posted here as soon as we know — for now, just save the date!` },
      { q: 'Can I bring a plus-one?', a: `Plus-ones are indicated on your invitation. Due to venue capacity, we're only able to accommodate those explicitly listed. If you have questions about your invitation, please reach out directly.` },
      { q: "Can I send a card or gift if I can't attend?", a: `Absolutely — and we'd be so touched! Cards can be mailed to us at 514 Fry St, Covington, KY 41011. Gift registry information is on the Registry page. We appreciate every bit of love and support.` },
    ],
  },
  {
    label: 'General',
    icon: '✨',
    items: [
      { q: 'Can I take photos during the ceremony?', a: `We'll have professional photographers capturing every moment, and we'll be sure to share photos with everyone afterward. For the best shots (and the best view!), we'd love if you kept picture-taking to a bare minimum during the ceremony itself.` },
      {
        q: 'What happens if the weather is bad?',
        a: (
          <>
            The castle has beautiful indoor spaces as a backup for any outdoor
            portions of the event. Any weather-related updates will be posted on our{' '}
            <Link to="/day-of-schedule">Day of Schedule</Link> page as we get closer
            to the date.
          </>
        ),
      },
      { q: 'Can I bring my pet?', a: `We kindly ask that guests not bring pets to the castle property. Our dog Mister will be staying with us at the castle, and he is dog-reactive — having other animals around would cause him stress. If you need pet-friendly accommodation, the Loudonville area has B&Bs, cabins, and vacation rentals that welcome pets. We appreciate your understanding!` },
      {
        q: 'I have a question not answered here — who do I contact?',
        a: (
          <>
            Please reach out to us directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or through a
            family member listed in the Wedding Party section. We're happy to help!
          </>
        ),
      },
    ],
  },
  {
    label: 'Travel',
    icon: '🧳',
    items: travelFaqs,
  },
];

export default function QA() {
  return (
    <main>
      <div className="page-hero">
        <p className="cinzel">Got Questions?</p>
        <h1>Q&amp;A</h1>
      </div>

      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <p style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: 48 }}>
            We've answered the questions we hear most often below. If you don't see yours,
            feel free to reach out anytime!
          </p>

          {categories.map(cat => (
            <div key={cat.label} className="qa-category">
              <div className="qa-category__header">
                <span className="qa-category__icon">{cat.icon}</span>
                <h2 className="qa-category__title">{cat.label}</h2>
              </div>
              <FaqAccordion items={cat.items} />
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="section section-alt">
        <div className="container" style={{ textAlign: 'center', maxWidth: 540 }}>
          <p className="cinzel" style={{ marginBottom: 8 }}>Still wondering?</p>
          <h2>Ask Us Anything</h2>
          <p style={{ margin: '16px auto 28px' }}>
            If your question isn't covered here, we'd love to hear from you.
            Reach out directly and we'll get back to you as soon as possible.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
            📧 Send Us a Message
          </a>
        </div>
      </section>
    </main>
  );
}
