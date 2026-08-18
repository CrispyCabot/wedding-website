import { theme } from '../config/theme';
import './DayOfSchedule.css';

const { date } = theme.wedding;

export default function DayOfSchedule() {
  return (
    <main>
      <div className="page-hero">
        <p className="cinzel">{date}</p>
        <h1>Day of Schedule</h1>
      </div>

      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
          <span className="placeholder-badge" style={{ marginBottom: 24, display: 'inline-flex' }}>
            🕰️ Coming Soon
          </span>
          <h2 className="schedule-heading script">Stay Tuned</h2>
          <div className="ornament">✦ ✦ ✦</div>
          <p style={{ marginTop: 20 }}>
            We don't have exact ceremony and reception times locked in just yet. Once
            they're set, we'll post the full day-of timeline here — cocktail hour,
            dinner, dancing, all of it. Check back closer to the wedding for the most
            accurate times.
          </p>
        </div>
      </section>
    </main>
  );
}
