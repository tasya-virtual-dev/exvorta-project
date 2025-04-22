import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import ProductCatalog from "@/pages/product-catalog";
import MarketResearch from "@/pages/market-research";
import ComplianceDocs from "@/pages/compliance-docs";
import BuyerMatching from "@/pages/buyer-matching";
import LogisticsManagement from "@/pages/logistics-management";
import ComplianceDocumentation from "@/pages/compliance-documentation";
import FinancingOptions from "@/pages/financing-options";
import Analytics from "@/pages/analytics";
import LearningCenter from "@/pages/learning-center";
import Support from "@/pages/support";
import Settings from "@/pages/settings-simple";
import HomePage from "@/pages/home-page";
import FeaturesPage from "@/pages/features-page";
import PricingPage from "@/pages/pricing-page";
import AboutPage from "@/pages/about-page";
import AuthPage from "@/pages/auth-page";
import { FloatingAssistant } from "@/components/floating-assistant";

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={HomePage} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/auth" component={AuthPage} />

      {/* Protected Dashboard Pages (require authentication) */}
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/product-catalog" component={ProductCatalog} />
      <ProtectedRoute path="/market-research" component={MarketResearch} />
      <ProtectedRoute path="/buyer-matching" component={BuyerMatching} />
      <ProtectedRoute path="/logistics-management" component={LogisticsManagement} />
      <ProtectedRoute path="/compliance-documentation" component={ComplianceDocumentation} />
      <ProtectedRoute path="/compliance-docs" component={ComplianceDocs} />
      <ProtectedRoute path="/financing" component={FinancingOptions} />
      <ProtectedRoute path="/analytics" component={Analytics} />
      <ProtectedRoute path="/learning" component={LearningCenter} />
      <ProtectedRoute path="/support" component={Support} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/profile" component={Settings} />
      <ProtectedRoute path="/billing" component={Settings} />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Router />
          <FloatingAssistant />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;