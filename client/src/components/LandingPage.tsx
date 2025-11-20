import React, { useState, useEffect } from "react";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900">
      {/* NAVBAR */}
      <nav className="w-full py-4 px-8 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-blue-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            NextCRM
          </h1>
        </div>
        <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg font-medium">
          Login
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="px-8 md:px-16 lg:px-24 py-20 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* TEXT CONTENT */}
        <div className={`flex-1 transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            ✨ Trusted by 10,000+ teams worldwide
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Smart CRM for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Modern Teams
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
            Manage leads, automate workflows, track activities, and scale your sales process 
            with a powerful all-in-one CRM platform designed for growth-focused teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
              Get Started Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 rounded-xl text-lg font-medium border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center">
              Watch Demo
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </button>
          </div>
          <div className="mt-8 flex items-center text-sm text-gray-500">
            <div className="flex -space-x-2 mr-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 bg-blue-200 rounded-full border-2 border-white"></div>
              ))}
            </div>
            Join 10,000+ sales professionals already growing with NextCRM
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className={`flex-1 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <div className="relative">
            <div className="w-full h-80 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-blue-100 p-6">
              {/* Mock dashboard elements */}
              <div className="flex space-x-4 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-4 bg-blue-200 rounded-full"></div>
                <div className="h-4 bg-blue-100 rounded-full"></div>
                <div className="h-4 bg-blue-200 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                  <div className="text-sm opacity-90">Leads This Month</div>
                  <div className="text-2xl font-bold mt-2">248</div>
                </div>
                <div className="h-32 bg-white rounded-xl p-4 border border-blue-100">
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                  <div className="text-2xl font-bold mt-2 text-green-600">42%</div>
                </div>
              </div>
            </div>
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl rotate-12 opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400 rounded-full opacity-20"></div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-8 md:px-16 lg:px-24 py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            🚀 Powerful Features
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Everything You Need to Grow</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your sales process with intuitive tools designed to save time and boost productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "👥",
              title: "Lead Management",
              description: "Track leads, assign tasks, and manage the full lifecycle from prospect to conversion with intelligent automation.",
              color: "from-blue-500 to-blue-600"
            },
            {
              icon: "📊",
              title: "Activity Timeline",
              description: "View every interaction—calls, emails, meetings—on a real-time dashboard with smart notifications.",
              color: "from-green-500 to-green-600"
            },
            {
              icon: "🧠",
              title: "Team Insights",
              description: "Monitor team performance with advanced analytics and actionable insights for continuous improvement.",
              color: "from-purple-500 to-purple-600"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <div className="mt-6 text-blue-600 font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-8 md:px-16 lg:px-24 py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-3xl mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Sales Process?</h3>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of teams who have boosted their revenue with NextCRM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-transparent text-white rounded-xl text-lg font-medium border border-white/30 hover:bg-white/10 transform hover:scale-105 transition-all duration-200">
              Schedule a Demo
            </button>
          </div>
          <p className="mt-6 text-blue-200 text-sm">
            No credit card required • Free 14-day trial • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-600 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"></div>
              <span className="font-bold text-gray-800">NextCRM</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Terms</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Contact</a>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} NextCRM — All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}