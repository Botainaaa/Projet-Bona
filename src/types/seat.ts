
// Define common seat category types
export type SeatCategory = 
  | 'lower_level_sideline' 
  | 'lower_level_end' 
  | 'lower_level_corner' 
  | 'club_level' 
  | 'upper_level'
  | 'vip'
  | 'premium'
  | 'standard'
  | 'economy'
  | 'supporters';

// Define the seat section type
export type SeatSection = {
  id: string;
  name: string;
  color: string;
  category: SeatCategory;
  price: number;
  rows: number[];
  seatsPerRow: number;
  available: boolean;
};
