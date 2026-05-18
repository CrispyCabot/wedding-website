import { useState } from 'react';
import { theme } from '../config/theme';
import './QA.css';

const { date, venue, venueLocation } = theme.wedding;

const categories = [
  {
    label: 'The Ceremony',
    icon: '💍',
    items: [
      { q: 'When does the ceremony start?', a: `The ceremony will begin at [Time TBD] on ${date}. We recommend arriving 20–30 minutes early to find your seats and get settled. Full timing details will be included with your invitation.` },
      { q: 'Where will the ceremony be held?', a: `The ceremony will take place at ${venue} in ${venueLocation}. Detailed directions and parking information can be found on the Travel page.` },
      { q: 'Is the ceremony indoors or outdoors?', a: `We're planning a beautiful outdoor ceremony on the castle grounds, weather permitting. There will be a backup indoor option if needed. We'll keep guests informed of any changes.` },
      { q: 'Will the ceremony be religious?', a: `Our ceremony will be a heartfelt blend of meaningful traditions. It is non-denominational but spiritually inspired. All are welcome, regardless of background or belief.` },
    ],
  },
  {
    label: 'The Reception',
    icon: '🥂',
    items: [
      { q: 'What time does the reception start?', a: `The reception will follow immediately after the ceremony. Cocktail hour begins at [Time TBD] and the reception dinner and dancing will run until approximately [Time TBD]. Full schedule in your invitation.` },
      { q: 'What is the dress code?', a: `The dress code is **Black Tie Optional** — we'd love for guests to get a little fancy! Think cocktail attire or formal wear. Ladies, please keep in mind the outdoor setting when choosing footwear (block heels or flats are recommended).` },
      { q: 'Will there be a vegetarian / dietary option?', a: `Yes! Please indicate any dietary restrictions or allergies when you RSVP. We will have vegetarian, vegan, and gluten-free options available. Please let us know in advance so we can ensure you're taken care of.` },
      { q: 'Is the reception kid-friendly?', a: `While we adore your little ones, the reception will be adults-only after 8 pm. Please arrange childcare for the evening reception. If you need help finding local babysitting services, reach out and we'll be happy to help.` },
    ],
  },
  {
    label: 'RSVP & Gifts',
    icon: '📬',
    items: [
      { q: 'When is the RSVP deadline?', a: `Please RSVP by [Date TBD — approximately 6 weeks before the wedding]. We need final headcounts for catering and seating. The RSVP link will be included on your invitation and will also be available on the home page of this site.` },
      { q: 'Can I bring a plus-one?', a: `Plus-ones are indicated on your invitation. Due to venue capacity, we're only able to accommodate those explicitly listed. If you have questions about your invitation, please reach out directly.` },
      { q: 'Where are you registered?', a: `We have a registry set up! Details are on the Registry page of this site. Your presence is truly the greatest gift, but if you'd like to give something, we're grateful for anything on our list or a contribution to our honeymoon fund.` },
      { q: 'Can I send a card or gift if I can\'t attend?', a: `Absolutely — and we'd be so touched! Cards can be mailed to [Address TBD]. Gift registry information is on the Registry page. We appreciate every bit of love and support.` },
    ],
  },
  {
    label: 'General',
    icon: '✨',
    items: [
      { q: 'Can I take photos during the ceremony?', a: `We'll have a professional photographer capturing every moment. During the ceremony itself we'd love you to be present — we're planning an "unplugged ceremony" so phones stay away. After the ceremony, snap away! A photo upload link will be shared.` },
      { q: 'What happens if the weather is bad?', a: `The castle has beautiful indoor spaces as a backup for any outdoor portions of the event. We'll communicate any changes via the wedding website and to anyone who RSVPs with an email address.` },
      { q: 'Will there be transportation home?', a: `We want everyone to get home safely! We're exploring shuttle options and will update this page closer to the date. Please plan responsibly and consider booking overnight accommodations at or near the venue if you plan to celebrate fully.` },
      { q: 'Can I bring my pet?', a: `We kindly ask that guests not bring pets to the castle property. Our dog Mister will be staying with us at the castle, and he is dog-reactive — having other animals around would cause him stress. If you need pet-friendly accommodation, the Loudonville area has B&Bs, cabins, and vacation rentals that welcome pets. We appreciate your understanding!` },
      { q: 'I have a question not answered here — who do I contact?', a: `Please reach out to us directly at [Email TBD] or through a family member listed in the Wedding Party section. We're happy to help!` },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`qa-item${open ? ' qa-item--open' : ''}`}>
      <button className="qa-item__q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        <span className="qa-item__arrow" aria-hidden>{open ? '−' : '+'}</span>
      </button>
      <div className="qa-item__a-wrap" style={{ maxHeight: open ? 400 : 0 }}>
        <p className="qa-item__a">{a}</p>
      </div>
    </div>
  );
}

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
              <div className="qa-list">
                {cat.items.map(item => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
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
          <a href="mailto:placeholder@email.com" className="btn btn-primary">
            📧 Send Us a Message
          </a>
        </div>
      </section>
    </main>
  );
}
