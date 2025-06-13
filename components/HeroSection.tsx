import { Button } from "./ui/button";
import { ArrowRight, Play, Sparkles, Zap, Target, Users } from "lucide-react";
import { FlowVisual } from "./FlowVisual";

interface HeroSectionProps {
  onNavigate?: (page: 'home' | 'features' | 'signup') => void;
  onDemoClick?: () => void;
}

export function HeroSection({ onNavigate, onDemoClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50/30 to-teal-50/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-teal-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200/15 to-purple-200/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-orange-50 border border-teal-200/50 rounded-full">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-800">AI-Powered Project Management</span>
            </div>
            
            {/* Main headline */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Where Teams Find Their
                <span className="block text-teal-600">
                  Perfect Flow
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                FlowFuse transforms chaos into clarity with AI that learns your team's rhythm. 
                Experience project management that actually adapts to how you work.
              </p>
            </div>
            
            {/* Key benefits */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-teal-600" />
                </div>
                <span className="text-gray-700 font-medium">AI-powered automation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-gray-700 font-medium">Adaptive workflows</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-cyan-600" />
                </div>
                <span className="text-gray-700 font-medium">Seamless collaboration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">Intelligent insights</span>
              </div>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={() => onNavigate?.('signup')}
                className="bg-button-500 hover:bg-button-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onDemoClick}
                className="border-teal-300 text-teal-700 hover:bg-teal-50 hover:text-teal-900 hover:border-teal-400 px-8 py-3 group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="pt-8 border-t border-gray-200/50">
              <div className="flex items-center gap-6">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">2,500+</span> teams trust FlowFuse
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Visual */}
          <div className="relative">
            <div className="relative z-10">
              <FlowVisual />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl animate-float opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl animate-float opacity-80" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 -right-8 w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full animate-float opacity-60" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}