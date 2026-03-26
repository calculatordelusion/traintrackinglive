import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const sitemapSections = [
  { title: "اہم ٹولز", links: [
    { label: "لائیو ٹرین ٹریکر", path: "/ur/train" },
    { label: "میری ٹرین تلاش کریں", path: "/ur/find-my-train" },
    { label: "سفر پلانر", path: "/ur/planner" },
    { label: "مکمل شیڈول", path: "/ur/schedule" },
    { label: "تاخیر چیک کریں", path: "/ur/check-delays" },
  ]},
  { title: "معلوماتی صفحات", links: [
    { label: "ایکسپریس ٹرینیں", path: "/ur/express-trains" },
    { label: "گرین لائن ایکسپریس", path: "/ur/green-line-express" },
    { label: "ٹکٹ کی قیمتیں", path: "/ur/ticket-pricing" },
    { label: "ٹکٹ بکنگ گائیڈ", path: "/ur/buy-tickets" },
    { label: "روٹس", path: "/ur/routes" },
    { label: "اسٹیشنز", path: "/ur/stations" },
    { label: "شیڈول گائیڈ", path: "/ur/schedule-guide" },
  ]},
  { title: "مدد اور رابطہ", links: [
    { label: "ریلوے ہیلپ لائن", path: "/ur/railway-helpline" },
    { label: "عمومی سوالات", path: "/ur/faq" },
    { label: "رابطہ کریں", path: "/ur/contact" },
    { label: "فیچر تجویز کریں", path: "/ur/request-feature" },
    { label: "ہمارے بارے میں", path: "/ur/about" },
  ]},
  { title: "قانونی", links: [
    { label: "شرائط استعمال", path: "/ur/terms" },
    { label: "رازداری کی پالیسی", path: "/ur/privacy" },
    { label: "اظہار لاتعلقی", path: "/ur/disclaimer" },
  ]},
  { title: "بلاگ", links: [
    { label: "تمام مضامین", path: "/ur/blog" },
  ]},
];

export default function UrduSitemapContent() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-6">
        {sitemapSections.map((section) => (
          <Card key={section.title} className="border hover-lift">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-black">{section.title}</h2>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <Link key={link.path} to={link.path} className="block text-sm text-primary hover:underline py-1">
                    → {link.label}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
