import { Link } from 'react-router-dom';
import { Box, Clock, ArrowRight } from 'lucide-react';
import { Block, truncateHash, formatTimestamp } from '@/lib/mockData';
import { Button } from '@/components/ui/button';

interface BlocksTableProps {
  blocks: Block[];
  showViewAll?: boolean;
  compact?: boolean;
}

export const BlocksTable = ({ blocks, showViewAll = true, compact = false }: BlocksTableProps) => {
  const displayBlocks = compact ? blocks.slice(0, 6) : blocks;

  return (
    <div className="bg-card border border-border rounded-xl card-shadow animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Box className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Latest Blocks</h3>
        </div>
        {showViewAll && (
          <Link to="/blocks">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
      
      <div className="divide-y divide-border">
        {displayBlocks.map((block, index) => (
          <div
            key={block.height}
            className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Box className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Link 
                  to={`/block/${block.height}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  #{block.height.toLocaleString()}
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimestamp(block.timestamp)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-foreground">{block.txCount} txns</p>
              <p className="text-xs text-muted-foreground font-mono">
                {truncateHash(block.hash)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
