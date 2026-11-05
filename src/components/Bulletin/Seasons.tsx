import {useEffect, useState, type ReactNode} from 'react';

import {seasonForMonth, type SeasonKey} from './season.utils';

type Season = {
  name: string;
  months: string;
  num: string;
  lead: string;
  items: Array<{h: string; w: string}>;
};

const SEASONS: Record<SeasonKey, Season> = {
  spring: {
    name: 'Spring',
    months: 'Mar — May',
    num: 'I',
    lead:
      'Bluebells in the woodland, the first warblers back, and the orchard breaking into blossom.',
    items: [
      {h: 'Bluebells', w: 'Western woodland · mid-April'},
      {h: 'Returning warblers', w: 'Chiffchaff · blackcap · whitethroat'},
      {h: 'Orchard blossom', w: 'Pear first, then apple · April'},
      {h: 'Solitary bees', w: 'Mining bees · south bank'},
      {h: 'Frogspawn', w: 'Lake margins · late Feb–March'},
      {h: 'Meadow seeded', w: 'Volunteer day · April'},
    ],
  },
  summer: {
    name: 'Summer',
    months: 'Jun — Aug',
    num: 'II',
    lead:
      'Long evenings on the lake, swifts overhead, and the festival in full swing on the meadow.',
    items: [
      {h: 'Butterfly transect', w: 'Mon evenings · wildlife group'},
      {h: 'Bat walks', w: 'Dusk · pipistrelle & noctule'},
      {h: 'Lake survey', w: 'Dragonflies, perch, lily-pad cover'},
      {h: 'Meadow in bloom', w: "Don't mow · May–August"},
      {h: 'Flower & produce festival', w: 'Late July · all welcome'},
      {h: 'Orchard fruit set', w: 'Thinning sessions · June'},
    ],
  },
  autumn: {
    name: 'Autumn',
    months: 'Sep — Nov',
    num: 'III',
    lead:
      'Apple pressing, fungi forays and the slow drift of leaves into the Moselle.',
    items: [
      {h: 'Apple pressing', w: 'Bring fruit · October weekend'},
      {h: 'Fungi foray', w: 'Guided · woodland · early Oct'},
      {h: 'Migrant geese', w: 'Skeins overhead · Oct–Nov'},
      {h: 'Conkers', w: 'Horse chestnuts by the lake'},
      {h: 'Lantern making', w: 'Hub workshop · late October'},
      {h: 'Hedgehog highway', w: 'New gaps cut · log piles built'},
    ],
  },
  winter: {
    name: 'Winter',
    months: 'Dec — Feb',
    num: 'IV',
    lead:
      'Frost on the meadow, the Wassail in the orchard, and a hush over the woodland.',
    items: [
      {h: 'Tree planting', w: 'Saturdays · January–February'},
      {h: 'Wassail', w: 'Orchard celebration · mid-January'},
      {h: 'Wintering wildfowl', w: 'Tufted duck · pochard · gadwall'},
      {h: 'Coppice & deadhedge', w: 'TCV volunteer days'},
      {h: 'Moselle clearance', w: 'Water Squad · monthly'},
      {h: 'Frost mornings', w: 'Often the prettiest week of the year'},
    ],
  },
};

export default function Seasons(): ReactNode {
  // Default to spring for SSR-deterministic markup, then sync to "now" on the client.
  const [active, setActive] = useState<SeasonKey>('spring');

  useEffect(() => {
    setActive(seasonForMonth(new Date().getMonth()));
  }, []);

  const s = SEASONS[active];

  return (
    <section id="seasons" className="section">
      <div className="container">
        <div className="section__title">
          <h2>
            The <em>year</em> on the Rec
          </h2>
          <p className="lede">
            A rolling calendar from the wildlife and woodland groups. Tap a
            season.
          </p>
          <span className="col">Cycle of the year</span>
        </div>

        <div className="seasons-bar" role="group" aria-label="Choose a season">
          {(Object.entries(SEASONS) as Array<[SeasonKey, Season]>).map(([k, ss]) => (
            <button
              key={k}
              type="button"
              className={k === active ? 'active' : ''}
              aria-pressed={k === active}
              onClick={() => setActive(k)}
            >
              <div className="num">
                {ss.num} · {ss.months}
              </div>
              <div className="name">{k === active ? <em>{ss.name}</em> : ss.name}</div>
            </button>
          ))}
        </div>

        <div className="season-panel" aria-live="polite">
          <p className="season-panel__lead">“{s.lead}”</p>
          <div className="season-grid">
            {s.items.map((it, i) => (
              <div key={it.h} className="season-item">
                <h4>{String(i + 1).padStart(2, '0')}</h4>
                <p className="what">{it.h}</p>
                <div className="where">{it.w}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
