
import React from 'react';
import { ArrowLeft, Linkedin, Terminal, Sparkles } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-app-bg text-app-text font-sans selection:bg-white/10 selection:text-white overflow-x-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-white/[0.03] to-transparent rounded-full blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 bg-app-bg/80 backdrop-blur-md border-b border-app-border">
          <div className="flex items-center gap-2">
             <img src="/images/logo.png" alt="Sei Logo" className="w-5 h-5" />
             <span className="text-sm font-bold tracking-tight font-mono text-app-text">Sei</span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-medium text-app-textSecondary hover:text-app-text transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
      </nav>

      <main className="flex-1 pt-32 pb-20 px-6 relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        
        <div className="max-w-3xl w-full mx-auto text-center space-y-12">
            
            {/* Header Text */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-app-surface border border-app-border text-[10px] font-mono tracking-widest uppercase text-app-textMuted mb-2">
                    <Sparkles className="w-3 h-3 text-app-textSecondary" />
                    The Mind Behind Sei
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-app-text leading-tight">
                    I did this. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">yeah , Me.</span>
                </h1>
            </div>

            {/* Founder Card - Minimal */}
            <div className="relative group perspective-1000 max-w-lg mx-auto">
                {/* Monochromatic Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-30"></div>
                
                <div className="relative bg-[#0E0E10] border border-app-border rounded-2xl p-10 shadow-2xl transition-transform duration-500 hover:border-app-textMuted/50 overflow-hidden flex flex-col items-center gap-6">
                    
                    {/* Decorative Code Lines */}
                    <div className="absolute top-4 right-4 opacity-5 pointer-events-none text-white">
                        <Terminal className="w-24 h-24 rotate-12" />
                    </div>

                    {/* Avatar */}
                    <div className="shrink-0 relative">
                            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-app-border to-app-text/50 relative z-10">
                            <div className="w-full h-full rounded-full bg-app-card overflow-hidden flex items-center justify-center relative border border-app-border">
                                <img src="/images/dushy stage.jpeg" alt="Dushyanth" className="w-full h-full object-cover" />
                            </div>
                            </div>
                            {/* Orbit Element */}
                            <div className="absolute inset-0 border border-app-border rounded-full scale-125 animate-[spin_12s_linear_infinite] border-t-transparent border-l-transparent opacity-30"></div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-white">Dushyanth</h2>
                        <p className="text-sm font-mono text-app-textMuted uppercase tracking-widest">Founder & CEO</p>
                    </div>

                    {/* LinkedIn Button */}
                    <a href="https://www.linkedin.com/in/dushyanth-jp/" target="_blank" rel="noopener noreferrer" 
                        className="px-6 py-2.5 bg-app-surface hover:bg-white/10 border border-app-border rounded-lg text-sm font-medium transition-all flex items-center gap-2 text-app-text hover:text-white hover:border-app-textSecondary mt-2">
                        <Linkedin className="w-4 h-4" /> Connect on LinkedIn
                    </a>
                </div>
            </div>

            {/* Contact Info (New Section) */}
            <div className="pt-8 text-center space-y-2">
                 <p className="text-xs font-mono text-app-textMuted uppercase tracking-widest">Got any bugs or improvements?</p>
                 <a href="mailto:contact.seicode@gmail.com" className="block text-app-textSecondary hover:text-white transition-colors text-sm font-medium">
                    contact.seicode@gmail.com
                 </a>
            </div>

        </div>
      </main>

      {/* Footer (Matches Landing) */}
      <footer className="py-12 bg-app-bg border-t border-app-border relative z-10">
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
};
