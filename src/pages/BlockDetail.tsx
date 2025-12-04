import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { Box, Clock, Hash, Layers, Fuel, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { generateBlocks, generateTransactions, formatTimestamp, truncateHash } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { TransactionsTable } from '@/components/TransactionsTable';
import { CopyButton } from '@/components/CopyButton';
import { useChain } from '@/contexts/ChainContext';

const BlockDetail = () => {
  const { blockId } = useParams();
  const { selectedChain, selectedNetwork } = useChain();
  const blockHeight = parseInt(blockId || '847523');
  
  const block = useMemo(() => {
    const blocks = generateBlocks(1, selectedChain, selectedNetwork);
    return { ...blocks[0], height: blockHeight };
  }, [blockHeight, selectedChain, selectedNetwork]);
  
  const transactions = useMemo(() => generateTransactions(block.txCount, selectedChain, selectedNetwork).slice(0, 10), [block.txCount, selectedChain, selectedNetwork]);

  const details = [
    { label: 'Block Height', value: `#${block.height.toLocaleString()}`, icon: Box },
    { label: 'Block Hash', value: block.hash, icon: Hash, mono: true },
    { label: 'Timestamp', value: new Date(block.timestamp).toLocaleString(), icon: Clock },
    { label: 'Transactions', value: block.txCount.toString(), icon: Layers },
    { label: 'Gas Used', value: block.gasUsed, icon: Fuel },
    { label: 'Gas Limit', value: block.gasLimit, icon: Fuel },
    { label: 'Sequencer', value: block.sequencer, icon: User, mono: true },
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
              <Box className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Block #{blockHeight.toLocaleString()}</h1>
            </div>
            <p className="text-muted-foreground text-sm">{formatTimestamp(block.timestamp)}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 mb-6">
          <Link to={`/block/${blockHeight - 1}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          </Link>
          <Link to={`/block/${blockHeight + 1}`}>
            <Button variant="outline" size="sm">
              Next
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Details Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8 card-shadow animate-fade-in">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Overview</h2>
          <div className="grid gap-4">
            {details.map((detail) => (
              <div key={detail.label} className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-2 sm:w-48">
                  <detail.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{detail.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm text-foreground ${detail.mono ? 'font-mono break-all' : ''}`}>
                    {detail.mono ? truncateHash(detail.value, 20, 20) : detail.value}
                  </span>
                  {detail.mono && <CopyButton text={detail.value} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <TransactionsTable transactions={transactions} showViewAll={false} />
      </div>
    </Layout>
  );
};

export default BlockDetail;
