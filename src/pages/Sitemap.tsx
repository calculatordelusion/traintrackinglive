import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Map, Train, MapPin, Calendar, Navigation, CreditCard, Zap, HelpCircle, Phone, BookOpen, Shield, Globe, Sparkles, Leaf, AlertTriangle, Scale, FileText } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const sections = [
  {
    title: "Main Pages", icon: Train, gradient: "gradient-card-emerald",
    links: [
      { label: "Home", path: "/", icon: Globe },
      { label: "Live Trains", path: "/train", icon: Train },
      { label: "Train Schedule", path: "/schedule", icon: Calendar },
      { label: "Journey Planner", path: "/planner", icon: MapPin },
      { label: "Stations Directory", path: "/stations", icon: Navigation },
      { label: "Route Maps", path: "/routes", icon: Map },
      { label: "Find My Train (GPS)", path: "/find-my-train", icon: Navigation },
      { label: "Check Delays", path: "/check-delays", icon: AlertTriangle },
    ],
  },
  {
    title: "Train Services", icon: Zap, gradient: "gradient-card-amber",
    links: [
      { label: "Express Trains", path: "/express-trains", icon: Zap },
      { label: "Green Line Express", path: "/green-line-express", icon: Leaf },
      { label: "Ticket Pricing", path: "/ticket-pricing", icon: CreditCard },
    ],
  },
  {
    title: "Information & Help", icon: HelpCircle, gradient: "gradient-card-blue",
    links: [
      { label: "Blog & Travel Guides", path: "/blog", icon: BookOpen },
      { label: "FAQs", path: "/faq", icon: HelpCircle },
      { label: "About Us", path: "/about", icon: Globe },
      { label: "Contact Us", path: "/contact", icon: Phone },
      { label: "Request Feature", path: "/request-feature", icon: Sparkles },
      { label: "Privacy Policy", path: "/privacy", icon: Shield },
      { label: "Terms of Service", path: "/terms", icon: Scale },
      { label: "Disclaimer", path: "/disclaimer", icon: FileText },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div>
      <SEOHead
        title="Sitemap — Track My Train | All Pages"
        description="Complete directory of all pages on Track My Train — Pakistan's #1 live train tracking platform."
        canonical="/sitemap"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Sitemap", url: "/sitemap" }]}
      />
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>Sitemap</span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <Map className="w-4 h-4" /> All Pages
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              <span className="text-gradient-gold">Sitemap</span>
            </h1>
            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mt-4">
              Complete directory of all pages on TrackMyTrain.pk — Pakistan's #1 live train tracking platform.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sections.map((section, i) => (
            <Card key={i} className={`${section.gradient} border hover-lift`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold">{section.title}</h2>
                </div>
                <div className="space-y-2.5">
                  {section.links.map((link) => (
                    <Link key={link.path} to={link.path} className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group">
                      <link.icon className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
