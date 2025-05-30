import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/payment-success";
import PaymentCanceled from "./pages/payment-canceled";
import LandingPage from "./pages/LandingPage";
import { StripeProvider } from "./contexts/StripeContext";
import { FacebookPixelProvider } from "./contexts/FacebookPixelContext";
import FacebookPixel from "./components/FacebookPixel";

const queryClient = new QueryClient();

// Meta Pixel ID - in production, this should come from environment variables
const META_PIXEL_ID = "1011989821000338";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FacebookPixelProvider pixelId={META_PIXEL_ID} debug={import.meta.env.DEV}>
        <StripeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <FacebookPixel pixelId={META_PIXEL_ID} debug={import.meta.env.DEV} />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/form" element={<Index />} />
              <Route path="/form/:stepNumber" element={<Index />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-canceled" element={<PaymentCanceled />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </StripeProvider>
      </FacebookPixelProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
