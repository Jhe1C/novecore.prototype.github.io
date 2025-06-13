import { Brain, Users, Target, Workflow, Sparkles, ArrowRight } from "lucide-react";

export function FlowVisual() {
  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Central AI hub */}
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-2xl flex items-center justify-center animate-float">
          <Brain className="w-12 h-12 text-white" />
        </div>
        
        {/* Pulsing ring */}
        <div className="absolute inset-0 w-24 h-24 border-4 border-teal-300/50 rounded-2xl animate-ping"></div>
        <div className="absolute inset-2 w-20 h-20 border-2 border-coral-300/30 rounded-xl animate-pulse"></div>
      </div>
      
      {/* Connected nodes */}
      <div className="absolute">
        {/* Top node - Teams */}
        <div className="absolute -top-32 -left-12 transform">
          <div className="w-16 h-16 bg-gradient-to-br from-coral-400 to-coral-500 rounded-xl shadow-lg flex items-center justify-center animate-float" 
               style={{ animationDelay: '1s' }}>
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-coral-300 to-teal-300 transform -translate-y-1/2 origin-left rotate-45 opacity-60"></div>
        </div>
        
        {/* Right node - Goals */}
        <div className="absolute -right-32 -top-6 transform">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-300 to-cyan-400 rounded-xl shadow-lg flex items-center justify-center animate-float" 
               style={{ animationDelay: '2s' }}>
            <Target className="w-8 h-8 text-white" />
          </div>
          <div className="absolute top-1/2 right-1/2 w-32 h-0.5 bg-gradient-to-l from-cyan-300 to-teal-300 transform -translate-y-1/2 origin-right opacity-60"></div>
        </div>
        
        {/* Bottom node - Workflow */}
        <div className="absolute -bottom-32 -right-12 transform">
          <div className="w-16 h-16 bg-gradient-to-br from-coral-300 to-orange-400 rounded-xl shadow-lg flex items-center justify-center animate-float" 
               style={{ animationDelay: '3s' }}>
            <Workflow className="w-8 h-8 text-white" />
          </div>
          <div className="absolute top-1/2 right-1/2 w-32 h-0.5 bg-gradient-to-l from-orange-300 to-coral-300 transform -translate-y-1/2 origin-right -rotate-45 opacity-60"></div>
        </div>
        
        {/* Left node - Innovation */}
        <div className="absolute -left-32 -bottom-6 transform">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl shadow-lg flex items-center justify-center animate-float" 
               style={{ animationDelay: '0.5s' }}>
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-teal-300 to-teal-400 transform -translate-y-1/2 origin-left opacity-60"></div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-teal-400 to-coral-400 rounded-full opacity-60 animate-pulse-glow"
            style={{
              left: `${20 + (i * 7) % 60}%`,
              top: `${15 + (i * 11) % 70}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}
      </div>
      
      {/* Data flow lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#005050" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#FF7F50" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          
          <path
            d="M50 200 Q200 100 350 200 Q200 300 50 200"
            stroke="url(#flowGradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse-glow"
            style={{ animationDuration: '3s' }}
          />
          
          <path
            d="M200 50 Q300 200 200 350 Q100 200 200 50"
            stroke="url(#flowGradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse-glow"
            style={{ animationDuration: '4s', animationDelay: '1s' }}
          />
        </svg>
      </div>
    </div>
  );
}