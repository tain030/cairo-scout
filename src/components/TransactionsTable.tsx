import { Link } from 'react-router-dom';
import { ArrowRightLeft, Clock, ArrowRight, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Transaction, truncateHash, formatTimestamp } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TransactionsTableProps {
  transactions: Transaction[];
  showViewAll?: boolean;
  compact?: boolean;
}

const StatusIcon = ({ status }: { status: Transaction['status'] }) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-destructive" />;
    case 'pending':
      return <Loader2 className="h-4 w-4 text-warning animate-spin" />;
  }
};

export const TransactionsTable = ({ transactions, showViewAll = true, compact = false }: TransactionsTableProps) => {
  const displayTxs = compact ? transactions.slice(0, 6) : transactions;

  return (
    <div className="bg-card border border-border rounded-xl card-shadow animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-starknet-purple" />
          <h3 className="font-semibold text-foreground">Latest Transactions</h3>
        </div>
        {showViewAll && (
          <Link to="/txs">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
      
      <div className="divide-y divide-border">
        {displayTxs.map((tx, index) => (
          <div
            key={tx.hash}
            className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-starknet-purple/10 flex items-center justify-center">
                <StatusIcon status={tx.status} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Link 
                    to={`/tx/${tx.hash}`}
                    className="font-mono text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {truncateHash(tx.hash, 8, 6)}
                  </Link>
                  <Badge variant="outline" className="text-xs">
                    {tx.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimestamp(tx.timestamp)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm">
                <span className="text-muted-foreground">From </span>
                <Link to={`/address/${tx.from}`} className="font-mono text-primary hover:underline">
                  {truncateHash(tx.from, 4, 4)}
                </Link>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">To </span>
                <Link to={`/address/${tx.to}`} className="font-mono text-primary hover:underline">
                  {truncateHash(tx.to, 4, 4)}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
