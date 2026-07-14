
import React, { useState } from 'react';
import { ArrowLeft, Book, Box, Code, Terminal, Zap, Hash, Command, ChevronRight, Layers, FileText, Divide, Linkedin, Calculator, Database, RefreshCw } from 'lucide-react';

interface DocumentationProps {
  onBack: () => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen bg-app-bg text-app-text font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-app-surface border-r border-app-border flex-col hidden md:flex z-20">
        <div className="p-6 border-b border-app-border flex items-center gap-2">
           <img src="/images/logo.png" alt="Sei Logo" className="w-6 h-6" />
           <span className="font-bold tracking-wide text-app-text font-mono">Docs</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <NavItem id="intro" label="Introduction" icon={Book} isActive={activeSection === 'intro'} onClick={() => scrollToSection('intro')} />
          <NavItem id="variables" label="Variables & IO" icon={Hash} isActive={activeSection === 'variables'} onClick={() => scrollToSection('variables')} />
          <NavItem id="conversion" label="Type Conversion" icon={RefreshCw} isActive={activeSection === 'conversion'} onClick={() => scrollToSection('conversion')} />
          <NavItem id="operators" label="Operators" icon={Divide} isActive={activeSection === 'operators'} onClick={() => scrollToSection('operators')} />
          <NavItem id="control" label="Logic & Loops" icon={Zap} isActive={activeSection === 'control'} onClick={() => scrollToSection('control')} />
          <NavItem id="functions" label="Functions" icon={Code} isActive={activeSection === 'functions'} onClick={() => scrollToSection('functions')} />
          <NavItem id="math" label="Math Library" icon={Calculator} isActive={activeSection === 'math'} onClick={() => scrollToSection('math')} />
          <NavItem id="arrays" label="Array Library" icon={Layers} isActive={activeSection === 'arrays'} onClick={() => scrollToSection('arrays')} />
          <NavItem id="strings" label="String Library" icon={FileText} isActive={activeSection === 'strings'} onClick={() => scrollToSection('strings')} />
          <NavItem id="ds" label="Data Structures" icon={Database} isActive={activeSection === 'ds'} onClick={() => scrollToSection('ds')} />
          <NavItem id="oop" label="OOP / Classes" icon={Box} isActive={activeSection === 'oop'} onClick={() => scrollToSection('oop')} />
        </nav>

        <div className="p-4 border-t border-app-border">
          <button onClick={onBack} className="flex items-center gap-2 text-xs font-medium text-app-textSecondary hover:text-app-text transition-colors w-full px-2 py-2 rounded-lg hover:bg-white/5">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative scroll-smooth">
        
        <div className="md:hidden sticky top-0 bg-app-bg/80 backdrop-blur-md border-b border-app-border p-4 flex items-center justify-between z-30">
           <span className="font-bold font-mono">Sei Docs</span>
           <button onClick={onBack} className="text-sm text-app-textSecondary">Back</button>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-20">
          
          {/* Introduction */}
          <section id="intro" className="space-y-6">
            <div className="space-y-2">
              <span className="text-purple-400 font-mono text-xs uppercase tracking-widest font-bold">Getting Started</span>
              <h1 className="text-4xl font-bold text-app-text">Introduction</h1>
            </div>
            <p className="text-app-textSecondary leading-relaxed text-lg">
              Sei allows you to write code thinking in Tanglish. It features object-oriented programming, standard libraries for Data Structures, Math, and Strings, and a familiar syntax capable of solving complex DSA problems.
            </p>
          </section>

          {/* Variables & IO */}
          <section id="variables" className="space-y-6">
            <h2 className="text-2xl font-bold text-app-text border-b border-app-border/30 pb-2">Basics: Variables & IO</h2>
            
            <div className="grid gap-6">
                <Card title="Vai" keyword="Var">
                    <p className="text-sm text-app-textSecondary mb-2">Declares a new variable.</p>
                    <CodeBlock code={`Vai naam = "Raja"`} />
                </Card>
                <Card title="Kaami" keyword="Print">
                     <p className="text-sm text-app-textSecondary mb-2">Prints text or numbers.</p>
                     <CodeBlock code={`Kaami "Vanakkam"`} />
                </Card>
                <Card title="Vangu" keyword="Input">
                     <p className="text-sm text-app-textSecondary mb-2">Gets input from user.</p>
                     <CodeBlock code={`Vai age = Vangu "Enter Age: "`} />
                </Card>
                 <Card title="//" keyword="Comment">
                     <p className="text-sm text-app-textSecondary mb-2">Single-line comment.</p>
                     <CodeBlock code={`// Idhu oru comment`} />
                </Card>
            </div>
          </section>

          {/* Type Conversion */}
          <section id="conversion" className="space-y-6">
            <h2 className="text-2xl font-bold text-app-text border-b border-app-border/30 pb-2">Type Conversion</h2>
             <div className="grid md:grid-cols-2 gap-4">
                 <LibCard name="Enn(val)" desc="Parse to Number" code='Enn("123.45") // 123.45' />
                 <LibCard name="Eluthu(val)" desc="Convert to String" code='Eluthu(100) // "100"' />
            </div>
          </section>

          {/* Operators */}
          <section id="operators" className="space-y-6">
             <h2 className="text-2xl font-bold text-app-text border-b border-app-border/30 pb-2">Operators</h2>
             
             <div className="space-y-6">
                 <div>
                     <h3 className="font-bold text-app-text mb-3">Arithmetic</h3>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                         <OpBadge sym="+" desc="Add" />
                         <OpBadge sym="-" desc="Sub" />
                         <OpBadge sym="*" desc="Mul" />
                         <OpBadge sym="/" desc="Div" />
                         <OpBadge sym="%" desc="Mod" />
                     </div>
                 </div>

                 <div>
                     <h3 className="font-bold text-app-text mb-3">Assignment</h3>
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                         <OpBadge sym="=" desc="Assign" />
                         <OpBadge sym="+=" desc="Add Assign" />
                         <OpBadge sym="-=" desc="Sub Assign" />
                         <OpBadge sym="*=" desc="Mul Assign" />
                         <OpBadge sym="/=" desc="Div Assign" />
                         <OpBadge sym="%=" desc="Mod Assign" />
                     </div>
                 </div>

                 <div>
                     <h3 className="font-bold text-app-text mb-3">Comparison</h3>
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                         <OpBadge sym="==" desc="Equal" />
                         <OpBadge sym="!=" desc="Not Equal" />
                         <OpBadge sym="<" desc="Less" />
                         <OpBadge sym=">" desc="Greater" />
                         <OpBadge sym="<=" desc="Less Eq" />
                         <OpBadge sym=">=" desc="Great Eq" />
                     </div>
                 </div>

                 <div>
                     <h3 className="font-bold text-app-text mb-3">Logical</h3>
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                         <OpBadge sym="&&" desc="AND (Um)" />
                         <OpBadge sym="||" desc="OR (Alladhu)" />
                         <OpBadge sym="!" desc="NOT (Alla)" />
                     </div>
                 </div>
             </div>
          </section>

          {/* Logic & Loops */}
          <section id="control" className="space-y-6">
            <h2 className="text-2xl font-bold text-app-text border-b border-app-border/30 pb-2">Logic & Flow Control</h2>
            
            <div className="space-y-6">
                 <div>
                    <h3 className="font-bold text-app-text mb-2">Conditional</h3>
                    <CodeBlock code={`Ippo x > 5 {
  Kaami "Big"
} Illana Ippo x == 5 {
  Kaami "Equal"
} Illana {
  Kaami "Small"
}`} />
                 </div>
                 
                 <div>
                    <h3 className="font-bold text-app-text mb-2">Loops</h3>
                    <CodeBlock code={`// 'Varai' (While)
Varai x > 0 {
  x -= 1
  Ippo x == 2 {
     Adutha // Continue
  }
  Ippo x == 0 {
     Nirthu // Break
  }
}`} />
                 </div>
            </div>
          </section>

          {/* Functions */}
          <section id="functions" className="space-y-6">
            <h2 className="text-2xl font-bold text-app-text border-b border-app-border/30 pb-2">Functions</h2>
            <div className="space-y-4">
                <p className="text-app-textSecondary">Use <CodeSpan>Sei</CodeSpan> to define and <CodeSpan>Thiruppi</CodeSpan> to return. Recursion is fully supported.</p>
                <CodeBlock code={`Sei factorial(n) {
  Ippo n <= 1 { Thiruppi 1 }
  Thiruppi n * factorial(n - 1)
}`} />
            </div>
          </section>

          {/* Math Library */}
          <section id="math" className="space-y-6">
            <h2 className="text-2xl font-bold text-app-text border-b border-app-border/30 pb-2">Math Library</h2>
            <div className="grid md:grid-cols-2 gap-4">
                 <LibCard name="Math.Ver(n)" desc="Square Root" code="Math.Ver(16) // 4" />
                 <LibCard name="Math.Ucham(a, b...)" desc="Max value" code="Math.Ucham(10, 20) // 20" />
                 <LibCard name="Math.Matcham(a, b...)" desc="Min value" code="Math.Matcham(5, 2) // 2" />
                 <LibCard name="Math.Abs(n)" desc="Absolute value" code="Math.Abs(-5) // 5" />
                 <LibCard name="Math.Adikku(n, p)" desc="Power (n^p)" code="Math.Adikku(2, 3) // 8" />
                 <LibCard name="Math.Mattam(n)" desc="Floor / Round Down" code="Math.Mattam(5.9) // 5" />
                 <LibCard name="Math.PI" desc="PI Constant" code="Math.PI" />
            </div>
          </section>

          {/* Array Library */}
          <section id="arrays" className="space-y-6">
            <h2 className="text-2xl font-bold text-app-text border-b border-app-border/30 pb-2">Array Library (Thokuppu)</h2>
            <div className="grid md:grid-cols-2 gap-4">
                 <LibCard name="Seru(arr, val)" desc="Push: Adds item to end." code="Seru(list, 5)" />
                 <LibCard name="Edu(arr)" desc="Pop: Removes last item." code="Edu(list)" />
                 <LibCard name="MudalEdu(arr)" desc="Shift: Removes first item." code="MudalEdu(list)" />
                 <LibCard name="Thiruppu(arr)" desc="Reverse: Reverses order." code="Thiruppu(list)" />
                 <LibCard name="Neelam(arr)" desc="Length: Count of items." code="Neelam(list)" />
            </div>
            <div className="mt-4">
                <span className="text-xs font-bold text-app-textMuted uppercase">Literal Syntax</span>
                <CodeBlock code={`Vai list = [10, 20, 30]
list[0] = 50 // Update index`} />
            </div>
          </section>

          {/* String Library */}
          <section id="strings" className="space-y-6">
            <h2 className="text-2xl font-bold text-app-text border-b border-app-border/30 pb-2">String Library (Varthai)</h2>
            <div className="grid md:grid-cols-2 gap-4">
                 <LibCard name="Periyadhaaku(str)" desc="Upper: Capital letters." code='Periyadhaaku("hi")' />
                 <LibCard name="Siriyadhaaku(str)" desc="Lower: Small letters." code='Siriyadhaaku("HI")' />
                 <LibCard name="Vettu(str, s, e)" desc="Substring: Extract part." code='Vettu(txt, 0, 5)' />
                 <LibCard name="Thedu(str, val)" desc="Find: Index of word." code='Thedu(txt, "a")' />
                 <LibCard name="Pirikku(str, delim)" desc="Split: String to Array." code='Pirikku("a,b", ",")' />
                 <LibCard name="Neelam(str)" desc="Length: Count chars." code='Neelam("Text")' />
            </div>
          </section>

          {/* Data Structures */}
          <section id="ds" className="space-y-6">
             <h2 className="text-2xl font-bold text-app-text border-b border-app-border/30 pb-2">Data Structures (Agaradhi)</h2>
             <p className="text-app-textSecondary">Use <CodeSpan>Agaradhi</CodeSpan> to create Key-Value maps (HashMaps/Dictionaries). Perfect for frequency counters and caches.</p>
             <div className="bg-app-surface/50 border border-app-border rounded-xl p-6">
                <CodeBlock code={`// Create a HashMap
Vai dict = Agaradhi()
dict["name"] = "Dushyanth"
dict["score"] = 100

// Access
Kaami dict["name"]

// Check keys logic manually or just access (returns null if not found)`} />
             </div>
          </section>

          {/* OOP */}
          <section id="oop" className="space-y-6">
            <h2 className="text-2xl font-bold text-app-text border-b border-app-border/30 pb-2">Object Oriented (Vaguppu)</h2>
            <p className="text-app-textSecondary">Sei supports classes, methods, and instance variables using <CodeSpan>Idhu</CodeSpan> (this).</p>
            
            <div className="bg-app-surface/50 border border-app-border rounded-xl p-6">
                <CodeBlock code={`Vaguppu Human {
  Vai name = ""
  
  // Constructor
  Sei uruvaaku(n) {
    Idhu.name = n
  }

  Sei sayHi() {
    Kaami "Hello " + Idhu.name
  }
}

Vai h = Pudhu Human("Raja")
h.sayHi()`} />
            </div>
          </section>

        </div>
        
        {/* Footer (Matches Landing) */}
        <footer className="py-12 bg-app-bg border-t border-app-border mt-20">
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
      </main>
    </div>
  );
};

const NavItem = ({ id, label, icon: Icon, isActive, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive 
        ? 'bg-app-text text-app-bg shadow-lg shadow-white/5' 
        : 'text-app-textSecondary hover:bg-app-surface hover:text-app-text'
    }`}
  >
    <Icon className={`w-4 h-4 ${isActive ? 'text-app-bg' : 'text-app-textMuted'}`} />
    {label}
  </button>
);

const OpBadge = ({ sym, desc }: any) => (
    <div className="flex items-center gap-2 bg-app-surface border border-app-border rounded p-2">
        <code className="text-purple-400 font-bold font-mono text-sm">{sym}</code>
        <span className="text-xs text-app-textSecondary">{desc}</span>
    </div>
);

const CodeSpan = ({ children }: any) => (
    <span className="font-mono text-xs font-bold bg-white/10 text-app-text px-1.5 py-0.5 rounded border border-white/5 mx-1">
        {children}
    </span>
);

const CodeBlock = ({ code }: { code: string }) => (
    <div className="bg-[#050505] rounded-lg border border-app-border/50 p-4 font-mono text-sm overflow-x-auto shadow-inner group">
        <pre className="text-app-textSecondary leading-relaxed">
            {code.split('\n').map((line, i) => (
                <div key={i} className="table-row">
                    <span className="table-cell select-none text-app-textMuted/30 text-right pr-4 text-[10px] w-6 align-top">{i+1}</span>
                    <span className="table-cell" dangerouslySetInnerHTML={{
                        __html: line.replace(/(\/\/.*)|(".+?")|(\b\d+\b)|(\b(?:Kaami|Vangu|Ippo|Illana|Varai|Sei|Vai|Thiruppi|Vaguppu|Pudhu|Idhu|Seru|Edu|Neelam|Agaradhi|Math)\b)/g, 
                        (match, comment, string, number, keyword) => {
                            if (comment) return `<span class="text-[#5C6370]">${comment}</span>`;
                            if (string) return `<span class="text-[#98C379]">${string}</span>`;
                            if (number) return `<span class="text-[#D19A66]">${number}</span>`;
                            if (keyword) return `<span class="text-[#C678DD]">${keyword}</span>`;
                            return match;
                        })
                    }} />
                </div>
            ))}
        </pre>
    </div>
);

const Card = ({ title, keyword, children }: any) => (
    <div className="bg-app-surface border border-app-border rounded-xl p-5 flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-app-text">{title}</span>
            <span className="font-mono text-[10px] bg-app-bg border border-app-border px-2 py-1 rounded text-purple-400">
                {keyword}
            </span>
        </div>
        <div className="flex-1">
            {children}
        </div>
    </div>
);

const LibCard = ({ name, desc, code }: any) => (
    <div className="bg-app-surface/50 border border-app-border rounded-lg p-4 hover:border-app-textMuted transition-colors">
        <code className="text-purple-300 text-xs font-bold block mb-1">{name}</code>
        <p className="text-app-textSecondary text-xs mb-2">{desc}</p>
        <div className="bg-black/30 p-2 rounded text-[10px] font-mono text-gray-400">
            {code}
        </div>
    </div>
);
