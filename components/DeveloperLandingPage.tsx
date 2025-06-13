import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Code, 
  DollarSign, 
  Shield, 
  ShieldCheck, 
  Lock, 
  Users, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  CheckCircle,
  Star,
  Download,
  Globe,
  Heart
} from 'lucide-react';

interface DeveloperLandingPageProps {
  onNavigate: (page: string) => void;
}

export function DeveloperLandingPage({ onNavigate }: DeveloperLandingPageProps) {
  const [selectedTier, setSelectedTier] = useState('indie');

  const pricingTiers = [
    {
      id: 'indie',
      name: 'Indie Developer',
      price: 'Free',
      description: 'Perfect for individual developers and small teams',
      features: [
        'Publish up to 3 games',
        'Basic analytics dashboard',
        'Community support',
        'Standard revenue share (30/70)',
        'Basic DRM protection'
      ],
      color: 'text-[var(--accent-green)]',
      bgColor: 'bg-[var(--accent-green)]/10',
      borderColor: 'border-[var(--accent-green)]'
    },
    {
      id: 'studio',
      name: 'Studio',
      price: '$99/month',
      description: 'For growing studios with multiple titles',
      features: [
        'Unlimited game publishing',
        'Advanced analytics & insights',
        'Priority support',
        'Reduced revenue share (25/75)',
        'Enhanced DRM & security',
        'Early access to new features'
      ],
      color: 'text-[var(--accent-blue)]',
      bgColor: 'bg-[var(--accent-blue)]/10',
      borderColor: 'border-[var(--accent-blue)]'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'Enterprise solutions for AAA publishers',
      features: [
        'White-label solutions',
        'Custom integrations',
        'Dedicated account manager',
        'Negotiable revenue terms',
        'Advanced security features',
        'SLA guarantees'
      ],
      color: 'text-[var(--accent-purple)]',
      bgColor: 'bg-[var(--accent-purple)]/10',
      borderColor: 'border-[var(--accent-purple)]'
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'NovaDRM™ Protection',
      description: 'Advanced anti-piracy technology that adapts to threats in real-time.',
      color: 'text-[var(--accent-blue)]'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights into player behavior, sales, and engagement.',
      color: 'text-[var(--accent-green)]'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Global Distribution',
      description: 'Reach millions of gamers worldwide with our powerful distribution network.',
      color: 'text-[var(--accent-purple)]'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Fair Revenue Share',
      description: 'Industry-leading revenue splits that grow with your success.',
      color: 'text-[var(--accent-orange)]'
    }
  ];

  const stats = [
    { value: '10M+', label: 'Active Users', icon: <Users className="w-6 h-6" /> },
    { value: '$500M+', label: 'Developer Revenue', icon: <DollarSign className="w-6 h-6" /> },
    { value: '15K+', label: 'Games Published', icon: <Code className="w-6 h-6" /> },
    { value: '99.9%', label: 'Uptime SLA', icon: <Shield className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-[var(--accent-blue)]/10 rounded-xl flex items-center justify-center cosmic-glow">
              <Code className="w-8 h-8 text-[var(--accent-blue)]" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-[var(--text-primary)] mb-6">
            Built for Developers
          </h1>
          
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto">
            Join thousands of developers who trust NovaCore to distribute their games. 
            Our platform provides everything you need to succeed in the modern gaming market.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="vanguard-btn-primary">
              Start Publishing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="vanguard-btn-secondary">
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="text-[var(--accent-blue)]">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-[var(--text-primary)]">
                    {stat.value}
                  </div>
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            Why Choose NovaCore?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            We provide the tools, technology, and support you need to focus on what matters most: creating amazing games.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="vanguard-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className={`flex items-center justify-center w-16 h-16 rounded-xl mb-4 mx-auto ${feature.color} bg-current/10`}>
                <div className={feature.color}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {feature.title}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* DRM Technology Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[var(--accent-blue)]/10 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[var(--accent-blue)]" />
                </div>
                <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                  NovaDRM™ Technology
                </h2>
              </div>
              
              <p className="text-lg text-[var(--text-secondary)] mb-6">
                Our proprietary DRM solution provides industry-leading protection while maintaining 
                excellent performance and user experience.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-green)] mt-1" />
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">Real-time Threat Detection</div>
                    <div className="text-sm text-[var(--text-secondary)]">AI-powered system that adapts to new piracy methods</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-green)] mt-1" />
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">Minimal Performance Impact</div>
                    <div className="text-sm text-[var(--text-secondary)]">Less than 2% overhead on game performance</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-green)] mt-1" />
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">Seamless Integration</div>
                    <div className="text-sm text-[var(--text-secondary)]">One-click implementation with popular game engines</div>
                  </div>
                </div>
              </div>

              <Button className="vanguard-btn-primary">
                Learn More About NovaDRM™
              </Button>
            </div>

            <div className="relative">
              <Card className="vanguard-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Protection Status</span>
                    <Badge className="modern-badge-green">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Threat Prevention</span>
                      <span className="text-[var(--text-primary)]">99.8%</span>
                    </div>
                    <Progress value={99.8} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Performance Impact</span>
                      <span className="text-[var(--text-primary)]">1.2%</span>
                    </div>
                    <Progress value={1.2} className="h-2" />
                  </div>
                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <div className="text-xs text-[var(--text-muted)]">
                      Last scan: 2 minutes ago • 0 threats detected
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Flexible pricing that scales with your success. Start free and upgrade as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`vanguard-card p-8 relative ${
                selectedTier === tier.id ? `${tier.borderColor} border-2` : ''
              } hover:transform hover:scale-105 transition-all duration-300`}
            >
              {tier.id === 'studio' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="modern-badge-blue">Most Popular</Badge>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  {tier.name}
                </h3>
                <div className={`text-3xl font-bold ${tier.color} mb-2`}>
                  {tier.price}
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-[var(--accent-green)] mt-1 flex-shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={selectedTier === tier.id ? 'vanguard-btn-primary w-full' : 'vanguard-btn-secondary w-full'}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Developer Resources */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            Developer Resources
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Everything you need to integrate and succeed on our platform.
          </p>
        </div>

        <Tabs defaultValue="sdk" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sdk">SDK & Tools</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sdk" className="mt-8">
            <Card className="vanguard-card p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                    Development Tools
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <Download className="w-4 h-4 text-[var(--accent-blue)]" />
                      <span className="text-[var(--text-secondary)]">Unity SDK v3.2.1</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Download className="w-4 h-4 text-[var(--accent-blue)]" />
                      <span className="text-[var(--text-secondary)]">Unreal Engine Plugin v2.8.0</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Download className="w-4 h-4 text-[var(--accent-blue)]" />
                      <span className="text-[var(--text-secondary)]">Steam Integration Toolkit</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                    Testing Tools
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <Shield className="w-4 h-4 text-[var(--accent-green)]" />
                      <span className="text-[var(--text-secondary)]">DRM Testing Suite</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <TrendingUp className="w-4 h-4 text-[var(--accent-purple)]" />
                      <span className="text-[var(--text-secondary)]">Analytics Debugger</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-[var(--accent-orange)]" />
                      <span className="text-[var(--text-secondary)]">Localization Validator</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="mt-8">
            <Card className="vanguard-card p-8">
              <div className="text-center">
                <Code className="w-16 h-16 text-[var(--accent-blue)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Comprehensive Documentation
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Step-by-step guides, API references, and best practices to help you integrate quickly.
                </p>
                <Button className="vanguard-btn-primary">
                  Browse Documentation
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="mt-8">
            <Card className="vanguard-card p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <Users className="w-12 h-12 text-[var(--accent-green)] mx-auto mb-4" />
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">Developer Support</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Get help from our technical team
                  </p>
                </div>
                <div className="text-center">
                  <Heart className="w-12 h-12 text-[var(--accent-purple)] mx-auto mb-4" />
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">Success Management</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Dedicated support for growing studios
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="mt-8">
            <Card className="vanguard-card p-8">
              <div className="text-center">
                <Users className="w-16 h-16 text-[var(--accent-purple)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Join Our Developer Community
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Connect with other developers, share experiences, and get community support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="vanguard-btn-primary">
                    Join Discord Server
                  </Button>
                  <Button variant="outline" className="vanguard-btn-secondary">
                    Developer Forums
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="vanguard-card p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Launch Your Game?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Join thousands of successful developers who have chosen NovaCore as their publishing platform. 
            Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="vanguard-btn-primary">
              Create Developer Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="vanguard-btn-secondary">
              Schedule a Demo
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}