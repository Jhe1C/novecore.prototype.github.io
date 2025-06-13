import { Button } from "./ui/button";
import { ArrowLeft, Clock, Mail, Bell } from "lucide-react";

interface ComingSoonPageProps {
  title: string;
  description: string;
  onNavigateHome: () => void;
  expectedDate?: string;
  notifyFeature?: boolean;
}

export function ComingSoonPage({ 
  title, 
  description, 
  onNavigateHome, 
  expectedDate = "Q2 2024",
  notifyFeature = true 
}: ComingSoonPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-200/15 to-cyan-200/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-2xl text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
          </div>
          <span className="text-2xl font-bold text-gray-900">FlowFuse</span>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 md:p-12">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-teal-600" />
          </div>

          {/* Main Content */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Expected Date */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-orange-50 border border-teal-200/50 rounded-full mb-8">
            <Bell className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-800">Expected launch: {expectedDate}</span>
          </div>

          {/* Notify Feature */}
          {notifyFeature && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Be the first to know!
              </h3>
              <p className="text-gray-600 mb-4">
                Get notified when this feature becomes available.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <Button className="bg-button-500 hover:bg-button-600 text-white px-6">
                  <Mail className="w-4 h-4 mr-2" />
                  Notify Me
                </Button>
              </div>
            </div>
          )}

          {/* Back Button */}
          <Button
            onClick={onNavigateHome}
            variant="outline"
            className="border-teal-300 text-teal-700 hover:bg-teal-50 px-8 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Questions? Contact us at{' '}
            <a href="mailto:support@flowfuse.com" className="text-teal-600 hover:text-teal-700 underline">
              support@flowfuse.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}