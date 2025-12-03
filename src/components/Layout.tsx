import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Mobile header with sidebar trigger */}
          <header className="md:hidden sticky top-0 z-40 flex items-center h-14 px-4 border-b border-border bg-background/80 backdrop-blur-xl">
            <SidebarTrigger />
            <span className="ml-3 text-lg font-bold">
              <span className="text-gradient">Cairo</span>
              <span className="text-foreground"> Scout</span>
            </span>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};
