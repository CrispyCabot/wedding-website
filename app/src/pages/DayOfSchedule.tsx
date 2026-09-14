import { theme } from '../config/theme';
import './DayOfSchedule.css';

const { date } = theme.wedding;

const schedule = [
  { time: '3:00 PM', label: 'Check-In', desc: "Check-in opens for all suites at the castle. Early check-in isn't available." },
];

export default function DayOfSchedule() {
  return (
    <main>
      <div className="page-hero">
        <p className="cinzel">{date}</p>
        <h1>Day of Schedule</h1>
      </div>

      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
          <h2 className="schedule-heading script">What We Know So Far</h2>
          <div className="ornament">✦ ✦ ✦</div>

          <ul className="schedule-list" style={{ marginTop: 24 }}>
            {schedule.map(item => (
              <li key={item.label} className="schedule-list__item">
                <span className="schedule-list__time cinzel">{item.time}</span>
                <span className="schedule-list__label">{item.label}</span>
                <span className="schedule-list__desc">{item.desc}</span>
              </li>
            ))}
          </ul>

          <span className="placeholder-badge" style={{ margin: '32px 0 24px', display: 'inline-flex' }}>
            🕰️ Rest Coming Soon
          </span>
          <p>
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
