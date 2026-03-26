import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { routeDetails } from "@/data/routeDetails";

export default function UrduRoutesExplorer() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return routeDetails.filter((route) => !query || route.from.toLowerCase().includes(query) || route.to.toLowerCase().includes(query) || route.fromUrdu.includes(search) || route.toUrdu.includes(search));
  }, [search]);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-6">
      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="شہر یا روٹ تلاش کریں..." className="pl-11 h-12 rounded-xl" />
      </div>

      <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {filtered.map((route) => (
          <Link key={route.slug} to={`/ur/routes/${route.slug}`}>
            <Card className="border hover-lift h-full">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-black text-lg">{route.fromUrdu} ←→ {route.toUrdu}</h3>
                    <p className="text-xs text-muted-foreground">{route.from} to {route.to}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">{route.distance}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{route.quickAnswer}</p>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground mb-1">تیز ترین</div><div className="font-bold">{route.fastestDuration}</div></div>
                  <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground mb-1">روزانہ</div><div className="font-bold">{route.dailyTrains}+</div></div>
                  <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground mb-1">کرایہ</div><div className="font-bold">{route.fareFrom}</div></div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}