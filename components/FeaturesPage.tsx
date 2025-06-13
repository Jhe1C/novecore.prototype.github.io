import { useState, useEffect, useMemo } from "react";
import { 
  IntelligentSimplicityIcon, 
  AdaptiveWorkflowsIcon, 
  SeamlessFusionIcon, 
  InsightfulCollaborationIcon 
} from "./PillarIcons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { 
  ArrowRight, 
  Search, 
  Filter, 
  X, 
  ChevronUp, 
  Grid, 
  List, 
  Sparkles, 
  Zap, 
  Target, 
  Users,
  PlayCircle,
  ExternalLink,
  ArrowUp,
  Home,
  ChevronRight,
  Hash,
  Play,
  Pause,
  Volume2,
  Maximize,
  Clock,
  UserCheck,
  TrendingUp,
  Check,
  ArrowLeft
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  summary: string;
  description: string;
  benefits: string[];
  pillar: string;
  pillarColor: string;
  icon: React.ReactNode;
  mockupType: 'dashboard' | 'onboarding' | 'workflow' | 'integration' | 'analytics' | 'collaboration';
  demoAvailable: boolean;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  useCaseExample?: {
    title: string;
    scenario: string;
    steps: string[];
    outcome: string;
  };
  relatedFeatures?: string[];
  keyFunctionalities: string[];
  videoUrl?: string;
}

interface FeaturesPageProps {
  onNavigateHome?: () => void;
}

const allFeatures: Feature[] = [
  {
    id: "fuseai-onboarding",
    title: "FuseAI Personalized Onboarding",
    summary: "AI assistant that configures your workspace and suggests templates based on your team's needs.",
    description: "Get your team productive in minutes with our AI assistant that learns your preferences and automatically configures your workspace, suggests templates, and sets up integrations based on your team's needs. FuseAI analyzes your team size, industry, and project types to create a perfectly tailored setup experience.",
    benefits: [
      "Zero-config team setup in under 5 minutes",
      "AI-curated project templates for your industry",
      "Smart role assignments and permissions",
      "Automated tool integration recommendations"
    ],
    keyFunctionalities: [
      "Industry-specific template suggestions",
      "Automatic team member role detection",
      "Smart integration recommendations",
      "Personalized dashboard configuration",
      "Progressive feature introduction"
    ],
    pillar: "Intelligent Simplicity",
    pillarColor: "teal",
    icon: <Sparkles className="w-5 h-5" />,
    mockupType: 'onboarding',
    demoAvailable: true,
    tags: ["AI", "onboarding", "setup", "templates", "automation"],
    difficulty: 'beginner',
    useCaseExample: {
      title: "Marketing Agency Onboarding",
      scenario: "A 12-person marketing agency switches to FlowFuse to manage client campaigns and internal projects.",
      steps: [
        "Team lead starts onboarding and selects 'Marketing Agency' as company type",
        "FuseAI analyzes team size and suggests campaign management templates",
        "AI automatically assigns roles: Account Managers, Creatives, Project Managers",
        "Integration recommendations appear for existing tools (Google Workspace, Slack, Adobe Creative)",
        "Personalized dashboards are configured for each role type"
      ],
      outcome: "The entire team is productive within 30 minutes, with pre-configured workflows for campaign management, client communication, and resource planning."
    },
    relatedFeatures: ["contextual-tips", "adaptive-interface"],
    videoUrl: "/demo/onboarding-demo.mp4"
  },
  {
    id: "contextual-tips",
    title: "Contextual In-App Guidance",
    summary: "Intelligent tooltips and suggestions that appear exactly when you need them.",
    description: "Never feel lost with intelligent tooltips and suggestions that appear exactly when you need them. Our AI learns your workflow patterns and proactively surfaces relevant features and best practices. The system adapts to your experience level, showing basic guidance for new users and advanced tips for power users.",
    benefits: [
      "Smart feature discovery based on your role",
      "Contextual help that reduces support tickets by 80%",
      "Progressive complexity unveiling",
      "Personalized productivity recommendations"
    ],
    keyFunctionalities: [
      "Context-aware tooltip system",
      "Progressive disclosure of advanced features",
      "Role-based guidance customization",
      "Learning path recommendations",
      "Interactive feature tours"
    ],
    pillar: "Intelligent Simplicity",
    pillarColor: "teal",
    icon: <Target className="w-5 h-5" />,
    mockupType: 'dashboard',
    demoAvailable: true,
    tags: ["help", "guidance", "tooltips", "learning", "productivity"],
    difficulty: 'beginner',
    useCaseExample: {
      title: "New Project Manager Learning Advanced Features",
      scenario: "A project manager familiar with basic task management wants to learn FlowFuse's advanced automation features.",
      steps: [
        "System detects user has been using basic features for 2 weeks",
        "Contextual tip appears suggesting workflow automation when creating repetitive tasks",
        "Interactive guide shows how to set up automated status updates",
        "Tips progressively introduce advanced features like dependency management",
        "Success metrics tracking shows improved productivity"
      ],
      outcome: "The project manager becomes proficient with advanced features 60% faster than traditional training methods."
    },
    relatedFeatures: ["fuseai-onboarding", "visual-workflow-builder"]
  },
  {
    id: "adaptive-interface",
    title: "Adaptive Smart Interface",
    summary: "UI that evolves with your usage patterns, surfacing important features automatically.",
    description: "Experience a UI that evolves with your usage patterns. The most important features surface automatically, while advanced options remain accessible but unobtrusive until you're ready for them. The interface learns from your daily workflows and adapts to show the right tools at the right time.",
    benefits: [
      "Dynamic dashboard that adapts to your priorities",
      "Intelligent quick actions based on context",
      "Reduced cognitive load with smart information hierarchy",
      "Seamless complexity scaling as teams grow"
    ],
    keyFunctionalities: [
      "Dynamic widget prioritization",
      "Context-aware quick actions",
      "Adaptive menu organization",
      "Smart notification grouping",
      "Personalized keyboard shortcuts"
    ],
    pillar: "Intelligent Simplicity",
    pillarColor: "teal",
    icon: <Zap className="w-5 h-5" />,
    mockupType: 'dashboard',
    demoAvailable: false,
    tags: ["interface", "UI", "adaptive", "personalization", "dashboard"],
    difficulty: 'intermediate',
    useCaseExample: {
      title: "Seasonal Campaign Management",
      scenario: "A marketing team's dashboard automatically adapts during peak campaign seasons.",
      steps: [
        "System detects increased activity around campaign launch dates",
        "Dashboard automatically promotes campaign tracking widgets",
        "Quick actions adapt to show 'Create Campaign Brief' and 'Schedule Review'",
        "Less relevant widgets move to secondary positions",
        "Post-campaign, interface shifts focus to analysis and reporting tools"
      ],
      outcome: "Team efficiency increases by 40% during busy periods as the most relevant tools are always at their fingertips."
    },
    relatedFeatures: ["contextual-tips", "smart-notifications"]
  },
  {
    id: "visual-workflow-builder",
    title: "Visual Workflow Designer",
    summary: "Drag-and-drop interface to build custom workflows with pre-built modules.",
    description: "Build custom workflows using our intuitive drag-and-drop interface. Choose from 50+ pre-built modules or create your own custom logic. Workflows automatically adapt to project changes and team dynamics, with real-time optimization suggestions to improve efficiency.",
    benefits: [
      "No-code workflow creation with visual builder",
      "50+ pre-built industry-specific templates",
      "Conditional logic and smart automations",
      "Real-time workflow optimization suggestions"
    ],
    keyFunctionalities: [
      "Visual drag-and-drop builder",
      "Conditional logic branches",
      "Automated trigger system",
      "Template library with 50+ workflows",
      "Real-time performance analytics"
    ],
    pillar: "Adaptive Workflows",
    pillarColor: "coral",
    icon: <div className="w-5 h-5 bg-coral-500 rounded" />,
    mockupType: 'workflow',
    demoAvailable: true,
    tags: ["workflow", "builder", "automation", "templates", "visual"],
    difficulty: 'intermediate',
    useCaseExample: {
      title: "Content Approval Workflow",
      scenario: "A content team needs to streamline their blog post approval process with multiple stakeholders.",
      steps: [
        "Designer drags 'Content Creation' start node onto canvas",
        "Adds conditional branch for content type (blog, social, email)",
        "Sets up parallel approval paths for legal and brand review",
        "Configures automatic notifications and deadline tracking",
        "Tests workflow with sample content piece"
      ],
      outcome: "Content approval time reduced from 5 days to 2 days, with 90% fewer missed deadlines and complete audit trail."
    },
    relatedFeatures: ["self-healing-automation", "context-aware-views"],
    videoUrl: "/demo/workflow-builder.mp4"
  }
];

const pillars = [
  {
    id: "intelligent-simplicity",
    title: "Intelligent Simplicity",
    icon: <IntelligentSimplicityIcon className="w-5 h-5" />,
    color: "teal",
    bgColor: "bg-teal-100",
    borderColor: "border-teal-300",
    textColor: "text-teal-700"
  },
  {
    id: "adaptive-workflows",
    title: "Adaptive Workflows",
    icon: <AdaptiveWorkflowsIcon className="w-5 h-5" />,
    color: "coral",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-300",
    textColor: "text-orange-700"
  },
  {
    id: "seamless-fusion",
    title: "Seamless Fusion",
    icon: <SeamlessFusionIcon className="w-5 h-5" />,
    color: "cyan",
    bgColor: "bg-cyan-100",
    borderColor: "border-cyan-300",
    textColor: "text-cyan-700"
  },
  {
    id: "insightful-collaboration",
    title: "Insightful Collaboration",
    icon: <InsightfulCollaborationIcon className="w-5 h-5" />,
    color: "purple",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-300",
    textColor: "text-purple-700"
  }
];

// Enhanced Visual Mockup Component
function EnhancedVisualMockup({ type, feature }: { type: Feature['mockupType'], feature: Feature }) {
  const baseClasses = "w-full h-full bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6 relative overflow-hidden";
  
  switch (type) {
    case 'onboarding':
      return (
        <div className={baseClasses}>
          {/* Onboarding Steps Visualization */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-semibold">1</div>
                <div>
                  <div className="h-3 bg-gray-800 rounded w-32 mb-1"></div>
                  <div className="h-2 bg-gray-400 rounded w-20"></div>
                </div>
              </div>
              <div className="text-sm text-gray-500">Step 1 of 4</div>
            </div>
            
            {/* AI Suggestions */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-800">AI Recommendations</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <div className="h-2 bg-teal-200 rounded flex-1"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <div className="h-2 bg-teal-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            
            {/* Template Selection */}
            <div className="grid grid-cols-3 gap-3">
              {['Marketing', 'Product', 'Engineering'].map((template, i) => (
                <div key={i} className={`h-20 rounded-lg border-2 p-3 ${i === 0 ? 'border-teal-300 bg-teal-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="w-6 h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="text-xs text-gray-600">{template}</div>
                </div>
              ))}
            </div>
            
            {/* Progress Indicator */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
                ))}
              </div>
              <Button size="sm" className="bg-teal-500 text-white">Continue</Button>
            </div>
          </div>
        </div>
      );
      
    default:
      return (
        <div className={baseClasses}>
          <div className="text-center text-gray-500 h-full flex items-center justify-center">
            <div>
              <div className="w-16 h-16 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <div className="font-medium">{feature.title}</div>
              <div className="text-sm">Feature Preview</div>
            </div>
          </div>
        </div>
      );
  }
}

export function FeaturesPage({ onNavigateHome }: FeaturesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePillars, setActivePillars] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showQuickIndex, setShowQuickIndex] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedFeature) {
        setSelectedFeature(null);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [selectedFeature]);

  // Filter features based on search and filters
  const filteredFeatures = useMemo(() => {
    return allFeatures.filter(feature => {
      const matchesSearch = searchQuery === "" || 
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesPillar = activePillars.length === 0 || 
        activePillars.includes(feature.pillar);
      
      const matchesDifficulty = selectedDifficulty.length === 0 || 
        selectedDifficulty.includes(feature.difficulty);
      
      return matchesSearch && matchesPillar && matchesDifficulty;
    });
  }, [searchQuery, activePillars, selectedDifficulty]);

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    
    const suggestions = new Set<string>();
    allFeatures.forEach(feature => {
      feature.tags.forEach(tag => {
        if (tag.toLowerCase().includes(searchQuery.toLowerCase())) {
          suggestions.add(tag);
        }
      });
      if (feature.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.add(feature.title);
      }
    });
    
    return Array.from(suggestions).slice(0, 5);
  }, [searchQuery]);

  const togglePillar = (pillarTitle: string) => {
    setActivePillars(prev => 
      prev.includes(pillarTitle)
        ? prev.filter(p => p !== pillarTitle)
        : [...prev, pillarTitle]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty(prev => 
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setActivePillars([]);
    setSelectedDifficulty([]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRelatedFeatures = (featureIds: string[] = []) => {
    return allFeatures.filter(feature => featureIds.includes(feature.id));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <section className="pt-20 pb-4 bg-slate-50/30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={onNavigateHome}
              className="flex items-center text-gray-500 hover:text-teal-600 transition-colors"
            >
              <Home className="w-4 h-4" />
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Features</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">Deep Dive</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pt-12 pb-8 bg-gradient-to-b from-slate-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-coral-50 border border-teal-200/50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-800">Complete Feature Catalog</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Features Deep Dive
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore FlowFuse's complete feature set. Find exactly what you need with smart search, 
              filtering, and our organized feature catalog.
            </p>

            {/* Back to Home Button */}
            {onNavigateHome && (
              <div className="pt-4">
                <Button
                  onClick={onNavigateHome}
                  variant="outline"
                  className="border-teal-300 text-teal-700 hover:bg-teal-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search features (e.g., 'AI onboarding', 'Kanban view', 'automation')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 h-12 text-base border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(suggestion)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex flex-wrap items-center gap-4">
              {/* Pillar Filters */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {pillars.map((pillar) => (
                  <button
                    key={pillar.id}
                    onClick={() => togglePillar(pillar.title)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                      activePillars.includes(pillar.title)
                        ? `${pillar.bgColor} ${pillar.borderColor} ${pillar.textColor} shadow-sm`
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pillar.icon}
                    <span className="text-sm font-medium">{pillar.title}</span>
                  </button>
                ))}
              </div>

              {/* Difficulty Filters */}
              <div className="flex gap-2">
                {['beginner', 'intermediate', 'advanced'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => toggleDifficulty(difficulty)}
                    className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                      selectedDifficulty.includes(difficulty)
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>

              {/* Clear Filters */}
              {(searchQuery || activePillars.length > 0 || selectedDifficulty.length > 0) && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQuickIndex(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-teal-600 border border-gray-300 rounded-lg hover:bg-teal-50"
              >
                <Hash className="w-4 h-4" />
                Quick Index
              </button>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(activePillars.length > 0 || selectedDifficulty.length > 0 || searchQuery) && (
            <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-teal-800">
                  <span className="font-medium">Showing {filteredFeatures.length} features</span>
                  {searchQuery && <span> matching "{searchQuery}"</span>}
                  {activePillars.length > 0 && <span> in {activePillars.join(", ")}</span>}
                  {selectedDifficulty.length > 0 && <span> for {selectedDifficulty.join(", ")} users</span>}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Display */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFeatures.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No features found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
              <Button onClick={clearAllFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredFeatures.map((feature) => {
                const pillar = pillars.find(p => p.title === feature.pillar);
                
                if (viewMode === 'list') {
                  return (
                    <div
                      key={feature.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${pillar?.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          {feature.icon}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                                {feature.title}
                              </h3>
                              <p className="text-gray-600 mb-3">{feature.summary}</p>
                              
                              <div className="flex items-center gap-3 mb-3">
                                <Badge variant="outline" className={`${pillar?.textColor} ${pillar?.borderColor}`}>
                                  {feature.pillar}
                                </Badge>
                                <Badge variant="outline" className="text-gray-600">
                                  {feature.difficulty}
                                </Badge>
                                {feature.demoAvailable && (
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    <PlayCircle className="w-3 h-3 mr-1" />
                                    Demo
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <Button
                              onClick={() => setSelectedFeature(feature)}
                              variant="ghost"
                              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 ml-4"
                            >
                              Learn More
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={feature.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group cursor-pointer"
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 ${pillar?.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          {feature.icon}
                        </div>
                        
                        {feature.demoAvailable && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <PlayCircle className="w-3 h-3 mr-1" />
                            Demo
                          </Badge>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.summary}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-xs ${pillar?.textColor} ${pillar?.borderColor}`}>
                            {feature.pillar}
                          </Badge>
                          <Badge variant="outline" className="text-xs text-gray-600">
                            {feature.difficulty}
                          </Badge>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 mx-auto" />
        </button>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-coral-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Start your free trial and see how FlowFuse's intelligent features transform your team's productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-button-500 hover:bg-button-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={onNavigateHome}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white border-white text-teal-700 hover:bg-gray-50 hover:text-teal-800"
              onClick={onNavigateHome}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}