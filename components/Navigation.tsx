import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: 'home' | 'features' | 'signup' | 'coming-soon', data?: any) => void;
}

export function Navigation({ currentPage = 'home', onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleNavClick = (page: 'home' | 'features' | 'signup' | 'coming-soon', data?: any) => {
    if (onNavigate) {
      onNavigate(page, data);
    }
    closeDropdowns();
    setIsMenuOpen(false);
  };

  const handleComingSoonClick = (title: string, description: string) => {
    handleNavClick('coming-soon', { title, description });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                FlowFuse
              </span>
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick('home')}
                className={`transition-colors font-medium relative group ${
                  currentPage === 'home' ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                Home
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-teal-600 transition-all duration-300 ${
                  currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
              
              <button 
                onClick={() => handleNavClick('features')}
                className={`transition-colors font-medium relative group ${
                  currentPage === 'features' ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                Features
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-teal-600 transition-all duration-300 ${
                  currentPage === 'features' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
              
              <div className="relative">
                <button 
                  className="flex items-center text-gray-700 hover:text-teal-600 transition-colors font-medium group"
                  onClick={() => handleDropdownToggle('solutions')}
                >
                  Solutions
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'solutions' ? 'rotate-180' : ''
                  }`} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
                </button>
                
                {activeDropdown === 'solutions' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 mb-2">
                      By Role
                    </div>
                    <button 
                      onClick={() => handleComingSoonClick('Project Manager Solutions', 'Specialized tools and workflows designed specifically for project managers to streamline complex projects and team coordination.')}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-medium">Project Managers</div>
                      <div className="text-sm text-gray-500">Streamline complex projects</div>
                    </button>
                    <button 
                      onClick={() => handleComingSoonClick('Operations Team Solutions', 'Optimize daily workflows and operational processes with AI-powered automation and intelligent resource management.')}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-medium">Operations Teams</div>
                      <div className="text-sm text-gray-500">Optimize daily workflows</div>
                    </button>
                    <button 
                      onClick={() => handleComingSoonClick('Marketing Team Solutions', 'Coordinate campaigns, manage content calendars, and track marketing performance across all channels in one unified platform.')}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-medium">Marketing Teams</div>
                      <div className="text-sm text-gray-500">Coordinate campaigns</div>
                    </button>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t border-gray-100 mt-2 pt-4">
                      By Industry
                    </div>
                    <button 
                      onClick={() => handleComingSoonClick('Tech Startup Solutions', 'Scale efficiently with startup-focused project management tools, investor reporting, and agile development workflows.')}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-medium">Tech Startups</div>
                      <div className="text-sm text-gray-500">Scale efficiently</div>
                    </button>
                    <button 
                      onClick={() => handleComingSoonClick('Agency Solutions', 'Manage client projects, track billable hours, and maintain client relationships with specialized agency tools.')}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-medium">Agencies</div>
                      <div className="text-sm text-gray-500">Manage client projects</div>
                    </button>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => handleComingSoonClick('Pricing Plans', 'Detailed pricing information and plan comparisons will be available soon. Contact us for early access pricing.')}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              
              <div className="relative">
                <button 
                  className="flex items-center text-gray-700 hover:text-teal-600 transition-colors font-medium group"
                  onClick={() => handleDropdownToggle('resources')}
                >
                  Resources
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'resources' ? 'rotate-180' : ''
                  }`} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
                </button>
                
                {activeDropdown === 'resources' && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                    <button 
                      onClick={() => handleComingSoonClick('FlowFuse Blog', 'Industry insights, best practices, and product updates from our team of project management experts.')}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-medium">Blog</div>
                      <div className="text-sm text-gray-500">Latest insights & tips</div>
                    </button>
                    <button 
                      onClick={() => handleComingSoonClick('Help Center', 'Comprehensive documentation, video tutorials, and step-by-step guides to help you master FlowFuse.')}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-medium">Help Center</div>
                      <div className="text-sm text-gray-500">Documentation & guides</div>
                    </button>
                    <button 
                      onClick={() => handleComingSoonClick('API Documentation', 'Developer resources, API references, and integration guides for building custom FlowFuse solutions.')}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-medium">API Docs</div>
                      <div className="text-sm text-gray-500">Developer resources</div>
                    </button>
                    <button 
                      onClick={() => handleComingSoonClick('FlowFuse Community', 'Connect with other FlowFuse users, share best practices, and get support from our community.')}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-medium">Community</div>
                      <div className="text-sm text-gray-500">Connect with users</div>
                    </button>
                    <button 
                      onClick={() => handleComingSoonClick('Live Training Webinars', 'Join our expert-led training sessions to learn advanced FlowFuse features and best practices.')}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-medium">Webinars</div>
                      <div className="text-sm text-gray-500">Live training sessions</div>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-teal-600 hover:bg-teal-50 font-medium"
                onClick={() => handleComingSoonClick('User Login', 'The login functionality is currently in development. Early access users will receive login credentials soon.')}
              >
                Log In
              </Button>
              
              <Button 
                onClick={() => handleNavClick('signup')}
                className="bg-button-500 hover:bg-button-600 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <button 
                onClick={() => handleNavClick('home')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors font-medium ${
                  currentPage === 'home' 
                    ? 'text-teal-600 bg-teal-50' 
                    : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('features')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors font-medium ${
                  currentPage === 'features' 
                    ? 'text-teal-600 bg-teal-50' 
                    : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                }`}
              >
                Features
              </button>
              
              {/* Mobile Solutions dropdown */}
              <div className="px-3 py-2">
                <div className="text-gray-700 font-medium mb-2">Solutions</div>
                <div className="pl-4 space-y-1">
                  <button 
                    onClick={() => handleComingSoonClick('Project Manager Solutions', 'Specialized tools and workflows designed specifically for project managers.')}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-teal-600"
                  >
                    Project Managers
                  </button>
                  <button 
                    onClick={() => handleComingSoonClick('Operations Team Solutions', 'Optimize daily workflows and operational processes with AI-powered automation.')}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-teal-600"
                  >
                    Operations Teams
                  </button>
                  <button 
                    onClick={() => handleComingSoonClick('Marketing Team Solutions', 'Coordinate campaigns and manage content calendars in one unified platform.')}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-teal-600"
                  >
                    Marketing Teams
                  </button>
                  <button 
                    onClick={() => handleComingSoonClick('Tech Startup Solutions', 'Scale efficiently with startup-focused project management tools.')}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-teal-600"
                  >
                    Tech Startups
                  </button>
                  <button 
                    onClick={() => handleComingSoonClick('Agency Solutions', 'Manage client projects and track billable hours with specialized agency tools.')}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-teal-600"
                  >
                    Agencies
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => handleComingSoonClick('Pricing Plans', 'Detailed pricing information will be available soon.')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors font-medium"
              >
                Pricing
              </button>
              
              {/* Mobile Resources dropdown */}
              <div className="px-3 py-2">
                <div className="text-gray-700 font-medium mb-2">Resources</div>
                <div className="pl-4 space-y-1">
                  <button 
                    onClick={() => handleComingSoonClick('FlowFuse Blog', 'Industry insights and best practices from our team.')}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-teal-600"
                  >
                    Blog
                  </button>
                  <button 
                    onClick={() => handleComingSoonClick('Help Center', 'Comprehensive documentation and tutorials.')}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-teal-600"
                  >
                    Help Center
                  </button>
                  <button 
                    onClick={() => handleComingSoonClick('API Documentation', 'Developer resources and integration guides.')}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-teal-600"
                  >
                    API Docs
                  </button>
                  <button 
                    onClick={() => handleComingSoonClick('FlowFuse Community', 'Connect with other users and get support.')}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-teal-600"
                  >
                    Community
                  </button>
                  <button 
                    onClick={() => handleComingSoonClick('Live Training Webinars', 'Expert-led training sessions and best practices.')}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-teal-600"
                  >
                    Webinars
                  </button>
                </div>
              </div>
              
              <div className="pt-4 pb-2 border-t border-gray-200 space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 hover:text-teal-600 font-medium"
                  onClick={() => handleComingSoonClick('User Login', 'The login functionality is currently in development.')}
                >
                  Log In
                </Button>
                <Button 
                  onClick={() => handleNavClick('signup')}
                  className="w-full bg-button-500 hover:bg-button-600 text-white font-medium"
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay for dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeDropdowns}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}