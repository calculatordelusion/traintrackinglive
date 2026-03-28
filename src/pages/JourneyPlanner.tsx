import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Clock, Train, ArrowUpDown, Search, Zap, Navigation, HelpCircle, Loader2, Globe, Shield, Star, BarChart3 } from "lucide-react";
import PremiumHero from "@/components/PremiumHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { searchPlannerRoutes, fetchPlannerStations } from "@/lib/trainApi";

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
    from: string;
    to: string;
    type: string;
    status: string;
    days: string[];
  };
  fromStation: string;
  toStation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

const plannerFaqs = [
  { q: "How does the Journey Planner work?", a: "The Journey Planner finds all possible routes between two stations. It searches through all 164+ trains in the Pakistan Railways network and their complete stop schedules to identify trains that serve both your departure and arrival stations. Results are sorted by journey duration, with the fastest option shown first. Simply select your departure and arrival stations, and we'll show you the best options with complete timing details." },
  { q: "What information does each route show?", a: "For each route, you'll see: total journey duration between your selected stations, train name and number, train type (Express, AC, Passenger), departure time from your station, arrival time at your destination, running days (not all trains operate daily), and a link to view the full train details and live tracking page." },
  { q: "How are routes sorted?", a: "Routes are automatically sorted by total journey duration, with the fastest route shown first. This ensures you can quickly identify the quickest way to travel between your chosen stations. Express and AC trains typically offer faster journeys than passenger trains on the same route." },
  { q: "What if there are no direct trains?", a: "If no direct trains are available between your selected stations, try selecting nearby major junction stations instead. Common junction stations include Lahore Junction, Rawalpindi, Multan Cantonment, Sukkur Junction, and Karachi Cantonment. You can plan connecting journeys by searching each leg separately." },
  { q: "Can I plan journeys between any two stations?", a: "Yes! The Journey Planner searches through all 342+ stations and 164+ trains in the Pakistan Railways network to find routes between any two locations served by the railway. This includes both major city stations and smaller intermediate stops along train routes." },
  { q: "Are the timings accurate?", a: "The timings shown are based on the official Pakistan Railways schedules — the same data used by traintracking.pk. However, actual arrival and departure times may vary due to operational delays. Use our Live Train Tracking feature to check real-time status of trains on your planned route for the most up-to-date information." },
  { q: "Can I swap departure and arrival stations?", a: "Yes! Click the swap button (↕) between the From and To station fields. This instantly swaps your departure and arrival stations so you can search for return journey options without re-entering station names. This is especially useful when planning round-trip journeys." },
  { q: "Do all trains run every day?", a: "No, not all trains run daily. Some trains operate only on specific days of the week. The Journey Planner shows the running days for each train in the results, so you can verify that your chosen train operates on your travel date. Express trains on major routes typically run daily, while some branch line services may have limited schedules." },
];

function StationDropdown({
  value,
  onChange,
  placeholder,
  icon: Icon,
  iconColor,
  label,
  labelUrdu,
  apiStations,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: typeof MapPin;
  iconColor: string;
  label: string;
  labelUrdu: string;
  apiStations: PlannerStation[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return apiStations;
    const q = query.toLowerCase();
    return apiStations.filter(
      (s) => s.name.toLowerCase().includes(q) || s.nameUrdu.includes(query)
    );
  }, [query, apiStations]);

  return (
    <div ref={ref} className="relative flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-3 h-3 rounded-full ${iconColor}`} />
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm text-destructive font-medium">{labelUrdu}</span>
      </div>
      <div
        className={`flex items-center gap-2 border-2 rounded-xl px-4 py-3 cursor-text transition-colors ${
          open ? "border-primary" : "border-border hover:border-primary/50"
        } bg-background`}
        onClick={() => setOpen(true)}
      >
        <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
        <input
          value={open ? query : value}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
        />
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-xl shadow-xl z-50 max-h-64 overflow-auto">
          {filtered.length === 0 && (
            <div className="px-4 py-3 text-sm text-muted-foreground">No stations found</div>
          )}
          {filtered.map((s) => (
            <button
              key={s.name}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left border-b last:border-0"
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(s.name);
                setQuery("");
                setOpen(false);
              }}
            >
              <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="text-sm font-medium">{s.name}</div>
                {s.nameUrdu && <div className="text-xs text-destructive">{s.nameUrdu}</div>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JourneyPlannerPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState<MatchedRoute[]>([]);
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [apiStations, setApiStations] = useState<PlannerStation[]>([]);
  const [meta, setMeta] = useState({ totalTrains: 164, totalStations: 342, totalRoutes: 164 });

  // Fetch stations from edge function on mount
  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchPlannerStations();
        if (result.success) {
          setApiStations(result.data || []);
          if (result.meta) {
            setMeta({
              totalTrains: result.meta.totalTrains || 164,
              totalStations: result.meta.totalStations || 342,
              totalRoutes: result.meta.totalTrains || 164,
            });
          }
        }
      } catch (e) {
        console.error("Failed to fetch planner stations:", e);
      }
    };
    load();
  }, []);

  const handleSearch = async () => {
    if (!from || !to) return;
    setSearching(true);
    setSearched(false);

    try {
      const result = await searchPlannerRoutes(from, to);
      if (result.success) {
        setResults(result.data || []);
        if (result.meta) {
          setMeta({
            totalTrains: result.meta.totalTrains || meta.totalTrains,
            totalStations: result.meta.totalStations || meta.totalStations,
            totalRoutes: result.meta.totalRoutes || meta.totalRoutes,
          });
        }
      } else {
        setResults([]);
      }
    } catch (e) {
      console.error("Planner search error:", e);
      setResults([]);
    }

    setSearched(true);
    setSearching(false);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setSearched(false);
    setResults([]);
  };

  return (
    <main>
      <SEOHead
        title="Pakistan Railways Journey Planner — Find Trains"
        description={`Plan your journey between ${meta.totalStations}+ stations. Compare ${meta.totalTrains}+ trains by duration, class, and fare. Free planner, no signup needed.`}
        canonical="/planner"
        keywords="journey planner pakistan railway, find train between stations, train route finder, station to station train, karachi to lahore train, lahore to rawalpindi train, train search, best train for journey, train planner, compare trains, which train to take, plan train travel"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Journey Planner", url: "/planner" }]}
        faqSchema={plannerFaqs}
        howToSchema={{
          name: "How to Plan a Train Journey in Pakistan",
          steps: [
            { name: "Select Departure Station", text: "Choose your starting station from 342+ Pakistan Railways stations using the search dropdown." },
            { name: "Select Arrival Station", text: "Choose your destination station. The system supports all major and minor railway stations." },
            { name: "Compare Available Trains", text: "View all trains on your route with departure times, journey duration, and estimated fares. Choose the best option." },
          ],
        }}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Pakistan Railways Journey Planner",
          "url": "https://trackmytrain.pk/planner",
          "applicationCategory": "TravelApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
          "description": `Find trains between any two of ${meta.totalStations}+ Pakistan Railways stations. Compare schedules, fares, and journey times.`
        }]}
      />
      <PremiumHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Journey Planner" }]}
        badge="REAL-TIME ROUTE SEARCH"
        title={<>Plan Your{" "}<span className="text-gradient-gold">Train Journey</span></>}
        subtitle={`Find the best routes between any two stations in Pakistan. Compare timings, durations, and choose the perfect train for your travel across ${meta.totalStations}+ stations.`}
        subtitleUrdu="اپنا سفر پلان کریں - پاکستان میں کسی بھی دو اسٹیشنوں کے درمیان"
      >
        {/* Stats in hero */}
        <div className="grid grid-cols-3 gap-3 mt-8 max-w-lg">
          {[
            { value: `${meta.totalStations}+`, label: "Stations" },
            { value: `${meta.totalTrains}+`, label: "Trains" },
            { value: `${meta.totalRoutes}+`, label: "Routes" },
          ].map((s, i) => (
            <div key={i} className="bg-[hsl(0_0%_100%/0.08)] backdrop-blur-sm rounded-xl p-4 text-center border border-[hsl(0_0%_100%/0.1)]">
              <div className="text-2xl font-bold stat-counter">{s.value}</div>
              <div className="text-xs opacity-70">{s.label}</div>
            </div>
          ))}
        </div>
      </PremiumHero>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Search Form */}
        <Card className="max-w-4xl mx-auto mb-8 shadow-lg hover-lift">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Select Your Journey</h2>
            <div className="flex flex-col md:flex-row items-stretch gap-4 mb-6">
              <StationDropdown
                value={from}
                onChange={setFrom}
                placeholder="Search departure station..."
                icon={Navigation}
                iconColor="bg-primary"
                label="From Station"
                labelUrdu="روانگی"
                apiStations={apiStations}
              />
              
              <div className="flex items-end justify-center md:pb-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwap}
                  className="rounded-full w-10 h-10 shrink-0 border-2"
                  title="Swap stations"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>

              <StationDropdown
                value={to}
                onChange={setTo}
                placeholder="Search arrival station..."
                icon={MapPin}
                iconColor="bg-destructive"
                label="To Station"
                labelUrdu="منزل"
                apiStations={apiStations}
              />
            </div>
            <Button onClick={handleSearch} disabled={searching || !from || !to} className="w-full rounded-xl gap-2 h-12 text-base">
              {searching ? <><Loader2 className="w-5 h-5 animate-spin" /> Searching...</> : <><Search className="w-5 h-5" /> Find Routes <span className="opacity-70">تلاش کریں</span></>}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {searched && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {results.length > 0 ? (
                  <>🚂 {results.length} Routes Found</>
                ) : (
                  "No Direct Routes Found"
                )}
              </h2>
              {results.length > 0 && (
                <p className="text-muted-foreground text-sm">{from} → {to}</p>
              )}
            </div>

            {results.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground mb-2">
                    No direct trains found between <strong>{from}</strong> and <strong>{to}</strong>.
                  </p>
                  <p className="text-sm text-muted-foreground">Try selecting nearby major stations (e.g., Lahore Jn, Karachi Cantt, Rawalpindi) or use broader city names.</p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {results.map((route, index) => (
                <Link key={`${route.train.id}-${index}`} to={`/train/${route.train.id}`}>
                  <Card className="hover:shadow-lg hover:border-primary/30 transition-all mb-4 hover-lift">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between p-4 pb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-lg font-bold">{route.duration}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              🚂 Direct Train
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {index === 0 && results.length > 1 && (
                            <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                              <Zap className="w-3 h-3" /> Fastest
                            </span>
                          )}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${route.train.type === 'ac' ? 'bg-accent/10 text-accent-foreground' : route.train.type === 'passenger' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                            {route.train.type.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="mx-4 mb-4 p-4 border rounded-xl bg-muted/30">
                        <div className="flex items-center gap-2 mb-1">
                          <Train className="w-4 h-4 text-muted-foreground" />
                          <span className="font-bold text-sm">{route.train.name} {route.train.number}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mb-3">
                          #{route.train.id} • {route.train.nameUrdu}
                          {route.train.days && route.train.days.length < 7 && (
                            <span className="ml-2 text-primary font-medium">Runs: {route.train.days.join(", ")}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-muted-foreground uppercase font-medium">Depart</div>
                            <div className="text-xl font-bold">{route.departureTime}</div>
                            <div className="text-xs text-muted-foreground">{route.fromStation}</div>
                          </div>
                          <div className="flex flex-col items-center gap-1 px-4">
                            <div className="w-20 h-px bg-border relative">
                              <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-primary" />
                              <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-destructive" />
                            </div>
                            <span className="text-xs text-muted-foreground">{route.duration}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground uppercase font-medium">Arrive</div>
                            <div className="text-xl font-bold">{route.arrivalTime}</div>
                            <div className="text-xs text-muted-foreground">{route.toStation}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* How to use & features - shown when not searched */}
        {!searched && (
          <>
            <div className="max-w-4xl mx-auto mb-12">
              <div className="text-center mb-8">
                <p className="text-xs font-bold text-primary tracking-wider mb-2">HOW TO USE</p>
                <h2 className="text-2xl sm:text-3xl font-bold">How to Use Journey Planner</h2>
                <p className="text-sm text-muted-foreground mt-1">اپنا سفر پلان کرنے کا طریقہ</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { step: "1", gradient: "gradient-card-emerald", title: "Select From Station", desc: `Choose departure from ${meta.totalStations}+ stations` },
                  { step: "2", gradient: "gradient-card-amber", title: "Select To Station", desc: "Choose your destination station" },
                  { step: "3", gradient: "gradient-card-blue", title: "Find Routes", desc: "Click search to find all available routes" },
                  { step: "4", gradient: "gradient-card-purple", title: "Choose Best Route", desc: "Select fastest or most convenient option" },
                ].map((item) => (
                  <Card key={item.step} className={`${item.gradient} border hover-lift group`}>
                    <CardContent className="p-4 text-center">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground mx-auto mb-2 flex items-center justify-center text-sm font-bold transition-transform duration-300 group-hover:scale-110">
                        {item.step}
                      </div>
                      <h4 className="font-semibold text-xs mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto mb-12">
              <Card className="gradient-card-teal border hover-lift">
                <CardContent className="p-6">
                  <h3 className="font-bold text-sm mb-4 text-primary">What You Can Do With Journey Planner</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: "🔍", text: "Find direct & connecting routes between any two stations" },
                      { icon: "⏱️", text: "See journey duration estimates sorted fastest first" },
                      { icon: "📊", text: "Compare multiple routes at once with full timing details" },
                      { icon: "🚂", text: "View train details, timings & running days" },
                      { icon: "🔄", text: "Swap stations instantly for return journeys" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm text-muted-foreground">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Why Use Our Planner */}
            <section className="mb-12 sm:mb-16">
              <div className="text-center mb-8">
                <p className="text-xs font-bold text-primary tracking-wider mb-2">KEY BENEFITS</p>
                <h2 className="text-2xl sm:text-3xl font-bold">Why Use Our Journey Planner?</h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Our planner searches through all {meta.totalTrains}+ Pakistan Railways trains and {meta.totalStations}+ stations to find the best route for your journey.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {[
                  { icon: Search, gradient: "gradient-card-emerald", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", title: "Complete Route Search", desc: "Searches through all train schedules including intermediate stops — not just endpoint stations. Find trains that pass through your station even if it's not the terminus." },
                  { icon: Zap, gradient: "gradient-card-amber", iconBg: "bg-amber-500/15", iconColor: "text-amber-500", title: "Fastest Route First", desc: "Results sorted by journey duration automatically. The fastest option appears first so you can quickly identify the best train for your schedule and travel needs." },
                  { icon: BarChart3, gradient: "gradient-card-blue", iconBg: "bg-blue-500/15", iconColor: "text-blue-500", title: "Compare All Options", desc: "See all available trains side by side with departure times, arrival times, duration, train type, and running days. Make informed decisions about your travel." },
                  { icon: Globe, gradient: "gradient-card-purple", iconBg: "bg-purple-500/15", iconColor: "text-purple-500", title: "Real Schedule Data", desc: "All timings come directly from official Pakistan Railways schedules — the same data used by traintracking.pk. Accurate departure and arrival times for every station." },
                  { icon: Shield, gradient: "gradient-card-rose", iconBg: "bg-rose-500/15", iconColor: "text-rose-500", title: "Live Tracking Integration", desc: "After finding your route, click any train to see its real-time GPS position, current speed, delay status, and estimated arrival at your station." },
                  { icon: Star, gradient: "gradient-card-teal", iconBg: "bg-teal-500/15", iconColor: "text-teal-500", title: "Bilingual Support", desc: "Search stations in English or Urdu. All train names and station names displayed in both languages for easy identification during your journey." },
                ].map((item, i) => (
                  <Card key={i} className={`${item.gradient} border hover-lift group`}>
                    <CardContent className="p-5 sm:p-6">
                      <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Rich SEO Content - Gradient Cards */}
            <section className="mb-12 sm:mb-16">
              <div className="text-center mb-8">
                <p className="text-xs font-bold text-primary tracking-wider mb-2">COMPREHENSIVE GUIDE</p>
                <h2 className="text-2xl sm:text-3xl font-bold">Journey Planning Guide for Pakistan Railways</h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Everything you need to know about planning train travel across Pakistan's extensive railway network</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
                <Card className="gradient-card-emerald border hover-lift group md:col-span-2">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <MapPin className="w-5 h-5 text-emerald-500" />
                      </div>
                      <h3 className="font-bold text-base group-hover:text-primary transition-colors">Plan Your Journey Across Pakistan</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">Planning a train journey across Pakistan has never been easier. Our Journey Planner searches through <strong className="text-foreground">{meta.totalTrains}+ trains</strong> and <strong className="text-foreground">{meta.totalStations}+ stations</strong> in the Pakistan Railways network to find the best route for your travel. Whether you're traveling from Karachi to Lahore, Rawalpindi to Peshawar, or any station in between, our planner shows all available direct train options with accurate schedule data.</p>
                  </CardContent>
                </Card>

                <Card className="gradient-card-blue border hover-lift group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Search className="w-5 h-5 text-blue-500" />
                      </div>
                      <h3 className="font-bold text-base group-hover:text-primary transition-colors">How Route Matching Works</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">Unlike simple timetable lookups, our planner checks every train's complete list of stops — not just the starting and ending stations. This means if you're searching for trains from Hyderabad to Multan, you'll see all express trains that pass through both cities, even though most originate from Karachi and terminate in Lahore, Rawalpindi, or Peshawar. This intermediate stop matching ensures you find every available option.</p>
                  </CardContent>
                </Card>

                <Card className="gradient-card-amber border hover-lift group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Train className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="font-bold text-base group-hover:text-primary transition-colors">Choosing the Right Train</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">When comparing results, consider these factors: <strong className="text-foreground">Journey duration</strong> varies significantly — express trains skip many stations and are faster. <strong className="text-foreground">Train type</strong> matters for comfort: AC trains offer air conditioning, premium seating, and meals; Express trains offer standard coaches. <strong className="text-foreground">Running days</strong> are important as not all trains operate daily.</p>
                  </CardContent>
                </Card>

                <Card className="gradient-card-purple border hover-lift group md:col-span-2">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Navigation className="w-5 h-5 text-purple-500" />
                      </div>
                      <h3 className="font-bold text-base group-hover:text-primary transition-colors">Popular Routes in Pakistan</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">The busiest routes include <strong className="text-foreground">Karachi to Lahore</strong> (12+ daily trains, 18-22 hours), <strong className="text-foreground">Lahore to Rawalpindi</strong> (8+ trains, 4-5 hours), <strong className="text-foreground">Karachi to Rawalpindi</strong> (10+ trains, 22-30 hours), and <strong className="text-foreground">Karachi to Peshawar</strong> (6+ trains, 28-34 hours). Use our planner to compare all options on these routes and find the train that best fits your schedule and budget.</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </>
        )}

        {/* Quick Links */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">RELATED TOOLS</p>
            <h2 className="text-xl sm:text-2xl font-bold">More Travel Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Train, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any train in real-time with GPS positioning and live speed data.", link: "/train" },
              { icon: Navigation, gradient: "gradient-card-amber", title: "Find My Train (GPS)", desc: "Auto-detect which train you're on using your phone's GPS location.", link: "/find-my-train" },
              { icon: Clock, gradient: "gradient-card-blue", title: "Train Schedule", desc: "Complete timetables for all Pakistan Railway trains with departure and arrival times.", link: "/schedule" },
            ].map((tool, i) => (
              <Link key={i} to={tool.link}>
                <Card className={`${tool.gradient} border hover-lift group h-full`}>
                  <CardContent className="p-5">
                    <tool.icon className="w-8 h-8 text-primary mb-3 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="font-bold mb-1 text-sm group-hover:text-primary transition-colors">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                    <span className="text-xs text-primary font-medium mt-3 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Open <ArrowRight className="w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 sm:mb-16 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">GOT QUESTIONS?</p>
            <h2 className="text-2xl font-bold">Journey Planner FAQs</h2>
            <p className="text-sm text-muted-foreground mt-1">Common questions about planning your train journey in Pakistan</p>
          </div>
          <Accordion type="single" collapsible>
            {plannerFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pl-9 leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>

      {/* CTA Footer */}
      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Track Your Train Live?</h2>
          <p className="text-base opacity-80 max-w-xl mx-auto mb-6">After planning your journey, track trains in real-time with GPS positioning, speed data, and delay information.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/train">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Train className="w-4 h-4" /> Open Live Tracker
              </Button>
            </Link>
            <Link to="/schedule">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <Clock className="w-4 h-4" /> View Schedules
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": plannerFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
    </main>
  );
}
