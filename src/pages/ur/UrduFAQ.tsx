import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Train, CreditCard, Navigation, MapPin, Zap, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroTrainBg from "@/assets/hero-train-bg.webp";

const faqCategories = [
  {
    id: "general", title: "عمومی سوالات", icon: HelpCircle, gradient: "gradient-card-emerald",
    faqs: [
      { q: "میں پاکستان ریلوے ٹکٹ آن لائن کیسے بک کروں؟", a: "آپ آفیشل پاکستان ریلوے ویب سائٹ (pak-railways.gov.pk) یا موبائل ایپ کے ذریعے ٹکٹ بک کرا سکتے ہیں۔ اکاؤنٹ بنائیں، اپنی ٹرین تلاش کریں، سیٹیں منتخب کریں، اور کریڈٹ کارڈ، ڈیبٹ کارڈ، یا جیز کیش/ایزی پیسہ سے ادائیگی کریں۔" },
      { q: "پاکستان ریلوے ہیلپ لائن نمبر کیا ہے؟", a: "مرکزی ہیلپ لائن 117 ہے جو 24/7 دستیاب ہے۔ آپ علاقائی دفاتر سے بھی رابطہ کر سکتے ہیں: کراچی (021-99213012)، لاہور (042-99211080)، راولپنڈی (051-9270831)۔" },
      { q: "مجھے اسٹیشن پر کتنی جلدی پہنچنا چاہیے؟", a: "ایکسپریس ٹرینوں کے لیے کم از کم 30-45 منٹ پہلے، اور لوکل ٹرینوں کے لیے 15-20 منٹ پہلے پہنچیں۔ عید کے موسم میں کم از کم 1 گھنٹہ پہلے پہنچیں۔" },
      { q: "کیا میں اپنا ٹرین ٹکٹ منسوخ یا تبدیل کر سکتا ہوں؟", a: "جی ہاں۔ 24+ گھنٹے پہلے: مکمل ریفنڈ (مائنس 50 روپے فیس)۔ 24 گھنٹے کے اندر: 75%۔ 12 گھنٹے کے اندر: 50%۔ 4 گھنٹے کے اندر: 25%۔ روانگی کے بعد کوئی ریفنڈ نہیں۔" },
    ],
  },
  {
    id: "tracking", title: "ٹرین ٹریکنگ", icon: Navigation, gradient: "gradient-card-blue",
    faqs: [
      { q: "ریئل ٹائم ٹرین ٹریکنگ کیسے کام کرتی ہے؟", a: "ہمارا پلیٹ فارم لائیو GPS ٹریکنگ سسٹمز سے مسلسل پوزیشن اپڈیٹس وصول کرتا ہے۔ ہم انٹرایکٹو نقشوں پر رفتار، تاخیر، اور ETA معلومات کے ساتھ پوزیشنز دکھاتے ہیں۔ ڈیٹا ہر 5 سیکنڈ میں ریفریش ہوتا ہے۔" },
      { q: "GPS ٹریکنگ کتنی درست ہے؟", a: "ہماری GPS ٹریکنگ 100-500 میٹر تک درست ہے۔ سرنگوں اور پہاڑی علاقوں میں درستگی متاثر ہو سکتی ہے۔" },
      { q: "'میری ٹرین تلاش کریں' فیچر کیا ہے؟", a: "یہ فیچر آپ کے فون کا GPS استعمال کرکے خودکار طور پر پتا لگاتا ہے کہ آپ کس ٹرین میں ہیں۔ یہ 2 کلومیٹر کے اندر تمام فعال ٹرینوں سے آپ کی قربت کا حساب لگاتا ہے۔" },
    ],
  },
  {
    id: "tickets", title: "ٹکٹ اور بکنگ", icon: CreditCard, gradient: "gradient-card-amber",
    faqs: [
      { q: "کون سے ادائیگی کے طریقے قبول ہیں؟", a: "آن لائن: کریڈٹ/ڈیبٹ کارڈ (ویزا، ماسٹرکارڈ)، جیز کیش، ایزی پیسہ۔ اسٹیشن کاؤنٹرز پر نقد بھی قبول ہے۔" },
      { q: "کیا طلباء یا بزرگوں کے لیے رعایت ہے؟", a: "جی ہاں! طلباء: 25% رعایت۔ بزرگ شہری (60+): 25%۔ معذور افراد: 50%۔ صحافی: 50%۔ 3-12 سال کے بچے: آدھا کرایہ۔ 3 سال سے کم: مفت (بغیر سیٹ)۔" },
    ],
  },
  {
    id: "stations", title: "اسٹیشنز اور سفر", icon: MapPin, gradient: "gradient-card-rose",
    faqs: [
      { q: "پاکستان میں کتنے ریلوے اسٹیشن ہیں؟", a: "پاکستان ریلوے 342+ بڑے ریلوے اسٹیشنز کا نیٹ ورک چلاتا ہے جو چاروں صوبوں میں پھیلے ہوئے ہیں۔" },
      { q: "پاکستان کا سب سے بڑا ریلوے اسٹیشن کون سا ہے؟", a: "لاہور جنکشن پاکستان کا سب سے بڑا اور مصروف ترین ریلوے اسٹیشن ہے جس میں 9 پلیٹ فارمز ہیں اور یہ سالانہ لاکھوں مسافروں کو خدمت فراہم کرتا ہے۔" },
    ],
  },
];

export default function UrduFAQPage() {
  return (
    <div>
      <SEOHead
        title="عمومی سوالات — پاکستان ریلوے سے متعلق سوالات کے جوابات 2026"
        description="پاکستان ریلوے، ٹکٹ بکنگ، لائیو ٹرین ٹریکنگ، اور سفری رہنمائی سے متعلق تمام اکثر پوچھے جانے والے سوالات کے جوابات یہاں پائیں۔"
        canonical="/ur/faq"
        lang="ur"
        alternateEnglish="/faq"
        keywords="پاکستان ریلوے سوالات, عمومی سوالات جوابات, ریلوے سفر مدد, پہلی بار ٹرین سفر اردو"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }, { name: "عمومی سوالات", url: "/ur/faq" }]}
        faqSchema={faqCategories.flatMap(c => c.faqs)}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground py-14 sm:py-20">
        <div className="absolute inset-0">
          <img src={heroTrainBg} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-10" width={1920} height={1080} />
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[hsl(152_55%_40%/0.08)] blur-3xl" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[hsl(152_55%_40%/0.15)] backdrop-blur-sm border border-[hsl(152_55%_40%/0.3)] rounded-full px-5 py-2.5 text-sm mb-6 shadow-lg shadow-[hsl(152_55%_40%/0.1)]">
            <HelpCircle className="w-4 h-4" /> تمام سوالات کے جوابات ایک جگہ
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 drop-shadow-sm">
            اکثر پوچھے جانے والے <span className="text-gradient-gold">سوالات</span>
          </h1>
          <p className="text-base sm:text-lg opacity-85 max-w-2xl mx-auto">
            پاکستان ریلوے، ٹکٹ بکنگ، لائیو ٹریکنگ، اور سفری منصوبہ بندی سے متعلق ہر سوال کا جواب
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((cat) => (
            <div key={cat.id}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{cat.title}</h2>
              </div>
              <Accordion type="single" collapsible className="space-y-3">
                {cat.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`${cat.id}-${i}`} className="border rounded-xl px-5 shadow-sm hover:shadow-md transition-shadow">
                    <AccordionTrigger className="text-right font-semibold text-sm sm:text-base py-5">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Help Center */}
        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">پاکستان ریلوے ہیلپ سینٹر</h2>
          <div className="text-sm text-muted-foreground space-y-4">
            <p>یہ عمومی سوالات کا صفحہ پاکستان ریلوے سے متعلق سب سے زیادہ پوچھے جانے والے سوالات کا احاطہ کرتا ہے — ٹکٹ بکنگ اور کرایے کے سوالات سے لے کر لائیو ٹرین ٹریکنگ اور سفری منصوبہ بندی تک۔</p>
            <p>آفیشل پاکستان ریلوے سوالات کے لیے ہیلپ لائن <strong className="text-foreground">117</strong> پر رابطہ کریں۔</p>
          </div>
        </section>
      </div>

      <div className="bg-card border-t py-4 text-center">
        <p className="text-sm text-muted-foreground">
          یہ صفحہ انگریزی میں بھی دستیاب ہے: <Link to="/faq" className="text-primary font-semibold hover:underline">English version →</Link>
        </p>
      </div>
    </div>
  );
}
