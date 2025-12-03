import { Box, Activity, Fuel, Users, FileCode, TrendingUp } from 'lucide-react';
import { chainStats, formatNumber } from '@/lib/mockData';

const stats = [
  {
    label: 'Latest Block',
    value: formatNumber(chainStats.latestBlock),
    icon: Box,
    color: 'text-primary',
  },
  {
    label: 'TPS',
    value: chainStats.tps.toFixed(1),
    icon: Activity,
    color: 'text-starknet-cyan',
  },
  {
    label: 'Txns (24h)',
    value: formatNumber(chainStats.txLast24h),
    icon: TrendingUp,
    color: 'text-starknet-purple',
  },
  {
    label: 'Gas Price',
    value: chainStats.gasPrice,
    icon: Fuel,
    color: 'text-warning',
  },
  {
    label: 'Total Accounts',
    value: formatNumber(chainStats.totalAccounts),
    icon: Users,
    color: 'text-success',
  },
  {
    label: 'Contracts',
    value: formatNumber(chainStats.totalContracts),
    icon: FileCode,
    color: 'text-starknet-blue',
  },
];

export const ChainStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-4 card-shadow hover:border-primary/30 transition-colors animate-fade-in"
        >
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
