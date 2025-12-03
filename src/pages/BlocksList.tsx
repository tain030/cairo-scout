import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Box, ArrowLeft } from 'lucide-react';
import { generateBlocks } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { BlocksTable } from '@/components/BlocksTable';

const BlocksList = () => {
  const blocks = useMemo(() => generateBlocks(20), []);

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
              <h1 className="text-2xl font-bold text-foreground">Blocks</h1>
            </div>
            <p className="text-muted-foreground text-sm">Latest blocks on the network</p>
          </div>
        </div>

        <BlocksTable blocks={blocks} showViewAll={false} />
      </div>
    </Layout>
  );
};

export default BlocksList;
