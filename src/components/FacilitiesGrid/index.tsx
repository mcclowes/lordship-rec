import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Facility = {
  title: string;
  to: string;
  blurb: string;
  emoji: string;
};

const facilities: Facility[] = [
  {
    title: 'The Orchard',
    to: '/facilities/orchard',
    blurb: 'A community orchard of heritage apple, pear and plum trees, with a Wassail in January.',
    emoji: '🍎',
  },
  {
    title: 'Woodland',
    to: '/facilities/woodland',
    blurb: 'Mixed woodland managed for wildlife. Volunteer days run most months.',
    emoji: '🌳',
  },
  {
    title: 'The Lake',
    to: '/facilities/lake',
    blurb: 'The main lake and source pond — home to kingfishers, herons and moorhens.',
    emoji: '🦆',
  },
  {
    title: 'The River Moselle',
    to: '/facilities/river-moselle',
    blurb: "One of London's hidden rivers, daylit through the park and kept clear by the Water Squad.",
    emoji: '🌊',
  },
  {
    title: "Children's Playground",
    to: '/facilities/playground',
    blurb: 'Equipment for under-5s through to older children, with a summer paddling pool.',
    emoji: '🛝',
  },
  {
    title: 'Outdoor Gym',
    to: '/facilities/outdoor-gym',
    blurb: 'A full-body outdoor gym beside the Hub. Always open, always free, for ages 16+.',
    emoji: '🏋️',
  },
  {
    title: 'BMX Dirt Track',
    to: '/facilities/bmx-track',
    blurb: 'A rider-built BMX track maintained by the Trax Club. Free coached sessions for under-18s.',
    emoji: '🚲',
  },
  {
    title: 'Model Traffic Area',
    to: '/facilities/model-traffic-area',
    blurb: "The world's first Model Traffic Area — a miniature road layout for young cyclists.",
    emoji: '🚦',
  },
  {
    title: 'The Hub & Café',
    to: '/facilities/hub-cafe',
    blurb: 'Community café and meeting space at the heart of the park, available to hire.',
    emoji: '☕',
  },
  {
    title: 'Active Play',
    to: '/facilities/active-play',
    blurb: 'Football pitches, a multi-use games area and open green space for ball games.',
    emoji: '⚽',
  },
  {
    title: 'Luke Howard Weather Station',
    to: '/facilities/weather-station',
    blurb: 'The park’s own weather station, named for the meteorologist who classified the clouds.',
    emoji: '🌤️',
  },
];

export default function FacilitiesGrid(): ReactNode {
  return (
    <ul className={styles.grid}>
      {facilities.map((f) => (
        <li key={f.to} className={styles.card}>
          <Link to={f.to} className={styles.cardLink}>
            <div className={styles.emoji} aria-hidden>{f.emoji}</div>
            <h3 className={styles.title}>{f.title}</h3>
            <p className={styles.blurb}>{f.blurb}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
