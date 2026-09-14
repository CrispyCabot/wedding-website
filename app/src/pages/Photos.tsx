export default function Photos() {
  return (
    <main>
      <div className="page-hero">
        <p className="cinzel">Captured Moments</p>
        <h1>Photos</h1>
      </div>

      <section className="section">
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
