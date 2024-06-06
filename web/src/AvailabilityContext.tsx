import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AvailabilityContextType {
  availability: { date: string; time: string }[];
  setAvailability: React.Dispatch<React.SetStateAction<{ date: string; time: string }[]>>;
}

const AvailabilityContext = createContext<AvailabilityContextType | undefined>(undefined);

export const AvailabilityProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [availability, setAvailability] = useState<{ date: string; time: string }[]>([]);

  return (
    <AvailabilityContext.Provider value={{ availability, setAvailability }}>
      {children}
    </AvailabilityContext.Provider>
  );
};

export const useAvailability = () => {
  const context = useContext(AvailabilityContext);
  if (!context) {
    throw new Error('useAvailability must be used within an AvailabilityProvider');
  }
  return context;
};