import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { FourPillars } from "./components/FourPillars";
import { SocialProof } from "./components/SocialProof";
import { IntegrationsTeaser } from "./components/IntegrationsTeaser";
import { Footer } from "./components/Footer";
import { FeaturesPage } from "./components/FeaturesPage";
import { SignUpPage } from "./components/SignUpPage";
import { ComingSoonPage } from "./components/ComingSoonPage";
import { useEffect, useState } from "react";

type Page = 'home' | 'features' | 'signup' | 'coming-soon';

interface ComingSoonData {
  title: string;
  description: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [comingSoonData, setComingSoonData] = useState<ComingSoonData | null>(null);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simple hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'features') {
        setCurrentPage('features');
      } else if (hash === 'signup') {
        setCurrentPage('signup');
      } else {
        setCurrentPage('home');
      }
    };

    // Check initial hash
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: Page, data?: any) => {
    if (page === 'coming-soon' && data) {
      setComingSoonData(data);
      setCurrentPage('coming-soon');
    } else {
      setCurrentPage(page);
      if (page !== 'home') {
        window.location.hash = page;
      } else {
        window.location.hash = '';
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => {
    setCurrentPage('home');
    setComingSoonData(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle demo button clicks
  const handleDemoClick = () => {
    navigateToPage('coming-soon', {
      title: 'Interactive Demo',
      description: 'Our interactive product demo is currently being prepared. Experience the full power of FlowFuse with guided walkthroughs, sample data, and hands-on exploration of all features.'
    });
  };

  // Handle integration button clicks
  const handleIntegrationClick = () => {
    navigateToPage('coming-soon', {
      title: 'Integration Marketplace',
      description: 'Our comprehensive integration marketplace is coming soon. Connect FlowFuse with 200+ tools including Slack, Google Workspace, Microsoft 365, and many more.'
    });
  };
  
  // Coming Soon Page
  if (currentPage === 'coming-soon' && comingSoonData) {
    return (
      <ComingSoonPage
        title={comingSoonData.title}
        description={comingSoonData.description}
        onNavigateHome={navigateHome}
      />
    );
  }
  
  // Sign Up Page - no navigation or footer
  if (currentPage === 'signup') {
    return (
      <div>
        <SignUpPage />
        {/* Back to home option for better UX */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={navigateHome}
            className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-white transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>
      </div>
    );
  }
  
  // Features Page
  if (currentPage === 'features') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPage={currentPage} onNavigate={navigateToPage} />
        <FeaturesPage onNavigateHome={navigateHome} />
        <Footer onNavigate={navigateToPage} />
      </div>
    );
  }
  
  // Home Page
  return (
    <div className="min-h-screen bg-white">
      {/* Global Navigation */}
      <Navigation currentPage={currentPage} onNavigate={navigateToPage} />
      
      {/* Hero Section with parallax effect */}
      <div 
        className="relative"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <HeroSection onNavigate={navigateToPage} onDemoClick={handleDemoClick} />
      </div>
      
      {/* Main content sections */}
      <div className="relative z-10 bg-white">
        {/* Four Pillars Section */}
        <section id="features">
          <FourPillars />
        </section>
        
        {/* AI Benefits Section */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                AI That Actually <span className="text-teal-600">Gets Work Done</span>
              </h2>
              <p className="text-xl text-gray-600">
                FlowFuse doesn't just organize your projects—it anticipates needs, automates workflows, and helps your team achieve more with less effort.
              </p>
            </div>
            
            {/* AI capabilities showcase */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Predictive Planning</h3>
                <p className="text-gray-600">AI analyzes your team's patterns to suggest optimal project timelines and resource allocation before bottlenecks occur.</p>
              </div>
              
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Automation</h3>
                <p className="text-gray-600">Workflows that evolve with your projects, automatically adjusting to changes while maintaining team alignment.</p>
              </div>
              
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Intelligent Insights</h3>
                <p className="text-gray-600">Real-time analytics and performance insights that turn data into actionable decisions for continuous improvement.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Social Proof Section */}
        <SocialProof />
        
        {/* Integrations Teaser Section */}
        <section id="integrations">
          <IntegrationsTeaser onIntegrationClick={handleIntegrationClick} />
        </section>
        
        {/* Final CTA Section */}
        <section id="pricing" className="py-24 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Team's Productivity?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Join thousands of teams already using FlowFuse to work smarter, not harder.
            </p>
            
            {/* Pricing preview */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-white mb-2">Start Free</div>
                  <div className="text-teal-100">14-day trial • No credit card required</div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-teal-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Unlimited projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>AI-powered insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>All integrations</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigateToPage('signup')}
                className="px-8 py-4 bg-button-500 hover:bg-button-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                Start Your Free Trial
                <svg className="inline ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={handleDemoClick}
                className="px-8 py-4 bg-white border-2 border-white text-teal-700 hover:bg-gray-50 hover:text-teal-800 font-semibold rounded-lg transition-all duration-300 group"
              >
                <svg className="inline mr-2 w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 015 0H17" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Schedule a Demo
              </button>
            </div>
          </div>
        </section>
      </div>
      
      {/* Global Footer */}
      <Footer onNavigate={navigateToPage} />
    </div>
  );
}