import SEOHead from "@/components/SEOHead";
import UrduPageShell from "@/components/UrduPageShell";
import UrduJourneyPlannerTool from "@/components/ur/UrduJourneyPlannerTool";
import { Route, MapPin, Clock, CreditCard, Train, Zap } from "lucide-react";

const faqs = [
  { q: "جرنی پلانر کیسے استعمال کریں؟", a: "ابتدائی اسٹیشن اور منزل کا اسٹیشن منتخب کریں۔ سسٹم خود بخود تمام دستیاب ٹرینیں، اوقات، سفر کا دورانیہ، اور تخمینی کرایے دکھائے گا۔ آپ تاریخ اور کلاس فلٹر بھی استعمال کر سکتے ہیں۔" },
  { q: "کیا جرنی پلانر تمام اسٹیشنز سپورٹ کرتا ہے؟", a: "جی ہاں! ہمارا جرنی پلانر تمام 342+ پاکستان ریلوے اسٹیشنز کو سپورٹ کرتا ہے۔ اردو اور انگریزی دونوں زبانوں میں اسٹیشن تلاش ممکن ہے۔" },
  { q: "سفر کی منصوبہ بندی میں کرایہ کیسے دیکھیں؟", a: "جب آپ دو اسٹیشنز منتخب کرتے ہیں تو ہر دستیاب ٹرین کے ساتھ تخمینی کرایہ تمام کلاسز (اکانومی، AC سٹر، AC بزنس) میں دکھایا جاتا ہے۔" },
  { q: "کیا کنکشن والے سفر بھی دکھائے جاتے ہیں؟", a: "فی الحال ہمارا پلانر ڈائریکٹ ٹرین کنکشنز دکھاتا ہے۔ اگر کوئی ڈائریکٹ ٹرین دستیاب نہ ہو تو سسٹم قریبی جنکشن اسٹیشن کی تجویز دیتا ہے جہاں سے آپ دوسری ٹرین لے سکتے ہیں۔" },
  { q: "سب سے تیز روٹ کیسے تلاش کریں؟", a: "جرنی پلانر میں نتائج خود بخود سفر کے دورانیے کے حساب سے ترتیب دیے جاتے ہیں۔ سب سے اوپر والی ٹرین سب سے تیز آپشن ہوگی۔" },
  { q: "عید کے دوران سفر کی منصوبہ بندی کیسے کریں؟", a: "عید سے 2-3 ہفتے پہلے سفر پلان کریں۔ مقبول روٹس (لاہور-کراچی، اسلام آباد-لاہور) پر ٹکٹ جلد ختم ہو جاتی ہیں۔" },
  { q: "کیا پلانر لائیو تاخیر بھی دکھاتا ہے؟", a: "جرنی پلانر شیڈول پر مبنی ہے۔ لائیو تاخیر کے لیے لائیو ٹرینز صفحہ (/ur/train) یا تاخیر چیکر (/ur/check-delays) استعمال کریں جہاں ریئل ٹائم GPS ڈیٹا دستیاب ہے۔" },
  { q: "رات کے سفر کے لیے کون سی ٹرین بہتر ہے؟", a: "طویل رات کے سفر کے لیے سلیپر یا AC سٹر کلاس والی ایکسپریس ٹرینیں بہترین ہیں۔ تیزگام، خیبر میل، اور گرین لائن میں آرام دہ سلیپر نشستیں دستیاب ہیں۔" },
];

export default function UrduPlanner() {
  return (
    <div>
      <SEOHead
        title="سفر کا منصوبہ — پاکستان ریلوے جرنی پلانر 2026 | ٹرین تلاش کریں"
        description="اسٹیشن سے اسٹیشن تک پاکستان ریلوے سفر کی منصوبہ بندی کریں۔ 342+ اسٹیشنز، دستیاب ٹرینیں، اوقات، کرایے، اور سفر کا دورانیہ فوری طور پر دیکھیں۔ مفت اور بغیر رجسٹریشن۔"
        canonical="/ur/planner"
        lang="ur"
        alternateEnglish="/planner"
        keywords="سفر کا منصوبہ بنائیں, جرنی پلانر, پاکستان ریلوے پلانر, ٹرین سفر منصوبہ, دو اسٹیشنوں کے درمیان ٹرین, بہترین ٹرین تلاش, اسٹیشن سے اسٹیشن سفر"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }, { name: "سفر کا منصوبہ", url: "/ur/planner" }]}
        faqSchema={faqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "پاکستان ریلوے جرنی پلانر",
          "url": "https://trackmytrain.pk/ur/planner",
          "inLanguage": "ur",
          "applicationCategory": "TravelApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
          "description": "342+ اسٹیشنز کے درمیان ٹرین سفر کی منصوبہ بندی کریں"
        }]}
      />
      <UrduPageShell
        badge="سفر کی منصوبہ بندی • 342+ اسٹیشنز"
        badgeIcon={Route}
        titleBefore="سفر کا"
        titleHighlight="منصوبہ"
        titleAfter="بنائیں"
        description="ابتدائی اور منزل کا اسٹیشن منتخب کریں — سسٹم تمام دستیاب ٹرینیں، اوقات، کرایے، اور سفر کا دورانیہ فوری طور پر دکھائے گا۔ 342+ اسٹیشنز میں سے منتخب کریں۔"
        stats={[
          { value: "342+", label: "اسٹیشنز", icon: MapPin, gradient: "gradient-card-emerald" },
          { value: "164+", label: "ٹرینیں", icon: Train, gradient: "gradient-card-amber" },
          { value: "5", label: "کلاسز", icon: CreditCard, gradient: "gradient-card-blue" },
          { value: "فوری", label: "نتائج", icon: Zap, gradient: "gradient-card-rose" },
        ]}
        infoCards={[
          { icon: Route, title: "آسان منصوبہ بندی", desc: "صرف دو اسٹیشنز منتخب کریں اور تمام دستیاب ٹرینیں، اوقات، اور کرایے فوری طور پر نظر آئیں گے۔ سب سے تیز سے سب سے سستی تک ترتیب دیں۔", gradient: "gradient-card-emerald" },
          { icon: CreditCard, title: "کرایوں کا موازنہ", desc: "ہر ٹرین کے تمام کلاسز کے کرایے ایک ساتھ دیکھیں — اکانومی سے AC پارلر تک۔ بجٹ کے مطابق بہترین آپشن منتخب کریں۔", gradient: "gradient-card-amber" },
          { icon: Clock, title: "وقت بچائیں", desc: "اسٹیشن جانے سے پہلے تمام ٹرینوں کے اوقات اور دورانیے دیکھیں۔ سب سے تیز روٹ فوری طور پر تلاش کریں۔", gradient: "gradient-card-blue" },
        ]}
        faqs={faqs}
        ctaTitle="ابھی سفر کا منصوبہ بنائیں"
        ctaDesc="اوپر ابتدائی اور منزل کا اسٹیشن منتخب کریں اور تمام دستیاب ٹرینیں دیکھیں۔"
        englishPath="/planner"
        linkContext="route"
      >
        <UrduJourneyPlannerTool />
      </UrduPageShell>
    </div>
  );
}
