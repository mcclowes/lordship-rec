import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

type ScheduleRow = {
  day: string;
  time: string;
  title: string;
  lede: string;
  where: string;
  who: string;
};

// The park's regular weekly rhythm. These are recurring sessions, not one-off
// dated events, so the list stays true without anyone editing it each week.
const SCHEDULE: ScheduleRow[] = [
  {
    day: 'Tuesdays',
    time: '10:00',
    title: 'Harmony Gardens',
    lede: 'Open garden session — all ages welcome to potter and prune.',
    where: 'Community garden, north entrance',
    who: 'Free · drop in',
  },
  {
    day: 'Wednesdays',
    time: '11:00',
    title: 'Toddler woodland walk',
    lede: 'Slow loop through the trees with a basket of natural finds.',
    where: 'Meet at the Hub',
    who: 'Buggies welcome',
  },
  {
    day: 'Thursdays',
    time: 'evenings',
    title: 'Wildlife group survey',
    lede: 'Volunteers walk a transect to tally birds, bats or butterflies in season.',
    where: 'Meadow gate',
    who: 'Wildlife Group',
  },
  {
    day: 'Fridays',
    time: 'dusk',
    title: 'Bat walk (summer)',
    lede: "Pipistrelle, noctule, and the occasional Daubenton's over the lake.",
    where: 'Lake jetty',
    who: 'Free · bring a torch',
  },
  {
    day: 'Saturdays',
    time: '10:00–13:00',
    title: 'Volunteer woodland day',
    lede: 'Deadhedging, clearing paths and a pot of tea.',
    where: 'Western woodland',
    who: 'TCV · gloves provided',
  },
  {
    day: '1st Sunday',
    time: '14:00',
    title: 'Friends drop-in',
    lede: 'Open meeting of the Friends — first Sunday of every month.',
    where: 'Lordship Hub',
    who: 'All welcome',
  },
];

export default function ThisWeek(): ReactNode {
  return (
    <section id="week" className="section">
      <div className="container">
        <div className="section__title">
          <h2>
            Each <em>week</em> in the park
          </h2>
          <p className="lede">
            The regular volunteer sessions and walks — most are free, all are
            open to anyone. Dated one-off events are on the{' '}
            <Link to="/festival/calendar">calendar</Link>.
          </p>
          <span className="col">Regular programme</span>
        </div>

        <div className="week">
          <table className="schedule">
            <thead>
              <tr>
                <th>When</th>
                <th>What</th>
                <th>Where</th>
                <th>Who</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((s) => (
                <tr key={s.title}>
                  <td>
                    {s.day}
                    <br />
                    {s.time}
                  </td>
                  <td>
                    {s.title}
                    <span className="lede">{s.lede}</span>
                  </td>
                  <td>{s.where}</td>
                  <td>{s.who}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <aside className="weather-card">
            <h3>Luke Howard weather station</h3>
            <p>
              The park runs its own weather station, named for the meteorologist
              Luke Howard — the first person to classify the clouds — who lived
              on Lordship Lane.
            </p>
            <p>
              It logs temperature, rainfall, and wind from the heart of the Rec.
            </p>
            <footer>
              <Link to="/facilities/weather-station">
                About the weather station →
              </Link>
            </footer>
          </aside>
        </div>
      </div>
    </section>
  );
}
