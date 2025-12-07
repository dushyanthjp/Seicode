
import React from 'react';
import { ArrowRight, Code2, Linkedin, Book, Terminal, Command, Github } from 'lucide-react';
import { DOCS_CARDS } from '../constants';

interface LandingProps {
  onStart: () => void;
  onOpenDocs: () => void;
  onOpenAbout: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart, onOpenDocs, onOpenAbout }) => {
  return (
    <div className="flex flex-col min-h-screen bg-app-bg text-app-text font-sans selection:bg-white/10 selection:text-white overflow-x-hidden">
      
      {/* Floating Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="bg-app-surface/60 backdrop-blur-xl border border-app-border shadow-glow rounded-full px-6 py-2.5 flex items-center gap-8 pointer-events-auto transition-all hover:border-app-borderHover hover:bg-app-surface/80">
           <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Sei Logo" className="w-6 h-6" />
              <span className="text-sm font-bold tracking-wide text-app-text font-mono">Sei</span>
           </div>
           
           <div className="hidden sm:flex items-center gap-6">
              <button onClick={onOpenDocs} className="text-xs font-medium text-app-textSecondary hover:text-app-text transition-colors">
                 Documentation
              </button>
              <button onClick={onOpenAbout} className="text-xs font-medium text-app-textSecondary hover:text-app-text transition-colors">
                 About Us
              </button>
           </div>

           <button 
              onClick={onStart}
              className="ml-2 px-5 py-2 bg-app-text text-app-bg text-xs font-bold rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95"
            >
              Open IDE
            </button>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32 md:py-40 max-w-5xl mx-auto relative">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-white/[0.02] to-transparent rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-app-border bg-app-surface/30 backdrop-blur-sm text-app-textSecondary text-[10px] font-mono tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-app-text animate-pulse-slow"></span>
          Seicode · Tamil Interpreter v1.0
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-app-text leading-[1.1] mb-8 tracking-tight">
          Code the way you speak. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            Tamil first syntax.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-app-textSecondary max-w-xl mb-12 leading-relaxed font-light">
          A minimalist programming space for thinking in Tamil and writing clean, modern code. Pure, simple, and rooted in home.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <button 
            onClick={onStart}
            className="group flex items-center justify-center gap-3 px-8 py-3.5 bg-app-text text-app-bg text-sm font-bold rounded-lg transition-all hover:bg-white hover:scale-[1.01]"
          >
            Start Coding <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
             onClick={onOpenDocs}
             className="flex items-center justify-center gap-3 px-8 py-3.5 bg-transparent border border-app-border text-app-textSecondary text-sm font-medium rounded-lg transition-all hover:border-app-text hover:text-app-text"
          >
            Read Docs
          </button>
        </div>

        {/* Code Snippet Card */}
        <div className="mt-20 w-full max-w-2xl mx-auto">
           <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl blur-xl transition-opacity opacity-50 group-hover:opacity-70"></div>
              <div className="relative bg-app-surface border border-app-border rounded-xl overflow-hidden shadow-depth backdrop-blur-sm">
                 <div className="flex items-center justify-between px-4 py-3 border-b border-app-border bg-app-surface/50">
                    <div className="flex gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                    </div>
                    <span className="text-[10px] font-mono text-app-textMuted uppercase tracking-wider">hello.sei</span>
                 </div>
                 <div className="p-6 text-left overflow-x-auto bg-[#0F0F11]">
                    <pre className="font-mono text-sm md:text-base leading-loose text-app-textSecondary">
<span className="text-app-textMuted">// Greeting Function</span>
<br/>
<span className="text-[#C678DD]">Sei</span> <span className="text-[#61AFEF]">greet</span>(<span className="text-[#E06C75]">name</span>) {'{'}
<br/>
  <span className="text-[#C678DD]">Kaami</span> <span className="text-[#98C379]">"Vanakkam, "</span> + <span className="text-[#E06C75]">name</span>
<br/>
{'}'}
<br/>
<span className="text-[#61AFEF]">greet</span>(<span className="text-[#98C379]">"World"</span>)
</pre>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Reference Grid */}
      <section id="features" className="py-32 bg-app-bg border-t border-app-border/30 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
                <span className="text-app-textSecondary font-mono text-[10px] uppercase tracking-widest mb-2 block">Syntax Guide</span>
                <h2 className="text-3xl font-bold text-app-text">Core Keywords</h2>
            </div>
            <p className="text-app-textMuted text-right max-w-sm text-sm font-light">
                Essential commands to master the Sei syntax.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCS_CARDS.map((card, i) => (
              <div key={i} className="group bg-app-card border border-app-border hover:border-app-borderHover rounded-xl p-6 transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-app-text font-mono group-hover:text-white transition-colors">{card.title}</h3>
                    <span className="text-[10px] font-bold text-app-textMuted bg-app-surface px-2 py-1 rounded border border-app-border/50 uppercase tracking-wider">
                       {card.tag}
                    </span>
                </div>
                <p className="text-app-textSecondary text-xs mb-6 font-light leading-relaxed">
                    {card.desc}
                </p>
                <div className="bg-app-bg border border-app-border/50 rounded-lg p-3 group-hover:border-app-border transition-colors">
                    <code className="text-xs font-mono text-app-text/80 block whitespace-pre-wrap">
                        {card.code}
                    </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-app-bg border-t border-app-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
             <img src="/images/logo.png" alt="Sei Logo" className="w-6 h-6" />
             <span className="text-sm font-medium text-app-text">Sei <span className="text-app-textMuted">2025</span></span>
          </div>
          
          <div className="flex items-center gap-6">
             <span className="text-xs text-app-textMuted">
                Built by <span className="text-app-textSecondary">Dushyanth</span>
             </span>
             <a 
               href="https://www.linkedin.com/in/dushyanth-jp/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-app-textSecondary hover:text-white transition-colors"
             >
                <Linkedin className="w-4 h-4" />
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
