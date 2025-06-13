import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

interface Recognition {
  name: string;
  logo: string;
  category: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "FlowFuse transformed how our distributed team collaborates. The AI insights helped us identify bottlenecks we didn't even know existed, boosting our delivery speed by 40%.",
    author: "Sarah Chen",
    role: "VP of Product",
    company: "TechFlow Solutions",
    avatar: "SC",
    rating: 5
  },
  {
    quote: "Finally, a project management tool that actually gets smarter as we use it. The adaptive workflows have eliminated so much manual overhead – our team can focus on what matters most.",
    author: "Marcus Rodriguez",
    role: "Operations Director",
    company: "InnovateLab",
    avatar: "MR",
    rating: 5
  },
  {
    quote: "The seamless integration with our existing tools was a game-changer. FlowFuse became our single source of truth without disrupting our established workflows.",
    author: "Emma Thompson",
    role: "Engineering Manager",
    company: "CloudScale Inc",
    avatar: "ET",
    rating: 5
  }
];

const recognitions: Recognition[] = [
  {
    name: "TechCrunch",
    logo: "TC",
    category: "Featured Startup 2024"
  },
  {
    name: "ProductHunt",
    logo: "PH",
    category: "#1 Product of the Day"
  },
  {
    name: "G2",
    logo: "G2",
    category: "High Performer"
  },
  {
    name: "Capterra",
    logo: "CP",
    category: "Rising Star"
  },
  {
    name: "SaaS Awards",
    logo: "SA",
    category: "Best AI Innovation"
  }
];

export function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTest = testimonials[currentTestimonial];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-100/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-coral-100/30 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-coral-50 border border-teal-200/50 rounded-full mb-6">
            <Star className="w-4 h-4 text-coral-500 fill-current" />
            <span className="text-sm font-medium text-teal-800">Trusted by Innovation Leaders</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Innovative Teams
            <span className="block text-teal-600">Like Yours</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of teams who've transformed their productivity with FlowFuse's intelligent approach to project management.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Testimonial carousel */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 relative">
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(currentTest.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-coral-500 fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg text-gray-700 mb-8 leading-relaxed">
                "{currentTest.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-coral-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {currentTest.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{currentTest.author}</div>
                  <div className="text-gray-600">{currentTest.role}</div>
                  <div className="text-sm text-teal-600 font-medium">{currentTest.company}</div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-teal-600" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonial(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-teal-500 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-colors group"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-teal-600" />
              </button>
            </div>
          </div>
          
          {/* Recognition badges */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Recognized by Industry Leaders
              </h3>
              <p className="text-gray-600 mb-8">
                FlowFuse has been featured and awarded by top technology publications and review platforms.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {recognitions.map((recognition, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center font-bold text-gray-700 group-hover:from-teal-100 group-hover:to-teal-200 group-hover:text-teal-700 transition-colors">
                      {recognition.logo}
                    </div>
                    <div className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                      {recognition.name}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {recognition.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}