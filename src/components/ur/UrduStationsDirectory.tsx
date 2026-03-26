import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { searchStations, stations } from "@/data/stations";

export default function UrduStationsDirectory() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => (search.trim() ? searchStations(search) : stations).sort((a, b) => a.name.localeCompare(b.name)), [search]);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-6">
      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="اسٹیشن، شہر، یا صوبہ تلاش کریں..." className="pl-11 h-12 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((station) => (
          <Link key={station.slug} to={`/ur/stations/${station.slug}`}>
            <Card className="border hover-lift h-full">
              <CardContent className="p-5 space-y-3">
                <div>
                  <h3 className="font-black text-lg leading-tight">{station.nameUrdu}</h3>
                  <p className="text-sm text-muted-foreground">{station.name}</p>
                </div>
                <div className="text-sm">{station.city}, {station.province}</div>
                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground mb-1">ٹرینیں</div><div className="font-bold">{station.trainIds.length}</div></div>
                  <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground mb-1">سہولیات</div><div className="font-bold">{station.facilities.length}</div></div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}