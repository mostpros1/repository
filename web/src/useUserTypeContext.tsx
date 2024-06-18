import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserTypeContext = createContext();
// Create a provider component
const UserTypeProvider = ({ children }) => {
  const [isProfessional, setIsProfessional] = useState(false);
  const [isHomeowner, setIsHomeowner] = useState(false);

  return (
    <UserTypeContext.Provider value={{ isProfessional, setIsProfessional, isHomeowner, setIsHomeowner }}>
      {children}
    </UserTypeContext.Provider>
  );
};

// Create a custom hook to use the context
const useUserType = () => {
  return useContext(UserTypeContext);
};

export { UserTypeProvider, useUserType };
