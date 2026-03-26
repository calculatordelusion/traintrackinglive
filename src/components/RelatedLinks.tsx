import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Landmark, Route, AlertTriangle, CreditCard, Calendar, Navigation, Radio, Leaf, Zap, ArrowRight } from "lucide-react";

interface RelatedLinksProps {
  /** Current page type to customize which links show */
  context: "train" | "station" | "route" | "schedule" | "general";
  /** Optional: current train/station/route name for contextual labels */
  currentName?: string;
}

const allLinks = [
  { label: "Track Trains Live", icon: Radio, path: "/train", gradient: "gradient-card-emerald", contexts: ["station", "route", "schedule", "general"] },
  { label: "Journey Planner", icon: Navigation, path: "/planner", gradient: "gradient-card-blue", contexts: ["train", "station", "route", "general"] },
  { label: "Check Train Delays", icon: AlertTriangle, path: "/check-delays", gradient: "gradient-card-amber", contexts: ["train", "station", "route", "schedule"] },
  { label: "Train Schedule", icon: Calendar, path: "/schedule", gradient: "gradient-card-purple", contexts: ["train", "station", "route", "general"] },
  { label: "All Stations", icon: Landmark, path: "/stations", gradient: "gradient-card-teal", contexts: ["train", "route", "schedule", "general"] },
  { label: "All Routes", icon: Route, path: "/routes", gradient: "gradient-card-emerald", contexts: ["train", "station", "schedule", "general"] },
  { label: "Ticket Prices", icon: CreditCard, path: "/ticket-pricing", gradient: "gradient-card-amber", contexts: ["train", "station", "route", "general"] },
  { label: "Express Trains", icon: Zap, path: "/express-trains", gradient: "gradient-card-rose", contexts: ["station", "route", "schedule", "general"] },
  { label: "Green Line Express", icon: Leaf, path: "/green-line-express", gradient: "gradient-card-emerald", contexts: ["train", "route", "general"] },
  { label: "Find My Train (GPS)", icon: Navigation, path: "/find-my-train", gradient: "gradient-card-blue", contexts: ["train", "station", "general"] },
];

export default function RelatedLinks({ context, currentName }: RelatedLinksProps) {
  const filtered = allLinks
    .filter((l) => l.contexts.includes(context))
    .slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-lg font-bold mb-1">
        {currentName ? `More Tools for ${currentName}` : "Explore More"}
      </h2>
      <p className="text-sm text-muted-foreground mb-5">Quick access to related features across the platform.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filtered.map((item) => (
          <Link key={item.path} to={item.path}>
            <Card className={`${item.gradient} border hover-lift group h-full`}>
              <CardContent className="p-4 flex items-center gap-3">
                <item.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
