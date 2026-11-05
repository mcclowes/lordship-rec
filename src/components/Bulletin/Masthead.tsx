import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';

import {editionNumber, formatDate} from './masthead.utils';

export default function Masthead(): ReactNode {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    // The date changes once a day; refresh hourly so a long-open tab keeps up
    // without re-rendering the header every minute.
    const id = setInterval(() => setNow(new Date()), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const dateStr = now ? formatDate(now) : 'A weekly bulletin';
  const editionStr = now ? editionNumber(now) : '';

  return (
    <header className="masthead">
      <div className="container">
        <div className="masthead__top">
          <span>Friends of Lordship Recreation Ground · est. 2001</span>
          <span className="epigraph">Always free · always open · dawn to dusk</span>
          <span className="right">
            Tottenham · London N17{editionStr ? ` · ${editionStr}` : ''}
          </span>
        </div>

        <h1 className="masthead__title">
          Lordship <em>Rec</em>
        </h1>

        <div className="masthead__sub">
          <span>{dateStr}</span>
          <span className="mid">A weekly bulletin for the park &amp; its neighbours</span>
          <span className="right">
            <Link to="/facilities/weather-station">Luke Howard weather station →</Link>
          </span>
        </div>
      </div>
    </header>
  );
}
