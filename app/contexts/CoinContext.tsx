'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CoinContextType {
  coins: number;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => void;
  hasEnoughCoins: (amount: number) => boolean;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export function CoinProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState(0);

  // Load coins from localStorage on mount
  useEffect(() => {
    const storedCoins = localStorage.getItem('coins');
    if (storedCoins) {
      setCoins(parseInt(storedCoins, 10));
    }
  }, []);

  // Save coins to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins]);

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  const deductCoins = (amount: number) => {
    setCoins((prev) => Math.max(0, prev - amount));
  };

  const hasEnoughCoins = (amount: number) => {
    return coins >= amount;
  };

  return (
    <CoinContext.Provider value={{ coins, addCoins, deductCoins, hasEnoughCoins }}>
      {children}
    </CoinContext.Provider>
  );
}

export function useCoins() {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error('useCoins must be used within a CoinProvider');
  }
  return context;
}

