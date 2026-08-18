import { useState, type CSSProperties } from "react";
import { theme } from "../config/theme";
import "./OurStory.css";

const { partner1, partner2, venue, date } = theme.wedding;
const [p1First] = partner1.split(" ");
const [p2First] = partner2.split(" ");

/**
 * Photos live in the media bucket, not in the bundle — see
 * infrastructure/lib/constructs/media.ts. A key uploaded to
 * `s3://wedding-website-media-<account>/media/story/x.jpg` is served at
 * `/media/story/x.jpg`. Until one is uploaded the card falls back to a
 * decorative panel rather than a broken image.
 */
const storyPhoto = (file: string) => `/media/story/${file}`;

/** Lets a card set `--timeline-img-height` inline without casting through `any`. */
interface TimelineCardStyle extends CSSProperties {
  "--timeline-img-height"?: string;
}

interface Milestone {
  id: string;
  year: string;
  title: string;
  /** Shown only in the fallback panel when a photo is missing — not on the card. */
  icon: string;
  text: string;
  img: string;
  imgAlt: string;
  /**
   * Height of this card's photo, in px. Defaults to 220 (see OurStory.css).
   * Raise it for portrait or busy shots that the default 2:1 crop cuts into —
   * the frame grows, so `object-fit: cover` has to trim less. Mobile scales
   * this down proportionally rather than ignoring it.
   */
  imgHeight?: number;
}

const timeline: Milestone[] = [
  {
    id: "how-we-met",
    year: "March 2023",
    title: "How We Met",
    icon: "✨",
    text: `We matched on Tinder in March of 2023 and bonded almost immediately over margaritas. Our first date was at Lalo on March 11th. Naturally, we were both far too nervous to actually order one. Not long after came the first of many candlelight concerts, a classic rock set that landed right where our tastes overlap, with ${p2First}'s rock and heavier music meeting ${p1First}'s love of strings.`,
    img: storyPhoto("how-we-met.jpg"),
    imgAlt: "The two of us early on",
    imgHeight: 380,
  },
  {
    id: "first-adventure",
    year: "September 2023",
    title: "Our First Adventure",
    icon: "🌴",
    text: `That September we spent a week at the Bon Aire Resort in St. Pete with ${p2First}'s family. It was ${p1First}'s first time meeting everyone all at once. It was also her introduction to the rum runner, which Chris considered a non-negotiable part of the orientation. It has been a fixture of every beach day since.`,
    img: storyPhoto("bon-aire.png"),
    imgAlt: "Bon Aire Resort, St. Pete Beach",
  },
  {
    id: "concerts",
    year: "Ever Since",
    title: "Don't Forget Earplugs",
    icon: "🎸",
    text: `Somewhere along the way, live music became our thing. It started with Louis Tomlinson and never really stopped: multiple 5 Seconds of Summer shows, Sonic Temple, Lynyrd Skynyrd, The Maine, grandson, and more nights than we can reasonably count. The list keeps growing, and we have no plans to stop it.`,
    img: storyPhoto("concerts.jpg"),
    imgAlt: "The two of us at a concert",
    imgHeight: 400,
  },
  {
    id: "our-house",
    year: "November 2024",
    title: "Building a Life Together",
    icon: "🏡",
    text: `In November of 2024 we got our house in Covington, the first place that was truly ours. Everything since has been the good, ordinary work of turning it into a home.`,
    img: storyPhoto("our-house.jpg"),
    imgAlt: "Our house in Covington",
    imgHeight: 520,
  },
  {
    id: "proposal",
    year: "January 2026",
    title: "The Proposal",
    icon: "💍",
    text: `On January 17th, 2026, we got engaged at Krohn Conservatory, a glass house full of green and bloom in the middle of an Ohio Valley winter. It was the easiest yes either of us has ever given.`,
    img: storyPhoto("proposal.jpg"),
    imgAlt: "Our engagement at Krohn Conservatory",
    imgHeight: 520,
  },
  {
    id: "forever-begins",
    year: "September 2027",
    title: "Forever Begins",
    icon: "🌸",
    text: `Which brings us to ${venue} on ${date}. We can't wait to celebrate the start of our forever with the people who got us here.`,
    img: storyPhoto("forever-begins.jpg"),
    imgAlt: "The two of us",
  },
];

export default function OurStory() {
  // A photo that has not been uploaded yet does not 404 cleanly: CloudFront's
  // SPA error responses rewrite it to index.html at status 200. The browser
  // cannot decode HTML as an image, so onError still fires and the card swaps
  // to its fallback panel.
  const [missing, setMissing] = useState<Record<string, true>>({});

  return (
    <main>
      <div className="page-hero">
        <p className="cinzel">Our Journey</p>
        <h1>Our Story</h1>
      </div>

      {/* Intro */}
      <section className="section">
        <div
          className="container"
          style={{ textAlign: "center", maxWidth: 680 }}
        >
          <h2 className="story-intro__heading script">
            {p1First} &amp; {p2First}
          </h2>
          <div className="ornament">✦ ✦ ✦</div>
          <p
            style={{
              marginTop: 20,
              fontSize: "1.08rem",
              fontStyle: "italic",
              fontFamily: "var(--font-heading)",
              lineHeight: 1.8,
            }}
          >
            "That's what she said."
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
            {timeline.map((item, i) => {
              // Set on the card, not the image, so the fallback panel — which
              // shares the .timeline-item__img class — picks it up too.
              const cardStyle: TimelineCardStyle =
                item.imgHeight === undefined
                  ? {}
                  : { "--timeline-img-height": `${item.imgHeight}px` };

              return (
                <div
                  key={item.id}
                  className={`timeline-item${i % 2 === 1 ? " timeline-item--right" : ""} fade-up`}
                >
                  <div
                    className="timeline-item__content card"
                    style={cardStyle}
                  >
                    {missing[item.id] ? (
                      <div
                        className="timeline-item__img timeline-item__img--pending"
                        aria-hidden
                      >
                        <span>{item.icon}</span>
                      </div>
                    ) : (
                      <img
                        src={item.img}
                        alt={item.imgAlt}
                        className="timeline-item__img"
                        loading="lazy"
                        onError={() =>
                          setMissing((m) => ({ ...m, [item.id]: true }))
                        }
                      />
                    )}
                    <div className="timeline-item__body">
                      <p className="cinzel timeline-item__year">{item.year}</p>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                  <div className="timeline-item__dot" aria-hidden />
                </div>
              );
            })}
            <div className="timeline__spine" aria-hidden />
          </div>
        </div>
      </section>
    </main>
  );
}
