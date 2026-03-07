import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import CRM from "./pages/CRM";
import Analytics from "./pages/Analytics";
import Automation from "./pages/Automation";
import AIAgents from "./pages/AIAgents";
import EmailMarketing from "./pages/EmailMarketing";
import SocialMedia from "./pages/SocialMedia";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/ai-agents" element={<AIAgents />} />
          <Route path="/email-marketing" element={<EmailMarketing />} />
          <Route path="/social-media" element={<SocialMedia />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
