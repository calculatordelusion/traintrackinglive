import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollToTop from "@/components/layout/ScrollToTop";
import NotificationBanner from "@/components/NotificationBanner";
import { useSourceProtection } from "@/hooks/useSourceProtection";

// Homepage loaded eagerly (LCP route)
import Index from "./pages/Index";

// Lazy-loaded English pages
const LiveTrains = lazy(() => import("./pages/LiveTrains"));
const TrainDetail = lazy(() => import("./pages/TrainDetail"));
const Schedule = lazy(() => import("./pages/Schedule"));
const Stations = lazy(() => import("./pages/Stations"));
const StationDetail = lazy(() => import("./pages/StationDetail"));
const JourneyPlanner = lazy(() => import("./pages/JourneyPlanner"));
const FindMyTrain = lazy(() => import("./pages/FindMyTrain"));
const ExpressTrains = lazy(() => import("./pages/ExpressTrains"));
const TicketPricing = lazy(() => import("./pages/TicketPricing"));
const FAQ = lazy(() => import("./pages/FAQ"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const RoutesPage = lazy(() => import("./pages/Routes"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const RequestFeature = lazy(() => import("./pages/RequestFeature"));
const GreenLine = lazy(() => import("./pages/GreenLine"));
const CheckDelays = lazy(() => import("./pages/CheckDelays"));
const RouteDetail = lazy(() => import("./pages/RouteDetail"));
const BuyTickets = lazy(() => import("./pages/BuyTickets"));
const ScheduleGuide = lazy(() => import("./pages/ScheduleGuide"));
const RailwayHelpline = lazy(() => import("./pages/RailwayHelpline"));
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy-loaded Urdu pages
const UrduWrapper = lazy(() => import("./components/UrduWrapper"));
const UrduHome = lazy(() => import("./pages/ur/UrduHome"));
const UrduAbout = lazy(() => import("./pages/ur/UrduAbout"));
const UrduContact = lazy(() => import("./pages/ur/UrduContact"));
const UrduFAQ = lazy(() => import("./pages/ur/UrduFAQ"));
const UrduLiveTrains = lazy(() => import("./pages/ur/UrduLiveTrains"));
const UrduStations = lazy(() => import("./pages/ur/UrduStations"));
const UrduSchedule = lazy(() => import("./pages/ur/UrduSchedule"));
const UrduRoutes = lazy(() => import("./pages/ur/UrduRoutes"));
const UrduPlanner = lazy(() => import("./pages/ur/UrduPlanner"));
const UrduFindMyTrain = lazy(() => import("./pages/ur/UrduFindMyTrain"));
const UrduExpressTrains = lazy(() => import("./pages/ur/UrduExpressTrains"));
const UrduTicketPricing = lazy(() => import("./pages/ur/UrduTicketPricing"));
const UrduCheckDelays = lazy(() => import("./pages/ur/UrduCheckDelays"));
const UrduGreenLine = lazy(() => import("./pages/ur/UrduGreenLine"));
const UrduPrivacy = lazy(() => import("./pages/ur/UrduPrivacy"));
const UrduBlog = lazy(() => import("./pages/ur/UrduBlog"));
const UrduSitemap = lazy(() => import("./pages/ur/UrduSitemap"));
const UrduRequestFeature = lazy(() => import("./pages/ur/UrduRequestFeature"));
const UrduScheduleGuide = lazy(() => import("./pages/ur/UrduScheduleGuide"));
const UrduBuyTickets = lazy(() => import("./pages/ur/UrduBuyTickets"));
const UrduRailwayHelpline = lazy(() => import("./pages/ur/UrduRailwayHelpline"));
const UrduTerms = lazy(() => import("./pages/ur/UrduTerms"));
const UrduDisclaimer = lazy(() => import("./pages/ur/UrduDisclaimer"));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  useSourceProtection();
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <NotificationBanner />
          <Layout>
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* English routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/train" element={<LiveTrains />} />
                  <Route path="/trains" element={<LiveTrains />} />
                  <Route path="/trains/:category" element={<LiveTrains />} />
                  <Route path="/train/:id" element={<TrainDetail />} />
                  <Route path="/live" element={<LiveTrains />} />
                  <Route path="/trains/passengers" element={<LiveTrains />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/stations" element={<Stations />} />
                  <Route path="/stations/:slug" element={<StationDetail />} />
                  <Route path="/planner" element={<JourneyPlanner />} />
                  <Route path="/find-my-train" element={<FindMyTrain />} />
                  <Route path="/express-trains" element={<ExpressTrains />} />
                  <Route path="/ticket-pricing" element={<TicketPricing />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/routes" element={<RoutesPage />} />
                  <Route path="/routes/:slug" element={<RouteDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/request-feature" element={<RequestFeature />} />
                  <Route path="/green-line-express" element={<GreenLine />} />
                  <Route path="/check-delays" element={<CheckDelays />} />
                  <Route path="/buy-tickets" element={<BuyTickets />} />
                  <Route path="/schedule-guide" element={<ScheduleGuide />} />
                  <Route path="/railway-helpline" element={<RailwayHelpline />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />

                  {/* Urdu routes — /ur/ prefix */}
                  <Route path="/ur" element={<UrduWrapper><UrduHome /></UrduWrapper>} />
                  <Route path="/ur/train" element={<UrduWrapper><UrduLiveTrains /></UrduWrapper>} />
                  <Route path="/ur/train/:id" element={<UrduWrapper><TrainDetail /></UrduWrapper>} />
                  <Route path="/ur/stations" element={<UrduWrapper><UrduStations /></UrduWrapper>} />
                  <Route path="/ur/stations/:slug" element={<UrduWrapper><StationDetail /></UrduWrapper>} />
                  <Route path="/ur/schedule" element={<UrduWrapper><UrduSchedule /></UrduWrapper>} />
                  <Route path="/ur/routes" element={<UrduWrapper><UrduRoutes /></UrduWrapper>} />
                  <Route path="/ur/routes/:slug" element={<UrduWrapper><RouteDetail /></UrduWrapper>} />
                  <Route path="/ur/planner" element={<UrduWrapper><UrduPlanner /></UrduWrapper>} />
                  <Route path="/ur/find-my-train" element={<UrduWrapper><UrduFindMyTrain /></UrduWrapper>} />
                  <Route path="/ur/express-trains" element={<UrduWrapper><UrduExpressTrains /></UrduWrapper>} />
                  <Route path="/ur/ticket-pricing" element={<UrduWrapper><UrduTicketPricing /></UrduWrapper>} />
                  <Route path="/ur/faq" element={<UrduWrapper><UrduFAQ /></UrduWrapper>} />
                  <Route path="/ur/about" element={<UrduWrapper><UrduAbout /></UrduWrapper>} />
                  <Route path="/ur/contact" element={<UrduWrapper><UrduContact /></UrduWrapper>} />
                  <Route path="/ur/privacy" element={<UrduWrapper><UrduPrivacy /></UrduWrapper>} />
                  <Route path="/ur/blog" element={<UrduWrapper><UrduBlog /></UrduWrapper>} />
                  <Route path="/ur/blog/:slug" element={<UrduWrapper><BlogPost /></UrduWrapper>} />
                  <Route path="/ur/green-line-express" element={<UrduWrapper><UrduGreenLine /></UrduWrapper>} />
                  <Route path="/ur/check-delays" element={<UrduWrapper><UrduCheckDelays /></UrduWrapper>} />
                  <Route path="/ur/sitemap" element={<UrduWrapper><UrduSitemap /></UrduWrapper>} />
                  <Route path="/ur/request-feature" element={<UrduWrapper><UrduRequestFeature /></UrduWrapper>} />
                  <Route path="/ur/schedule-guide" element={<UrduWrapper><UrduScheduleGuide /></UrduWrapper>} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
