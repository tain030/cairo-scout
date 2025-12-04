import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type ChainType = 'Starknet' | 'Kakarot' | 'Madara';
export type NetworkType = 'Mainnet' | 'Testnet';

const chainThemeMap: Record<ChainType, string> = {
  Starknet: 'theme-starknet',
  Kakarot: 'theme-kakarot',
  Madara: 'theme-madara',
};

interface ChainContextType {
  selectedChain: ChainType;
  selectedNetwork: NetworkType;
  setSelectedChain: (chain: ChainType) => void;
  setSelectedNetwork: (network: NetworkType) => void;
}

const ChainContext = createContext<ChainContextType | undefined>(undefined);

export const ChainProvider = ({ children }: { children: ReactNode }) => {
  const [selectedChain, setSelectedChain] = useState<ChainType>('Starknet');
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('Mainnet');

  // Apply theme class to document root when chain changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    Object.values(chainThemeMap).forEach(theme => {
      root.classList.remove(theme);
    });
    
    // Add current chain's theme class
    root.classList.add(chainThemeMap[selectedChain]);
  }, [selectedChain]);

  return (
    <ChainContext.Provider value={{ selectedChain, selectedNetwork, setSelectedChain, setSelectedNetwork }}>
      {children}
    </ChainContext.Provider>
  );
};

export const useChain = () => {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error('useChain must be used within a ChainProvider');
  }
  return context;
};
