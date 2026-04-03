import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transfers from "./pages/Transfers";
import Payments from "./pages/Payments";
import Deposits from "./pages/Deposits";
import Credits from "./pages/Credits";
import Investments from "./pages/Investments";
import Insurance from "./pages/Insurance";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Cards from "./pages/Cards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/deposits" element={<Deposits />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
