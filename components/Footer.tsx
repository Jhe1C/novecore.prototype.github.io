import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: 'home' | 'features' | 'signup' | 'coming-soon', data?: any) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleComingSoonClick = (title: string, description: string) => {
    onNavigate?.('coming-soon', { title, description });
  };

  const handleContactClick = () => {
    const subject = encodeURIComponent('FlowFuse Inquiry');
    const body = encodeURIComponent('Hello FlowFuse team,\n\nI am interested in learning more about your platform.\n\nBest regards');
    window.open(`mailto:support@flowfuse.com?subject=${subject}&body=${body}`);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold">FlowFuse</span>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Transform chaos into clarity with AI-powered project management that adapts to your team's rhythm.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a 
                  href="mailto:support@flowfuse.com"
                  className="hover:text-white transition-colors"
                  onClick={handleContactClick}
                >
                  support@flowfuse.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <button 
                  onClick={() => handleComingSoonClick('Phone Support', 'Phone support will be available soon. For now, please reach out via email for the fastest response.')}
                  className="hover:text-white transition-colors text-left"
                >
                  +1 (555) 123-4567
                </button>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Product</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => onNavigate?.('features')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Pricing Plans', 'Detailed pricing information and plan comparisons will be available soon. Contact us for early access pricing.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Integration Marketplace', 'Our comprehensive integration marketplace with 200+ tools is coming soon.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Integrations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('API Documentation', 'Developer resources and API documentation will be available soon.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  API
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Security & Compliance', 'Detailed security documentation and compliance certifications will be available soon.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Security
                </button>
              </li>
            </ul>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Solutions</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Project Manager Solutions', 'Specialized tools and workflows designed specifically for project managers.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Project Managers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Marketing Team Solutions', 'Coordinate campaigns and manage content calendars in one unified platform.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Marketing Teams
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Tech Startup Solutions', 'Scale efficiently with startup-focused project management tools.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Startups
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Agency Solutions', 'Manage client projects and track billable hours with specialized agency tools.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Agencies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Enterprise Solutions', 'Large-scale project management with advanced security, compliance, and integration features.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Enterprise
                </button>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => handleComingSoonClick('FlowFuse Blog', 'Industry insights, best practices, and product updates from our team of experts.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Help Center', 'Comprehensive documentation, tutorials, and guides to help you master FlowFuse.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('FlowFuse Community', 'Connect with other users, share best practices, and get support from our community.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Community
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Live Training Webinars', 'Expert-led training sessions to learn advanced features and best practices.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Webinars
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoonClick('Customer Success Stories', 'Real stories from teams who have transformed their productivity with FlowFuse.')}
                  className="text-gray-400 hover:text-white transition-colors block w-full text-left"
                >
                  Case Studies
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex space-x-6">
              <button 
                onClick={() => handleComingSoonClick('FlowFuse on Facebook', 'Follow us on Facebook for updates and community discussions.')}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleComingSoonClick('FlowFuse on Twitter', 'Follow us on Twitter for real-time updates and industry insights.')}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleComingSoonClick('FlowFuse on LinkedIn', 'Connect with us on LinkedIn for professional updates and company news.')}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleComingSoonClick('FlowFuse on GitHub', 'Check out our open-source projects and developer resources.')}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </button>
            </div>
            
            {/* Legal Links */}
            <div className="flex space-x-6">
              <button 
                onClick={() => handleComingSoonClick('Privacy Policy', 'Our comprehensive privacy policy detailing how we protect and handle your data.')}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleComingSoonClick('Terms of Service', 'Terms and conditions for using the FlowFuse platform and services.')}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => handleComingSoonClick('Cookie Policy', 'Information about how we use cookies to improve your experience.')}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Cookies
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2024 FlowFuse. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}