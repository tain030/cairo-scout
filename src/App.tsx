import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChainProvider } from "@/contexts/ChainContext";
import Index from "./pages/Index";
import BlockDetail from "./pages/BlockDetail";
import TransactionDetail from "./pages/TransactionDetail";
import AddressDetail from "./pages/AddressDetail";
import BlocksList from "./pages/BlocksList";
import TransactionsList from "./pages/TransactionsList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChainProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/block/:blockId" element={<BlockDetail />} />
            <Route path="/tx/:txHash" element={<TransactionDetail />} />
            <Route path="/address/:address" element={<AddressDetail />} />
            <Route path="/blocks" element={<BlocksList />} />
            <Route path="/txs" element={<TransactionsList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChainProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
