import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { ArrowRightLeft, Clock, Hash, Box, Fuel, User, ArrowLeft, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { generateTransactions, formatTimestamp, truncateHash } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StatusBadge = ({ status }: { status: 'success' | 'failed' | 'pending' }) => {
  const config = {
    success: { icon: CheckCircle2, label: 'Success', className: 'bg-success/20 text-success border-success/30' },
    failed: { icon: XCircle, label: 'Failed', className: 'bg-destructive/20 text-destructive border-destructive/30' },
    pending: { icon: Loader2, label: 'Pending', className: 'bg-warning/20 text-warning border-warning/30' },
  };
  const { icon: Icon, label, className } = config[status];
  
  return (
    <Badge variant="outline" className={className}>
      <Icon className={`h-3 w-3 mr-1 ${status === 'pending' ? 'animate-spin' : ''}`} />
      {label}
    </Badge>
  );
};

const TransactionDetail = () => {
  const { txHash } = useParams();
  
  const tx = useMemo(() => {
    const transactions = generateTransactions(1);
    return { ...transactions[0], hash: txHash || transactions[0].hash };
  }, [txHash]);

  const details = [
    { label: 'Transaction Hash', value: tx.hash, icon: Hash, mono: true },
    { label: 'Status', value: tx.status, icon: CheckCircle2, isStatus: true },
    { label: 'Block', value: `#${tx.blockNumber.toLocaleString()}`, icon: Box, link: `/block/${tx.blockNumber}` },
    { label: 'Timestamp', value: new Date(tx.timestamp).toLocaleString(), icon: Clock },
    { label: 'Type', value: tx.type, icon: ArrowRightLeft },
    { label: 'From', value: tx.from, icon: User, mono: true, link: `/address/${tx.from}` },
    { label: 'To', value: tx.to, icon: User, mono: true, link: `/address/${tx.to}` },
    { label: 'Value', value: tx.value, icon: ArrowRightLeft },
    { label: 'Gas Price', value: tx.gasPrice, icon: Fuel },
    { label: 'Gas Used', value: tx.gasUsed, icon: Fuel },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-6 w-6 text-starknet-purple" />
              <h1 className="text-2xl font-bold text-foreground">Transaction Details</h1>
            </div>
            <p className="text-muted-foreground text-sm font-mono">{truncateHash(tx.hash, 16, 16)}</p>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-card border border-border rounded-xl p-6 card-shadow animate-fade-in">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Overview</h2>
          <div className="grid gap-4">
            {details.map((detail) => (
              <div key={detail.label} className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-2 sm:w-48">
                  <detail.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{detail.label}</span>
                </div>
                <div className="flex-1">
                  {detail.isStatus ? (
                    <StatusBadge status={detail.value as 'success' | 'failed' | 'pending'} />
                  ) : detail.link ? (
                    <Link 
                      to={detail.link} 
                      className={`text-sm text-primary hover:underline ${detail.mono ? 'font-mono break-all' : ''}`}
                    >
                      {detail.mono ? truncateHash(detail.value, 16, 16) : detail.value}
                    </Link>
                  ) : (
                    <span className={`text-sm text-foreground ${detail.mono ? 'font-mono break-all' : ''}`}>
                      {detail.mono ? truncateHash(detail.value, 16, 16) : detail.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionDetail;
