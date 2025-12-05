import { Compass, Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Compass className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">
              <span className="text-gradient">Cairo</span>
              <span className="text-foreground"> Scout</span>
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            Starknet Blockchain Explorer • Built with ❤️
          </p>
          
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Github"
            >
              <Github className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
