import { Link } from "react-router-dom";
import { Train, Phone, Globe, Zap, Calendar, Navigation, CreditCard, Route as RouteIcon, HelpCircle, Landmark, BookOpen, Shield, MessageSquare, Sparkles, Map, AlertTriangle, Radio, ArrowLeft, Heart, Cookie, Gauge, MapPin } from "lucide-react";
import { resetCookieConsent } from "@/components/CookieConsent";

export default function UrduFooter() {
  const quickLinks = [
    { label: "تمام ٹرینیں", icon: Train, path: "/ur/train" },
    { label: "لائیو ٹرینیں", icon: Radio, path: "/ur/train" },
    { label: "ٹرین شیڈول", icon: Calendar, path: "/ur/schedule" },
    { label: "اسٹیشن ڈائریکٹری", icon: Landmark, path: "/ur/stations" },
    { label: "شیڈول گائیڈ", icon: BookOpen, path: "/ur/schedule-guide" },
    { label: "گرین لائن ایکسپریس", icon: Zap, path: "/ur/green-line-express" },
    { label: "رابطہ کریں", icon: MessageSquare, path: "/ur/contact" },
  ];

  const travelGuides = [
    { label: "سفر پلانر", icon: MapPin, path: "/ur/planner" },
    { label: "ایکسپریس ٹرینیں", icon: Zap, path: "/ur/express-trains" },
    { label: "ٹکٹ کی قیمتیں", icon: CreditCard, path: "/ur/ticket-pricing" },
    { label: "روٹ نقشے", icon: RouteIcon, path: "/ur/routes" },
    { label: "میری ٹرین تلاش کریں", icon: Navigation, path: "/ur/find-my-train" },
    { label: "تاخیر چیک کریں", icon: AlertTriangle, path: "/ur/check-delays" },
    { label: "بلاگ اور گائیڈز", icon: BookOpen, path: "/ur/blog" },
  ];

  const legalMore = [
    { label: "رازداری پالیسی", icon: Shield, path: "/ur/privacy" },
    { label: "ہمارے بارے میں", icon: Globe, path: "/ur/about" },
    { label: "سائٹ میپ", icon: Map, path: "/ur/sitemap" },
    { label: "عمومی سوالات", icon: HelpCircle, path: "/ur/faq" },
    { label: "فیچر کی درخواست", icon: Sparkles, path: "/ur/request-feature" },
  ];

  const popularRoutes = [
    { label: "کراچی ← لاہور", path: "/ur/routes" },
    { label: "لاہور ← اسلام آباد", path: "/ur/routes" },
    { label: "لاہور ← کراچی", path: "/ur/routes" },
    { label: "کراچی ← پشاور", path: "/ur/routes" },
    { label: "راولپنڈی ← کراچی", path: "/ur/routes" },
    { label: "لاہور ← ملتان", path: "/ur/routes" },
  ];

  return (
    <footer className="relative overflow-hidden font-urdu" dir="rtl" role="contentinfo" aria-label="فوٹر">
      {/* Gradient accent top bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" aria-hidden="true" />

      <div className="bg-[hsl(220_20%_8%)] text-[hsl(210_40%_90%)]">
        <div className="container mx-auto px-4 py-14 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">

            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link to="/ur" className="flex items-center gap-3 mb-6 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[hsl(152_55%_25%)] flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                  <Train className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight leading-tight text-white">
                    ٹریک مائی <span className="text-primary">ٹرین</span>
                  </span>
                  <span className="text-[11px] font-medium text-primary/80 tracking-wider">پاکستان ریلوے لائیو ٹریکنگ</span>
                </div>
              </Link>

              <p className="text-sm text-[hsl(210_20%_60%)] mb-6 leading-[2] max-w-sm">
                پاکستان کا سب سے قابل اعتماد آزاد ٹرین ٹریکنگ پلیٹ فارم۔ ریئل ٹائم جی پی ایس پوزیشنز، لائیو تاخیر، درست اوقات — مکمل طور پر مفت۔
              </p>

              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { value: "۱۶۴+", label: "فعال ٹرینیں", icon: Train },
                  { value: "۳۴۲+", label: "اسٹیشنز", icon: Landmark },
                  { value: "۲۴/۷", label: "لائیو اپڈیٹس", icon: Gauge },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-[hsl(220_18%_12%)] border border-[hsl(220_18%_18%)]">
                    <stat.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                    <div className="text-base font-extrabold text-white">{stat.value}</div>
                    <div className="text-[9px] text-[hsl(210_20%_55%)] tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Language Switch */}
              <div className="flex items-center gap-2 text-xs text-[hsl(210_20%_55%)] mb-4">
                <Globe className="w-3.5 h-3.5" />
                <span>English اور اردو میں دستیاب</span>
              </div>

              {/* Helpline */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/20 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-[hsl(210_20%_55%)] block tracking-widest">ریلوے ہیلپ لائن</span>
                  <span className="text-2xl font-black text-primary leading-tight">۱۱۷</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-xs mb-5 flex items-center gap-2 text-white/70">
                <span className="w-6 h-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-full" />
                فوری لنکس
              </h3>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link key={link.path + link.label} to={link.path} className="flex items-center gap-2.5 text-sm text-[hsl(210_20%_60%)] hover:text-primary transition-all duration-200 group hover:-translate-x-1">
                    <link.icon className="w-3.5 h-3.5 text-[hsl(210_20%_40%)] group-hover:text-primary transition-colors shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Travel Guides */}
            <div className="lg:col-span-3">
              <h3 className="font-bold text-xs mb-5 flex items-center gap-2 text-white/70">
                <span className="w-6 h-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-full" />
                سفری رہنما
              </h3>
              <div className="space-y-3">
                {travelGuides.map((link) => (
                  <Link key={link.path + link.label} to={link.path} className="flex items-center gap-2.5 text-sm text-[hsl(210_20%_60%)] hover:text-primary transition-all duration-200 group hover:-translate-x-1">
                    <link.icon className="w-3.5 h-3.5 text-[hsl(210_20%_40%)] group-hover:text-primary transition-colors shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Routes + Legal */}
            <div className="lg:col-span-3">
              <h3 className="font-bold text-xs mb-5 flex items-center gap-2 text-white/70">
                <span className="w-6 h-0.5 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
                مقبول روٹس
              </h3>
              <div className="space-y-3 mb-8">
                {popularRoutes.map((route, i) => (
                  <Link key={i} to={route.path} className="flex items-center gap-2.5 text-sm text-[hsl(210_20%_60%)] hover:text-accent transition-all duration-200 group hover:-translate-x-1">
                    <ArrowLeft className="w-3 h-3 text-[hsl(210_20%_40%)] group-hover:text-accent transition-colors shrink-0" />
                    {route.label}
                  </Link>
                ))}
              </div>

              <h3 className="font-bold text-xs mb-4 flex items-center gap-2 text-white/70">
                <span className="w-6 h-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-full" />
                قانونی اور مزید
              </h3>
              <div className="space-y-2.5">
                {legalMore.map((link) => (
                  <Link key={link.path + link.label} to={link.path} className="flex items-center gap-2.5 text-sm text-[hsl(210_20%_60%)] hover:text-primary transition-all duration-200 group hover:-translate-x-1">
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
              <p className="text-xs text-[hsl(210_20%_45%)] text-center sm:text-right">
                © {new Date().getFullYear()} ٹریک مائی <span className="text-primary font-semibold">ٹرین</span> — پاکستان کا نمبر ۱ لائیو ٹرین ٹریکر۔ مسافروں کے لیے <Heart className="w-3 h-3 inline text-destructive" /> سے بنایا گیا۔
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={resetCookieConsent}
                  className="text-[11px] text-[hsl(210_20%_45%)] hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Cookie className="w-3 h-3" /> کوکی سیٹنگز
                </button>
                <Link to="/" className="text-[11px] text-primary hover:underline flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Switch to English
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
