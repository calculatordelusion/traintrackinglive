import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, Calendar, Clock, CreditCard, HelpCircle, MapPin, Navigation, Search, Train, Wifi } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import RelatedLinks from "@/components/RelatedLinks";
import { fetchTrainDetail, type TrainDetail } from "@/lib/trainApi";

export default function UrduTrainDetail() {
  const { id } = useParams();
  const [train, setTrain] = useState<TrainDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTrainDetail(Number(id));
        setTrain(data);
        setLastUpdate(new Date());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">ٹرین کی تفصیلات لوڈ ہو رہی ہیں...</div>;
  }

  if (!train) {
    return <div className="container mx-auto px-4 py-16 text-center"><h1 className="text-2xl font-black mb-2">ٹرین نہیں ملی</h1><Link to="/ur/train" className="text-primary font-semibold hover:underline">لائیو ٹرینوں پر واپس جائیں</Link></div>;
  }

  const live = train.livePosition;
  const delay = live?.delayMinutes ?? 0;
  const trainFaqs = [
    { q: `${train.name} ${train.number} کس روٹ پر چلتی ہے؟`, a: `${train.name} ${train.number} ${train.from} سے ${train.to} تک چلتی ہے اور کل سفر کا دورانیہ ${train.duration} ہے۔` },
    { q: `کیا ${train.name} آج چل رہی ہے؟`, a: `${train.name} ${train.days.join("، ")} کو چلتی ہے۔ موجودہ اسٹیٹس: ${train.status === "active" ? "فعال" : "غیر فعال"}۔` },
    { q: `${train.name} کی لائیو ٹریکنگ کیسے دیکھیں؟`, a: `اسی صفحے پر GPS پوزیشن، رفتار، تاخیر، اور اگلے اسٹیشن کی معلومات دستیاب ہیں۔` },
    { q: `${train.name} میں تاخیر کتنی ہے؟`, a: live ? (delay === 0 ? "اس وقت یہ ٹرین وقت پر چل رہی ہے۔" : `اس وقت یہ ٹرین تقریباً ${delay} منٹ تاخیر سے چل رہی ہے۔`) : "اس وقت لائیو پوزیشن دستیاب نہیں۔" },
  ];

  return (
    <div>
      <SEOHead
        title={`${train.name} ${train.number} — لائیو اسٹیٹس، روٹ اور شیڈول 2026`}
        description={`${train.name} ${train.number} کی لائیو ٹریکنگ دیکھیں۔ ${train.from} سے ${train.to}، رفتار، تاخیر، اگلا اسٹیشن، اور مکمل شیڈول ایک جگہ۔`}
        canonical={`/ur/train/${train.id}`}
        lang="ur"
        alternateEnglish={`/train/${train.id}`}
        keywords={`${train.name}, ${train.number}, لائیو ٹرین, ٹرین شیڈول, ٹرین تاخیر`}
        breadcrumbs={[
          { name: "ہوم", url: "/ur" },
          { name: "لائیو ٹرینیں", url: "/ur/train" },
          { name: `${train.name} ${train.number}`, url: `/ur/train/${train.id}` },
        ]}
        faqSchema={trainFaqs}
      />

      <section className="bg-hero-gradient text-primary-foreground py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-sm opacity-80 mb-4 flex items-center gap-2">
            <Link to="/ur">ہوم</Link><span>›</span><Link to="/ur/train">لائیو ٹرینیں</Link><span>›</span><span>{train.name}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-bold mb-3">{live ? "لائیو GPS فعال" : "شیڈول موڈ"}</div>
              <h1 className="text-3xl sm:text-4xl font-black">{train.name} {train.number}</h1>
              <p className="mt-2 opacity-85">{train.nameUrdu} • {train.from} → {train.to}</p>
            </div>
            <div className="text-sm rounded-xl bg-primary-foreground/10 px-4 py-3">
              <div>آخری اپڈیٹ</div>
              <div className="font-bold">{lastUpdate.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-xl bg-muted p-4"><MapPin className="w-5 h-5 text-primary mx-auto mb-2" /><div className="text-xs text-muted-foreground">روٹ</div><div className="font-bold text-sm mt-1">{train.from} → {train.to}</div></div>
                <div className="rounded-xl bg-muted p-4"><Clock className="w-5 h-5 text-primary mx-auto mb-2" /><div className="text-xs text-muted-foreground">دورانیہ</div><div className="font-bold text-sm mt-1">{train.duration}</div></div>
                <div className="rounded-xl bg-muted p-4"><Navigation className="w-5 h-5 text-primary mx-auto mb-2" /><div className="text-xs text-muted-foreground">رفتار</div><div className="font-bold text-sm mt-1">{live ? `${live.speed} km/h` : "—"}</div></div>
                <div className="rounded-xl bg-muted p-4"><Wifi className="w-5 h-5 text-primary mx-auto mb-2" /><div className="text-xs text-muted-foreground">تاخیر</div><div className="font-bold text-sm mt-1">{live ? (delay === 0 ? "وقت پر" : `${delay} منٹ`) : "—"}</div></div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <h2 className="text-xl font-black text-foreground">اس ٹرین کے بارے میں</h2>
                <p><strong className="text-foreground">{train.name}</strong> پاکستان ریلوے کی اہم سروسز میں سے ایک ہے جو {train.from} سے {train.to} کے درمیان چلتی ہے۔ یہ روٹ طویل فاصلے کے مسافروں، کاروباری سفر، اور باقاعدہ بین الاضلاعی آمدورفت کے لیے نمایاں اہمیت رکھتا ہے۔</p>
                <p>اس ٹرین کی روانگی {train.departureTime} اور آمد {train.arrivalTime} پر شیڈول ہے۔ ہفتہ وار آپریشن کے دن: {train.days.join("، ")}۔ اگر ٹرین لائیو موڈ میں ہو تو اوپر موجود کارڈز میں رفتار، تاخیر، اور موجودہ پوزیشن بھی نظر آئے گی۔</p>
              </CardContent>
            </Card>

            {train.stops.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-black mb-4">روٹ اور اسٹاپس</h2>
                  <div className="space-y-4">
                    {train.stops.map((stop, index) => (
                      <div key={`${stop.station}-${index}`} className="flex items-start justify-between gap-4 border-b last:border-0 pb-4 last:pb-0">
                        <div>
                          <div className="font-semibold">{stop.station}</div>
                          <div className="text-xs text-muted-foreground mt-1">فاصلہ: {stop.distance > 0 ? `${stop.distance} کلومیٹر` : "آغاز"}</div>
                        </div>
                        <div className="text-xs text-muted-foreground text-left">
                          {stop.arrival !== "--" && <div>آمد: {stop.arrival}</div>}
                          {stop.departure !== "--" && <div>روانگی: {stop.departure}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4"><HelpCircle className="w-5 h-5 text-primary" /><h2 className="text-xl font-black">اکثر پوچھے جانے والے سوالات</h2></div>
                <Accordion type="single" collapsible>
                  {trainFaqs.map((faq, index) => (
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
              <CardContent className="p-6 space-y-3 text-sm">
                <h3 className="font-black text-lg">فوری معلومات</h3>
                <div className="flex justify-between"><span className="text-muted-foreground">قسم</span><span className="capitalize">{train.type}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">اسٹیٹس</span><span>{train.status === "active" ? "فعال" : "غیر فعال"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">روانگی</span><span>{train.departureTime}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">آمد</span><span>{train.arrivalTime}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">کل اسٹاپس</span><span>{train.stops.length}</span></div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Train className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-black mb-1">لائیو ڈیٹا دستیاب</h3>
                <p className="text-sm opacity-85">یہ صفحہ ہر 30 سیکنڈ میں تازہ معلومات سے ریفریش ہوتا ہے۔</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-black text-lg mb-2">مزید ٹولز</h3>
                <Link to="/ur/schedule" className="block text-sm hover:text-primary">• مکمل شیڈول</Link>
                <Link to="/ur/check-delays" className="block text-sm hover:text-primary">• تاخیر چیک کریں</Link>
                <Link to="/ur/planner" className="block text-sm hover:text-primary">• سفر پلانر</Link>
                <Link to="/ur/ticket-pricing" className="block text-sm hover:text-primary">• ٹکٹ قیمتیں</Link>
                <Link to="/ur/find-my-train" className="block text-sm hover:text-primary">• میری ٹرین تلاش کریں</Link>
                <Link to="/ur/stations" className="block text-sm hover:text-primary">• تمام اسٹیشنز</Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <RelatedLinks context="train" currentName={train.name} />
    </div>
  );
}