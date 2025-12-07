import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { IDE } from './components/IDE';
import { Documentation } from './components/Documentation';
import { About } from './components/About';
import { DEFAULT_CODE } from './constants';

export default function App() {
  const [view, setView] = useState<'landing' | 'ide' | 'docs' | 'about'>('landing');

  return (
    <>
      {view === 'landing' && (
        <Landing 
          onStart={() => setView('ide')} 
          onOpenDocs={() => setView('docs')}
          onOpenAbout={() => setView('about')}
        />
      )}
      {view === 'ide' && (
        <IDE 
          initialCode={DEFAULT_CODE} 
          onBack={() => setView('landing')} 
        />
      )}
      {view === 'docs' && (
        <Documentation 
          onBack={() => setView('landing')} 
        />
      )}
      {view === 'about' && (
        <About 
          onBack={() => setView('landing')} 
        />
      )}
    </>
  );
}