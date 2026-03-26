import { Link, useLocation } from "react-router-dom";
import { Train, Phone, MapPin, Globe, Leaf, Zap, Calendar, Navigation, CreditCard, Route as RouteIcon, HelpCircle, Landmark, BookOpen, Shield, FileText, MessageSquare, Sparkles, Map, AlertTriangle, Radio, Gauge, ArrowRight, Heart, ExternalLink, Ticket, FileSearch, Scale, Cookie } from "lucide-react";
import { resetCookieConsent } from "@/components/CookieConsent";

export default function Footer() {
  const location = useLocation();
  const quickLinks = [
    { label: "All Trains", icon: Train, path: "/train" },
    { label: "Live Trains", icon: Radio, path: "/live" },
    { label: "Train Schedule", icon: Calendar, path: "/schedule" },
    { label: "Station Directory", icon: Landmark, path: "/stations" },
    { label: "Schedule Guide", icon: FileSearch, path: "/schedule-guide" },
    { label: "Green Line Express", icon: Leaf, path: "/green-line-express" },
    { label: "Contact Us", icon: MessageSquare, path: "/contact" },
  ];

  const travelGuides = [
    { label: "Journey Planner", icon: MapPin, path: "/planner" },
    { label: "Express Trains", icon: Zap, path: "/express-trains" },
    { label: "Ticket Prices", icon: CreditCard, path: "/ticket-pricing" },
    { label: "Route Maps", icon: RouteIcon, path: "/routes" },
    { label: "Find My Train (GPS)", icon: Navigation, path: "/find-my-train" },
    { label: "Check Delays", icon: AlertTriangle, path: "/check-delays" },
    { label: "Buy Tickets Online", icon: Ticket, path: "/buy-tickets" },
    { label: "Blog & Guides", icon: BookOpen, path: "/blog" },
  ];

  const legalMore = [
    { label: "Privacy Policy", icon: Shield, path: "/privacy" },
    { label: "Terms of Service", icon: Scale, path: "/terms" },
    { label: "Disclaimer", icon: AlertTriangle, path: "/disclaimer" },
    { label: "About Us", icon: Globe, path: "/about" },
    { label: "Sitemap", icon: Map, path: "/sitemap" },
    { label: "FAQs", icon: HelpCircle, path: "/faq" },
    { label: "Request Feature", icon: Sparkles, path: "/request-feature" },
  ];

  const popularRoutes = [
    { label: "Karachi → Lahore", path: "/routes/karachi-to-lahore" },
    { label: "Lahore → Islamabad", path: "/routes/lahore-to-islamabad" },
    { label: "Lahore → Karachi", path: "/routes/lahore-to-karachi" },
    { label: "Karachi → Peshawar", path: "/routes/karachi-to-peshawar" },
    { label: "Rawalpindi → Karachi", path: "/routes/rawalpindi-to-karachi" },
    { label: "Lahore → Multan", path: "/routes/lahore-to-multan" },
  ];

  return (
    <footer className="relative overflow-hidden" role="contentinfo" aria-label="Site footer">
      {/* Gradient accent top bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" aria-hidden="true" />

      {/* Main Footer */}
      <div className="bg-[hsl(220_20%_8%)] text-[hsl(210_40%_90%)]">
        <div className="container mx-auto px-4 py-14 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">

            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link to="/" className="flex items-center gap-3 mb-6 group" onClick={(e) => { if (location.pathname === "/") { e.preventDefault(); window.location.href = "/"; } }}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[hsl(152_55%_25%)] flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Train className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight leading-tight text-white">
                    Track My <span className="text-primary">Train</span>
                  </span>
                  <span className="text-[11px] font-medium text-primary/80 tracking-wider uppercase">Pakistan Railways Live Tracking</span>
                </div>
              </Link>

              <p className="text-sm text-[hsl(210_20%_60%)] mb-6 leading-relaxed max-w-sm">
                Pakistan's most trusted independent train tracking platform. Real-time GPS positions, live delays, accurate ETAs — completely free, no signup needed.
              </p>

              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { value: "164+", label: "Active Trains", icon: Train },
                  { value: "342+", label: "Stations", icon: Landmark },
                  { value: "24/7", label: "Live Updates", icon: Gauge },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-[hsl(220_18%_12%)] border border-[hsl(220_18%_18%)]">
                    <stat.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                    <div className="text-base font-extrabold text-white">{stat.value}</div>
                    <div className="text-[9px] text-[hsl(210_20%_55%)] uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Language & Helpline */}
              <div className="flex items-center gap-2 text-xs text-[hsl(210_20%_55%)] mb-4">
                <Globe className="w-3.5 h-3.5" />
                <span>Available in English & اردو</span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/20 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-[hsl(210_20%_55%)] block uppercase tracking-widest">Railway Helpline</span>
                  <span className="text-2xl font-black text-primary leading-tight">117</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-xs mb-5 flex items-center gap-2 uppercase tracking-widest text-white/70">
                <span className="w-6 h-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-full" />
                Quick Links
              </h3>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link key={link.path + link.label} to={link.path} className="flex items-center gap-2.5 text-sm text-[hsl(210_20%_60%)] hover:text-primary transition-all duration-200 group hover:translate-x-1">
                    <link.icon className="w-3.5 h-3.5 text-[hsl(210_20%_40%)] group-hover:text-primary transition-colors shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Travel Guides */}
            <div className="lg:col-span-3">
              <h3 className="font-bold text-xs mb-5 flex items-center gap-2 uppercase tracking-widest text-white/70">
                <span className="w-6 h-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-full" />
                Travel Guides
              </h3>
              <div className="space-y-3">
                {travelGuides.map((link) => (
                  <Link key={link.path + link.label} to={link.path} className="flex items-center gap-2.5 text-sm text-[hsl(210_20%_60%)] hover:text-primary transition-all duration-200 group hover:translate-x-1">
                    <link.icon className="w-3.5 h-3.5 text-[hsl(210_20%_40%)] group-hover:text-primary transition-colors shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Routes + Legal */}
            <div className="lg:col-span-3">
              <h3 className="font-bold text-xs mb-5 flex items-center gap-2 uppercase tracking-widest text-white/70">
                <span className="w-6 h-0.5 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
                Popular Routes
              </h3>
              <div className="space-y-3 mb-8">
                {popularRoutes.map((route) => (
                  <Link key={route.path} to={route.path} className="flex items-center gap-2.5 text-sm text-[hsl(210_20%_60%)] hover:text-accent transition-all duration-200 group hover:translate-x-1">
                    <ArrowRight className="w-3 h-3 text-[hsl(210_20%_40%)] group-hover:text-accent transition-colors shrink-0" />
                    {route.label}
                  </Link>
                ))}
              </div>

              <h3 className="font-bold text-xs mb-4 flex items-center gap-2 uppercase tracking-widest text-white/70">
                <span className="w-6 h-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-full" />
                Legal & More
              </h3>
              <div className="space-y-2.5">
                {legalMore.map((link) => (
                  <Link key={link.path + link.label} to={link.path} className="flex items-center gap-2.5 text-sm text-[hsl(210_20%_60%)] hover:text-primary transition-all duration-200 group hover:translate-x-1">
                    <link.icon className="w-3.5 h-3.5 text-[hsl(210_20%_40%)] group-hover:text-primary transition-colors shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[hsl(220_18%_15%)]">
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-xs text-[hsl(210_20%_45%)] text-center sm:text-left">
                © {new Date().getFullYear()} Track My <span className="text-primary font-semibold">Train</span> — Pakistan's #1 Live Train Tracker. Made with <Heart className="w-3 h-3 inline text-destructive" aria-hidden="true" /> for travelers.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={resetCookieConsent}
                  className="text-[11px] text-[hsl(210_20%_45%)] hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Cookie className="w-3 h-3" /> Cookie Settings
                </button>
                <p className="text-[11px] text-[hsl(210_20%_35%)] text-center sm:text-right max-w-md flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  Independent — NOT affiliated with Pakistan Railways.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
