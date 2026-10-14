import {useState, type FormEvent, type ReactNode} from 'react';
import Link from '@docusaurus/Link';

import {MEMBER_COUNT_APPROX} from '@site/src/data/friends';

type Group = {day: string; name: string; em: string};

const GROUPS: Group[] = [
  {
    day: '1st Sun',
    name: 'Friends drop-in',
    em: 'Open meeting · plan & natter · 2pm at the Hub',
  },
  {
    day: 'Sat',
    name: 'Woodland volunteers',
    em: 'With TCV · coppice, paths, planting · 10am',
  },
  {
    day: '1st Sat',
    name: 'Moselle Water Squad',
    em: 'River clearing in the park · 11am',
  },
  {
    day: 'Tue',
    name: 'Harmony Gardens',
    em: 'Community gardening · all ages · 10am',
  },
  {
    day: 'Varies',
    name: 'Wildlife Group',
    em: 'Bird, bat & butterfly surveys',
  },
  {
    day: 'Monthly',
    name: 'Orchard team',
    em: 'Pruning, picking, pressing',
  },
  {
    day: 'Yearly',
    name: 'Flower & Produce festival',
    em: 'Late July · stalls · stage · cake tent',
  },
];

export default function Help(): ReactNode {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) {
      setMsg('⚠ Please enter a valid email.');
      return;
    }
    setSubmitting(true);
    setMsg('');
    setTimeout(() => {
      setSubmitting(false);
      setMsg(`✓ Subscribed. Welcome aboard, ${email.split('@')[0]}.`);
      setEmail('');
    }, 600);
  };

  return (
    <section id="help" className="section">
      <div className="container">
        <div className="section__title">
          <h2>
            Help <em>look after</em> the park
          </h2>
          <p className="lede">
            No fees, no committee jargon — just turn up. A short list of the
            volunteer working groups you can join.
          </p>
          <span className="col">Friends · {MEMBER_COUNT_APPROX} strong</span>
        </div>

        <div className="help">
          <div>
            <p className="help__lead">
              We're a group of <em>around {MEMBER_COUNT_APPROX}</em> neighbours
              who keep the Rec wild, welcoming and well-loved. The work is
              shared, the tea is free, children are very welcome.
            </p>
            <div className="groups">
              {GROUPS.map((g) => (
                <div key={g.name} className="group">
                  <span className="day">{g.day}</span>
                  <span className="name">
                    {g.name}
                    <em>{g.em}</em>
                  </span>
                  <Link className="more" to="/get-involved">
                    Join →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <aside className="signup">
            <span className="kicker">The mailing list</span>
            <h3 className="signup__title">
              Once a month, <em>in your inbox.</em>
            </h3>
            <p>
              What's on, what's blooming, the next volunteer day, and a small
              picture from the park. We never share your address.
            </p>
            <form className="signup__form" onSubmit={onSubmit}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
              <button type="submit" disabled={submitting}>
                {submitting ? '…' : 'Subscribe'}
              </button>
            </form>
            <div className="signup__msg" aria-live="polite">
              {msg}
            </div>
            <div className="signup__meta">
              <div>
                <div className="n">{MEMBER_COUNT_APPROX}</div>
                <div className="l">Members</div>
              </div>
              <div>
                <div className="n">25 yrs</div>
                <div className="l">Since 2001</div>
              </div>
              <div>
                <div className="n">£0</div>
                <div className="l">To join</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
