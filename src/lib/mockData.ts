// Mock data for Cairo Scout blockchain explorer

export interface Block {
  height: number;
  hash: string;
  timestamp: number;
  txCount: number;
  gasUsed: string;
  gasLimit: string;
  sequencer: string;
}

export interface Transaction {
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasUsed: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: number;
  type: string;
}

export interface Account {
  address: string;
  balance: string;
  txCount: number;
  contractType?: string;
}

export interface ChainStats {
  latestBlock: number;
  tps: number;
  txLast24h: number;
  gasPrice: string;
  totalAccounts: number;
  totalContracts: number;
}

// Generate random hex string
const randomHex = (length: number): string => {
  const chars = '0123456789abcdef';
  let result = '0x';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

// Generate mock blocks
export const generateBlocks = (count: number, startHeight: number = 847523): Block[] => {
  const blocks: Block[] = [];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    blocks.push({
      height: startHeight - i,
      hash: randomHex(64),
      timestamp: now - i * 12000, // ~12 seconds per block
      txCount: Math.floor(Math.random() * 150) + 10,
      gasUsed: (Math.floor(Math.random() * 15000000) + 5000000).toLocaleString(),
      gasLimit: '30000000',
      sequencer: randomHex(40),
    });
  }
  
  return blocks;
};

// Generate mock transactions
export const generateTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = Date.now();
  const types = ['INVOKE', 'DEPLOY', 'DECLARE', 'L1_HANDLER'];
  const statuses: ('success' | 'failed' | 'pending')[] = ['success', 'success', 'success', 'success', 'failed', 'pending'];
  
  for (let i = 0; i < count; i++) {
    transactions.push({
      hash: randomHex(64),
      blockNumber: 847523 - Math.floor(i / 5),
      from: randomHex(40),
      to: randomHex(40),
      value: (Math.random() * 100).toFixed(4) + ' ETH',
      gasPrice: (Math.random() * 50 + 10).toFixed(2) + ' gwei',
      gasUsed: Math.floor(Math.random() * 500000 + 21000).toLocaleString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: now - i * 3000,
      type: types[Math.floor(Math.random() * types.length)],
    });
  }
  
  return transactions;
};

// Generate mock account
export const generateAccount = (address: string): Account => ({
  address,
  balance: (Math.random() * 1000).toFixed(4) + ' ETH',
  txCount: Math.floor(Math.random() * 500) + 1,
  contractType: Math.random() > 0.5 ? 'Account' : undefined,
});

// Chain stats
export const chainStats: ChainStats = {
  latestBlock: 847523,
  tps: 14.7,
  txLast24h: 1247893,
  gasPrice: '23.5 gwei',
  totalAccounts: 2847523,
  totalContracts: 156789,
};

// Format helpers
export const truncateHash = (hash: string, start: number = 6, end: number = 4): string => {
  if (hash.length <= start + end + 2) return hash;
  return `${hash.slice(0, start + 2)}...${hash.slice(-end)}`;
};

export const formatTimestamp = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
  return num.toLocaleString();
};

// Detect search type - supports block height, block hash, tx hash, and address
export const detectSearchType = (query: string): 'block' | 'transaction' | 'address' | 'unknown' => {
  const trimmed = query.trim().toLowerCase();
  
  // Block height (number only)
  if (/^\d+$/.test(trimmed)) return 'block';
  
  // Hash with 0x prefix and 64 hex chars - could be block hash or tx hash
  // For simplicity, we'll treat 64-char hashes as transaction hashes
  // Block hashes in Starknet are also 64 chars, so we'll add a helper
  if (/^0x[a-f0-9]{64}$/.test(trimmed)) return 'transaction';
  
  // Address (40-63 chars with 0x prefix) - Starknet addresses can vary
  if (/^0x[a-f0-9]{40,63}$/.test(trimmed)) return 'address';
  
  return 'unknown';
};

// Additional helper to detect if a hash could be a block hash
export const isValidHash = (query: string): boolean => {
  const trimmed = query.trim().toLowerCase();
  return /^0x[a-f0-9]{64}$/.test(trimmed);
};
