import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { User, Wallet, ArrowRightLeft, ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { generateAccount, generateTransactions, truncateHash } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { TransactionsTable } from '@/components/TransactionsTable';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

const AddressDetail = () => {
  const { address } = useParams();
  const [copied, setCopied] = useState(false);
  
  const account = useMemo(() => generateAccount(address || '0x0'), [address]);
  const transactions = useMemo(() => generateTransactions(10), []);

  const copyAddress = () => {
    navigator.clipboard.writeText(account.address);
    setCopied(true);
    toast({ title: 'Copied!', description: 'Address copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <User className="h-6 w-6 text-success" />
              <h1 className="text-2xl font-bold text-foreground">Address</h1>
              {account.contractType && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  {account.contractType}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-muted-foreground text-sm font-mono truncate">{truncateHash(account.address, 20, 20)}</p>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyAddress}>
                {copied ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 card-shadow animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Balance</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{account.balance}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 card-shadow animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-starknet-purple/10 flex items-center justify-center">
                <ArrowRightLeft className="h-5 w-5 text-starknet-purple" />
              </div>
              <span className="text-sm text-muted-foreground">Transactions</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{account.txCount.toLocaleString()}</p>
          </div>
        </div>

        {/* Transactions */}
        <TransactionsTable transactions={transactions} showViewAll={false} />
      </div>
    </Layout>
  );
};

export default AddressDetail;
