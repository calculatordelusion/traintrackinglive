import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, Train } from "lucide-react";
import PremiumHero from "@/components/PremiumHero";
import { Input } from "@/components/ui/input";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trains } from "@/data/trains";
import { fetchLivePositions, type LiveTrainPosition, type LiveStats } from "@/lib/trainApi";

type FilterTab = "all" | "live" | "offline";
type CategoryTab = "all" | "express" | "passenger";

export default function LiveTrainsPage() {
  const { category } = useParams<{ category?: string }>();
  const [search, setSearch] = useState("");
  const [livePositions, setLivePositions] = useState<LiveTrainPosition[]>([]);
  const [liveTrainIds, setLiveTrainIds] = useState<Set<number>>(new Set());
  const [stats, setStats] = useState<LiveStats>({ moving: 0, atStation: 0, total: 0, liveCount: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const categoryFilter: CategoryTab = useMemo(() => {
    if (category === "express" || category === "passenger") return category;
    return "all";
  }, [category]);

  useEffect(() => {
    const load = async () => {
      try {
        const { positions, stats: s, liveTrainIds: ids } = await fetchLivePositions();
        setLivePositions(positions);
        setStats(s);
        setLiveTrainIds(new Set(ids));
        setLastUpdated(new Date());
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const liveTrainMap = useMemo(() => {
    const map = new Map<number, LiveTrainPosition>();
    livePositions.filter((p) => p.type !== "freight").forEach((p) => map.set(p.id, p));
    return map;
  }, [livePositions]);

  const filteredTrains = useMemo(() => {
    const q = search.toLowerCase();
    let list = search.length > 0
      ? trains.filter((t) => t.name.toLowerCase().includes(q) || t.number.toLowerCase().includes(q) || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q) || t.nameUrdu.includes(search))
      : [...trains];

    if (categoryFilter === "express") list = list.filter((t) => t.type === "express" || t.type === "ac");
    if (categoryFilter === "passenger") list = list.filter((t) => t.type === "passenger");

    if (filter === "live") list = list.filter((t) => liveTrainIds.has(t.id));
    if (filter === "offline") list = list.filter((t) => !liveTrainIds.has(t.id));

    return list.sort((a, b) => {
      const aLive = liveTrainIds.has(a.id) ? 1 : 0;
      const bLive = liveTrainIds.has(b.id) ? 1 : 0;
      return bLive - aLive || a.id - b.id;
    });
  }, [search, liveTrainIds, filter, categoryFilter]);

  const formatTime = (d: Date) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <div>
      <SEOHead
        title="Track Live Trains Pakistan — Real-Time GPS Map (Updated Every 5s) 2026"
        description={`Track ${stats.total || 164}+ Pakistan Railways trains LIVE right now. See real-time GPS positions, speed in km/h, delay status & accurate ETAs. Updated every 5 seconds. Free, no signup — works on any phone.`}
        canonical="/train"
        keywords="live train tracking pakistan, pakistan railway live status today, train GPS tracker pakistan, real-time train position, running train status pakistan, live train map pakistan, is my train late today, train location live pakistan 2026"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Live Trains", url: "/train" }]}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Pakistan Railways Live Train Tracker",
          "description": `Real-time GPS tracking for ${trains.length}+ Pakistan Railways trains with live positions, speed, and delay status.`,
          "numberOfItems": trains.length,
          "itemListElement": trains.slice(0, 50).map((t, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "Trip",
              "name": `${t.name} (${t.number})`,
              "url": `https://trackmytrain.pk/train/${t.number.toLowerCase().replace(/\s+/g, '-')}`,
              "description": `${t.name} — ${t.from} to ${t.to}`,
              "departureStation": { "@type": "TrainStation", "name": t.from },
              "arrivalStation": { "@type": "TrainStation", "name": t.to }
            }
          }))
        }]}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-15" />
        <div className="relative container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>Live Trains</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 bg-[hsl(152_55%_40%/0.15)] backdrop-blur-sm border border-[hsl(152_55%_40%/0.3)] rounded-full px-5 py-2.5 text-sm mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(152_55%_45%)] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[hsl(152_55%_45%)]" />
              </span>
              <span className="font-semibold tracking-wider text-[hsl(152_55%_45%)]">LIVE GPS TRACKING • UPDATED EVERY 5 SECONDS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
              Track All{" "}
              <span className="text-gradient-gold">Pakistan Railways Trains</span>
            </h1>
            <p className="text-base sm:text-lg opacity-90 mb-2 max-w-2xl">
              Monitor {stats.total || 164}+ trains in real-time with GPS accuracy. View live speed, delay status, and estimated arrival times across {categoryFilter === "express" ? "express" : categoryFilter === "passenger" ? "passenger" : "all"} trains.
            </p>
            <p className="opacity-60 text-sm">پاکستان ریلوے کی تمام ٹرینوں کو لائیو ٹریک کریں</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <Link to="/trains/express" className="px-4 py-2 rounded-full bg-[hsl(0_0%_100%/0.1)] hover:bg-[hsl(0_0%_100%/0.2)] backdrop-blur-sm border border-[hsl(0_0%_100%/0.1)] text-sm font-medium transition-colors">Express Trains</Link>
            <Link to="/trains/passenger" className="px-4 py-2 rounded-full bg-[hsl(0_0%_100%/0.1)] hover:bg-[hsl(0_0%_100%/0.2)] backdrop-blur-sm border border-[hsl(0_0%_100%/0.1)] text-sm font-medium transition-colors">Passenger Trains</Link>
            <Link to="/schedule" className="px-4 py-2 rounded-full bg-[hsl(0_0%_100%/0.1)] hover:bg-[hsl(0_0%_100%/0.2)] backdrop-blur-sm border border-[hsl(0_0%_100%/0.1)] text-sm font-medium transition-colors">Schedules</Link>
            <Link to="/stations" className="px-4 py-2 rounded-full bg-[hsl(0_0%_100%/0.1)] hover:bg-[hsl(0_0%_100%/0.2)] backdrop-blur-sm border border-[hsl(0_0%_100%/0.1)] text-sm font-medium transition-colors">Stations</Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats bar - live data with gradient cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { value: stats.total, label: "Total Trains", gradient: "gradient-card-emerald" },
            { value: stats.running ?? stats.liveCount, label: "Running Now", gradient: "gradient-card-blue" },
            { value: stats.atStation, label: "At Station", gradient: "gradient-card-amber" },
            { value: lastUpdated ? formatTime(lastUpdated) : '--', label: "Last Updated", gradient: "gradient-card-purple", isTime: true },
          ].map((s, i) => (
            <Card key={i} className={`${s.gradient} border hover-lift group`}>
              <CardContent className="p-4 text-center">
                <div className={`${s.isTime ? 'text-sm' : 'text-3xl'} font-bold text-primary stat-counter transition-transform duration-300 group-hover:scale-105`}>{s.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter("all")}
            className="rounded-full"
          >
            All ({stats.total})
          </Button>
          <Button 
            variant={filter === "live" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter("live")}
            className="rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(152_55%_45%)] mr-1.5 animate-pulse" />
            Live ({stats.running ?? stats.liveCount})
          </Button>
          <Button 
            variant={filter === "offline" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter("offline")}
            className="rounded-full"
          >
            Offline ({stats.offline ?? (stats.total - (stats.running ?? stats.liveCount))})
          </Button>
          
          <div className="ml-auto relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search trains..." className="pl-10 h-9" />
          </div>
        </div>

        {/* Train Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTrains.map((train) => {
            const live = liveTrainMap.get(train.id);
            const isLive = liveTrainIds.has(train.id);
            const direction = train.number.toLowerCase().includes('up') ? 'UP' : 'DN';
            
            return (
              <Link key={train.id} to={`/train/${train.id}`}>
                <Card className={`hover:shadow-lg hover:border-primary/30 transition-all group ${isLive ? 'border-primary/20' : 'opacity-75'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {isLive ? 'LIVE' : 'OFFLINE'}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${direction === 'UP' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                        {direction}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
                      {train.name} {train.number}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1">{train.nameUrdu}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">#{train.id}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {train.from} To {train.to}
                    </p>
                    {live ? (
                      <div className="text-xs text-primary mt-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(152_55%_45%)] live-pulse" />
                        {live.speed} km/h • {live.delayMinutes === 0 ? 'On Time' : `${live.delayMinutes}m late`}
                      </div>
                    ) : isLive ? (
                      <div className="text-xs text-primary mt-2">🔜 Coming Soon</div>
                    ) : null}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredTrains.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Train className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No trains found matching "{search}"</p>
          </div>
        )}

        {/* Why Use Our Live Tracking - Gradient Cards */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">KEY FEATURES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Why Use Our Live Tracking?</h2>
            <p className="text-sm text-muted-foreground mt-1">The most accurate and reliable train tracking platform in Pakistan</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: "📡", title: "Real GPS Data", desc: "Direct GPS coordinates from train devices, not estimated positions. See exact locations on the map with 5-second refresh rate.", gradient: "gradient-card-emerald" },
              { icon: "🎯", title: "Accurate ETAs", desc: "Smart calculations based on current speed, delays, and distance. Plan your station arrival perfectly with precision estimates.", gradient: "gradient-card-amber" },
              { icon: "🔔", title: "Delay Alerts", desc: "Instant notification when trains are running late. Know delays before arriving at the station to save your time.", gradient: "gradient-card-rose" },
              { icon: "⚡", title: "Live Speed", desc: "See current train speed in km/h. Know if it's moving, stopped, or accelerating in real-time across the network.", gradient: "gradient-card-blue" },
              { icon: "📍", title: "Distance & Next Stop", desc: "View distance to next station and remaining journey. Perfect for planning pickups and drops at the station.", gradient: "gradient-card-purple" },
              { icon: "🆓", title: "100% Free", desc: "No subscription, no ads, no hidden costs. Free train tracking for all Pakistani travelers — works on 2G/3G too.", gradient: "gradient-card-teal" },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110 inline-block">{item.icon}</div>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Travel Tips Section */}
        <section className="mt-12 sm:mt-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TRAVEL GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Pakistan Railway Travel Tips</h2>
            <p className="text-sm text-muted-foreground mt-1">Essential information for a smooth train journey across Pakistan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {[
              { icon: "🕐", title: "Best Time to Travel", desc: "Winter (November to February) offers the most comfortable train journeys with mild weather. Summer months can be hot in Economy class — consider AC coaches for long-distance travel during May to August. Avoid Eid holidays unless you book well in advance.", gradient: "gradient-card-emerald" },
              { icon: "🎫", title: "Booking & Tickets", desc: "Book tickets online at pak-railways.gov.pk or at station counters. For popular trains like Green Line and Tezgam, book 15-30 days in advance — especially for AC Business class during holidays and weekends.", gradient: "gradient-card-amber" },
              { icon: "🧳", title: "Luggage Guidelines", desc: "Each passenger can carry up to 40kg of luggage for express trains. Keep valuables in your carry-on. For oversized luggage, use the brake van (parcel service). Label all bags with your name and destination station.", gradient: "gradient-card-blue" },
              { icon: "📱", title: "Stay Connected", desc: "Mobile networks work across most of the Main Line 1 corridor. Download offline maps before your journey. Use our live tracker to share your real-time location with family. Charge your devices at stations as not all coaches have outlets.", gradient: "gradient-card-purple" },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group`}>
                <CardContent className="p-6">
                  <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110 inline-block">{item.icon}</div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Trains - Gradient Cards */}
        <section className="mt-12 sm:mt-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">MOST TRACKED</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Popular Trains to Track</h2>
            <p className="text-sm text-muted-foreground mt-1">Most tracked trains on our platform by Pakistani travelers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "PREMIUM", name: "Green Line Express", route: "Karachi ↔ Islamabad", id: 5, gradient: "gradient-card-emerald", desc: "Pakistan's flagship premium train with AC Business class and complimentary meals." },
              { label: "POPULAR", name: "Tezgam Express", route: "Karachi ↔ Rawalpindi", id: 7, gradient: "gradient-card-amber", desc: "One of the most iconic trains serving millions of passengers annually." },
              { label: "FAST", name: "Karakoram Express", route: "Karachi ↔ Lahore", id: 41, gradient: "gradient-card-blue", desc: "Comfortable overnight travel with AC sleeper berths and dining car." },
              { label: "HISTORIC", name: "Khyber Mail", route: "Peshawar ↔ Karachi", id: 1, gradient: "gradient-card-purple", desc: "The legendary cross-country service traversing the entire Main Line 1." },
            ].map((t) => (
              <Link key={t.id} to={`/train/${t.id}`}>
                <Card className={`${t.gradient} border hover-lift group h-full`}>
                  <CardContent className="p-5">
                    <span className="text-[10px] font-black tracking-widest text-primary/70">{t.label}</span>
                    <h3 className="font-bold text-sm mt-2 group-hover:text-primary transition-colors">{t.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.route}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">{t.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Live Train Tracking in Pakistan — Complete Guide</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p className="text-base leading-relaxed">Pakistan Railways operates over <strong className="text-foreground">{stats.total || 164} trains</strong> daily across its vast rail network, serving millions of passengers. Our live GPS tracking system monitors every active train in real-time, providing accurate position data, speed readings, and delay information updated every 5 seconds.</p>
            <p className="text-base leading-relaxed">Whether you're waiting at the station, planning a pickup, or just curious about your train's status, our tracker covers all major corridors including <strong className="text-foreground">Main Line 1</strong> (Karachi to Peshawar), the <strong className="text-foreground">Karachi–Quetta</strong> route via Bolan Pass, and branch lines across Punjab, Sindh, and Khyber Pakhtunkhwa.</p>
            <p className="text-base leading-relaxed">Use the filter tabs above to switch between live and offline trains, or search by train name, number, or route. Click any train card to view its detailed tracking page with an interactive map, complete stop schedule, and real-time ETAs for all upcoming stations.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
