import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Shield, Globe, Zap, Train, Navigation, Eye, Smartphone, Clock, MapPin } from "lucide-react";
import UrduRelatedLinks from "@/components/ur/UrduRelatedLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroTrainBg from "@/assets/hero-train-bg.webp";

const aboutFaqs = [
  { q: "کیا ٹریک مائی ٹرین پاکستان ریلوے سے وابستہ ہے؟", a: "نہیں۔ ٹریک مائی ٹرین ایک مکمل طور پر آزاد پلیٹ فارم ہے۔ ہم پاکستان ریلوے یا کسی سرکاری ادارے سے وابستہ، تائید شدہ، یا منسلک نہیں ہیں۔" },
  { q: "ٹریک مائی ٹرین ڈیٹا کیسے حاصل کرتا ہے؟", a: "ہم عوامی طور پر دستیاب GPS ٹریکنگ ڈیٹا اور آفیشل پاکستان ریلوے شیڈول معلومات استعمال کرتے ہیں۔ ہمارا سسٹم ہر منٹ ہزاروں GPS کوآرڈینیٹس پراسیس کرتا ہے۔" },
  { q: "کیا ٹریک مائی ٹرین مفت ہے؟", a: "جی ہاں! ہمارا پلیٹ فارم 100% مفت ہے بغیر کسی پوشیدہ لاگت، سبسکرپشنز، پریمیم ٹیئرز، یا اشتہارات کے۔" },
  { q: "کیا مجھے اکاؤنٹ بنانا ضروری ہے؟", a: "نہیں۔ کسی اکاؤنٹ یا رجسٹریشن کی ضرورت نہیں ہے۔ بس ہماری ویب سائٹ کھولیں اور فوری طور پر ٹرینیں ٹریک کرنا شروع کریں۔" },
  { q: "لائیو ٹریکنگ کتنی درست ہے؟", a: "ہماری GPS پر مبنی ٹریکنگ عام طور پر 100-500 میٹر تک درست ہے۔ ٹرین کی پوزیشنز ہر 5 سیکنڈ میں اپڈیٹ ہوتی ہیں۔" },
  { q: "ٹریک مائی ٹرین کتنی ٹرینیں ٹریک کرتا ہے؟", a: "ہم 164+ پاکستان ریلوے ٹرینیں ٹریک کرتے ہیں جن میں خیبر میل، تیزگام، گرین لائن ایکسپریس، قراقرم ایکسپریس شامل ہیں۔" },
  { q: "کیا یہ تمام ڈیوائسز پر کام کرتا ہے؟", a: "جی ہاں! ٹریک مائی ٹرین مکمل طور پر ریسپانسو ہے اور کسی بھی ڈیوائس پر کام کرتا ہے۔ یہ 2G/3G کنکشنز کے لیے بھی موزوں ہے۔" },
  { q: "میں غلط ڈیٹا کی اطلاع کیسے دے سکتا ہوں؟", a: "ہمارے رابطہ صفحے پر جائیں trackmytrain.pk/ur/contact تاکہ ڈیٹا کے مسائل کی اطلاع دیں، فیچرز تجویز کریں، یا فیڈبیک فراہم کریں۔" },
];

const teamValues = [
  { icon: Target, title: "درستگی سب سے پہلے", desc: "ہر ڈیٹا پوائنٹ تصدیق شدہ ہے۔ ہم GPS ٹریکنگ کو آفیشل شیڈولز کے ساتھ ملا کر سب سے قابل اعتماد ٹرین معلومات فراہم کرتے ہیں۔", gradient: "gradient-card-emerald" },
  { icon: Users, title: "سب کے لیے بنایا گیا", desc: "دو لسانی سپورٹ (انگریزی اور اردو)، موبائل آپٹیمائزڈ، سست 2G/3G نیٹ ورکس پر بھی کام کرتا ہے۔", gradient: "gradient-card-amber" },
  { icon: Shield, title: "پرائیویسی بائی ڈیزائن", desc: "کوئی اکاؤنٹ نہیں، کوئی ذاتی ڈیٹا ٹریکنگ نہیں۔ GPS ڈیٹا مقامی طور پر پراسیس ہوتا ہے۔", gradient: "gradient-card-blue" },
  { icon: Globe, title: "کمیونٹی پر مبنی", desc: "ہزاروں پاکستانی مسافروں کے فیڈبیک سے تیار کردہ۔ ہر فیچر آپ کی تجویز پر مبنی ہے۔", gradient: "gradient-card-purple" },
];

export default function UrduAboutPage() {
  return (
    <div>
      <SEOHead
        title="ٹریک مائی ٹرین کے بارے میں — پاکستان کا نمبر 1 آزاد ٹرین ٹریکنگ پلیٹ فارم"
        description="ٹریک مائی ٹرین پاکستان کی سب سے قابل اعتماد آزاد ریلوے ٹریکنگ سروس ہے۔ ہمارے مشن، ٹیم کی اقدار، اور 164+ ٹرینوں کی مفت ریئل ٹائم GPS ٹریکنگ کے بارے میں جانیں۔"
        canonical="/ur/about"
        lang="ur"
        alternateEnglish="/about"
        keywords="ٹریک مائی ٹرین کے بارے میں, پاکستان ٹرین ٹریکنگ, آزاد ریلوے ٹریکر"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }, { name: "ہمارے بارے میں", url: "/ur/about" }]}
        faqSchema={aboutFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "ٹریک مائی ٹرین کے بارے میں",
          "inLanguage": "ur",
          "mainEntity": {
            "@type": "Organization",
            "name": "Track My Train",
            "url": "https://trackmytrain.pk",
            "foundingDate": "2024",
            "areaServed": { "@type": "Country", "name": "Pakistan" }
          }
        }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground py-14 sm:py-20">
        <div className="absolute inset-0">
          <img src={heroTrainBg} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-10" width={1920} height={1080} />
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[hsl(152_55%_40%/0.08)] blur-3xl" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2.5 bg-[hsl(152_55%_40%/0.15)] backdrop-blur-sm border border-[hsl(152_55%_40%/0.3)] rounded-full px-5 py-2.5 text-sm mb-6 shadow-lg shadow-[hsl(152_55%_40%/0.1)]">
            <Shield className="w-4 h-4" /> پاکستان کا نمبر 1 آزاد ٹرین ٹریکر
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 drop-shadow-sm">
            ہمارے <span className="text-gradient-gold">بارے میں</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl opacity-85 max-w-2xl mx-auto mt-5 leading-relaxed">
            پاکستان کا آزاد، کمیونٹی پر مبنی پلیٹ فارم جو لاکھوں مسافروں کے لیے ریلوے سفر کو آسان بنانے کے لیے وقف ہے۔ مفت، درست، اور محبت سے بنایا گیا۔
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { value: "164+", label: "ٹرینیں ٹریک", icon: Train, gradient: "gradient-card-emerald" },
            { value: "342+", label: "اسٹیشنز", icon: MapPin, gradient: "gradient-card-amber" },
            { value: "5s", label: "اپڈیٹ فریکوئنسی", icon: Clock, gradient: "gradient-card-blue" },
            { value: "مفت", label: "ہمیشہ مفت", icon: Heart, gradient: "gradient-card-rose" },
          ].map((s) => (
            <Card key={s.label} className={`${s.gradient} border hover-lift shadow-lg`}>
              <CardContent className="p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">{s.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values */}
      <section className="container mx-auto px-4 py-14 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">ہماری <span className="text-gradient-green">اقدار</span></h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {teamValues.map((v) => (
              <Card key={v.title} className={`${v.gradient} border hover-lift shadow-md group relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/5 -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-6 sm:p-7 relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/50 py-14 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 justify-center mb-10">
            <div className="h-px flex-1 max-w-16 bg-accent/30" />
          <h2 className="text-2xl sm:text-3xl font-black text-center">
            اکثر پوچھے جانے والے <span className="text-gradient-gold">سوالات</span>
          </h2>
            <div className="h-px flex-1 max-w-16 bg-accent/30" />
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {aboutFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-right font-semibold text-sm sm:text-base py-5">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Language switch */}
      <div className="bg-card border-t py-4 text-center">
        <p className="text-sm text-muted-foreground">
          یہ صفحہ انگریزی میں بھی دستیاب ہے: <Link to="/about" className="text-primary font-semibold hover:underline">English version →</Link>
        </p>
      </div>
    </div>
  );
}
