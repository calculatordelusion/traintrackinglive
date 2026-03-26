import SEOHead from "@/components/SEOHead";
import UrduPageShell from "@/components/UrduPageShell";
import Sitemap from "@/pages/Sitemap";
import { Map } from "lucide-react";

export default function UrduSitemap() {
  return (
    <div>
      <SEOHead
        title="سائٹ میپ — ٹریک مائی ٹرین تمام صفحات"
        description="ٹریک مائی ٹرین کے تمام صفحات کا سائٹ میپ۔"
        canonical="/ur/sitemap" lang="ur" alternateEnglish="/sitemap"
        keywords="سائٹ میپ"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }, { name: "سائٹ میپ", url: "/ur/sitemap" }]}
        noindex
      />
      <UrduPageShell
        badge="تمام صفحات کی فہرست"
        badgeIcon={Map}
        titleHighlight="سائٹ میپ"
        description="ٹریک مائی ٹرین کے تمام صفحات کی مکمل فہرست۔ لائیو ٹریکنگ، شیڈول، روٹس، اسٹیشنز، ٹکٹ، اور مزید۔"
        faqs={[]}
        englishPath="/sitemap"
      >
        <Sitemap />
      </UrduPageShell>
    </div>
  );
}
