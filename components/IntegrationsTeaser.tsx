import { useState } from "react";
import { ExternalLink, Zap, ArrowRight } from "lucide-react";

interface Integration {
  name: string;
  logo: string;
  category: string;
  description: string;
  color: string;
  bgColor: string;
  popular?: boolean;
}

interface IntegrationsTeaserProps {
  onIntegrationClick?: () => void;
}

const integrations: Integration[] = [
  {
    name: "Google Workspace",
    logo: "GW",
    category: "Communication",
    description: "Sync calendars, emails, and drive files seamlessly",
    color: "text-blue-600",
    bgColor: "from-blue-100 to-blue-200",
    popular: true
  },
  {
    name: "Slack",
    logo: "SL",
    category: "Messaging",
    description: "Get project updates and notifications in your channels",
    color: "text-purple-600",
    bgColor: "from-purple-100 to-purple-200",
    popular: true
  },
  {
    name: "Microsoft 365",
    logo: "M365",
    category: "Productivity",
    description: "Connect with Teams, OneDrive, and Office apps",
    color: "text-blue-700",
    bgColor: "from-blue-200 to-indigo-200",
    popular: true
  },
  {
    name: "GitHub",
    logo: "GH",
    category: "Development",
    description: "Track commits, PRs, and releases automatically",
    color: "text-gray-800",
    bgColor: "from-gray-100 to-gray-200"
  },
  {
    name: "Figma",
    logo: "FG",
    category: "Design",
    description: "Monitor design progress and gather feedback",
    color: "text-pink-600",
    bgColor: "from-pink-100 to-pink-200"
  },
  {
    name: "Jira",
    logo: "JR",
    category: "Project Mgmt",
    description: "Sync issues and sprint planning effortlessly",
    color: "text-blue-600",
    bgColor: "from-blue-100 to-cyan-200"
  },
  {
    name: "Notion",
    logo: "NT",
    category: "Documentation",
    description: "Link your knowledge base and project docs",
    color: "text-gray-700",
    bgColor: "from-gray-100 to-slate-200"
  },
  {
    name: "Zoom",
    logo: "ZM",
    category: "Video Calls",
    description: "Schedule and track meeting outcomes",
    color: "text-blue-500",
    bgColor: "from-blue-100 to-sky-200"
  }
];

export function IntegrationsTeaser({ onIntegrationClick }: IntegrationsTeaserProps) {
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-200/20 to-orange-200/20 rounded-full animate-pulse-glow blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-200/15 to-cyan-200/15 rounded-full animate-pulse-glow blur-3xl" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-cyan-200/25 to-teal-200/25 rounded-full animate-pulse-glow blur-xl" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-orange-50 border border-teal-200/50 rounded-full">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-teal-800">Powerful Integrations</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
            Connect Everything.
            <span className="block text-teal-600 mt-2">
              Achieve Anything.
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FlowFuse works seamlessly with the tools you already love. Build your perfect workflow by connecting your favorite apps in minutes, not hours.
          </p>
        </div>
        
        {/* Integration grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <button
              key={integration.name}
              className="group relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer w-full text-left"
              onMouseEnter={() => setHoveredIntegration(integration.name)}
              onMouseLeave={() => setHoveredIntegration(null)}
              onClick={onIntegrationClick}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular badge */}
              {integration.popular && (
                <div className="absolute -top-2 -right-2 px-2 py-1 bg-button-500 text-white text-xs font-semibold rounded-full">
                  Popular
                </div>
              )}
              
              {/* Logo */}
              <div className={`w-14 h-14 bg-gradient-to-br ${integration.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm group-hover:shadow-lg`}>
                <div className={`font-bold text-sm ${integration.color} group-hover:scale-110 transition-transform duration-300`}>
                  {integration.logo}
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                    {integration.name}
                  </h3>
                  <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full inline-block">
                  {integration.category}
                </div>
              </div>
              
              {/* Hover tooltip */}
              {hoveredIntegration === integration.name && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-10 animate-in fade-in-0 zoom-in-95 duration-200">
                  <div className="font-medium mb-1">{integration.name}</div>
                  <div className="text-gray-300 text-xs">{integration.description}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100/20 to-orange-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </button>
          ))}
        </div>
        
        {/* Bottom section */}
        <div className="text-center space-y-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              200+ More Integrations Coming Soon
            </h3>
            <p className="text-gray-600 mb-8">
              We're constantly adding new integrations based on user feedback. Don't see your favorite tool? Let us know and we'll prioritize it.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onIntegrationClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
            >
              View All Integrations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={onIntegrationClick}
              className="inline-flex items-center gap-2 px-6 py-3 text-teal-700 hover:text-teal-800 font-semibold border border-teal-200 hover:border-teal-300 rounded-xl hover:bg-teal-50 transition-all duration-300"
            >
              Request Integration
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}