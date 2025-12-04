import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Box, 
  ArrowRightLeft, 
  Home,
  Layers,
  ChevronDown,
  Globe,
  TestTube,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const chains = [
  { name: 'Starknet', icon: '⚡' },
  { name: 'Kakarot', icon: '🐸' },
  { name: 'Madara', icon: '🔴' },
];

const networks = [
  { name: 'Mainnet', icon: Globe },
  { name: 'Testnet (Sepolia)', icon: TestTube },
];

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const [selectedChain, setSelectedChain] = useState('Starknet');
  const [selectedNetwork, setSelectedNetwork] = useState('Mainnet');
  const [chainsOpen, setChainsOpen] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === 'collapsed';

  const navItems = [
    { title: 'Home', url: '/', icon: Home },
    { title: 'Blocks', url: '/blocks', icon: Box },
    { title: 'Transactions', url: '/txs', icon: ArrowRightLeft },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group min-w-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
              <Compass className="h-4 w-4 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold truncate">
                <span className="text-gradient">Cairo</span>
                <span className="text-foreground"> Scout</span>
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 text-muted-foreground hover:text-foreground flex-shrink-0 ml-auto"
          >
            {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {/* Chain Selector */}
        {!isCollapsed && (
          <SidebarGroup>
            <Collapsible open={chainsOpen} onOpenChange={setChainsOpen}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md px-2 py-2 w-full">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    <span>Chains</span>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", chainsOpen && "rotate-180")} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent className="mt-2">
                  <SidebarMenu>
                    {chains.map((chain) => (
                      <SidebarMenuItem key={chain.name}>
                        <SidebarMenuButton
                          onClick={() => setSelectedChain(chain.name)}
                          className={cn(
                            "w-full",
                            selectedChain === chain.name && "bg-primary/10 text-primary"
                          )}
                        >
                          <span className="text-base">{chain.icon}</span>
                          <span>{chain.name}</span>
                          {selectedChain === chain.name && (
                            <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}

        {/* Network Selector */}
        {!isCollapsed && (
          <SidebarGroup>
            <Collapsible open={networkOpen} onOpenChange={setNetworkOpen}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md px-2 py-2 w-full">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Network</span>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", networkOpen && "rotate-180")} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent className="mt-2">
                  <SidebarMenu>
                    {networks.map((network) => (
                      <SidebarMenuItem key={network.name}>
                        <SidebarMenuButton
                          onClick={() => setSelectedNetwork(network.name)}
                          className={cn(
                            "w-full",
                            selectedNetwork === network.name && "bg-primary/10 text-primary"
                          )}
                        >
                          <network.icon className="h-4 w-4" />
                          <span>{network.name}</span>
                          {selectedNetwork === network.name && (
                            <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}

        {/* Navigation */}
        <SidebarGroup className={cn(!isCollapsed && "mt-4")}>
          {!isCollapsed && (
            <SidebarGroupLabel className="px-2 text-xs text-muted-foreground uppercase tracking-wider">
              Explorer
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-2 w-full",
                        isActive(item.url) && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>{selectedChain} {selectedNetwork}</span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
