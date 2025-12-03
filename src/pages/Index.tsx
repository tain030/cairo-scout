import { useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { SearchBar } from '@/components/SearchBar';
import { ChainStats } from '@/components/ChainStats';
import { BlocksTable } from '@/components/BlocksTable';
import { TransactionsTable } from '@/components/TransactionsTable';
import { generateBlocks, generateTransactions } from '@/lib/mockData';

const Index = () => {
  const blocks = useMemo(() => generateBlocks(10), []);
  const transactions = useMemo(() => generateTransactions(10), []);

  return (
    <Layout>
      {/* Hero Section - Blockscout Style */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/80 via-accent to-primary/60 py-12 md:py-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Starknet explorer
            </h1>
            
            <div className="max-w-3xl">
              <SearchBar variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-6 relative z-10">
        <ChainStats />
      </section>

      {/* Tables Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-6">
          <BlocksTable blocks={blocks} compact />
          <TransactionsTable transactions={transactions} compact />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
