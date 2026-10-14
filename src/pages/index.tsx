import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Masthead from '@site/src/components/Bulletin/Masthead';
import LeadSpread from '@site/src/components/Bulletin/LeadSpread';
import ThisWeek from '@site/src/components/Bulletin/ThisWeek';
import MapSection from '@site/src/components/Bulletin/ParkMap';
import FieldNotes from '@site/src/components/Bulletin/FieldNotes';
import Seasons from '@site/src/components/Bulletin/Seasons';
import Help from '@site/src/components/Bulletin/Help';
import News from '@site/src/components/Bulletin/News';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <div className="bulletin-page" data-palette="moss" data-density="regular" data-dropcap="true">
        <Masthead />
        <main>
          <LeadSpread />
          <ThisWeek />
          <MapSection />
          <FieldNotes />
          <Seasons />
          <Help />
          <News />
        </main>
      </div>
    </Layout>
  );
}
