import { Compass, Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Compass className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">
              <span className="text-gradient">Cairo</span>
              <span className="text-foreground"> Scout</span>
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Starknet Blockchain Explorer • Built with ❤️
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Github"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
