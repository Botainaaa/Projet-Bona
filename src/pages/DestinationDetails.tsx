
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Globe, 
  Navigation, 
  Clock, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDestinationById, getNearbyAttractions, Destination } from '@/services/destinationService';
import { Button } from '@/components/ui/button';

const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [nearbyAttractions, setNearbyAttractions] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    if (id) {
      const destinationId = parseInt(id);
      const fetchedDestination = getDestinationById(destinationId);
      
      if (fetchedDestination) {
        setDestination(fetchedDestination);
        setNearbyAttractions(getNearbyAttractions(destinationId));
      }
      
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-morocco-red"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Destination not found</h2>
          <p className="text-gray-600 mb-8">The destination you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/destinations" 
            className="inline-flex items-center text-morocco-red hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('destinationDetails.backToDestinations')}
          </Link>
        </div>
      </div>
    );
  }

  const { 
    title, 
    image, 
    category, 
    location, 
    longDescription, 
    features, 
    website, 
    rating, 
    reviewsCount 
  } = destination;

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Link 
            to="/destinations" 
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('destinationDetails.backToDestinations')}
          </Link>
        </div>
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-3 py-1 bg-morocco-red text-white text-sm font-medium rounded-full mb-3">
              {category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{title}</h1>
            <div className="flex items-center text-white/90 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
              
              {rating && (
                <div className="flex items-center ml-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">
                    {rating} ({reviewsCount} {t('destinationDetails.reviewsCount')})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('destinationDetails.aboutDestination')}
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {longDescription}
                </p>
                
                {features && features.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {t('destinationDetails.features')}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-morocco-red mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {nearbyAttractions && nearbyAttractions.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {t('destinationDetails.nearbyAttractions')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {nearbyAttractions.map((nearby) => {
                        const distance = destination.nearbyAttractions?.find(
                          attr => attr.id === nearby.id
                        )?.distance;
                        
                        return (
                          <Link 
                            key={nearby.id}
                            to={`/destinations/${nearby.id}`}
                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-morocco-red hover:bg-red-50 transition-colors group"
                          >
                            <img 
                              src={nearby.image} 
                              alt={nearby.title} 
                              className="w-16 h-16 object-cover rounded-md mr-3"
                            />
                            <div className="flex-grow">
                              <h4 className="font-medium text-gray-900 group-hover:text-morocco-red transition-colors">
                                {nearby.title}
                              </h4>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" />
                                {distance && (
                                  <span className="text-gray-500">{distance}</span>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-morocco-red transition-colors" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('destinationDetails.overview')}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-morocco-red mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-700">{t('destinationDetails.location')}</h4>
                      <p className="text-gray-600">{location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-morocco-red mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-700">{t('destinationDetails.category')}</h4>
                      <p className="text-gray-600">{category}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  {website && (
                    <a 
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full bg-morocco-red text-white py-2.5 px-4 rounded-full hover:bg-opacity-90 transition-colors"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      {t('destinationDetails.visitWebsite')}
                    </a>
                  )}
                  
                  <Button
                    variant="outline"
                    className="flex items-center justify-center w-full"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    {t('destinationDetails.getDirections')}
                  </Button>
                </div>
              </div>
              
              {/* Reviews Summary */}
              {rating && (
                <div className="mt-6 bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('destinationDetails.reviews')}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {reviewsCount} {t('destinationDetails.reviewsCount')}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-bold">{rating.toFixed(1)}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="flex items-center justify-center w-full"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    {t('destinationDetails.writeReview')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
