import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className={`flex items-center gap-2 ${isHero ? 'flex-col sm:flex-row' : ''}`}>
        <div className="relative flex-1 w-full">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${isHero ? 'h-5 w-5' : 'h-4 w-4'}`} />
          <Input
            type="text"
            placeholder="Search by Block / Tx Hash / Address"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`pl-12 font-mono ${
              isHero 
                ? 'h-14 text-base bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20 rounded-xl' 
                : 'h-10 text-sm bg-secondary border-border'
            }`}
          />
        </div>
        <Button 
          type="submit" 
          className={`${
            isHero 
              ? 'h-14 px-8 bg-gradient-accent hover:opacity-90 font-semibold w-full sm:w-auto rounded-xl' 
              : 'h-10 px-4'
          }`}
        >
          Search
        </Button>
      </div>
    </form>
  );
};
