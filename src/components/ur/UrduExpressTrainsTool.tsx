import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Train, Zap, Shield, Sofa } from "lucide-react";
import { fetchAllTrains } from "@/lib/trainApi";
import { translateStationName, translateTrainName, translateTrainType } from "@/lib/urduContent";

interface TrainData {
  id: number;
  number: string;
  name: string;
  nameUrdu: string;
  from: string;
  to: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

const highlights = [
  { icon: Zap, title: "تیز سفر", desc: "کم اسٹاپس اور بہتر intercity وقت کے لیے ایکسپریس سروسز زیادہ موزوں ہوتی ہیں۔", gradient: "gradient-card-emerald" },
  { icon: Sofa, title: "زیادہ آرام", desc: "متعدد ایکسپریس ٹرینوں میں بہتر کلاسز، AC کوچز، اور لمبے سفر کے لیے بہتر نشستیں دستیاب ہوتی ہیں۔", gradient: "gradient-card-amber" },
  { icon: Shield, title: "زیادہ قابلِ اعتماد", desc: "اہم راہداریوں پر چلنے والی معروف ایکسپریس سروسز عموماً زیادہ منظم اور پیش گوئی کے قابل ہوتی ہیں۔", gradient: "gradient-card-blue" },
];

export default function UrduExpressTrainsTool() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [trains, setTrains] = useState<TrainData[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllTrains();
        setTrains((data || []) as TrainData[]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const expressTrains = useMemo(() => trains.filter((train) => train.type === "express" || train.type === "ac"), [trains]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return expressTrains.filter((train) => {
      const urduName = train.nameUrdu || translateTrainName(train.name);
      return !query || [train.name, train.number, train.from, train.to, urduName].some((value) => value.toLowerCase().includes(query));
    });
  }, [expressTrains, search]);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-10">
      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ٹرین نام، نمبر، یا شہر تلاش کریں..." className="pl-11 h-12 rounded-xl" />
      </div>

      <section className="grid md:grid-cols-3 gap-5">
        {highlights.map((item) => (
          <Card key={item.title} className={`${item.gradient} border hover-lift`}>
            <CardContent className="p-6 space-y-3">
              <item.icon className="w-6 h-6 text-primary" />
              <h2 className="font-black text-lg">{item.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black">تمام نمایاں ایکسپریس اور AC ٹرینیں</h2>
          <p className="text-sm text-muted-foreground mt-2">اپنے سفر کے لیے مناسب ایکسپریس سروس تلاش کریں اور متعلقہ ٹرین کا تفصیلی صفحہ کھولیں</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-56 rounded-2xl" />) : filtered.map((train) => (
            <Link key={train.id} to={`/ur/train/${train.id}`}>
              <Card className="border hover-lift h-full overflow-hidden group">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-primary mb-1">{translateTrainType(train.type)}</div>
                      <h3 className="font-black text-lg leading-tight">{train.nameUrdu || translateTrainName(train.name)}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{train.name} • {train.number}</p>
                    </div>
                    <Train className="w-5 h-5 text-primary shrink-0" />
                  </div>

                  <div className="rounded-xl bg-muted/50 p-4 space-y-2 text-sm">
                    <div className="font-semibold">{translateStationName(train.from)} ←→ {translateStationName(train.to)}</div>
                    <div className="text-muted-foreground flex items-center justify-between gap-3">
                      <span>روانگی: {train.departureTime}</span>
                      <span>آمد: {train.arrivalTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="rounded-full bg-primary/10 text-primary px-3 py-1 font-semibold">{train.duration}</span>
                    <span className="text-muted-foreground">تفصیل دیکھیں ←</span>
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
