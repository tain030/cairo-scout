import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { detectSearchType } from '@/lib/mockData';
import { toast } from '@/hooks/use-toast';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  className?: string;
}

export const SearchBar = ({ variant = 'compact', className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: 'Empty search',
        description: 'Please enter a block number, transaction hash, or address.',
        variant: 'destructive',
      });
      return;
    }

    const type = detectSearchType(query.trim());
    
    switch (type) {
      case 'block':
        navigate(`/block/${query.trim()}`);
        break;
      case 'transaction':
        navigate(`/tx/${query.trim()}`);
        break;
      case 'address':
        navigate(`/address/${query.trim()}`);
        break;
      default:
        toast({
          title: 'Invalid input',
          description: 'Could not recognize input. Enter a valid block number, tx hash, or address.',
          variant: 'destructive',
        });
    }
    
    setQuery('');
  };

  const isHero = variant === 'hero';

  if (isHero) {
    return (
      <form onSubmit={handleSearch} className={className}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by address / txn hash / block / token..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-16 text-base bg-card/90 backdrop-blur-sm border-0 rounded-xl font-mono placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-white/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground/50">
            <kbd className="px-2 py-1 text-xs bg-muted/50 rounded border border-border/50">/</kbd>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 pl-10 pr-4 text-sm bg-secondary border-border font-mono"
        />
      </div>
    </form>
  );
};
