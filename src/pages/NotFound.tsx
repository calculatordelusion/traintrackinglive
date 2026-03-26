import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Home, Search, MapPin, Navigation, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <SEOHead
        title="Page Not Found — Track My Train"
        description="The page you're looking for doesn't exist. Go back to Track My Train homepage to track live Pakistan Railways trains."
        canonical="/404"
        noindex
      />
      <section className="bg-hero-gradient text-primary-foreground py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="text-8xl sm:text-9xl font-black opacity-20 mb-4">404</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Page Not Found</h1>
          <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto mb-8">
            Looks like this train has derailed! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Home className="w-4 h-4" /> Go Home
              </Button>
            </Link>
            <Link to="/train">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <Train className="w-4 h-4" /> Track Trains Live
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-primary tracking-wider mb-2">TRY THESE INSTEAD</p>
          <h2 className="text-xl font-bold">Popular Pages</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Train, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any train in real-time.", link: "/train" },
            { icon: MapPin, gradient: "gradient-card-amber", title: "Journey Planner", desc: "Plan routes between stations.", link: "/planner" },
            { icon: Navigation, gradient: "gradient-card-blue", title: "Find My Train", desc: "GPS auto-detection.", link: "/find-my-train" },
          ].map((item, i) => (
            <Link key={i} to={item.link}>
              <Card className={`${item.gradient} border hover-lift group h-full`}>
                <CardContent className="p-5 text-center">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-bold mb-1 text-sm group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
