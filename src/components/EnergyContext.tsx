// EnergyContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type EnergyContextType = {
  algoStatus: string;
  setAlgoStatus: (status: string) => void;
};

const EnergyContext = createContext<EnergyContextType | undefined>(undefined);

export const EnergyProvider = ({ children }: { children: ReactNode }) => {
  const [algoStatus, setAlgoStatus] = useState("");

  return (
    <EnergyContext.Provider value={{ algoStatus, setAlgoStatus }}>
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergyContext = () => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error("useEnergyContext must be used within an EnergyProvider");
  }
  return context;
};
