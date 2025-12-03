import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Hotel, hotels } from '@/data/mockData';

interface HotelContextType {
  selectedHotel: Hotel | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  allHotels: Hotel[];
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  return (
    <HotelContext.Provider value={{ selectedHotel, setSelectedHotel, allHotels: hotels }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
