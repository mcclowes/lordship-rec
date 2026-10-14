import {useState, type ReactNode} from 'react';

type Spot = {
  id: string;
  x: number;
  y: number;
  label: string;
  roman: string;
  desc: string;
  stats: Record<string, string>;
};

const SPOTS: Spot[] = [
  {
    id: 'lake',
    x: 60,
    y: 50,
    label: 'The Lake',
    roman: 'I',
    desc: "A 2.4-hectare lake with two small islands, reedbeds and a circuit of picnic benches. Spring-fed, home to moorhens, coots, herons and the occasional kingfisher.",
    stats: {Area: '2.4 ha', Wildlife: '40+ bird species', Best: 'Early morning', Depth: '1.8m mean'},
  },
  {
    id: 'woodland',
    x: 24,
    y: 28,
    label: 'Woodland',
    roman: 'II',
    desc: 'Established broadleaf woodland on the western slopes — oak, ash and hornbeam, looked after by volunteers and TCV. Bluebells in April; fungi forays in October.',
    stats: {Area: '3.1 ha', Trees: 'Oak · ash · hornbeam', Volunteer: 'Saturdays 10–13', Ancient: '≥ 150 yrs in places'},
  },
  {
    id: 'orchard',
    x: 42,
    y: 64,
    label: 'Orchard',
    roman: 'III',
    desc: 'Community orchard with 80+ heritage apple, pear and plum trees, planted over the last twenty years. Annual Wassail in January; pressing weekend in October.',
    stats: {Trees: '80 heritage', Events: 'Wassail · pressing', Pick: 'September–October', Founded: '2004'},
  },
  {
    id: 'playground',
    x: 74,
    y: 70,
    label: 'Playground',
    roman: 'IV',
    desc: 'Toddler-to-tween playground with swings, climbing forts and a paddling pool open all summer. Next door: the world\'s first Model Traffic Area for tiny cyclists.',
    stats: {Ages: '0–12', Summer: 'Paddling pool', Famous: 'Model Traffic Area', Toilets: 'Yes'},
  },
  {
    id: 'bmx',
    x: 86,
    y: 38,
    label: 'BMX Track',
    roman: 'V',
    desc: 'A rider-built BMX dirt track, maintained by the Trax Club. Free coached sessions on Saturdays for under-18s; bikes available from Rockstone Bike Hut.',
    stats: {Built: 'By riders', Sessions: 'Sat 11–13', Hire: 'Rockstone Hut', Helmets: 'Required'},
  },
  {
    id: 'hub',
    x: 50,
    y: 78,
    label: 'Lordship Hub',
    roman: 'VI',
    desc: "The community café and meeting space at the heart of the park — kids' menu, weekend brunch, evening events. Friends drop-in on the first Sunday of the month.",
    stats: {Open: 'Daily 9–17', Hire: 'Spaces bookable', Wifi: 'Free', Toilets: 'Yes'},
  },
  {
    id: 'moselle',
    x: 18,
    y: 56,
    label: 'Moselle',
    roman: 'VII',
    desc: "The River Moselle, one of London's hidden rivers, runs daylit through the park. The Water Squad meets monthly to keep it clear.",
    stats: {Length: '600m here', Group: 'Water Squad', Next: 'Sat 11:00', Source: 'Muswell Hill'},
  },
  {
    id: 'gym',
    x: 56,
    y: 22,
    label: 'Outdoor Gym',
    roman: 'VIII',
    desc: 'A full-body outdoor gym beside the Hub. Always open, always free, suitable for 16+.',
    stats: {Ages: '16+', Cost: 'Free', Open: '24 hours', Stations: '9'},
  },
];

function MapPlanSvg(): ReactNode {
  return (
    <svg
      className="map__plan"
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <pattern id="bulletin-trees" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.6" fill="oklch(50% 0.07 150)" opacity="0.55" />
        </pattern>
        <pattern id="bulletin-meadow" width="2" height="2" patternUnits="userSpaceOnUse">
          <path d="M0 1 L 1 0" stroke="oklch(60% 0.06 110)" strokeWidth="0.2" opacity="0.45" />
        </pattern>
        <pattern id="bulletin-water" width="2" height="2" patternUnits="userSpaceOnUse">
          <path
            d="M0 1 Q 0.5 0.5 1 1 T 2 1"
            stroke="oklch(55% 0.05 230)"
            strokeWidth="0.15"
            fill="none"
            opacity="0.7"
          />
        </pattern>
      </defs>

      <rect x="0" y="0" width="100" height="80" fill="url(#bulletin-meadow)" />

      <path
        d="M 0 8 Q 18 6 30 18 Q 38 32 28 44 Q 14 50 4 38 Q -2 22 0 8 Z"
        fill="url(#bulletin-trees)"
        stroke="oklch(45% 0.06 150)"
        strokeWidth="0.2"
      />

      <g opacity="0.85">
        {Array.from({length: 24}).map((_, i) => {
          const col = i % 6;
          const row = Math.floor(i / 6);
          return (
            <circle
              key={i}
              cx={34 + col * 2.5}
              cy={58 + row * 2.2}
              r="0.7"
              fill="oklch(55% 0.13 50)"
            />
          );
        })}
      </g>

      <ellipse
        cx="60"
        cy="50"
        rx="13"
        ry="8"
        fill="url(#bulletin-water)"
        stroke="oklch(50% 0.06 230)"
        strokeWidth="0.3"
      />
      <ellipse cx="58" cy="48" rx="1.6" ry="0.9" fill="oklch(58% 0.07 150)" opacity="0.6" />
      <ellipse cx="63" cy="52" rx="1.2" ry="0.7" fill="oklch(58% 0.07 150)" opacity="0.6" />

      <path
        d="M 0 58 Q 14 56 22 60 Q 30 64 44 60 Q 56 56 70 60 Q 84 64 100 58"
        stroke="oklch(55% 0.07 230)"
        strokeWidth="0.5"
        fill="none"
      />

      <path
        d="M 0 70 Q 24 66 50 70 Q 76 74 100 70"
        stroke="oklch(40% 0.02 90)"
        strokeWidth="0.25"
        strokeDasharray="1 1"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 10 6 Q 30 18 50 30 Q 70 42 88 50"
        stroke="oklch(40% 0.02 90)"
        strokeWidth="0.25"
        strokeDasharray="1 1"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 50 0 L 50 80"
        stroke="oklch(40% 0.02 90)"
        strokeWidth="0.2"
        strokeDasharray="0.6 0.8"
        fill="none"
        opacity="0.5"
      />

      <g transform="translate(8 76)">
        <text x="0" y="0" fontSize="2.2" fill="oklch(30% 0.02 90)" fontFamily="serif" fontStyle="italic">
          N
        </text>
        <path
          d="M 0 -1 L 0 -5 M -1 -4 L 0 -5 L 1 -4"
          stroke="oklch(30% 0.02 90)"
          strokeWidth="0.3"
          fill="none"
        />
      </g>
    </svg>
  );
}

function ParkMap(): ReactNode {
  const [active, setActive] = useState<string>('lake');
  const spot = SPOTS.find((s) => s.id === active) ?? SPOTS[0];

  return (
    <div className="map">
      <div className="map__canvas">
        <MapPlanSvg />

        <div className="map__corner map__corner--tl">
          Lordship Recreation Ground · plan no. III
        </div>
        <div className="map__corner map__corner--tr">Scale 1 : 5000 · N17</div>
        <div className="map__corner map__corner--bl">Drawn for the Friends, 2026</div>
        <div className="map__corner map__corner--br">↓ Lordship Lane</div>

        {SPOTS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`map__hotspot ${s.id === active ? 'active' : ''}`}
            style={{left: `${s.x}%`, top: `${s.y}%`}}
            onClick={() => setActive(s.id)}
            aria-label={s.label}
            aria-pressed={s.id === active}
          >
            <span className="pin" />
            {s.id === active && (
              <span className="pin-label">
                {s.roman} · {s.label}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="map__info" aria-live="polite">
        <div className="head">
          <span className="no">
            {spot.roman} of {SPOTS.length} · the park, place by place
          </span>
          <span className="byline">Tap a pin →</span>
        </div>
        <h3>{spot.label}</h3>
        <p>{spot.desc}</p>
        <dl className="stats">
          {Object.entries(spot.stats).map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="picker" role="group" aria-label="Choose a place in the park">
          {SPOTS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={s.id === active ? 'active' : ''}
              aria-pressed={s.id === active}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MapSection(): ReactNode {
  return (
    <section id="map" className="section">
      <div className="container">
        <div className="section__title">
          <h2>
            The park, <em>place by place</em>
          </h2>
          <p className="lede">
            A printed plan, with eight things worth knowing. Tap a pin to read
            the entry.
          </p>
          <span className="col">Plate III</span>
        </div>
        <ParkMap />
      </div>
    </section>
  );
}
