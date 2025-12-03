import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ArrowRightLeft, ArrowLeft } from 'lucide-react';
import { generateTransactions } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { TransactionsTable } from '@/components/TransactionsTable';

const TransactionsList = () => {
  const transactions = useMemo(() => generateTransactions(20), []);

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
              <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
            </div>
            <p className="text-muted-foreground text-sm">Latest transactions on the network</p>
          </div>
        </div>

        <TransactionsTable transactions={transactions} showViewAll={false} />
      </div>
    </Layout>
  );
};

export default TransactionsList;
