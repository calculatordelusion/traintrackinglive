import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Train } from "lucide-react";
import { trains } from "@/data/trains";
import { fetchLivePositions, type LiveStats, type LiveTrainPosition } from "@/lib/trainApi";

type FilterTab = "all" | "live" | "offline";

export default function UrduLiveTrainsTool() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<LiveStats>({ moving: 0, atStation: 0, total: 0, liveCount: 0 });
  const [livePositions, setLivePositions] = useState<LiveTrainPosition[]>([]);
  const [liveTrainIds, setLiveTrainIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const { positions, stats: s, liveTrainIds: ids } = await fetchLivePositions();
        setStats(s);
        setLivePositions(positions);
        setLiveTrainIds(new Set(ids));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const liveMap = useMemo(() => {
    const map = new Map<number, LiveTrainPosition>();
    livePositions.forEach((position) => map.set(position.id, position));
    return map;
  }, [livePositions]);

  const filteredTrains = useMemo(() => {
    const query = search.toLowerCase();
    let list = trains.filter(
      (train) =>
        train.name.toLowerCase().includes(query) ||
        train.number.toLowerCase().includes(query) ||
        train.from.toLowerCase().includes(query) ||
        train.to.toLowerCase().includes(query) ||
        train.nameUrdu.includes(search),
    );

    if (filter === "live") list = list.filter((train) => liveTrainIds.has(train.id));
    if (filter === "offline") list = list.filter((train) => !liveTrainIds.has(train.id));

    return list.sort((a, b) => Number(liveTrainIds.has(b.id)) - Number(liveTrainIds.has(a.id)) || a.id - b.id);
  }, [filter, liveTrainIds, search]);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { value: stats.total || trains.length, label: "کل ٹرینیں", gradient: "gradient-card-emerald" },
          { value: stats.running ?? stats.liveCount ?? 0, label: "لائیو چل رہی ہیں", gradient: "gradient-card-blue" },
          { value: stats.atStation || 0, label: "اسٹیشن پر", gradient: "gradient-card-amber" },
          { value: Math.max((stats.total || trains.length) - (stats.running ?? stats.liveCount ?? 0), 0), label: "آف لائن", gradient: "gradient-card-purple" },
        ].map((item) => (
          <Card key={item.label} className={`${item.gradient} border hover-lift`}>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black">{loading ? "..." : item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {[
          { key: "all", label: `تمام (${stats.total || trains.length})` },
          { key: "live", label: `لائیو (${stats.running ?? stats.liveCount ?? 0})` },
          { key: "offline", label: `آف لائن (${Math.max((stats.total || trains.length) - (stats.running ?? stats.liveCount ?? 0), 0)})` },
        ].map((item) => (
          <Button
            key={item.key}
            variant={filter === item.key ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setFilter(item.key as FilterTab)}
          >
            {item.label}
          </Button>
        ))}

        <div className="relative ml-auto w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ٹرین، نمبر، یا روٹ تلاش کریں..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTrains.map((train) => {
          const live = liveMap.get(train.id);
          const isLive = liveTrainIds.has(train.id);

          return (
            <Link key={train.id} to={`/ur/train/${train.id}`}>
              <Card className={`border h-full transition-all hover-lift ${isLive ? "border-primary/30" : "opacity-80"}`}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${isLive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {isLive ? "لائیو" : "آف لائن"}
                      </span>
                      <span className="text-[10px] px-2 py-1 rounded-full bg-secondary/40 text-secondary-foreground font-bold">{train.number}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">#{train.id}</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base leading-tight">{train.name}</h3>
                    <p className="text-xs text-muted-foreground">{train.nameUrdu}</p>
                  </div>

                  <div className="text-sm text-muted-foreground">{train.from} ←→ {train.to}</div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-muted-foreground mb-1">روانگی</div>
                      <div className="font-semibold">{train.departureTime}</div>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-muted-foreground mb-1">دورانیہ</div>
                      <div className="font-semibold">{train.duration}</div>
                    </div>
                  </div>

                  {live ? (
                    <div className="rounded-lg bg-primary/5 p-3 text-xs">
                      <div className="font-semibold text-primary">رفتار: {live.speed} کلومیٹر/گھنٹہ</div>
                      <div className="text-muted-foreground mt-1">{live.delayMinutes === 0 ? "وقت پر" : `${live.delayMinutes} منٹ تاخیر`} • اگلا اسٹیشن: {live.nextStation}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">اس وقت لائیو GPS دستیاب نہیں۔</div>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filteredTrains.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Train className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>آپ کی تلاش سے ملتی کوئی ٹرین نہیں ملی۔</p>
        </div>
      )}
    </div>
  );
}