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
    title: 'Playground',
    to: '/facilities/playground',
    blurb: 'Equipment for under-5s through to older children, in the south-west of the park.',
    emoji: '🛝',
  },
  {
    title: 'Woodland',
    to: '/facilities/woodland',
    blurb: 'Mixed woodland managed for wildlife. Volunteer days run most months.',
    emoji: '🌳',
  },
  {
    title: 'Lake & ponds',
    to: '/facilities/lake',
    blurb: 'The daylighted Moselle, source pond and main lake — home to kingfishers and herons.',
    emoji: '🦆',
  },
  {
    title: 'BMX track',
    to: '/facilities/bmx-track',
    blurb: 'Open-access pump and jump track. All ages welcome.',
    emoji: '🚲',
  },
  {
    title: 'The Hub & café',
    to: '/facilities/hub-cafe',
    blurb: 'Community café and meeting space, available to hire.',
    emoji: '☕',
  },
  {
    title: 'Weather station',
    to: '/facilities/weather-station',
    blurb: 'Live readings from the park, updated continuously.',
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
