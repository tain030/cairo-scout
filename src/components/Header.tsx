import { Link } from 'react-router-dom';
import { Compass, Box, ArrowRightLeft, Menu, X } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Compass className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-gradient">Cairo</span>
              <span className="text-foreground"> Scout</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Home
              </Button>
            </Link>
            <Link to="/blocks">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Box className="h-4 w-4 mr-1" />
                Blocks
              </Button>
            </Link>
            <Link to="/txs">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowRightLeft className="h-4 w-4 mr-1" />
                Transactions
              </Button>
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden lg:block w-96">
            <SearchBar variant="compact" />
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2 mb-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Home</Button>
              </Link>
              <Link to="/blocks" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <Box className="h-4 w-4 mr-2" />
                  Blocks
                </Button>
              </Link>
              <Link to="/txs" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Transactions
                </Button>
              </Link>
            </nav>
            <SearchBar variant="compact" />
          </div>
        )}
      </div>
    </header>
  );
};
