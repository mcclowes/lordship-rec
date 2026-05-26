import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FacilitiesGrid from '@site/src/components/FacilitiesGrid';

import styles from './index.module.css';

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.heroCtas}>
          <Link className={clsx('button button--primary button--lg', styles.cta)} to="/get-involved">
            Get involved
          </Link>
          <Link className={clsx('button button--secondary button--lg', styles.cta)} to="/news">
            Latest news
          </Link>
        </div>
      </div>
    </header>
  );
}

function Intro() {
  return (
    <section className={styles.intro}>
      <div className="container">
        <div className={styles.introGrid}>
          <div>
            <Heading as="h2">A park looked after by the people who use it</Heading>
            <p>
              Lordship Recreation Ground is one of north London's largest community parks —
              25 hectares of green space, woodland, lake and play areas in the heart of Tottenham.
              Friends of Lordship Rec is the volunteer group that helps look after it.
            </p>
            <p>
              We run volunteer days, organise events, look after the wildlife areas
              and work with Haringey Council to keep the park in good shape.
              Everything we do is open to anyone — there's no fee and no commitment.
            </p>
            <p>
              <Link to="/about">About the Friends →</Link>
            </p>
          </div>
          <aside className={styles.visit}>
            <Heading as="h3">Visiting</Heading>
            <dl className={styles.visitList}>
              <dt>Address</dt>
              <dd>Lordship Lane, London N17</dd>
              <dt>Open</dt>
              <dd>Daily, dawn until dusk</dd>
              <dt>Café</dt>
              <dd>See <Link to="/facilities/hub-cafe">The Hub</Link></dd>
              <dt>Nearest stations</dt>
              <dd>Bruce Grove, Wood Green</dd>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Facilities() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2">What's in the park</Heading>
        <FacilitiesGrid />
      </div>
    </section>
  );
}

function GetInvolvedCta() {
  return (
    <section className={styles.ctaBand}>
      <div className={clsx('container', styles.ctaBandInner)}>
        <div>
          <Heading as="h2" className={styles.ctaBandTitle}>Lend a hand</Heading>
          <p className={styles.ctaBandText}>
            Volunteer days, working groups, the mailing list — pick whatever suits you.
          </p>
        </div>
        <Link className="button button--primary button--lg" to="/get-involved">
          See how to get involved
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <Hero />
      <main>
        <Intro />
        <Facilities />
        <GetInvolvedCta />
      </main>
    </Layout>
  );
}
