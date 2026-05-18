import { theme } from '../config/theme';
import './OurStory.css';

const { partner1, partner2 } = theme.wedding;
const [p1First] = partner1.split(' ');
const [p2First] = partner2.split(' ');

const timeline = [
  {
    year: '2018',
    title: 'How We Met',
    icon: '✨',
    text: `[Placeholder] This is where you'll tell the story of how ${p1First} and ${p2First} first crossed paths. Was it a chance encounter, a mutual friend, or a story only the two of you could dream up? Fill this in with your real "how we met" story!`,
    img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80&auto=format&fit=crop',
    imgAlt: 'Two people meeting for the first time',
  },
  {
    year: '2020',
    title: 'Our First Adventure',
    icon: '🌿',
    text: `[Placeholder] Describe your first big trip, date, or adventure together. Where did you go? What made it special? This is a great place to share a favourite early memory — a road trip, a hike, a spontaneous weekend getaway.`,
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&auto=format&fit=crop',
    imgAlt: 'Couple on an adventure in nature',
  },
  {
    year: '2022',
    title: 'Building a Life Together',
    icon: '🏡',
    text: `[Placeholder] Share a milestone in your relationship — moving in together, adopting a pet, a special celebration. This is where your story deepens and you started building the foundation of your shared life.`,
    img: 'https://images.unsplash.com/photo-1583244532610-8b58cec83085?w=600&q=80&auto=format&fit=crop',
    imgAlt: 'Couple at home together',
  },
  {
    year: '2025',
    title: 'The Proposal',
    icon: '💍',
    text: `[Placeholder] Tell the story of the proposal! Where were you? How did it happen? Was it a complete surprise or had you talked about it? Share all the magical details of the moment ${p2First} said yes!`,
    img: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=600&q=80&auto=format&fit=crop',
    imgAlt: 'Romantic proposal moment',
  },
  {
    year: '2027',
    title: 'Forever Begins',
    icon: '🌸',
    text: `[Placeholder] And now — the wedding! We can't wait to celebrate the beginning of our forever with all of you. ${p1First} &amp; ${p2First}'s story continues, and we're so grateful you're part of it.`,
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80&auto=format&fit=crop',
    imgAlt: 'Wedding celebration',
  },
];

export default function OurStory() {
  return (
    <main>
      <div className="page-hero">
        <p className="cinzel">Our Journey</p>
        <h1>Our Story</h1>
      </div>

      {/* Intro */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 680 }}>
          <span className="placeholder-badge" style={{ marginBottom: 20, display: 'inline-flex' }}>
            ✏️ Content Coming Soon
          </span>
          <h2 className="story-intro__heading script">{p1First} &amp; {p2First}</h2>
          <div className="ornament">✦ ✦ ✦</div>
          <p style={{ marginTop: 20, fontSize: '1.08rem', fontStyle: 'italic', fontFamily: 'var(--font-heading)', lineHeight: 1.8 }}>
            "Some love stories begin with a single moment — a look, a laugh, a hello —
            and from that spark, an entire world unfolds."
          </p>
          <p style={{ marginTop: 16, color: 'var(--text-light)', fontSize: '0.9rem' }}>
            This page is ready and waiting to be filled with <em>your</em> story.
            The timeline below has placeholder content — replace each section with
            your real memories and moments.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="cinzel">The Journey So Far</p>
            <h2>Our Timeline</h2>
          </div>

          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={item.year} className={`timeline-item${i % 2 === 1 ? ' timeline-item--right' : ''} fade-up`}>
                <div className="timeline-item__content card">
                  <img src={item.img} alt={item.imgAlt} className="timeline-item__img" loading="lazy" />
                  <div className="timeline-item__body">
                    <span className="timeline-item__icon">{item.icon}</span>
                    <p className="cinzel timeline-item__year">{item.year}</p>
                    <h3>{item.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: item.text }} />
                  </div>
                </div>
                <div className="timeline-item__dot" aria-hidden />
              </div>
            ))}
            <div className="timeline__spine" aria-hidden />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
          <blockquote className="story-quote">
            <p className="story-quote__text">
              "I have found the one whom my soul loves."
            </p>
            <footer className="cinzel story-quote__source">— Song of Solomon 3:4</footer>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
