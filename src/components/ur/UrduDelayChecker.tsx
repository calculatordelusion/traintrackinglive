import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLivePositions, type LiveTrainPosition } from "@/lib/trainApi";
import { AlertTriangle, CheckCircle2, Navigation, Search, Timer, Train } from "lucide-react";
import { translateStationName, translateTrainName } from "@/lib/urduContent";

function formatDelay(minutes: number) {
  if (minutes <= 0) return "وقت پر";
  if (minutes < 60) return `${minutes} منٹ لیٹ`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} گھنٹے ${m} منٹ لیٹ` : `${h} گھنٹے لیٹ`;
}

export default function UrduDelayChecker() {
  const [positions, setPositions] = useState<LiveTrainPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const load = async () => {
      try {
        const result = await fetchLivePositions();
        setPositions(result.positions || []);
      } finally {
        setLoading(false);
      }
    };
    load();
    interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeTrains = useMemo(() => positions.filter((train) => train.status === "moving" || train.status === "at-station"), [positions]);
  const delayedTrains = useMemo(() => activeTrains.filter((train) => train.delayMinutes > 0), [activeTrains]);
  const onTimeTrains = useMemo(() => activeTrains.filter((train) => train.delayMinutes <= 0), [activeTrains]);
  const severeDelays = useMemo(() => activeTrains.filter((train) => train.delayMinutes >= 60), [activeTrains]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return activeTrains.filter((train) => !query || [train.name, train.nameUrdu, train.number, train.from, train.to].some((value) => value.toLowerCase().includes(query))).sort((a, b) => b.delayMinutes - a.delayMinutes);
  }, [activeTrains, search]);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-10">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-24 rounded-2xl" />) : [
          { value: activeTrains.length, label: "فعال ٹرینیں", icon: Train, gradient: "gradient-card-blue" },
          { value: delayedTrains.length, label: "لیٹ ٹرینیں", icon: AlertTriangle, gradient: "gradient-card-rose" },
          { value: onTimeTrains.length, label: "وقت پر", icon: CheckCircle2, gradient: "gradient-card-emerald" },
          { value: severeDelays.length, label: "شدید تاخیر", icon: Timer, gradient: "gradient-card-amber" },
        ].map((item) => (
          <Card key={item.label} className={`${item.gradient} border hover-lift`}>
            <CardContent className="p-5 text-center">
              <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-black">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ٹرین نام، نمبر، یا شہر سے تلاش کریں..." className="pl-11 h-12 rounded-xl" />
      </div>

      <section className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black">تمام لائیو تاخیر اسٹیٹس</h2>
          <p className="text-sm text-muted-foreground mt-2">اپنی مطلوبہ ٹرین تلاش کریں اور ریئل ٹائم delay، route، اور detail page کھولیں</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-56 rounded-2xl" />) : filtered.map((train) => (
            <Link key={train.id} to={`/ur/train/${train.id}`}>
              <Card className="border hover-lift h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-lg">{train.nameUrdu || translateTrainName(train.name)}</h3>
                      <p className="text-xs text-muted-foreground">{train.name} • {train.number}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${train.delayMinutes <= 0 ? "bg-primary/10 text-primary" : train.delayMinutes >= 60 ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent-foreground"}`}>
                      {formatDelay(train.delayMinutes)}
                    </span>
                  </div>

                  <div className="rounded-2xl bg-muted/40 p-4 text-sm space-y-2">
                    <div className="font-semibold">{translateStationName(train.from)} ←→ {translateStationName(train.to)}</div>
                    <div className="flex items-center justify-between gap-3 text-muted-foreground">
                      <span>رفتار: {train.speed} km/h</span>
                      <span>پیش رفت: {Math.round(train.progress)}%</span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>آخری اسٹیشن: {translateStationName(train.lastStation)}</div>
                    <div>اگلا اسٹیشن: {translateStationName(train.nextStation)}</div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-1 text-primary font-semibold"><Navigation className="w-4 h-4" /> ٹرین صفحہ کھولیں</span>
                    <span className="text-muted-foreground">ہر 5 سیکنڈ اپڈیٹ</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}