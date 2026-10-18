// Chronology of the Friends of Lordship Rec, 2001–2012.
// Condensed from docs/about/history-of-the-friends.mdx into timeline events,
// grouped into three eras. Each era carries an accent token (moss / sky / clay)
// declared in src/css/custom.css, so the spine colour shifts as you scroll.

export type EraKey = 'founding' | 'consultation' | 'regeneration';

export type Era = {
  key: EraKey;
  label: string;
  years: string;
  accent: string; // a CSS custom property name from :root
};

export type TimelineEvent = {
  era: EraKey;
  date: string;
  title: string;
  body: string;
};

export const eras: Era[] = [
  {key: 'founding', label: 'The Friends form', years: '2001–02', accent: '--moss'},
  {key: 'consultation', label: 'Consultation & care', years: '2003–07', accent: '--sky'},
  {key: 'regeneration', label: 'Regeneration', years: '2008–12', accent: '--clay'},
];

export const events: TimelineEvent[] = [
  {
    era: 'founding',
    date: 'March 2001',
    title: 'A park of its own',
    body:
      "The Friends of Downhills Park AGM agrees to help local users set up separate groups for Lordship Rec and Belmont Rec.",
  },
  {
    era: 'founding',
    date: 'June 2001',
    title: 'The Friends are founded',
    body:
      'Fifty people attend the launch meeting of the Friends of Lordship Rec at the Broadwater Centre.',
  },
  {
    era: 'founding',
    date: 'July 2001',
    title: 'First stall',
    body:
      'A stall at the Broadwater Farm carnival opens up discussion about the Rec and draws as many people in as possible.',
  },
  {
    era: 'founding',
    date: 'October 2001',
    title: '2,000 questionnaires',
    body:
      "An autumn open day in the kids'-area hut, with 2,000 questionnaires delivered door to door asking how to improve the Rec.",
  },
  {
    era: 'founding',
    date: 'February 2002',
    title: 'Talking to the council',
    body:
      'A public meeting in the Hut with council staff on maintenance and security — and the first talk of a summer festival.',
  },
  {
    era: 'founding',
    date: '6 June 2002',
    title: '700 at the first festival',
    body:
      'After months of planning, 700 people come to the first FLR Summer Festival. The decision is made to do it every year.',
  },
  {
    era: 'founding',
    date: 'October 2002',
    title: 'The Users Forum begins',
    body:
      'A widely attended forum at the Broadwater Farm office launches the Lordship Rec Users Forum, which has met monthly ever since.',
  },
  {
    era: 'consultation',
    date: 'Winter 2002–3',
    title: 'A strategy for the Rec',
    body:
      "Friends help draft the 'Strategy for Lordship Rec' and launch monthly drop-ins in the children's-area hut.",
  },
  {
    era: 'consultation',
    date: 'June 2003',
    title: '1,000+ at the festival',
    body:
      'The 2003 Summer Festival draws over a thousand people, consulting on under-used places like the Model Traffic Area and the Lake.',
  },
  {
    era: 'consultation',
    date: '2003–2007',
    title: 'Throughout these years',
    body:
      "Monthly drop-ins, yearly AGMs, lake clean-up days, history and health walks; sports teams, Friends of Graham Lee's trees by the Moselle, and the Mother & Toddler Group all keep the Rec alive.",
  },
  {
    era: 'consultation',
    date: '2004',
    title: 'The lake project',
    body:
      "The Friends bid for £25,000 for 'Phase 1' improvements to the lake area, with advice and support from BTCV.",
  },
  {
    era: 'consultation',
    date: 'November 2004',
    title: 'Active play',
    body:
      'A major Active Play consultation day; 4,000 leaflets distributed and a youth group set up to help shape the plans.',
  },
  {
    era: 'consultation',
    date: 'September 2005',
    title: '2,000 celebrate',
    body:
      'Two thousand residents attend a festival to launch the new active-play facilities and the wider improvements programme.',
  },
  {
    era: 'consultation',
    date: '2005–6',
    title: 'The Kite Labyrinth',
    body:
      'A community-designed landscaped labyrinth takes shape, with local schoolchildren closely involved.',
  },
  {
    era: 'consultation',
    date: 'June 2006',
    title: 'Heart of the Park',
    body:
      'Around a thousand people celebrate the restored Lake and the new Kite Labyrinth.',
  },
  {
    era: 'consultation',
    date: 'January 2007',
    title: 'Lordship Woodlands',
    body:
      'The Friends launch a woodlands sub-group to manage and improve the conservation area, starting with a bulb-planting day.',
  },
  {
    era: 'consultation',
    date: '2006–7',
    title: 'The big bid',
    body:
      'Friends, Users Forum and council work together to formulate a £3.7m bid to the Heritage Lottery Fund for the regeneration of the Rec.',
  },
  {
    era: 'regeneration',
    date: '2008',
    title: 'Restore the Rec',
    body:
      'A large festival kicks off the campaign for a comprehensive refurbishment of the park.',
  },
  {
    era: 'regeneration',
    date: '2010',
    title: 'Second Restore the Rec',
    body:
      'Another big festival backs the major Heritage Lottery bid to refurbish the park.',
  },
  {
    era: 'regeneration',
    date: '2010–12',
    title: 'The Rec transformed',
    body:
      'Major works: the straw-bale Hub, the Moselle brought up to the surface in a new channel, new meadows and an orchard, a new playground, and the restored Model Traffic Area.',
  },
];
