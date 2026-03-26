import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { getRouteBySlug } from "@/data/routeDetails";
import NotFound from "@/pages/NotFound";

export default function UrduRouteDetail() {
  const { slug } = useParams<{ slug: string }>();
  const route = getRouteBySlug(slug || "");

  if (!route) return <NotFound />;

  return (
    <div>
      <SEOHead
        title={`${route.fromUrdu} سے ${route.toUrdu} ٹرین — روٹ، شیڈول اور کرایہ 2026`}
        description={`${route.fromUrdu} سے ${route.toUrdu} تک ٹرین روٹ، فاصلے، تیز ترین سروس، یومیہ ٹرینیں، اور کرایے اردو میں دیکھیں۔`}
        canonical={`/ur/routes/${route.slug}`}
        lang="ur"
        alternateEnglish={`/routes/${route.slug}`}
        keywords={`${route.fromUrdu}, ${route.toUrdu}, ٹرین روٹ, کرایہ, شیڈول`}
        breadcrumbs={[
          { name: "ہوم", url: "/ur" },
          { name: "روٹس", url: "/ur/routes" },
          { name: `${route.fromUrdu} سے ${route.toUrdu}`, url: `/ur/routes/${route.slug}` },
        ]}
        faqSchema={route.faqs}
      />

      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="inline-flex rounded-full bg-primary-foreground/10 px-4 py-1.5 text-xs font-bold mb-4">روٹ گائیڈ • لائیو معلومات</div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4">{route.fromUrdu} سے {route.toUrdu} ٹرین روٹ</h1>
          <p className="max-w-3xl opacity-90 text-base sm:text-lg">{route.quickAnswer}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "فاصلہ", value: route.distance, gradient: "gradient-card-emerald" },
            { label: "تیز ترین", value: route.fastestDuration, gradient: "gradient-card-amber" },
            { label: "روزانہ ٹرینیں", value: `${route.dailyTrains}+`, gradient: "gradient-card-blue" },
            { label: "کم از کم کرایہ", value: route.fareFrom, gradient: "gradient-card-purple" },
          ].map((item) => (
            <Card key={item.label} className={`${item.gradient} border hover-lift`}><CardContent className="p-4 text-center"><div className="text-2xl font-black">{item.value}</div><div className="text-xs text-muted-foreground">{item.label}</div></CardContent></Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-black mb-4">دستیاب ٹرینیں</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {route.trainOptions.map((train) => (
                <Link key={train.id} to={`/ur/train/${train.id}`}>
                  <Card className="border hover-lift h-full">
                    <CardContent className="p-5 space-y-2">
                      <div className="flex items-center justify-between gap-3"><span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-bold">{train.type}</span><span className="text-xs text-muted-foreground">{train.number}</span></div>
                      <h3 className="font-black">{train.name}</h3>
                      <div className="text-sm text-muted-foreground">دورانیہ: {train.duration}</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-black">تفصیلی رہنمائی</h2>
            {route.detailContent.map((paragraph, index) => <p key={index} className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>)}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-black mb-4">اہم اسٹاپس</h2>
            <div className="flex flex-wrap gap-3">
              {route.keyStops.map((stop) => <span key={stop} className="rounded-full border px-4 py-2 text-sm bg-muted">{stop}</span>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-black mb-4">سفر کے مشورے</h2>
            <div className="space-y-3">
              {route.travelTips.map((tip, index) => <div key={index} className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">• {tip}</div>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-black mb-4">عمومی سوالات</h2>
            <Accordion type="single" collapsible>
              {route.faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-right">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="text-center bg-hero-gradient text-primary-foreground rounded-3xl p-8">
          <h2 className="text-2xl font-black mb-3">اس روٹ کی ٹرین ابھی ٹریک کریں</h2>
          <p className="opacity-85 mb-5">لائیو GPS، رفتار، تاخیر، اور درست ETA دیکھنے کے لیے متعلقہ ٹرین کا صفحہ کھولیں۔</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/ur/train"><Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl">لائیو ٹریکر</Button></Link>
            <Link to="/ur/schedule"><Button variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-transparent rounded-xl">مکمل شیڈول</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}