import React, { createContext, useContext, useState } from 'react';


interface UserTypeContextType {
  isProfessional: boolean;
  setIsProfessional: React.Dispatch<React.SetStateAction<boolean>>;
  isHomeowner: boolean;
  setIsHomeowner: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a context
const UserTypeContext = createContext<UserTypeContextType>({
  isProfessional: false,
  setIsProfessional: () => {},
  isHomeowner: false,
  setIsHomeowner: () => {},
});
// Create a provider component
const UserTypeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isProfessional, setIsProfessional] = useState(false);
  const [isHomeowner, setIsHomeowner] = useState(false);

  return (
    <UserTypeContext.Provider value={{ isProfessional, setIsProfessional, isHomeowner, setIsHomeowner }}>
      {children}
    </UserTypeContext.Provider>
  );
};

// Create a custom hook to use the context
const useUserType = (): UserTypeContextType => {
  return useContext(UserTypeContext);
};

export { UserTypeProvider, useUserType };
