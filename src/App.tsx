import { useState } from 'react';
import { Layout } from './components/Layout';
import { ExploreView } from './components/explore/ExploreView';
import { ConfigsView } from './components/configurator/ConfigsView';
import { AboutView } from './components/about/AboutView';

type Tab = 'about' | 'explore' | 'configs';
type ExploreViewMode = 'matrix' | 'phases' | 'stakeholder';

const MIRO_LINKS: Record<string, string> = {
  about:   'https://miro.com/app/board/uXjVHHf0z04=/?moveToWidget=3458764675163293919&cot=14',
  explore_matrix:      'https://miro.com/app/board/uXjVHHf0z04=/?moveToWidget=3458764675157029581&cot=14',
  explore_phases:      'https://miro.com/app/board/uXjVHHf0z04=/?moveToWidget=3458764675157029581&cot=14',
  explore_stakeholder: 'https://miro.com/app/board/uXjVHHf0z04=/?moveToWidget=3458764675158014140&cot=14',
  configs: 'https://miro.com/app/board/uXjVHHf0z04=/?moveToWidget=3458764675157029578&cot=14',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [exploreViewMode, setExploreViewMode] = useState<ExploreViewMode>('matrix');

  const miroLink = activeTab === 'explore'
    ? MIRO_LINKS[`explore_${exploreViewMode}`]
    : MIRO_LINKS[activeTab];

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} miroLink={miroLink}>
      {activeTab === 'about' && <AboutView />}
      {activeTab === 'explore' && (
        <ExploreView viewMode={exploreViewMode} onViewModeChange={setExploreViewMode} />
      )}
      {activeTab === 'configs' && <ConfigsView />}
    </Layout>
  );
}
