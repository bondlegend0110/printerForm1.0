import React, { createContext, useContext, useState, ReactNode } from 'react';

type STLContextType = {
  stlFile: File | null;
  setStlFile: (file: File | null) => void;
};

const STLContext = createContext<STLContextType | undefined>(undefined);

export const STLProvider = ({ children }: { children: ReactNode }) => {
  const [stlFile, setStlFile] = useState<File | null>(null);

  return (
    <STLContext.Provider value={{ stlFile, setStlFile }}>
      {children}
    </STLContext.Provider>
  );
};

export const useSTLContext = () => {
  const context = useContext(STLContext);
  if (!context) {
    throw new Error("useSTLContext must be used within an STLProvider");
  }
  return context;
};
