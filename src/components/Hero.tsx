
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1539020140153-e479b8c64e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-transparent" />
      
      {/* Content */}
      <div className="relative z-20 pt-28 px-4 md:px-8 max-w-7xl mx-auto flex flex-col h-screen">
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          <div className="inline-block animate-slide-down" style={{ animationDelay: '0.1s' }}>
            <span className="bg-morocco-red text-white text-xs md:text-sm py-1 px-3 rounded-full uppercase tracking-wider font-medium">
              Coming to Morocco 2025
            </span>
          </div>
          
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-slide-down" style={{ animationDelay: '0.2s' }}>
            Experience the <span className="text-morocco-red">Thrill</span> of Moroccan Games
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed animate-slide-down" style={{ animationDelay: '0.3s' }}>
            Secure your tickets for the most exciting sporting events, cultural performances, and entertainment experiences across Morocco.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-slide-down" style={{ animationDelay: '0.4s' }}>
            <a 
              href="#featured-games" 
              className="bg-morocco-red hover:bg-[#a11c20] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-center"
            >
              <span>Explore Games</span>
              <ArrowRight size={18} />
            </a>
            
            <a 
              href="#destinations" 
              className="border-2 border-white text-white hover:bg-white hover:text-morocco-red px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2 text-center"
            >
              <span>Discover Destinations</span>
            </a>
          </div>
        </div>
        
        {/* Stats */}
        <div className="pb-12 flex flex-wrap gap-8 md:gap-12 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          {[
            { label: 'Events', value: '50+' },
            { label: 'Locations', value: '12' },
            { label: 'Happy Customers', value: '10K+' },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-morocco-red text-3xl md:text-4xl font-bold">{stat.value}</span>
              <span className="text-white text-sm md:text-base">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
