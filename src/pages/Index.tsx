
import Hero from '@/components/Hero';
import GamesList from '@/components/GamesList';
import Services from '@/components/Services';
import { ArrowRight, MapPin, Building, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';

const DestinationCard = ({ 
  id,
  title, 
  image, 
  category, 
  location, 
  icon: Icon 
}: { 
  id: number;
  title: string;
  image: string;
  category: string;
  location: string;
  icon: any;
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg w-fit mb-3">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className="text-white/90 text-sm mb-2">{category}</span>
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-center text-white/80 text-sm">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>
      </div>
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-morocco-red/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Link 
          to={`/destinations/${id}`} 
          className="px-5 py-2.5 bg-white text-morocco-red rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center"
        >
          <span>{t('destinations.viewDetails')}</span>
          <ArrowRight size={16} className="ml-1.5" />
        </Link>
      </div>
    </div>
  );
};

const destinations = [
  {
    id: 1,
    title: "Jamaa el-Fna Square",
    image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3474&q=80",
    category: "Tourist Attraction",
    location: "Marrakech",
    icon: MapPin
  },
  {
    id: 2,
    title: "Royal Mansour Marrakech",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3425&q=80",
    category: "Accommodation",
    location: "Marrakech",
    icon: Building
  },
  {
    id: 3,
    title: "Mohammed V Stadium",
    image: "https://images.unsplash.com/photo-1521731978332-9e9e714bdd20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3473&q=80",
    category: "Event Venue",
    location: "Casablanca",
    icon: Ticket
  }
];

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Games Section */}
      <GamesList />
      
      {/* Destinations Preview Section */}
      <section id="destinations" className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              {t('destinations.popularDestinations')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
              {t('destinations.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DestinationCard {...destination} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link 
              to="/destinations" 
              className="inline-flex items-center bg-morocco-red hover:bg-opacity-90 transition-colors text-white px-6 py-3 rounded-full font-medium shadow-md"
            >
              <span>{t('destinations.exploreAll')}</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <Services />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
