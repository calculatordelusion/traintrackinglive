import SEOHead from "@/components/SEOHead";
import UrduPageShell from "@/components/UrduPageShell";
import Blog from "@/pages/Blog";
import { BookOpen, Newspaper, Lightbulb, TrendingUp } from "lucide-react";

const faqs = [
  { q: "ٹریک مائی ٹرین بلاگ پر کیا مواد ملتا ہے؟", a: "ہمارا بلاگ پاکستان ریلوے سے متعلق تازہ ترین خبریں، سفری گائیڈز، ٹپس اینڈ ٹرکس، نئی ٹرین سروسز کے اعلانات، اور ریلوے کی جدید کاری کے منصوبوں پر تفصیلی مضامین شائع کرتا ہے۔" },
  { q: "بلاگ کتنی بار اپڈیٹ ہوتا ہے؟", a: "ہم ہفتے میں 1-2 نئے مضامین شائع کرتے ہیں۔ فوری خبریں فوری طور پر شائع ہو جاتی ہیں۔" },
  { q: "کیا بلاگ اردو اور انگریزی دونوں میں دستیاب ہے؟", a: "جی ہاں! ہمارا بلاگ دونوں زبانوں میں دستیاب ہے۔" },
  { q: "کیا میں بلاگ کے لیے مضمون لکھ سکتا ہوں؟", a: "جی ہاں! ہم کمیونٹی سے تحریری حصہ لینے کا خیرمقدم کرتے ہیں۔ اپنا سفری تجربہ ہمارے رابطہ صفحے (/ur/contact) کے ذریعے بھیجیں۔" },
];

export default function UrduBlog() {
  return (
    <div>
      <SEOHead
        title="بلاگ — پاکستان ریلوے خبریں، سفری گائیڈز اور اپڈیٹس 2026"
        description="پاکستان ریلوے کی تازہ ترین خبریں، نئی ٹرین سروسز، سفری گائیڈز، ٹپس، کرایوں کی تبدیلیاں، اور ریلوے جدید کاری کی تفصیلات۔"
        canonical="/ur/blog" lang="ur" alternateEnglish="/blog"
        keywords="پاکستان ریلوے بلاگ, ریلوے خبریں, سفری گائیڈ"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }, { name: "بلاگ", url: "/ur/blog" }]}
        faqSchema={faqs}
      />
      <UrduPageShell
        badge="تازہ ترین خبریں اور گائیڈز"
        badgeIcon={Newspaper}
        titleBefore="پاکستان ریلوے"
        titleHighlight="بلاگ"
        description="پاکستان ریلوے کی تازہ ترین خبریں، سفری گائیڈز، ٹپس اینڈ ٹرکس، نئی ٹرین سروسز، کرایوں کی تبدیلیاں، اور ریلوے جدید کاری — ہفتہ وار اپڈیٹ شدہ۔"
        infoCards={[
          { icon: BookOpen, title: "تفصیلی سفری گائیڈز", desc: "ہر ٹرین، روٹ، اور اسٹیشن کے بارے میں تفصیلی گائیڈز جن میں ٹپس، کرایے، اور عملی مشورے شامل ہیں۔", gradient: "gradient-card-emerald" },
          { icon: Lightbulb, title: "سفری ٹپس", desc: "پاکستان ریلوے میں سفر کو آسان اور آرام دہ بنانے کے لیے عملی مشورے اور بہترین طریقے۔", gradient: "gradient-card-amber" },
          { icon: TrendingUp, title: "تازہ ترین اپڈیٹس", desc: "نئی ٹرین سروسز، کرایوں میں تبدیلیاں، اور ML-1 اپ گریڈ جیسے ترقیاتی منصوبوں کی خبریں۔", gradient: "gradient-card-blue" },
        ]}
        faqs={faqs}
        englishPath="/blog"
      >
        <Blog />
      </UrduPageShell>
    </div>
  );
}
