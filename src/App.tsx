import { useState } from 'react';
import { Layout } from './components/Layout';
import { ExploreView } from './components/explore/ExploreView';
import { ConfigsView } from './components/configurator/ConfigsView';
import { AboutView } from './components/about/AboutView';

type Tab = 'about' | 'explore' | 'configs';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('about');

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'about' && <AboutView />}
      {activeTab === 'explore' && <ExploreView />}
      {activeTab === 'configs' && <ConfigsView />}
    </Layout>
  );
}
