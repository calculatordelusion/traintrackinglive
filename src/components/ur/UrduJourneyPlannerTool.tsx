import { useEffect, useState } from "react";
import { ArrowUpDown, Loader2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { searchPlannerRoutes, fetchPlannerStations } from "@/lib/trainApi";
import { Link } from "react-router-dom";

interface PlannerStation {
  name: string;
  nameUrdu: string;
}

interface MatchedRoute {
  train: {
    id: number;
    number: string;
    name: string;
    nameUrdu: string;
    type: string;
    days: string[];
  };
  fromStation: string;
  toStation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

export default function UrduJourneyPlannerTool() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stations, setStations] = useState<PlannerStation[]>([]);
  const [results, setResults] = useState<MatchedRoute[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchPlannerStations();
        if (result.success) setStations(result.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  const handleSearch = async () => {
    if (!from || !to) return;
    setSearching(true);

    try {
      const result = await searchPlannerRoutes(from, to);
      setResults(result.success ? result.data || [] : []);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setSearching(false);
      setSearched(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <Card className="max-w-5xl mx-auto border shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-2xl font-black mb-6">اپنا سفر منتخب کریں</h2>
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div>
              <label className="text-sm font-semibold mb-2 block">روانگی اسٹیشن</label>
              <input list="urdu-from-stations" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="مثلاً لاہور جنکشن" className="w-full rounded-xl border bg-background px-4 py-3 text-sm" />
              <datalist id="urdu-from-stations">
                {stations.map((station) => <option key={station.name} value={station.name}>{station.nameUrdu}</option>)}
              </datalist>
            </div>

            <Button variant="outline" size="icon" className="rounded-full mx-auto" onClick={() => { const currentFrom = from; setFrom(to); setTo(currentFrom); }}>
              <ArrowUpDown className="w-4 h-4" />
            </Button>

            <div>
              <label className="text-sm font-semibold mb-2 block">منزل اسٹیشن</label>
              <input list="urdu-to-stations" value={to} onChange={(e) => setTo(e.target.value)} placeholder="مثلاً کراچی کینٹ" className="w-full rounded-xl border bg-background px-4 py-3 text-sm" />
              <datalist id="urdu-to-stations">
                {stations.map((station) => <option key={station.name} value={station.name}>{station.nameUrdu}</option>)}
              </datalist>
            </div>
          </div>

          <Button onClick={handleSearch} disabled={!from || !to || searching} className="mt-5 w-full rounded-xl gap-2 h-12 text-base">
            {searching ? <><Loader2 className="w-4 h-4 animate-spin" /> تلاش ہو رہی ہے...</> : <><Search className="w-4 h-4" /> راستے تلاش کریں</>}
          </Button>
        </CardContent>
      </Card>

      {searched && (
        <div className="max-w-5xl mx-auto mt-8 space-y-4">
          <div>
            <h3 className="text-2xl font-black">{results.length > 0 ? `${results.length} راستے ملے` : "کوئی ڈائریکٹ راستہ نہیں ملا"}</h3>
            <p className="text-sm text-muted-foreground mt-1">{from} → {to}</p>
          </div>

          {results.length > 0 ? results.map((route) => (
            <Card key={`${route.train.id}-${route.departureTime}`} className="border hover-lift">
              <CardContent className="p-5 grid md:grid-cols-[1.3fr_1fr_auto] gap-4 items-center">
                <div>
                  <h4 className="font-black text-lg">{route.train.name} {route.train.number}</h4>
                  <p className="text-sm text-muted-foreground">{route.train.nameUrdu}</p>
                  <p className="text-sm mt-2">{route.fromStation} → {route.toStation}</p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground text-xs mb-1">روانگی</div><div className="font-bold">{route.departureTime}</div></div>
                  <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground text-xs mb-1">آمد</div><div className="font-bold">{route.arrivalTime}</div></div>
                  <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground text-xs mb-1">دورانیہ</div><div className="font-bold">{route.duration}</div></div>
                </div>
                <Link to={`/ur/train/${route.train.id}`}>
                  <Button className="rounded-xl w-full md:w-auto">ٹرین دیکھیں</Button>
                </Link>
              </CardContent>
            </Card>
          )) : (
            <Card className="border">
              <CardContent className="p-6 text-sm text-muted-foreground leading-relaxed">
                منتخب شدہ دو اسٹیشنز کے درمیان اس وقت براہِ راست ٹرین نہیں ملی۔ قریب ترین بڑے جنکشن جیسے لاہور جنکشن، راولپنڈی، ملتان کینٹ یا سکھر جنکشن سے الگ الگ مرحلے میں تلاش کریں۔
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}