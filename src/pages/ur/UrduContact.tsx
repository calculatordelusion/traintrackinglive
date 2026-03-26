import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Clock, MessageSquare, MapPin, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import heroTrainBg from "@/assets/hero-train-bg.webp";

const contactFaqs = [
  { q: "ٹریک مائی ٹرین سے جواب ملنے میں کتنا وقت لگتا ہے؟", a: "ہم عام طور پر 2-3 کاروباری دنوں میں تمام سوالات کا جواب دیتے ہیں۔ فوری بگ رپورٹس کے لیے ہم 24 گھنٹے کے اندر جواب دینے کی کوشش کرتے ہیں۔" },
  { q: "کیا میں غلط ٹرین شیڈول ڈیٹا کی اطلاع دے سکتا ہوں؟", a: "بالکل! اگر آپ کو لگتا ہے کہ کسی ٹرین کا شیڈول، روٹ، یا اسٹیشن کی معلومات غلط ہیں تو رابطہ فارم استعمال کریں۔ ہم باقاعدگی سے اپنا ڈیٹا بیس اپڈیٹ کرتے ہیں۔" },
  { q: "کیا میں فون پر ٹرین سے متعلق سوالات پوچھ سکتا ہوں؟", a: "ٹریک مائی ٹرین ایک ڈیجیٹل پلیٹ فارم ہے۔ آفیشل پاکستان ریلوے سوالات کے لیے ہیلپ لائن 117 پر کال کریں۔" },
  { q: "کیا میرا رابطہ فارم ڈیٹا محفوظ ہے؟", a: "ہم رازداری کو سنجیدگی سے لیتے ہیں۔ رابطہ فارم جمع کرانے صرف آپ کے سوال کا جواب دینے کے لیے استعمال ہوتے ہیں۔ ہم آپ کا ڈیٹا تیسرے فریق کو نہیں بیچتے۔" },
];

export default function UrduContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "پیغام بھیج دیا گیا!", description: "ہم 2-3 کاروباری دنوں میں جواب دیں گے۔" });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <SEOHead
        title="ٹریک مائی ٹرین سے رابطہ — فیڈ بیک، بگ رپورٹس اور فیچر ریکوئسٹس"
        description="ٹریک مائی ٹرین ٹیم سے رابطہ کریں۔ بگ رپورٹس، فیچر تجاویز، یا فیڈبیک بھیجیں۔ ہم 2-3 کاروباری دنوں میں جواب دیتے ہیں۔"
        canonical="/ur/contact"
        lang="ur"
        alternateEnglish="/contact"
        keywords="ٹریک مائی ٹرین رابطہ, فیڈبیک, بگ رپورٹ, فیچر ریکوئسٹ"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }, { name: "رابطہ", url: "/ur/contact" }]}
        faqSchema={contactFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "ٹریک مائی ٹرین سے رابطہ",
          "inLanguage": "ur",
          "mainEntity": {
            "@type": "Organization",
            "name": "Track My Train",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Support",
              "email": "info@trackmytrain.pk",
              "availableLanguage": ["English", "Urdu"]
            }
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
            <MessageSquare className="w-4 h-4" /> ہم آپ سے سننا چاہتے ہیں
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 drop-shadow-sm">
            ہم سے <span className="text-gradient-gold">رابطہ</span> کریں
          </h1>
          <p className="text-base sm:text-lg opacity-85 max-w-xl mx-auto">
            بگ رپورٹس، فیچر تجاویز، یا عمومی فیڈبیک — ہم آپ کی بات سننے کے لیے تیار ہیں۔
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="border">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">پیغام بھیجیں</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">آپ کا نام</label>
                  <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="text-right" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">ای میل ایڈریس</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="text-right" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">موضوع</label>
                  <Input value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} required className="text-right" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">آپ کا پیغام</label>
                  <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} required rows={5} className="w-full rounded-md border bg-background px-3 py-2 text-sm text-right" />
                </div>
                <Button type="submit" className="w-full font-bold">پیغام بھیجیں</Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="gradient-card-emerald border">
              <CardContent className="p-6">
                <Mail className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-1">ای میل</h3>
                <p className="text-muted-foreground text-sm">info@trackmytrain.pk</p>
              </CardContent>
            </Card>
            <Card className="gradient-card-amber border">
              <CardContent className="p-6">
                <Phone className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-1">پاکستان ریلوے ہیلپ لائن</h3>
                <p className="text-muted-foreground text-sm">117 (24/7 دستیاب)</p>
                <p className="text-xs text-muted-foreground mt-1">نوٹ: یہ آفیشل پاکستان ریلوے ہیلپ لائن ہے۔</p>
              </CardContent>
            </Card>
            <Card className="gradient-card-blue border">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-1">جوابی وقت</h3>
                <p className="text-muted-foreground text-sm">2-3 کاروباری دن</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-black text-center mb-8">اکثر پوچھے جانے والے <span className="text-gradient-gold">سوالات</span></h2>
          <Accordion type="single" collapsible className="space-y-3">
            {contactFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-4">
                <AccordionTrigger className="text-right font-semibold text-sm sm:text-base py-4">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <div className="bg-card border-t py-4 text-center">
        <p className="text-sm text-muted-foreground">
          This page is available in English: <Link to="/contact" className="text-primary font-semibold hover:underline">Switch to English →</Link>
        </p>
      </div>
    </div>
  );
}
