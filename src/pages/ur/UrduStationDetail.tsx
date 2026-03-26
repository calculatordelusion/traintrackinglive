import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import UrduRelatedLinks from "@/components/ur/UrduRelatedLinks";
import { getStationBySlug } from "@/data/stations";
import { trains } from "@/data/trains";

export default function UrduStationDetail() {
  const { slug } = useParams();
  const station = getStationBySlug(slug || "");

  if (!station) {
    return <div className="container mx-auto px-4 py-16 text-center"><h1 className="text-2xl font-black mb-2">اسٹیشن دستیاب نہیں</h1><Link to="/ur/stations" className="text-primary font-semibold hover:underline">تمام اسٹیشنز پر واپس جائیں</Link></div>;
  }

  const stationTrains = trains.filter((train) => station.trainIds.includes(train.id));
  const expressTrains = stationTrains.filter((train) => train.type === "express" || train.type === "ac");
  const stationFaqs = [
    { q: `${station.nameUrdu} سے کتنی ٹرینیں گزرتی ہیں؟`, a: `اس اسٹیشن سے مجموعی طور پر ${stationTrains.length} ٹرینیں وابستہ ہیں۔` },
    { q: `${station.nameUrdu} پر کیا سہولیات دستیاب ہیں؟`, a: `اہم سہولیات میں ${station.facilities.join("، ")} شامل ہیں۔` },
    { q: `${station.nameUrdu} کس شہر میں واقع ہے؟`, a: `${station.nameUrdu}، ${station.city}، ${station.province} میں واقع ہے۔` },
    { q: `کیا اس اسٹیشن کی لائیو ٹرینیں دیکھی جا سکتی ہیں؟`, a: `جی ہاں، متعلقہ ٹرینوں کے تفصیلی صفحات اور لائیو اسٹیٹس دستیاب ہیں۔` },
  ];

  return (
    <div>
      <SEOHead
        title={`${station.nameUrdu} ریلوے اسٹیشن — ٹرینیں، سہولیات اور معلومات 2026`}
        description={`${station.nameUrdu} (${station.name})، ${station.city} میں واقع ریلوے اسٹیشن۔ دستیاب ٹرینیں، سہولیات، اور بنیادی معلومات اردو میں دیکھیں۔`}
        canonical={`/ur/stations/${station.slug}`}
        lang="ur"
        alternateEnglish={`/stations/${station.slug}`}
        keywords={`${station.nameUrdu}, ${station.name}, ریلوے اسٹیشن, ٹرینیں, سہولیات`}
        breadcrumbs={[
          { name: "ہوم", url: "/ur" },
          { name: "اسٹیشنز", url: "/ur/stations" },
          { name: station.nameUrdu, url: `/ur/stations/${station.slug}` },
        ]}
        faqSchema={stationFaqs}
      />

      <section className="bg-hero-gradient text-primary-foreground py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-sm opacity-80 mb-4 flex items-center gap-2">
            <Link to="/ur">ہوم</Link><span>›</span><Link to="/ur/stations">اسٹیشنز</Link><span>›</span><span>{station.nameUrdu}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">{station.nameUrdu}</h1>
          <p className="mt-2 opacity-85">{station.name} • {station.city}, {station.province}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-muted p-4"><div className="text-xs text-muted-foreground mb-1">ٹرینیں</div><div className="text-2xl font-black">{stationTrains.length}</div></div>
              <div className="rounded-xl bg-muted p-4"><div className="text-xs text-muted-foreground mb-1">ایکسپریس</div><div className="text-2xl font-black">{expressTrains.length}</div></div>
              <div className="rounded-xl bg-muted p-4"><div className="text-xs text-muted-foreground mb-1">سہولیات</div><div className="text-2xl font-black">{station.facilities.length}</div></div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3 text-sm text-muted-foreground leading-relaxed">
              <h2 className="text-xl font-black text-foreground">اس اسٹیشن کے بارے میں</h2>
              <p>{station.nameUrdu} پاکستان ریلوے نیٹ ورک کے اہم اسٹیشنز میں شامل ہے اور {station.city} کے مسافروں کو بڑے شہروں سے جوڑتا ہے۔</p>
              <p>یہاں دستیاب سہولیات میں {station.facilities.join("، ")} شامل ہیں۔ سفر سے پہلے متعلقہ ٹرین کا لائیو اسٹیٹس چیک کرنا زیادہ مفید رہتا ہے۔</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-black mb-4">اس اسٹیشن سے وابستہ ٹرینیں</h2>
              <div className="space-y-3">
                {stationTrains.map((train) => (
                  <Link key={train.id} to={`/ur/train/${train.id}`} className="flex items-center justify-between gap-3 rounded-xl border p-4 hover:border-primary/40 transition-colors">
                    <div>
                      <div className="font-semibold">{train.name} {train.number}</div>
                      <div className="text-xs text-muted-foreground">{train.nameUrdu}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{train.from} → {train.to}</div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-black mb-4">عمومی سوالات</h2>
              <Accordion type="single" collapsible>
                {stationFaqs.map((faq, index) => (
                  <AccordionItem key={faq.q} value={`faq-${index}`}>
                    <AccordionTrigger className="text-right">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-black text-lg mb-3">سہولیات</h3>
              <div className="flex flex-wrap gap-2">
                {station.facilities.map((facility) => <span key={facility} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{facility}</span>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="font-black text-lg mb-2">فوری لنکس</h3>
              <Link to="/ur/train" className="block text-sm hover:text-primary">• لائیو ٹرینیں</Link>
              <Link to="/ur/planner" className="block text-sm hover:text-primary">• سفر پلانر</Link>
              <Link to="/ur/schedule" className="block text-sm hover:text-primary">• شیڈول</Link>
              <Link to="/ur/check-delays" className="block text-sm hover:text-primary">• تاخیر چیک کریں</Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <RelatedLinks context="station" currentName={station.name} />
    </div>
  );
}