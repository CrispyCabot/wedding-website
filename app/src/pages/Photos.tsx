import './Photos.css';

const galleries = [
  {
    label: 'Engagement',
    photos: [
      { src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80&auto=format&fit=crop', alt: 'Couple embracing at sunset' },
      { src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80&auto=format&fit=crop', alt: 'Couple laughing together' },
      { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80&auto=format&fit=crop', alt: 'Romantic walk in nature' },
      { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80&auto=format&fit=crop', alt: 'Couple in golden hour light' },
      { src: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=600&q=80&auto=format&fit=crop', alt: 'Engagement ring close-up' },
      { src: 'https://images.unsplash.com/photo-1583244532610-8b58cec83085?w=600&q=80&auto=format&fit=crop', alt: 'Couple portrait outdoors' },
    ],
  },
  {
    label: 'Us',
    photos: [
      { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80&auto=format&fit=crop', alt: 'Couple smiling at camera' },
      { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop', alt: 'Portrait of the couple' },
      { src: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?w=600&q=80&auto=format&fit=crop', alt: 'Couple on a walk' },
      { src: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=600&q=80&auto=format&fit=crop', alt: 'Couple in the park' },
    ],
  },
  {
    label: 'The Venue',
    photos: [
      { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop', alt: 'Castle exterior at dusk' },
      { src: 'https://images.unsplash.com/photo-1519741347686-c1e331fcde27?w=600&q=80&auto=format&fit=crop', alt: 'Elegant wedding hall interior' },
      { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80&auto=format&fit=crop', alt: 'Castle grounds and gardens' },
      { src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80&auto=format&fit=crop', alt: 'Garden pathway at venue' },
    ],
  },
];

export default function Photos() {
  return (
    <main>
      <div className="page-hero">
        <p className="cinzel">Captured Moments</p>
        <h1>Photos</h1>
      </div>

      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="placeholder-badge" style={{ marginBottom: 20, display: 'inline-flex' }}>
            📸 Placeholder Images — Real Photos Coming Soon
          </span>
          <p style={{ maxWidth: 560, margin: '0 auto 48px', fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>
            This gallery will be filled with your real engagement and wedding photos.
            For now, enjoy these beautiful placeholders!
          </p>

          {galleries.map(gallery => (
            <div key={gallery.label} className="photo-gallery">
              <div className="photo-gallery__header">
                <div className="ornament">{gallery.label}</div>
              </div>
              <div className="photo-grid">
                {gallery.photos.map((photo, i) => (
                  <div key={i} className="photo-item fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                    <div className="photo-item__overlay">
                      <span className="photo-item__icon">🔍</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upload CTA placeholder */}
      <section className="section section-alt">
        <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
          <p className="cinzel" style={{ marginBottom: 8 }}>After the Wedding</p>
          <h2>Share Your Photos</h2>
          <p style={{ margin: '16px auto 28px' }}>
            We'll share a link where guests can upload their favourite photos from
            our big day. Check back after the wedding!
          </p>
          <span className="placeholder-badge">Upload Link Coming After 9·11·27</span>
        </div>
      </section>
    </main>
  );
}
