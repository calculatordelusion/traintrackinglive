import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Train, MapPin, Clock, ArrowRight, Wifi, Navigation, Shield, Search, Zap, Users, Radio, BarChart3, Route, Eye, Landmark, TrendingUp } from "lucide-react";
import { trains } from "@/data/trains";
import { stations } from "@/data/stations";
import { popularRoutes } from "@/data/routes";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import { fetchLivePositions, type LiveStats } from "@/lib/trainApi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "میں پاکستان میں اپنی ٹرین کو ریئل ٹائم میں کیسے ٹریک کر سکتا ہوں؟", a: "ٹریک مائی ٹرین کھولیں، سرچ بار میں اپنی ٹرین کا نام یا نمبر ٹائپ کریں، اور نتیجے پر ٹیپ کریں۔ آپ کو فوری طور پر ٹرین کی لائیو GPS پوزیشن نقشے پر، اس کی موجودہ رفتار، کتنی منٹ تاخیر ہے، اور ہر آنے والے اسٹیشن کے لیے اپڈیٹ شدہ آمد کا تخمینہ نظر آئے گا۔" },
  { q: "ٹرین ٹریک کرتے وقت کیا تفصیلات دکھائی جاتی ہیں؟", a: "ہر ٹرین کا لائیو صفحہ دکھاتا ہے: انٹرایکٹو نقشے پر GPS کوآرڈینیٹس، ریئل ٹائم رفتار کلومیٹر فی گھنٹہ میں، جمع شدہ تاخیر منٹوں میں، پروگریس بار، اور اگلے اسٹیشن اور تمام باقی اسٹاپس پر پہنچنے کا تخمینی وقت۔" },
  { q: "کیا ٹریک مائی ٹرین مفت ہے؟", a: "جی ہاں! ہمارا پلیٹ فارم 100% مفت ہے بغیر کسی پوشیدہ لاگت، سبسکرپشنز، یا اشتہارات کے۔ ہم یقین رکھتے ہیں کہ ہر پاکستانی مسافر کو قابل اعتماد ٹرین ٹریکنگ معلومات تک بغیر کسی رکاوٹ کے رسائی حاصل ہونی چاہیے۔" },
  { q: "GPS ٹریکنگ کتنی درست ہے؟", a: "ہماری GPS پر مبنی ٹریکنگ عام طور پر 100-500 میٹر کی حد تک درست ہوتی ہے۔ ٹرین کی پوزیشنز ہر 5 سیکنڈ میں اپڈیٹ ہوتی ہیں، اور تاخیر کے حسابات زیادہ تر سفروں کے لیے ±5 منٹ تک درست ہیں۔" },
  { q: "کیا مجھے اکاؤنٹ بنانا ضروری ہے؟", a: "نہیں! کسی اکاؤنٹ یا رجسٹریشن کی ضرورت نہیں ہے۔ بس ہماری ویب سائٹ کھولیں اور فوری طور پر ٹرینیں ٹریک کرنا شروع کریں۔ ہم ذاتی ڈیٹا جمع نہیں کرتے۔" },
  { q: "ٹریک مائی ٹرین کتنی ٹرینیں ٹریک کرتا ہے؟", a: "ہم 164+ پاکستان ریلوے ٹرینیں ٹریک کرتے ہیں جن میں خیبر میل، تیزگام، گرین لائن ایکسپریس، علامہ اقبال ایکسپریس، قراقرم ایکسپریس، اور شالیمار ایکسپریس جیسی بڑی ایکسپریس سروسز شامل ہیں۔" },
  { q: "'میری ٹرین تلاش کریں' فیچر کیا ہے؟", a: "میری ٹرین تلاش کریں آپ کے فون کا GPS استعمال کرکے خودکار طور پر پتا لگاتا ہے کہ آپ اس وقت کس ٹرین میں ہیں۔ یہ تمام فعال ٹرینوں سے آپ کی قربت کا حساب لگاتا ہے اور 2 کلومیٹر کے اندر قریب ترین میچ کی شناخت کرتا ہے۔" },
  { q: "پاکستان ریلوے کا ہیلپ لائن نمبر کیا ہے؟", a: "پاکستان ریلوے کا مرکزی ہیلپ لائن نمبر 117 ہے جو 24/7 دستیاب ہے۔ آپ علاقائی دفاتر سے بھی رابطہ کر سکتے ہیں: کراچی (021-99213012)، لاہور (042-99211080)، راولپنڈی (051-9270831)۔" },
];

export default function UrduHomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<LiveStats>({ moving: 0, atStation: 0, total: 0, liveCount: 0 });

  useEffect(() => {
    const loadLive = async () => {
      try {
        const { stats: s } = await fetchLivePositions();
        setStats(s);
      } catch (e) { console.error(e); }
    };
    loadLive();
    const interval = setInterval(loadLive, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeTrains = useMemo(() => trains.filter(t => t.status === "active").slice(0, 6), []);

  return (
    <div>
      <SEOHead
        title="ٹریک مائی ٹرین — پاکستان ریلوے لائیو ٹرین ٹریکنگ اور GPS اسٹیٹس 2026"
        description="GPS کی درستگی کے ساتھ کسی بھی پاکستان ریلوے ٹرین کو ریئل ٹائم میں ٹریک کریں۔ 164+ ٹرینوں کی لائیو لوکیشن، رفتار، تاخیر الرٹس اور ETAs فوری طور پر چیک کریں۔ مفت، سائن اپ کی ضرورت نہیں۔"
        canonical="/ur"
        lang="ur"
        alternateEnglish="/"
        keywords="ٹرین ٹریکنگ پاکستان, پاکستان ریلوے لائیو ٹریکنگ, ٹرین کی لائیو لوکیشن, ریئل ٹائم ٹرین اسٹیٹس, پاکستان ریلوے GPS, ٹرین تلاش کریں"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }]}
        faqSchema={faqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ٹریک مائی ٹرین",
          "alternateName": "Track My Train",
          "url": "https://trackmytrain.pk/ur",
          "inLanguage": "ur",
          "applicationCategory": "TravelApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
        }]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-15" />
        <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 bg-[hsl(152_55%_40%/0.15)] backdrop-blur-sm border border-[hsl(152_55%_40%/0.3)] rounded-full px-5 py-2.5 text-sm mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(152_55%_45%)] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[hsl(152_55%_45%)]" />
              </span>
              <span className="font-semibold tracking-wider text-[hsl(152_55%_45%)]">لائیو GPS ٹریکنگ • ہر 5 سیکنڈ میں اپڈیٹ</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-2 leading-tight">
              ٹریک مائی <span className="text-gradient-gold">ٹرین</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium opacity-90 mb-4">
              پاکستان کا نمبر 1 لائیو ریلوے GPS ٹریکر
            </p>
            <p className="text-sm sm:text-base opacity-70 max-w-2xl mx-auto mb-8">
              164+ پاکستان ریلوے ٹرینوں کو ریئل ٹائم میں ٹریک کریں۔ GPS درست پوزیشنز، لائیو رفتار، تاخیر الرٹس اور ہر اسٹیشن کے لیے ETAs — ہر 5 سیکنڈ میں اپڈیٹ۔ مفت، سائن اپ کی ضرورت نہیں۔
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto mb-8">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="نام، نمبر، یا روٹ سے ٹرین تلاش کریں..."
                    className="w-full pl-4 pr-10 py-3 rounded-xl text-foreground bg-background/95 backdrop-blur-sm border-0 text-right"
                  />
                </div>
                <Button size="lg" className="rounded-xl px-6 font-bold">
                  <Search className="w-4 h-4 ml-2" /> تلاش کریں
                </Button>
              </div>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-black">{stats.liveCount || "—"}</div>
                <div className="text-xs opacity-70">لائیو ٹرینیں</div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-black">{stats.moving || "—"}</div>
                <div className="text-xs opacity-70">چل رہی ہیں</div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-black">{stats.atStation || "—"}</div>
                <div className="text-xs opacity-70">اسٹیشن پر</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
          <span className="text-gradient-green">فوری</span> ٹولز
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { title: "لائیو ٹرینیں", desc: "ریئل ٹائم GPS ٹریکنگ", icon: Navigation, link: "/ur/train", gradient: "gradient-card-emerald" },
            { title: "سفر کا منصوبہ", desc: "اپنا سفر پلان کریں", icon: Route, link: "/ur/planner", gradient: "gradient-card-amber" },
            { title: "ریلوے اسٹیشنز", desc: "342+ اسٹیشنز ڈائریکٹری", icon: MapPin, link: "/ur/stations", gradient: "gradient-card-blue" },
            { title: "تاخیر چیک کریں", desc: "ریئل ٹائم تاخیر اسٹیٹس", icon: Clock, link: "/ur/check-delays", gradient: "gradient-card-rose" },
          ].map((item) => (
            <Link key={item.title} to={item.link}>
              <Card className={`${item.gradient} border hover-lift h-full`}>
                <CardContent className="p-4 sm:p-6 text-center">
                  <item.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold text-sm sm:text-base mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
            ہم کیوں <span className="text-gradient-gold">بہترین</span> ہیں
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Wifi, title: "ریئل ٹائم GPS ٹریکنگ", desc: "ہر 5 سیکنڈ میں لائیو پوزیشن اپڈیٹس کے ساتھ 164+ ٹرینوں کی ٹریکنگ۔" },
              { icon: Shield, title: "100% مفت اور نجی", desc: "کوئی اکاؤنٹ نہیں، کوئی اشتہارات نہیں، کوئی پوشیدہ لاگت نہیں۔ آپ کا ڈیٹا آپ کا ہے۔" },
              { icon: Zap, title: "بجلی کی رفتار", desc: "2G/3G کنکشنز پر بھی تیز لوڈنگ۔ پاکستان کے دور دراز علاقوں کے لیے موزوں۔" },
              { icon: BarChart3, title: "درست تاخیر الرٹس", desc: "GPS ڈیٹا اور آفیشل شیڈول کا موازنہ کرکے درست تاخیر کا حساب۔" },
              { icon: Eye, title: "تمام آلات پر کام کرتا ہے", desc: "موبائل، ٹیبلٹ، لیپ ٹاپ — کسی بھی ڈیوائس پر بغیر ایپ ڈاؤنلوڈ کے۔" },
              { icon: Users, title: "کمیونٹی پر مبنی", desc: "ہزاروں پاکستانی مسافروں کا بھروسہ۔ کمیونٹی فیڈبیک سے بہتر ہوتا ہے۔" },
            ].map((f) => (
              <Card key={f.title} className="border hover-lift">
                <CardContent className="p-6">
                  <f.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Trains Preview */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-black">
            <span className="text-gradient-green">فعال</span> ٹرینیں
          </h2>
          <Link to="/ur/train">
            <Button variant="outline" className="gap-2">
              تمام دیکھیں <ArrowRight className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTrains.map((train) => (
            <Link key={train.id} to={`/ur/train/${train.id}`}>
              <Card className="border hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{train.nameUrdu || train.name}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{train.number}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {train.from} ← {train.to}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {train.departureTime}</span>
                    <span>• {train.duration}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
            اکثر پوچھے جانے والے <span className="text-gradient-gold">سوالات</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-4">
                <AccordionTrigger className="text-right font-semibold text-sm sm:text-base py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">ابھی اپنی ٹرین ٹریک کریں</h2>
          <p className="opacity-80 mb-6 max-w-xl mx-auto">
            164+ پاکستان ریلوے ٹرینوں کو مفت میں ریئل ٹائم GPS کے ساتھ ٹریک کریں۔ کوئی سائن اپ نہیں، کوئی ایپ ڈاؤنلوڈ نہیں۔
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/ur/train">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-bold gap-2">
                <Navigation className="w-5 h-5" /> لائیو ٹرینیں دیکھیں
              </Button>
            </Link>
            <Link to="/ur/planner">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl font-bold gap-2">
                <Route className="w-5 h-5" /> سفر کا منصوبہ بنائیں
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Language switch banner */}
      <div className="bg-card border-t py-4 text-center">
        <p className="text-sm text-muted-foreground">
          This page is available in English: <Link to="/" className="text-primary font-semibold hover:underline">Switch to English →</Link>
        </p>
      </div>
    </div>
  );
}
