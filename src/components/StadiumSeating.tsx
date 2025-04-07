
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Check, X } from 'lucide-react';
import { SeatCategory, SeatSection } from '@/types/seat';
import { useLanguage } from '@/contexts/LanguageContext';

interface StadiumSeatingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectSection: (section: SeatSection) => void;
  selectedSections: SeatSection[];
}

const SECTIONS: SeatSection[] = [
  // North (Lower Level End) - Top 100s
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `${100 + i}`,
    name: `Section ${100 + i}`,
    color: 'bg-pink-500',
    category: 'lower_level_end' as SeatCategory,
    price: 90,
    rows: [1, 2, 3, 4, 5],
    seatsPerRow: 15,
    available: true
  })),
  
  // East (Lower Level Sideline) - 120s-130s
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `${120 + i}`,
    name: `Section ${120 + i}`,
    color: 'bg-pink-500',
    category: 'lower_level_sideline' as SeatCategory,
    price: 120,
    rows: [1, 2, 3, 4, 5],
    seatsPerRow: 18,
    available: i !== 3 && i !== 12 // Make a couple sections unavailable
  })),
  
  // South (Lower Level End) - 140s-150s
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `${140 + i}`,
    name: `Section ${140 + i}`,
    color: 'bg-pink-500',
    category: 'lower_level_end' as SeatCategory,
    price: 90,
    rows: [1, 2, 3, 4, 5],
    seatsPerRow: 15,
    available: i !== 7 && i !== 8 // Make a couple sections unavailable
  })),
  
  // West (Lower Level Sideline) - 160s-170s
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `${160 + i}`,
    name: `Section ${160 + i}`,
    color: 'bg-pink-500',
    category: 'lower_level_sideline' as SeatCategory,
    price: 120,
    rows: [1, 2, 3, 4, 5],
    seatsPerRow: 18,
    available: i !== 5 // Make a couple sections unavailable
  })),
  
  // Corner Sections (Lower Level Corner)
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `C${101 + i}`,
    name: `Corner ${101 + i}`,
    color: 'bg-purple-500',
    category: 'lower_level_corner' as SeatCategory,
    price: 75,
    rows: [1, 2, 3],
    seatsPerRow: 12,
    available: i !== 2 // Make a section unavailable
  })),
  
  // Club Level Sections - 200s
  ...Array.from({ length: 32 }, (_, i) => ({
    id: `${201 + i}`,
    name: `Section ${201 + i}`,
    color: 'bg-blue-500',
    category: 'club_level' as SeatCategory,
    price: 150,
    rows: [1, 2],
    seatsPerRow: 10,
    available: i % 4 !== 0 // Make some sections unavailable
  })),
  
  // Upper Level - 300s
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `${301 + i}`,
    name: `Section ${301 + i}`,
    color: 'bg-teal-500',
    category: 'upper_level' as SeatCategory,
    price: 50,
    rows: [1],
    seatsPerRow: 20,
    available: i % 5 !== 0 // Make some sections unavailable
  })),
];

// Filter system for the sections
const FILTERS = [
  { id: 'lower_level_sideline', name: 'Lower Level - Sideline', color: 'bg-pink-500' },
  { id: 'lower_level_end', name: 'Lower Level - End', color: 'bg-pink-500' },
  { id: 'lower_level_corner', name: 'Lower Level - Corner', color: 'bg-purple-500' },
  { id: 'club_level', name: 'Club Level', color: 'bg-blue-500' },
  { id: 'upper_level', name: 'Upper Level', color: 'bg-teal-500' }
];

const StadiumSeating = ({ open, onOpenChange, onSelectSection, selectedSections }: StadiumSeatingProps) => {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { t } = useLanguage();
  
  const filteredSections = activeFilter 
    ? SECTIONS.filter(section => section.category === activeFilter)
    : SECTIONS;
  
  const handleSectionClick = (section: SeatSection) => {
    if (!section.available) return;
    onSelectSection(section);
  };
  
  const isSectionSelected = (sectionId: string) => {
    return selectedSections.some(section => section.id === sectionId);
  };
  
  const renderSectionElement = (section: SeatSection) => (
    <button
      key={section.id}
      onClick={() => handleSectionClick(section)}
      disabled={!section.available}
      className={`
        transition-all transform
        ${section.color} 
        h-9 w-10 text-center
        ${isSectionSelected(section.id) ? 'ring-2 ring-yellow-400 scale-105' : ''}
        ${!section.available ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'}
        text-xs font-semibold flex items-center justify-center rounded-sm
      `}
      title={`${section.name} - ${section.category.replace(/_/g, ' ').toUpperCase()} - $${section.price}`}
    >
      {section.id}
      {isSectionSelected(section.id) && (
        <span className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
          <Check className="h-3 w-3 text-black" />
        </span>
      )}
    </button>
  );
  
  const content = (
    <div className="py-4">
      <div className="flex justify-center items-center gap-3 mb-6 flex-wrap">
        <p className="text-sm font-medium">{t('seats.filterByZone')}:</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {FILTERS.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium flex items-center
                ${activeFilter === filter.id 
                  ? 'ring-2 ring-offset-2 ring-gray-400 shadow-sm' 
                  : 'opacity-70 hover:opacity-100'}
              `}
            >
              <span className={`${filter.color} h-3 w-3 rounded-full mr-1.5`}></span>
              {filter.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Soccer field with properly positioned sections */}
      <div className="relative mx-auto bg-green-600 rounded-lg mb-8 overflow-hidden" style={{ width: '100%', maxWidth: '500px', height: '300px' }}>
        {/* Field markings */}
        <div className="absolute inset-4 border-2 border-white rounded-lg"></div>
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="w-24 h-24 border-2 border-white rounded-full"></div>
        </div>
        <div className="absolute w-full h-full flex items-center justify-between px-8">
          <div className="w-16 h-40 border-2 border-white"></div>
          <div className="w-16 h-40 border-2 border-white"></div>
        </div>
        
        {/* Center line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-1/2"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-xs px-2 py-0.5 rounded-full font-medium">FIELD</div>
        
        {/* North sections (top) */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 grid grid-cols-8 gap-0.5">
          {filteredSections
            .filter(section => parseInt(section.id) >= 100 && parseInt(section.id) <= 115)
            .map(renderSectionElement)}
        </div>
        
        {/* South sections (bottom) */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 grid grid-cols-8 gap-0.5">
          {filteredSections
            .filter(section => parseInt(section.id) >= 140 && parseInt(section.id) <= 155)
            .map(renderSectionElement)}
        </div>
        
        {/* East sections (right) */}
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 grid grid-cols-2 gap-0.5">
          {filteredSections
            .filter(section => parseInt(section.id) >= 120 && parseInt(section.id) <= 135)
            .map(renderSectionElement)}
        </div>
        
        {/* West sections (left) */}
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 grid grid-cols-2 gap-0.5">
          {filteredSections
            .filter(section => parseInt(section.id) >= 160 && parseInt(section.id) <= 175)
            .map(renderSectionElement)}
        </div>
        
        {/* Corner sections (top-left) */}
        <div className="absolute top-12 left-12">
          <div className="grid grid-cols-2 gap-0.5">
            {filteredSections
              .filter(section => section.id.startsWith('C') && parseInt(section.id.slice(1)) <= 102)
              .map(renderSectionElement)}
          </div>
        </div>
        
        {/* Corner sections (top-right) */}
        <div className="absolute top-12 right-12">
          <div className="grid grid-cols-2 gap-0.5">
            {filteredSections
              .filter(section => section.id.startsWith('C') && parseInt(section.id.slice(1)) >= 103 && parseInt(section.id.slice(1)) <= 104)
              .map(renderSectionElement)}
          </div>
        </div>
        
        {/* Corner sections (bottom-left) */}
        <div className="absolute bottom-12 left-12">
          <div className="grid grid-cols-2 gap-0.5">
            {filteredSections
              .filter(section => section.id.startsWith('C') && parseInt(section.id.slice(1)) >= 105 && parseInt(section.id.slice(1)) <= 106)
              .map(renderSectionElement)}
          </div>
        </div>
        
        {/* Corner sections (bottom-right) */}
        <div className="absolute bottom-12 right-12">
          <div className="grid grid-cols-2 gap-0.5">
            {filteredSections
              .filter(section => section.id.startsWith('C') && parseInt(section.id.slice(1)) >= 107)
              .map(renderSectionElement)}
          </div>
        </div>
      </div>
      
      {/* Club Level sections - Top row */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-center mb-2">{t('seats.clubLevel')}</h3>
        <div className="grid grid-cols-8 gap-1 max-w-lg mx-auto">
          {filteredSections
            .filter(section => parseInt(section.id) >= 201 && parseInt(section.id) <= 216)
            .map(renderSectionElement)}
        </div>
      </div>
      
      {/* Upper Level sections - Bottom rows */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-center mb-2">{t('seats.upperLevel')}</h3>
        <div className="grid grid-cols-10 gap-1 max-w-xl mx-auto">
          {filteredSections
            .filter(section => parseInt(section.id) >= 301 && parseInt(section.id) <= 330)
            .map(renderSectionElement)}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 flex-wrap">
        {FILTERS.map(category => (
          <div key={category.id} className="flex items-center gap-1.5">
            <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
            <span className="text-xs font-medium">{category.name}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-gray-300"></div>
          <span className="text-xs font-medium">{t('seats.unavailable')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-white border-2 border-yellow-400"></div>
          <span className="text-xs font-medium">{t('seats.selected')}</span>
        </div>
      </div>
    </div>
  );
  
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('seats.selectSection')}</DrawerTitle>
          </DrawerHeader>
          {content}
          <DrawerFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.close')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{t('seats.selectSection')}</DialogTitle>
          <DialogDescription>
            {t('seats.choosePreferredSection')}
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('common.close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StadiumSeating;
