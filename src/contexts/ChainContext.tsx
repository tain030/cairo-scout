import { createContext, useContext, useState, ReactNode } from 'react';

export type ChainType = 'Starknet' | 'Kakarot' | 'Madara';
export type NetworkType = 'Mainnet' | 'Testnet';

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
