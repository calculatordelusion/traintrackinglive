import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Landmark, Route, AlertTriangle, CreditCard, Calendar, Navigation, Radio, Leaf, Zap, ArrowRight, BookOpen, Phone, Ticket } from "lucide-react";

export type UrduLinkContext = "train" | "station" | "route" | "schedule" | "blog" | "general";

interface UrduRelatedLinksProps {
  context: UrduLinkContext;
  currentName?: string;
}

const allLinks = [
  { label: "لائیو ٹرین ٹریکنگ", icon: Radio, path: "/ur/train", gradient: "gradient-card-emerald", contexts: ["station", "route", "schedule", "blog", "general"] },
  { label: "سفر پلانر", icon: Navigation, path: "/ur/planner", gradient: "gradient-card-blue", contexts: ["train", "station", "route", "blog", "general"] },
  { label: "تاخیر چیک کریں", icon: AlertTriangle, path: "/ur/check-delays", gradient: "gradient-card-amber", contexts: ["train", "station", "route", "schedule", "blog"] },
  { label: "مکمل شیڈول", icon: Calendar, path: "/ur/schedule", gradient: "gradient-card-purple", contexts: ["train", "station", "route", "blog", "general"] },
  { label: "تمام اسٹیشنز", icon: Landmark, path: "/ur/stations", gradient: "gradient-card-teal", contexts: ["train", "route", "schedule", "blog", "general"] },
  { label: "تمام روٹس", icon: Route, path: "/ur/routes", gradient: "gradient-card-emerald", contexts: ["train", "station", "schedule", "blog", "general"] },
  { label: "ٹکٹ کی قیمتیں", icon: CreditCard, path: "/ur/ticket-pricing", gradient: "gradient-card-amber", contexts: ["train", "station", "route", "blog", "general"] },
  { label: "ایکسپریس ٹرینیں", icon: Zap, path: "/ur/express-trains", gradient: "gradient-card-rose", contexts: ["station", "route", "schedule", "blog", "general"] },
  { label: "گرین لائن ایکسپریس", icon: Leaf, path: "/ur/green-line-express", gradient: "gradient-card-emerald", contexts: ["train", "route", "blog", "general"] },
  { label: "میری ٹرین تلاش کریں", icon: Navigation, path: "/ur/find-my-train", gradient: "gradient-card-blue", contexts: ["train", "station", "general"] },
  { label: "ٹکٹ بکنگ گائیڈ", icon: Ticket, path: "/ur/buy-tickets", gradient: "gradient-card-purple", contexts: ["train", "route", "station", "general"] },
  { label: "ریلوے ہیلپ لائن", icon: Phone, path: "/ur/railway-helpline", gradient: "gradient-card-rose", contexts: ["train", "station", "general"] },
  { label: "بلاگ مضامین", icon: BookOpen, path: "/ur/blog", gradient: "gradient-card-teal", contexts: ["train", "station", "route", "schedule", "general"] },
];

export default function UrduRelatedLinks({ context, currentName }: UrduRelatedLinksProps) {
  const filtered = allLinks
    .filter((l) => l.contexts.includes(context))
    .slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-lg font-bold mb-1">
        {currentName ? `${currentName} — مزید ٹولز` : "مزید دریافت کریں"}
      </h2>
      <p className="text-sm text-muted-foreground mb-5">متعلقہ ٹولز اور معلومات تک فوری رسائی۔</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filtered.map((item) => (
          <Link key={item.path} to={item.path}>
            <Card className={`${item.gradient} border hover-lift group h-full`}>
              <CardContent className="p-4 flex items-center gap-3">
                <item.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground mr-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
