import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchTrainDetail, type TrainDetail } from "@/lib/trainApi";
import { BatteryCharging, CreditCard, Navigation, Utensils, Wifi } from "lucide-react";
import { formatFareUrdu, translateStationName } from "@/lib/urduContent";

const coachClasses = [
  { name: "AC بزنس", fare: "₨6,500", gradient: "gradient-card-emerald", features: ["زیادہ آرام دہ نشستیں", "کھانا شامل", "وائی فائی اور charging"] },
  { name: "AC اسٹینڈرڈ", fare: "₨3,200", gradient: "gradient-card-blue", features: ["مکمل AC", "reserved seating", "طویل سفر کے لیے مناسب"] },
  { name: "AC سلیپر", fare: "₨4,800", gradient: "gradient-card-purple", features: ["رات بھر بہتر آرام", "بستر کی سہولت", "لمبے سفر کے لیے اچھا آپشن"] },
  { name: "اکانومی", fare: "₨1,200", gradient: "gradient-card-amber", features: ["کم کرایہ", "روزمرہ مسافروں کے لیے بہتر", "بنیادی سہولتیں"] },
];

const premiumFeatures = [
  { icon: Wifi, title: "وائی فائی", desc: "پریمیم کوچز میں connectivity گرین لائن کی نمایاں سہولتوں میں سے ایک ہے۔", gradient: "gradient-card-emerald" },
  { icon: Utensils, title: "کھانا شامل", desc: "اعلیٰ کلاسز میں meal experience اس سروس کو دیگر ٹرینوں سے ممتاز بناتا ہے۔", gradient: "gradient-card-amber" },
  { icon: BatteryCharging, title: "Charging سہولت", desc: "لمبے سفر میں موبائل اور ضروری devices کو چارج رکھنے میں مدد ملتی ہے۔", gradient: "gradient-card-blue" },
];

export default function UrduGreenLineGuide() {
  const [train, setTrain] = useState<TrainDetail | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchTrainDetail(5);
      setTrain(data);
    };
    load();
  }, []);

  const majorStops = useMemo(() => (train?.stops || []).filter((_, index, list) => index === 0 || index === list.length - 1 || [2, 5, 8, 11].includes(index)).slice(0, 6), [train]);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-10">
      <section className="grid md:grid-cols-3 gap-5">
        {premiumFeatures.map((feature) => (
          <Card key={feature.title} className={`${feature.gradient} border hover-lift`}>
            <CardContent className="p-6 space-y-3">
              <feature.icon className="w-6 h-6 text-primary" />
              <h2 className="font-black text-lg">{feature.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <Card className="border hover-lift">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-black">گرین لائن کی لائیو جھلک</h2>
                <p className="text-sm text-muted-foreground mt-1">اگر ٹرین اس وقت active ہو تو تازہ رفتار اور تاخیر یہی دکھائی جاتی ہے</p>
              </div>
              <Link to="/ur/train/5"><Button className="rounded-xl gap-2"><Navigation className="w-4 h-4" /> لائیو ٹریک کریں</Button></Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-muted/50 p-4"><div className="text-xs text-muted-foreground mb-1">موجودہ حالت</div><div className="font-black text-lg">{train?.livePosition ? "رواں" : "شیڈول دیکھیں"}</div></div>
              <div className="rounded-2xl bg-muted/50 p-4"><div className="text-xs text-muted-foreground mb-1">رفتار</div><div className="font-black text-lg">{train?.livePosition ? `${train.livePosition.speed} km/h` : "—"}</div></div>
              <div className="rounded-2xl bg-muted/50 p-4"><div className="text-xs text-muted-foreground mb-1">تاخیر</div><div className="font-black text-lg">{train?.livePosition ? `${train.livePosition.delayMinutes} منٹ` : "—"}</div></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-black">اہم اسٹاپس</h2>
            <div className="space-y-3">
              {(majorStops.length ? majorStops : train?.stops?.slice(0, 6) || []).map((stop) => (
                <div key={`${stop.station}-${stop.arrival}`} className="rounded-xl bg-muted/40 p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-bold">{translateStationName(stop.station)}</div>
                    <div className="text-xs text-muted-foreground">دن {stop.day} • فاصلہ {stop.distance} km</div>
                  </div>
                  <div className="text-sm text-right text-muted-foreground">
                    <div>آمد: {stop.arrival}</div>
                    <div>روانگی: {stop.departure}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black">گرین لائن کی کلاسز</h2>
          <p className="text-sm text-muted-foreground mt-2">قیمت اور آرام کے لحاظ سے اپنی ضرورت کے مطابق کلاس منتخب کریں</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {coachClasses.map((coach) => (
            <Card key={coach.name} className={`${coach.gradient} border hover-lift h-full`}>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-black text-lg">{coach.name}</h3>
                  <div className="text-sm font-semibold text-primary">{formatFareUrdu(coach.fare)}</div>
                </div>
                <div className="space-y-2">
                  {coach.features.map((feature) => (
                    <div key={feature} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold inline-block mr-2">{feature}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card className="border bg-muted/30">
        <CardContent className="p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-black">گرین لائن کس کے لیے بہترین ہے؟</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">اگر آپ کراچی اور اسلام آباد/راولپنڈی سیکشن کے درمیان نسبتاً پریمیم، منظم، اور زیادہ آرام دہ تجربہ چاہتے ہیں تو گرین لائن ایکسپریس نمایاں انتخاب ہے۔ یہ خاص طور پر کاروباری سفر، خاندان کے ساتھ لمبے سفر، اور ان مسافروں کے لیے مفید ہے جو وقت، صفائی، اور coach quality کو زیادہ اہمیت دیتے ہیں۔</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/ur/ticket-pricing"><Button variant="outline" className="rounded-xl gap-2"><CreditCard className="w-4 h-4" /> کرایہ دیکھیں</Button></Link>
            <Link to="/ur/check-delays"><Button variant="outline" className="rounded-xl">تاخیر اسٹیٹس دیکھیں</Button></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
