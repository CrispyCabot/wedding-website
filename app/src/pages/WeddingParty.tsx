import './WeddingParty.css';

interface PartyMember {
  name: string;
  role: string;
  relation: string;
  bio: string;
  img: string;
}

const bridalParty: PartyMember[] = [
  {
    name: 'Placeholder Name',
    role: 'Maid of Honor',
    relation: "Maddie's Sister / Best Friend",
    bio: "[Placeholder] This is where you'll write a heartfelt description of your maid of honor — how you met, what she means to you, a funny memory, or why you chose her to stand by your side.",
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&auto=format&fit=crop&facepad=2',
  },
  {
    name: 'Placeholder Name',
    role: 'Bridesmaid',
    relation: "Maddie's Friend",
    bio: "[Placeholder] Share a little about this bridesmaid — a college roommate, childhood friend, coworker? Tell guests a bit about her and what makes her special to you.",
    img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80&auto=format&fit=crop&facepad=2',
  },
  {
    name: 'Placeholder Name',
    role: 'Bridesmaid',
    relation: "Maddie's Friend",
    bio: "[Placeholder] Another wonderful person in the bride's corner. Add a note about your friendship and what you've shared together over the years.",
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop&facepad=2',
  },
  {
    name: 'Placeholder Name',
    role: 'Bridesmaid',
    relation: "Maddie's Friend",
    bio: "[Placeholder] Describe how you know this bridesmaid and what she brings to your life. Even a short paragraph goes a long way in helping guests put faces to names.",
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop&facepad=2',
  },
];

const groomsParty: PartyMember[] = [
  {
    name: 'Placeholder Name',
    role: 'Best Man',
    relation: "Chris's Brother / Best Friend",
    bio: "[Placeholder] Write about your best man here — how long you've been friends, your adventures together, why he's the perfect person for this role.",
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&facepad=2',
  },
  {
    name: 'Placeholder Name',
    role: 'Groomsman',
    relation: "Chris's Friend",
    bio: "[Placeholder] Share what makes this groomsman special — a longtime friend, former teammate, or someone who's been through thick and thin with you.",
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&facepad=2',
  },
  {
    name: 'Placeholder Name',
    role: 'Groomsman',
    relation: "Chris's Friend",
    bio: "[Placeholder] Add a note about this groomsman. When did you meet? What's a favourite shared memory? What makes him one of your people?",
    img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80&auto=format&fit=crop&facepad=2',
  },
  {
    name: 'Placeholder Name',
    role: 'Groomsman',
    relation: "Chris's Friend",
    bio: "[Placeholder] Describe how you know this groomsman and why he's an important part of your life and this day.",
    img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&q=80&auto=format&fit=crop&facepad=2',
  },
];

const others = [
  { role: 'Officiant',         name: 'Placeholder Name', desc: "[Placeholder] Who's performing the ceremony? A family member, close friend, or professional officiant? Share a note about this person." },
  { role: 'Flower Girl',       name: 'Placeholder Name', desc: "[Placeholder] Add the name and relationship of your flower girl. A niece, cousin, or family friend?" },
  { role: 'Ring Bearer',       name: 'Placeholder Name', desc: "[Placeholder] Who has the most important tiny job of the day? Add the ring bearer's name and a sweet note." },
  { role: 'Mother of the Bride', name: 'Placeholder Name', desc: "[Placeholder] Honour the incredible people who raised you. Add a heartfelt note for each parent." },
  { role: 'Father of the Bride', name: 'Placeholder Name', desc: "[Placeholder] A few words about the special role parents play in making this day possible." },
  { role: 'Mother of the Groom', name: 'Placeholder Name', desc: "[Placeholder] Share a loving note about the groom's family." },
];

function MemberCard({ member, side }: { member: PartyMember; side: 'bride' | 'groom' }) {
  return (
    <div className={`member-card card member-card--${side} fade-up`}>
      <div className="member-card__img-wrap">
        <img src={member.img} alt={member.name} loading="lazy" />
        <div className="member-card__role cinzel">{member.role}</div>
      </div>
      <div className="member-card__body">
        <h3>{member.name}</h3>
        <p className="member-card__relation">{member.relation}</p>
        <p className="member-card__bio">{member.bio}</p>
      </div>
    </div>
  );
}

export default function WeddingParty() {
  return (
    <main>
      <div className="page-hero">
        <p className="cinzel">The People We Love Most</p>
        <h1>Wedding Party</h1>
      </div>

      <section className="section" style={{ textAlign: 'center', paddingBottom: 0 }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <span className="placeholder-badge" style={{ marginBottom: 20, display: 'inline-flex' }}>
            ✏️ Names & Photos Coming Soon
          </span>
          <p style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>
            We are surrounded by the most remarkable people. Meet the friends and
            family who will stand beside us as we begin this new chapter.
          </p>
        </div>
      </section>

      {/* Bridal party */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="cinzel">Maddie's Side</p>
            <h2>Bridesmaids</h2>
          </div>
          <div className="party-grid">
            {bridalParty.map(m => <MemberCard key={m.role + m.name} member={m} side="bride" />)}
          </div>
        </div>
      </section>

      {/* Groom's party */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="cinzel">Chris's Side</p>
            <h2>Groomsmen</h2>
          </div>
          <div className="party-grid">
            {groomsParty.map(m => <MemberCard key={m.role + m.name} member={m} side="groom" />)}
          </div>
        </div>
      </section>

      {/* Others */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="cinzel">Also Celebrating</p>
            <h2>Special Roles</h2>
          </div>
          <div className="others-grid">
            {others.map(o => (
              <div key={o.role} className="others-card card">
                <p className="cinzel others-card__role">{o.role}</p>
                <h3 className="others-card__name">{o.name}</h3>
                <p className="others-card__desc">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
