import { Trophy } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Background image for desktop */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      ></div>
      
      {/* Background image for mobile */}
      <div 
        className="md:hidden absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200')"
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center md:text-left">
          <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl max-w-2xl mx-auto md:mx-0 animate-fade-in-up">
            <div className="text-red-600 font-semibold text-sm mb-4 uppercase tracking-wide flex items-center justify-center md:justify-start">
              <Trophy className="mr-2 h-4 w-4" />
              Sports Scholarship 2025
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Engineering Excellence.
              <br />
              <span className="text-blue-600">Global Impact.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Leading India's engineering consultancy with 60+ years of expertise, delivering world-class solutions across petrochemicals, infrastructure, and industrial projects globally.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 shadow-lg transition-colors">
                Learn More
              </button>
              <button className="w-full sm:w-auto border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                View Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}