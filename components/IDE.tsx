
import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowLeft, Trash2, Terminal, Code, Layout, Sparkles, Command, ChevronRight, BookOpen, ChevronUp } from 'lucide-react';
import { Lexer } from '../services/lexer';
import { Parser } from '../services/parser';
import { Evaluator } from '../services/evaluator';
import { REFERENCE_CARDS, EXAMPLE_PROGRAMS } from '../constants';

interface IDEProps {
  initialCode: string;
  onBack: () => void;
}

interface InputRequest {
  prompt: string;
  resolve: (value: string) => void;
}

export const IDE: React.FC<IDEProps> = ({ initialCode, onBack }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [inputRequest, setInputRequest] = useState<InputRequest | null>(null);
  const [showExamples, setShowExamples] = useState(false);
  
  const outputEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (inputRequest) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [output, inputRequest]);

  const runCode = async () => {
    setOutput([]);
    setError(null);
    setIsRunning(true);
    setInputRequest(null);

    try {
      const lexer = new Lexer(code);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
      const program = parser.parse();
      
      const evaluator = new Evaluator(
        (text) => setOutput(prev => [...prev, text]),
        (promptText) => {
           return new Promise((resolve) => {
               setInputRequest({
                   prompt: promptText,
                   resolve: (val) => {
                       // Echo input to output
                       // setOutput(prev => [...prev, `${promptText}${val}`]); 
                       resolve(val);
                   }
               });
           });
        }
      );

      // Async execution
      await evaluator.evaluateProgram(program);
      
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsRunning(false);
      setInputRequest(null);
    }
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputRequest) {
          const val = e.currentTarget.value;
          // Optimistic update of UI before resolving promise to prevent flash
          setOutput(prev => [...prev, `${inputRequest.prompt} ${val}`]);
          inputRequest.resolve(val);
          setInputRequest(null);
      }
  };

  const loadExample = (exampleCode: string) => {
    setCode(exampleCode);
    setShowExamples(false);
    setOutput([]);
    setError(null);
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-screen bg-app-bg text-app-text font-sans overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 h-16 bg-app-bg border-b border-app-border shrink-0 z-20">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-2 px-3 py-1.5 hover:bg-app-surface rounded-lg text-app-textSecondary hover:text-app-text transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-medium uppercase tracking-wide">Back</span>
          </button>
          <div className="h-4 w-px bg-app-border"></div>
          <div className="flex items-center gap-2">
             <img src="/images/logo.png" alt="Sei Logo" className="w-5 h-5" />
             <span className="text-sm font-bold text-app-text tracking-tight font-mono">Sei <span className="text-app-textMuted font-normal">IDE</span></span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-app-surface border border-app-border">
                <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                <span className="text-[10px] font-mono text-app-textSecondary uppercase tracking-widest">{isRunning ? 'Running' : 'Ready'}</span>
            </div>
            <button 
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 px-6 py-2 bg-app-text hover:bg-white text-app-bg text-xs font-bold uppercase tracking-wider rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
              >
                <Play className="w-3 h-3 fill-current" /> {isRunning ? 'Running...' : 'Run Code'}
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-4 md:p-6 w-full max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          
          {/* Source Code Editor */}
          <div className="flex-1 flex flex-col bg-app-surface rounded-lg border border-app-border overflow-hidden shadow-depth">
            <div className="flex items-center justify-between px-4 py-3 border-b border-app-border bg-app-surface">
              <div className="flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-app-textMuted" />
                <span className="text-[10px] font-bold text-app-textSecondary uppercase tracking-widest font-mono">Source.sei</span>
              </div>
            </div>
            
            <div className="flex-1 flex relative font-mono text-sm overflow-hidden bg-app-bg">
              {/* Line Numbers */}
              <div className="bg-app-surface/30 text-app-textMuted text-right py-4 px-4 select-none border-r border-app-border/50 shrink-0 min-w-[3.5rem]">
                {lineNumbers.map(n => (
                  <div key={n} className="leading-6 text-[10px] opacity-70">{n}</div>
                ))}
              </div>
              {/* Text Area */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 resize-none outline-none p-4 leading-6 text-app-text bg-transparent w-full focus:ring-0 selection:bg-white/10 selection:text-white placeholder-app-textMuted/50"
                style={{ tabSize: 2 }}
                placeholder="// Write your Sei code here..."
              />
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex-1 lg:max-w-[40%] flex flex-col bg-[#050505] rounded-lg border border-app-border overflow-hidden shadow-depth">
             <div className="flex items-center justify-between px-4 py-3 border-b border-app-border bg-app-surface/20">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-app-textMuted" />
                <span className="text-[10px] font-bold text-app-textSecondary uppercase tracking-widest font-mono">Terminal Output</span>
              </div>
              <button 
                onClick={() => {setOutput([]); setError(null);}} 
                className="p-1.5 text-app-textMuted hover:text-app-text hover:bg-white/5 rounded transition-colors"
                title="Clear Console"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-[#050505] relative custom-scrollbar">
              {output.length === 0 && !error && !inputRequest && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-app-textMuted/30 select-none">
                  <div className="w-12 h-12 rounded-full border border-app-border/30 flex items-center justify-center mb-3">
                     <Command className="w-5 h-5 opacity-40" />
                  </div>
                  <p className="text-[10px] font-medium uppercase tracking-widest opacity-60">Ready to execute</p>
                </div>
              )}
              
              <div className="space-y-2 relative z-10">
                {output.map((line, i) => (
                    <div key={i} className="text-app-textSecondary break-words pl-3 border-l-2 border-app-textMuted/40 py-0.5 animate-in fade-in slide-in-from-left-2 duration-200">
                        <span className="text-green-500/80 mr-2">➜</span>{line}
                    </div>
                ))}
                
                {inputRequest && (
                   <div className="flex items-center text-app-text border-l-2 border-yellow-500/50 pl-3 py-1 bg-white/5">
                      <span className="text-yellow-500 mr-2">?</span>
                      <span className="mr-2 text-app-textSecondary whitespace-nowrap">{inputRequest.prompt}</span>
                      <input 
                        ref={inputRef}
                        autoFocus
                        type="text"
                        className="bg-transparent border-none outline-none flex-1 text-white placeholder-white/20 min-w-0"
                        onKeyDown={handleInputSubmit}
                        onBlur={() => inputRef.current?.focus()} 
                      />
                   </div>
                )}
                
                <div ref={outputEndRef} />
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-900/10 border-l-2 border-red-500/50 text-red-400 font-mono relative animate-in fade-in zoom-in-95 duration-200">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold uppercase tracking-wide text-[10px]">Runtime Error</span>
                   </div>
                   {error}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Footer Quick Reference */}
      <div className="h-auto min-h-[100px] shrink-0 bg-app-surface border-t border-app-border flex flex-col z-30 relative">
         <div className="px-6 py-2 border-b border-app-border bg-app-bg flex items-center justify-between gap-2">
             <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-app-textMuted" />
                <span className="text-[10px] font-bold text-app-textMuted uppercase tracking-widest">Quick Reference</span>
             </div>
             
             {/* Example Loader */}
             <div className="relative">
                 <button 
                    onClick={() => setShowExamples(!showExamples)}
                    className="flex items-center gap-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-app-textSecondary hover:text-app-text bg-app-surface hover:bg-app-card border border-app-border rounded transition-all"
                 >
                     <BookOpen className="w-3 h-3" />
                     Load Example
                     <ChevronUp className={`w-3 h-3 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
                 </button>
                 
                 {showExamples && (
                     <div className="absolute bottom-full right-0 mb-2 w-56 bg-app-surface border border-app-border rounded-lg shadow-depth p-1 z-50 animate-in fade-in slide-in-from-bottom-2">
                         <div className="px-3 py-2 text-[10px] font-bold text-app-textMuted uppercase tracking-widest border-b border-app-border/50 mb-1">
                             Select Program
                         </div>
                         {EXAMPLE_PROGRAMS.map((ex, i) => (
                             <button
                                key={i}
                                onClick={() => loadExample(ex.code)}
                                className="w-full text-left px-3 py-2 text-xs text-app-textSecondary hover:text-app-text hover:bg-app-bg rounded transition-colors"
                             >
                                 {ex.name}
                             </button>
                         ))}
                     </div>
                 )}
             </div>
         </div>
         <div className="flex-1 overflow-x-auto p-4 flex items-center bg-app-surface">
            <div className="flex flex-nowrap gap-3">
             {REFERENCE_CARDS.map((card, i) => (
                 <div key={i} className="flex items-center bg-app-bg rounded border border-app-border hover:border-app-textMuted transition-all cursor-help group pr-3 pl-2 py-1.5 h-8 select-none whitespace-nowrap">
                     <span className="font-bold text-app-text font-mono text-[10px] mr-2">{card.term}</span>
                     <div className="h-3 w-px bg-app-border mr-2"></div>
                     <span className="text-[10px] font-medium text-app-textMuted group-hover:text-app-textSecondary transition-colors">{card.desc}</span>
                 </div>
             ))}
            </div>
         </div>
      </div>
    </div>
  );
};
