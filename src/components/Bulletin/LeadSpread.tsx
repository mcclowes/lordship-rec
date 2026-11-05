import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function LeadSpread(): ReactNode {
  return (
    <section id="lead" className="lead">
      <div className="container">
        <figure className="lead__hero">
          <img
            src={useBaseUrl('/img/lake-summer.webp')}
            alt="The lake at Lordship Rec on a summer afternoon, willows on the far bank and purple loosestrife in the foreground."
            width={2000}
            height={941}
            loading="eager"
          />
          <figcaption>
            <span>The lake in late June</span>
            <em>looking east across the water</em>
          </figcaption>
        </figure>
      </div>
      <div className="container lead__grid">
        <div className="lead__main">
          <span className="kicker">From the Friends</span>
          <h1 className="lead__headline">
            A twenty-five hectare park, looked after by the people who{' '}
            <em>walk through it.</em>
          </h1>
          <div className="lead__body">
            <p>
              Lordship Recreation Ground is one of north London's largest
              community parks — woodland on the western slopes, a substantial
              lake at the centre, an orchard with eighty heritage trees, the
              world's first Model Traffic Area, and a quiet daylit stretch of
              the River Moselle.
            </p>
            <p>
              The Friends of Lordship Rec have been here since 2001. We're
              around fourteen hundred neighbours who help keep the park
              welcoming and well-loved. We run volunteer days, surveys, and the
              annual flower and produce festival; we keep the wildlife group
              going; we co-manage the park with the council. None of it costs
              anything to join.
            </p>
            <p>
              This bulletin is the easiest way to find out what's on, what's
              blooming, and how to get involved. New each week.
            </p>
          </div>
        </div>

        <aside className="lead__aside">
          <h3>The park, in brief</h3>
          <dl className="factlist">
            <dt>Address</dt>
            <dd>Lordship Lane, N17</dd>
            <dt>Open</dt>
            <dd>Every day, dawn until dusk</dd>
            <dt>Entry</dt>
            <dd>
              <em>Always free</em>
            </dd>
            <dt>Size</dt>
            <dd>25 hectares · 62 acres</dd>
            <dt>Nearest stations</dt>
            <dd>Bruce Grove · Wood Green</dd>
            <dt>Buses</dt>
            <dd>123 · 243 · W4</dd>
            <dt>Café</dt>
            <dd>The Hub · daily 9–5</dd>
            <dt>Toilets</dt>
            <dd>At the Hub &amp; playground</dd>
          </dl>
        </aside>
      </div>
    </section>
  );
}
