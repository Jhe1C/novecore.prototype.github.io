import { 
  IntelligentSimplicityIcon, 
  AdaptiveWorkflowsIcon, 
  SeamlessFusionIcon, 
  InsightfulCollaborationIcon 
} from "./PillarIcons";

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgGradient: string;
  hoverBg: string;
  iconBg: string;
  delay?: string;
}

function PillarCard({ icon, title, description, bgGradient, hoverBg, iconBg, delay = "0s" }: PillarCardProps) {
  return (
    <div 
      className={`group relative p-8 bg-gradient-to-br ${bgGradient} rounded-2xl border border-gray-100/50 hover:border-gray-200/70 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105`}
      style={{ animationDelay: delay }}
    >
      {/* Background overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon container */}
        <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
          <div className="text-white group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
        
        {/* Hover indicator */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-teal-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700"></div>
    </div>
  );
}

export function FourPillars() {
  const pillars = [
    {
      icon: <IntelligentSimplicityIcon className="w-8 h-8" />,
      title: "Intelligent Simplicity",
      description: "AI-powered guidance from onboarding to daily tasks. Get smart recommendations and a personalized experience without the steep learning curve.",
      bgGradient: "from-teal-50/80 to-teal-100/60",
      hoverBg: "from-teal-100/90 to-teal-200/70",
      iconBg: "bg-gradient-to-br from-teal-500 to-teal-600",
      delay: "0s"
    },
    {
      icon: <AdaptiveWorkflowsIcon className="w-8 h-8" />,
      title: "Adaptive Workflows",
      description: "Modular features and context-aware UI. Build the exact workflow you need, when you need it. No clutter, just power.",
      bgGradient: "from-orange-50/80 to-orange-100/60",
      hoverBg: "from-orange-100/90 to-orange-200/70",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      delay: "0.1s"
    },
    {
      icon: <SeamlessFusionIcon className="w-8 h-8" />,
      title: "Seamless Fusion",
      description: "Deeply integrate with your favorite tools. Your Work Hub unifies tasks, calendars, and messages into one streamlined view.",
      bgGradient: "from-cyan-50/80 to-blue-100/60",
      hoverBg: "from-cyan-100/90 to-blue-200/70",
      iconBg: "bg-gradient-to-br from-cyan-500 to-blue-500",
      delay: "0.2s"
    },
    {
      icon: <InsightfulCollaborationIcon className="w-8 h-8" />,
      title: "Insightful Collaboration",
      description: "Smart notifications that cut through the noise. Get actionable insights and AI-driven analytics to boost team performance.",
      bgGradient: "from-purple-50/80 to-pink-100/60",
      hoverBg: "from-purple-100/90 to-pink-200/70",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      delay: "0.3s"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-16 left-8 w-32 h-32 bg-gradient-to-br from-teal-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-16 right-8 w-40 h-40 bg-gradient-to-br from-orange-200/15 to-cyan-200/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-orange-50 border border-teal-200/50 rounded-full">
            <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-teal-800">Core Platform Strengths</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
            Unlock Peak Performance with
            <span className="block text-teal-600 mt-2">
              FlowFuse's Four Pillars
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent platform is built on four foundational strengths that transform how teams work together, 
            making complex projects feel effortless and intuitive.
          </p>
        </div>
        
        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={index}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              bgGradient={pillar.bgGradient}
              hoverBg={pillar.hoverBg}
              iconBg={pillar.iconBg}
              delay={pillar.delay}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Experience all four pillars working together in perfect harmony
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
            See FlowFuse in Action
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}