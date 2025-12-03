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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              <span className="text-gradient">Cairo</span>
              <span className="text-foreground"> Scout</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Starknet Blockchain Explorer
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            <SearchBar variant="hero" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
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
