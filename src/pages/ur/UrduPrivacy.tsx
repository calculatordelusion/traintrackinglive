import SEOHead from "@/components/SEOHead";
import UrduPageShell from "@/components/UrduPageShell";
import UrduPrivacyContent from "@/components/ur/UrduPrivacyContent";
import { Shield, Lock, Eye } from "lucide-react";

const faqs = [
  { q: "ٹریک مائی ٹرین کون سا ذاتی ڈیٹا جمع کرتا ہے؟", a: "ہم کم سے کم ڈیٹا جمع کرتے ہیں۔ ہم کوئی اکاؤنٹ نہیں بناتے، ای میل ایڈریس نہیں مانگتے، اور ذاتی معلومات ذخیرہ نہیں کرتے۔" },
  { q: "کیا GPS لوکیشن ڈیٹا محفوظ ہے؟", a: "آپ کی GPS لوکیشن صرف آپ کے فون پر مقامی طور پر پراسیس ہوتی ہے۔ ہم یہ ڈیٹا اپنے سرورز پر نہیں بھیجتے۔" },
  { q: "کوکیز کیسے استعمال ہوتی ہیں؟", a: "ہم صرف ضروری تکنیکی کوکیز استعمال کرتے ہیں جیسے تھیم ترجیح اور زبان کی ترجیح۔ کوئی ٹریکنگ کوکیز استعمال نہیں ہوتیں۔" },
];

export default function UrduPrivacy() {
  return (
    <div>
      <SEOHead
        title="رازداری کی پالیسی — ٹریک مائی ٹرین | آپ کا ڈیٹا محفوظ ہے"
        description="ٹریک مائی ٹرین کی رازداری کی پالیسی۔ ہم آپ کا ذاتی ڈیٹا جمع نہیں کرتے۔ مکمل رازداری کی ضمانت۔"
        canonical="/ur/privacy" lang="ur" alternateEnglish="/privacy"
        keywords="رازداری کی پالیسی, ٹریک مائی ٹرین رازداری, ڈیٹا تحفظ"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }, { name: "رازداری", url: "/ur/privacy" }]}
        faqSchema={faqs}
      />
      <UrduPageShell
        badge="آپ کا ڈیٹا محفوظ ہے"
        badgeIcon={Shield}
        titleBefore="رازداری کی"
        titleHighlight="پالیسی"
        description="ٹریک مائی ٹرین آپ کی رازداری کو سنجیدگی سے لیتا ہے۔ ہم کوئی ذاتی ڈیٹا جمع نہیں کرتے، اشتہارات نہیں دکھاتے، اور GPS لوکیشن صرف مقامی طور پر استعمال ہوتی ہے۔"
        infoCards={[
          { icon: Lock, title: "کوئی ذاتی ڈیٹا نہیں", desc: "کوئی اکاؤنٹ نہیں، کوئی ای میل نہیں، کوئی ذاتی معلومات نہیں۔ آپ بغیر رجسٹریشن کے تمام فیچرز استعمال کر سکتے ہیں۔", gradient: "gradient-card-emerald" },
          { icon: Shield, title: "مقامی GPS پراسیسنگ", desc: "آپ کی لوکیشن صرف آپ کے فون پر پراسیس ہوتی ہے۔ ہم GPS ڈیٹا سرور پر نہیں بھیجتے اور کسی سے شیئر نہیں کرتے۔", gradient: "gradient-card-amber" },
          { icon: Eye, title: "کوئی ٹریکنگ نہیں", desc: "کوئی تیسرے فریق ٹریکرز، ایڈ نیٹ ورکس، یا اینالیٹکس سروسز نہیں جو آپ کی آن لائن سرگرمیوں کو ٹریک کریں۔", gradient: "gradient-card-blue" },
        ]}
        faqs={faqs}
        englishPath="/privacy"
      >
        <UrduPrivacyContent />
      </UrduPageShell>
    </div>
  );
}
