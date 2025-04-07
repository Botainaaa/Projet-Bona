
import { useState } from 'react';
import { Calendar, MapPin, Ticket, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  id: string;
  title: string;
  date: string;
  venue: string;
  image?: string;
  team1: {
    name: string;
    flag: string;
  };
  team2: {
    name: string;
    flag: string;
  };
  ticketsAvailable: number;
  isPopular?: boolean;
}

const GameCard = ({
  id,
  title,
  date,
  venue,
  team1,
  team2,
  ticketsAvailable,
  isPopular = false,
}: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleBuyTickets = () => {
    navigate('/seat-selection', {
      state: {
        gameData: {
          id,
          title,
          date: formattedDate,
          venue,
          team1,
          team2,
        }
      }
    });
  };

  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Game Match Card - Top section */}
      <div className="relative bg-morocco-red p-6">
        {isPopular && (
          <div className="absolute -top-2 -left-10 z-10 bg-red-600 text-white py-1 px-8 uppercase text-sm font-bold transform rotate-[-45deg]">
            Popular
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-white">
              <img 
                src={team1.flag} 
                alt={team1.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="text-white text-2xl font-bold">VS</div>
          
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-white">
              <img 
                src={team2.flag} 
                alt={team2.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Game Details - Bottom section */}
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar size={18} className="mr-2 text-gray-500" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2 text-gray-500" />
            <span>{venue}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-700">Available</span>
          </div>
          <span className="text-red-600 font-bold">
            {ticketsAvailable} Left!
          </span>
        </div>
      </div>
      
      {/* Overlay on hover - similar to destination cards */}
      <div className="absolute inset-0 bg-morocco-red/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button 
          onClick={handleBuyTickets}
          className="px-5 py-2.5 bg-white text-morocco-red rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center"
        >
          <span>Buy Tickets</span>
          <Ticket size={16} className="ml-1.5" />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
