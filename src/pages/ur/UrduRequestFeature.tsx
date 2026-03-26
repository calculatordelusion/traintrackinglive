import SEOHead from "@/components/SEOHead";
import UrduPageShell from "@/components/UrduPageShell";
import UrduRequestFeatureForm from "@/components/ur/UrduRequestFeatureForm";
import { Lightbulb, MessageSquare, Users } from "lucide-react";

export default function UrduRequestFeature() {
  return (
    <div>
      <SEOHead
        title="فیچر تجویز کریں — ٹریک مائی ٹرین کو بہتر بنائیں"
        description="ٹریک مائی ٹرین کے لیے نئے فیچرز تجویز کریں۔ آپ کی تجاویز ہمارے پلیٹ فارم کو بہتر بنانے میں مدد کرتی ہیں۔"
        canonical="/ur/request-feature" lang="ur" alternateEnglish="/request-feature"
        keywords="فیچر تجویز, ٹریک مائی ٹرین تجاویز"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }, { name: "فیچر تجویز کریں", url: "/ur/request-feature" }]}
      />
      <UrduPageShell
        badge="کمیونٹی پر مبنی ترقی"
        badgeIcon={Lightbulb}
        titleBefore="فیچر"
        titleHighlight="تجویز"
        titleAfter="کریں"
        description="ٹریک مائی ٹرین کو بہتر بنانے میں ہماری مدد کریں۔ نئے فیچرز، بہتری کی تجاویز، یا کسی بھی آئیڈیا کا اشتراک کریں — ہم سنتے ہیں اور عمل کرتے ہیں۔"
        infoCards={[
          { icon: Lightbulb, title: "آپ کے آئیڈیاز", desc: "ہر نیا فیچر ایک تجویز سے شروع ہوتا ہے۔ آپ کی رائے ہمارے پلیٹ فارم کی سمت طے کرتی ہے۔", gradient: "gradient-card-emerald" },
          { icon: MessageSquare, title: "براہ راست فیڈبیک", desc: "آپ کی تجویز ہماری ٹیم تک براہ راست پہنچتی ہے۔ ہم ہر تجویز کا جائزہ لیتے ہیں اور ترجیح دیتے ہیں۔", gradient: "gradient-card-amber" },
          { icon: Users, title: "کمیونٹی سے تیار", desc: "ٹریک مائی ٹرین کے زیادہ تر فیچرز صارفین کی تجاویز پر مبنی ہیں۔ آپ بھی حصہ ڈالیں!", gradient: "gradient-card-blue" },
        ]}
        faqs={[
          { q: "فیچر تجویز کیسے کریں؟", a: "نیچے فارم میں اپنی تجویز لکھیں۔ جتنی تفصیل سے بتائیں اتنا بہتر — کیا فیچر چاہیے، کیوں ضروری ہے، اور کیسے کام کرے۔" },
          { q: "تجویز پر عمل کب ہوگا؟", a: "ہم تمام تجاویز کا جائزہ لیتے ہیں اور مقبول ترین آئیڈیاز کو ترجیح دیتے ہیں۔ عام طور پر 2-4 ہفتے میں اپڈیٹ آتا ہے۔" },
        ]}
        englishPath="/request-feature"
      >
        <UrduRequestFeatureForm />
      </UrduPageShell>
    </div>
  );
}
