import type {ReactNode} from 'react';

const SIGHTINGS: Array<{when: string; what: string; who: string}> = [
  {when: '23 May', what: 'Kingfisher, pair, lake island', who: 'RW'},
  {when: '21 May', what: 'Pyramidal orchid, meadow', who: 'JK'},
  {when: '19 May', what: 'Tawny owl, woodland edge, dusk', who: 'Anon'},
  {when: '16 May', what: 'Banded demoiselle, Moselle', who: 'RW'},
  {when: '14 May', what: 'Reed warbler, lake reedbed', who: 'Wildlife Grp'},
  {when: '10 May', what: 'Bee orchid, orchard edge', who: 'JK'},
  {when: '08 May', what: 'Common pipistrelle, 21:34', who: 'Bat walk'},
];

export default function FieldNotes(): ReactNode {
  return (
    <section id="log" className="section">
      <div className="container">
        <div className="section__title">
          <h2>
            From the <em>wildlife log</em>
          </h2>
          <p className="lede">
            Notes from the volunteer wildlife group — a running record of what
            the park is doing this fortnight.
          </p>
          <span className="col">Vol. XXV · May 2026</span>
        </div>

        <div className="fieldnotes">
          <div className="fieldnotes__byline">
            <span>Field notes</span>
            <b>Rosie W.</b>
            <span>Wildlife Group co-ordinator</span>
            <br />
            <span className="fieldnotes__filed">
              Filed Saturday morning,
              <br />
              after the meadow walk.
            </span>
          </div>

          <div className="fieldnotes__body">
            <p>
              The meadow is doing what it does in late May — chest-high, alive
              with ox-eye daisies, and humming. We counted nine species of
              butterfly on Wednesday's transect including a green-veined white,
              which is the first of the year. The bluebells in the western
              woodland are just past their peak; another week and they'll be
              gone for the year.
            </p>
            <p>
              On the lake: a pair of kingfishers nesting on the east island for
              the third year running, and reed warblers back in good numbers. A
              single tufted duck still hanging on, weeks after the others have
              left.
            </p>
            <p>
              And — pleasingly — a pyramidal orchid in the meadow this week.
              First record here since 2019. If you spot it, please don't pick
              it. Photograph it instead and send the picture to{' '}
              <a className="link" href="mailto:wildlife@lordshiprec.org.uk">
                wildlife@lordshiprec
              </a>
              .
            </p>
          </div>

          <div className="fieldnotes__list">
            <h4>Recent sightings</h4>
            <ul>
              {SIGHTINGS.map((s) => (
                <li key={`${s.when}-${s.what}`}>
                  <span className="when">{s.when}</span>
                  <span className="what">{s.what}</span>
                  <span className="who">{s.who}</span>
                </li>
              ))}
            </ul>
            <div className="fieldnotes__submit">
              <a
                className="link fieldnotes__submit-link"
                href="mailto:wildlife@lordshiprec.org.uk"
              >
                Submit a sighting →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
