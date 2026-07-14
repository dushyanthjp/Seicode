import { useMemo, useState } from 'react';
import { Landing } from './components/Landing';
import { IDE } from './components/IDE';
import { Documentation } from './components/Documentation';
import { About } from './components/About';

type View = 'landing' | 'ide' | 'docs' | 'about';

const initialCode = `// Welcome to Sei
Vai msg = "Vanakkam"
Kaami msg`;

export default function App() {
  const [view, setView] = useState<View>('landing');

  const currentView = useMemo(() => {
    switch (view) {
      case 'ide':
        return <IDE initialCode={initialCode} onBack={() => setView('landing')} />;
      case 'docs':
        return <Documentation onBack={() => setView('landing')} />;
      case 'about':
        return <About onBack={() => setView('landing')} />;
      case 'landing':
      default:
        return (
          <Landing
            onStart={() => setView('ide')}
            onOpenDocs={() => setView('docs')}
            onOpenAbout={() => setView('about')}
          />
        );
    }
  }, [view]);

  return currentView;
}