import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllTrains } from "@/lib/trainApi";
import { Search } from "lucide-react";

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

export default function UrduScheduleTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "express" | "passenger" | "ac">("all");
  const [loading, setLoading] = useState(true);
  const [trains, setTrains] = useState<TrainData[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setTrains((await fetchAllTrains()) || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filtered = useMemo(() => {
    let list = filter === "all" ? trains : trains.filter((train) => train.type === filter);
    if (search.trim()) {
      const query = search.toLowerCase();
      list = list.filter((train) => train.name.toLowerCase().includes(query) || train.number.toLowerCase().includes(query) || train.from.toLowerCase().includes(query) || train.to.toLowerCase().includes(query) || train.nameUrdu.includes(search));
    }
    return list;
  }, [filter, search, trains]);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        {[
          { key: "all", label: "تمام" },
          { key: "express", label: "ایکسپریس" },
          { key: "passenger", label: "پیسنجر" },
          { key: "ac", label: "AC" },
        ].map((item) => (
          <Button key={item.key} variant={filter === item.key ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => setFilter(item.key as typeof filter)}>
            {item.label}
          </Button>
        ))}

        <div className="relative ml-auto w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ٹرین نام، نمبر، یا روٹ تلاش کریں..." className="pl-10 rounded-xl" />
        </div>
      </div>

      <Card className="border overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="h-12 w-full rounded-lg" />)}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-4 py-3 text-right">ٹرین</th>
                    <th className="px-4 py-3 text-right">روٹ</th>
                    <th className="px-4 py-3 text-right">روانگی</th>
                    <th className="px-4 py-3 text-right">آمد</th>
                    <th className="px-4 py-3 text-right">دورانیہ</th>
                    <th className="px-4 py-3 text-right">قسم</th>
                    <th className="px-4 py-3 text-right">تفصیل</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((train) => (
                    <tr key={train.id} className="border-b hover:bg-muted/40">
                      <td className="px-4 py-3">
                        <div className="font-semibold">{train.name} {train.number}</div>
                        <div className="text-xs text-muted-foreground">{train.nameUrdu}</div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{train.from} → {train.to}</td>
                      <td className="px-4 py-3 font-medium">{train.departureTime}</td>
                      <td className="px-4 py-3 font-medium">{train.arrivalTime}</td>
                      <td className="px-4 py-3">{train.duration}</td>
                      <td className="px-4 py-3 uppercase">{train.type}</td>
                      <td className="px-4 py-3"><Link to={`/ur/train/${train.id}`} className="text-primary font-medium hover:underline">دیکھیں</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {!loading && filtered.length === 0 && (
        <div className="text-center text-muted-foreground py-10">آپ کی تلاش سے ملتا کوئی شیڈول نہیں ملا۔</div>
      )}
    </div>
  );
}