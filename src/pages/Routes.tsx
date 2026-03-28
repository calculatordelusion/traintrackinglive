import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Train, Clock, MapPin, HelpCircle, Route, Globe, Wifi, Navigation, Gauge, Map, ChevronRight, Star, Zap, BarChart3, Shield } from "lucide-react";
import PremiumHero from "@/components/PremiumHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { trains } from "@/data/trains";
import { stations } from "@/data/stations";
import { fetchLivePositions, type LiveStats } from "@/lib/trainApi";

interface RouteGroup {
  from: string;
  to: string;
  trains: typeof trains;
  duration: string;
}

// Major railway corridors matching traintracking.pk
const majorCorridors = [
  { name: "Main Line", gradient: "gradient-card-emerald", icon: Route, iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", route: "Karachi → Lahore → Rawalpindi → Peshawar", distance: "1,687 km", desc: "The backbone of Pakistan Railways connecting the four largest cities. Handles 60% of all passenger traffic with 20+ daily express and mail trains including Tezgam, Green Line, Karakoram Express, and Khyber Mail.", trains: 24, stations: 120 },
  { name: "Karachi–Quetta Route", gradient: "gradient-card-amber", icon: Map, iconBg: "bg-amber-500/15", iconColor: "text-amber-500", route: "Karachi → Sukkur → Quetta", distance: "863 km", desc: "Passing through the scenic Bolan Pass in Balochistan, this route connects Pakistan's largest port city with the provincial capital. Features the historic Bolan Mail and Jaffar Express services.", trains: 4, stations: 45 },
  { name: "Lahore–Multan Route", gradient: "gradient-card-blue", icon: Navigation, iconBg: "bg-blue-500/15", iconColor: "text-blue-500", route: "Lahore → Sahiwal → Multan", distance: "342 km", desc: "One of the busiest short-distance corridors in Pakistan, serving the densely populated Punjab heartland. Features frequent express and passenger services throughout the day.", trains: 16, stations: 35 },
  { name: "Rawalpindi–Lahore Route", gradient: "gradient-card-purple", icon: Zap, iconBg: "bg-purple-500/15", iconColor: "text-purple-500", route: "Rawalpindi → Gujrat → Lahore", distance: "290 km", desc: "The fastest corridor in the network with premium trains completing the journey in under 4 hours. Serves Islamabad commuters and connects the twin cities with Punjab's capital.", trains: 12, stations: 25 },
];

const routeFaqs = [
  { q: "What are the most popular train routes in Pakistan?", a: "The most popular Pakistan Railways routes by passenger volume are: Karachi to Lahore (served by 12+ trains daily including Tezgam, Green Line, Karakoram Express, and Business Express), Lahore to Rawalpindi (8+ trains with 4-5 hour journey time), Karachi to Peshawar (6+ trains including the famous Khyber Mail covering 1,558 km), and Lahore to Multan (10+ trains). These routes connect Pakistan's major population centers and carry millions of passengers every year." },
  { q: "What is the longest train route in Pakistan?", a: "The longest train route in Pakistan is the Karachi to Peshawar corridor, covering approximately 1,687 kilometers on the Main Line. The Khyber Mail (1UP/2DN) operates on the full route, taking approximately 30 hours to complete the journey. This historic route passes through all four provinces of Pakistan and stops at major cities including Hyderabad, Sukkur, Multan, Lahore, and Rawalpindi before reaching Peshawar." },
  { q: "How do I choose the best train for my route?", a: "When choosing a train, consider: (1) Journey duration — express trains are faster but cost more. (2) Coach class — AC Parlor for luxury, Economy for budget travel. (3) Departure time — overnight trains are ideal for long journeys, saving you a hotel night. (4) Running days — not all trains operate daily; check the schedule. (5) Punctuality record — premium trains like Green Line and Business Express maintain better on-time performance. Use our Journey Planner to compare all available options." },
  { q: "Are there connecting routes available?", a: "Yes, many routes require connections at major junction stations. Common connection points include Lahore Junction (for east-west routes), Sukkur/Rohri Junction (for Karachi-Quetta connections via Bolan Mail), Rawalpindi (for Islamabad connections and northbound travel), and Khanewal Junction (for routes branching toward Multan and southern Punjab). When planning connecting journeys, allow at least 2-3 hours between trains for potential delays." },
  { q: "Which routes offer AC (air-conditioned) trains?", a: "AC trains operate on all major routes in Pakistan. The Green Line Express offers premium AC service on the Karachi–Islamabad route with reclining seats, meal service, and WiFi. Tezgam, Karakoram Express, Business Express, and Shalimar Express all offer AC Standard and AC Parlor coaches. AC coaches include comfortable seating, blankets, pillows, and complimentary meals on premium services. Economy AC is also available on select trains." },
  { q: "How can I track trains on a specific route in real-time?", a: "To track trains on any route in real-time, visit our Live Train Tracker page. You can filter by route or search for specific trains by name or number. Each train shows its current GPS position, speed, delay status, and estimated arrival times at upcoming stations. Data updates automatically every 5 seconds, giving you the most accurate tracking information available for Pakistan Railways." },
  { q: "What is the fastest train route in Pakistan?", a: "The fastest train route in Pakistan is the Lahore to Rawalpindi corridor. Premium trains like Business Express and Green Line complete this 290 km journey in approximately 4 hours, reaching speeds of up to 120 km/h on upgraded track sections. The Karachi to Lahore journey on Green Line takes about 18 hours covering 1,228 km, making it the fastest option on the main trunk route." },
  { q: "How many railway stations are there in Pakistan?", a: "Pakistan Railways operates 342+ major railway stations across its network spanning approximately 7,791 kilometers of track. Major junction stations include Lahore Junction (the busiest), Karachi Cantt, Rawalpindi, Multan Cantt, Faisalabad, Peshawar Cantt, Quetta, and Sukkur Junction. Each station serves different train types — express trains stop only at major stations while passenger trains serve all stops along the route." },
  { q: "What is the most scenic train route in Pakistan?", a: "The Quetta–Peshawar route through the Bolan Pass is considered the most scenic, with breathtaking mountain views, tunnels, and bridges through Balochistan's rugged terrain. The Karachi–Quetta route via Sibi offers dramatic landscapes including the famous Chappar Rift. For Punjab plains scenery, the Lahore–Multan corridor passes through lush agricultural heartland." },
  { q: "Are there direct trains from Karachi to Islamabad?", a: "Yes, multiple trains run directly from Karachi to Rawalpindi/Islamabad including Green Line Express (fastest at ~16 hours), Business Express, Tezgam, and Karakoram Express. Rawalpindi station serves as the railway gateway to Islamabad, located about 15 km from the capital. All these trains continue to or originate from other major cities." },
  { q: "Which route has the most trains per day?", a: "The Lahore–Rawalpindi corridor has the highest train frequency with 12+ daily services in each direction. The Karachi–Lahore main trunk route follows closely with 10+ daily trains. Lahore–Multan also sees 8+ services daily. These high-frequency corridors serve the densely populated Punjab region." },
  { q: "Do train routes change during monsoon season?", a: "Yes, during heavy monsoon rains (July–September), some routes may experience temporary diversions or suspensions, particularly in Sindh and southern Punjab due to flooding. Track sections near rivers and low-lying areas are most affected. Check our Live Tracker for real-time route status during monsoon season." },
  { q: "Can I travel from Pakistan to India by train?", a: "The Samjhauta Express (Lahore–Attari) operated between Pakistan and India but has been suspended since 2019. The Thar Express (Karachi–Jodhpur via Munabao) also operated intermittently. Currently, no cross-border train services are operational. Check official announcements for any resumption of services." },
  { q: "What are junction stations and why are they important?", a: "Junction stations are where two or more railway lines meet, allowing passengers to change trains for different destinations. Key junctions include Lahore Junction, Khanewal Junction, Sukkur/Rohri Junction, Lala Musa Junction, and Kotri Junction. Planning connections through junctions is essential for reaching destinations not on direct routes." },
  { q: "How are train routes numbered in Pakistan?", a: "Trains are numbered with UP (odd numbers like 1UP, 3UP) for south-to-north or west-to-east direction, and DN (even numbers like 2DN, 4DN) for the reverse. Lower numbers generally indicate higher priority trains. The same train has different numbers for each direction — e.g., Khyber Mail is 1UP (Peshawar→Karachi) and 2DN (Karachi→Peshawar)." },
  { q: "Which routes are being upgraded under CPEC?", a: "The ML-1 (Main Line 1) upgrade under CPEC is a $6.8 billion project to upgrade the entire 1,733 km Karachi–Peshawar corridor. Phase 1 covers the Multan–Sukkur section (459 km). The upgrade will increase maximum speeds from 100 to 160 km/h, add double tracking, modern signaling, and new stations. Completion is expected by 2028-2030." },
];

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<LiveStats>({ moving: 0, atStation: 0, total: 0, liveCount: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const { stats: s } = await fetchLivePositions();
        setStats(s);
      } catch (e) { console.error(e); }
    };
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const routeGroups = useMemo(() => {
    const groups = new globalThis.Map<string, typeof trains>();
    trains.forEach((t) => {
      const fromCity = t.from.replace(/ Cantt| Jn| City| Junction/g, "").trim();
      const toCity = t.to.replace(/ Cantt| Jn| City| Junction/g, "").trim();
      const key = [fromCity, toCity].sort().join(" ↔ ");
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(t);
    });

    const result: RouteGroup[] = [];
    groups.forEach((groupTrains) => {
      if (groupTrains.length >= 1) {
        const first = groupTrains[0];
        const durations = groupTrains.map((t) => {
          const h = parseInt(t.duration.match(/(\d+)h/)?.[1] || "0");
          const m = parseInt(t.duration.match(/(\d+)m/)?.[1] || "0");
          return h * 60 + m;
        });
        const minDur = Math.min(...durations);
        const maxDur = Math.max(...durations);
        const formatDur = (mins: number) => {
          const h = Math.floor(mins / 60);
          const m = mins % 60;
          return m > 0 ? `${h}h ${m}m` : `${h}h`;
        };
        result.push({
          from: first.from,
          to: first.to,
          trains: groupTrains,
          duration: minDur === maxDur ? formatDur(minDur) : `${formatDur(minDur)} - ${formatDur(maxDur)}`,
        });
      }
    });

    result.sort((a, b) => b.trains.length - a.trains.length);
    return result;
  }, []);

  const filtered = useMemo(() => {
    if (!searchQuery) return routeGroups;
    const q = searchQuery.toLowerCase();
    return routeGroups.filter(
      (r) =>
        r.from.toLowerCase().includes(q) ||
        r.to.toLowerCase().includes(q) ||
        r.trains.some((t) => t.name.toLowerCase().includes(q))
    );
  }, [searchQuery, routeGroups]);

  return (
    <main>
      <SEOHead
        title="Pakistan Railway Route Map 2026 — Train Routes, Stops & Corridors"
        description={`Explore ${routeGroups.length} Pakistan Railways routes with corridor maps, major stops, journey distances, and city-to-city train options across ${stations.length}+ stations.`}
        canonical="/routes"
        keywords="pakistan railway route map, pakistan railway routes, train routes with stops, karachi to lahore train route, pakistan railways route map, railway network map pakistan, ML-1 route, pakistan railway corridors, city to city train routes pakistan"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Train Routes", url: "/routes" }]}
        faqSchema={routeFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Pakistan Railways Routes & Corridors",
          "description": "All major Pakistan Railways routes and railway corridors covering 7,791 km of track across four provinces",
          "url": "https://trackmytrain.pk/routes",
          "numberOfItems": routeGroups.length || 20,
          "itemListElement": majorCorridors.map((c, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": `${c.name} — ${c.route}`,
            "item": {
              "@type": "Trip",
              "name": c.name,
              "description": c.desc,
              "provider": { "@type": "Organization", "name": "Pakistan Railways" }
            }
          }))
        }]}
      />
      <PremiumHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Train Routes" }]}
        badge="LIVE ROUTE DATA • REAL-TIME"
        title={<>Pakistan Railway{" "}<span className="text-gradient-gold">Routes & Maps</span></>}
        subtitle={`Explore ${routeGroups.length} routes connecting cities across Pakistan with ${trains.length} trains and ${stations.length}+ stations. Find the best route for your journey with complete train information, live tracking, and accurate schedules.`}
        subtitleUrdu="پاکستان ریلوے کے تمام روٹس - مکمل رہنمائی اور نقشے"
      >
        {/* Live stats in hero */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {[
            { value: stats.running || stats.liveCount || stats.moving, label: "Moving Now", color: "text-emerald-400" },
            { value: stats.atStation, label: "At Stations", color: "text-amber-400" },
            { value: stats.total, label: "Total Trains", color: "text-blue-400" },
            { value: stations.length, label: "Stations", color: "text-purple-400" },
          ].map((s, i) => (
              <div key={i} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 text-center border border-primary-foreground/10">
                <div className={`text-2xl font-bold stat-counter ${s.color}`}>{s.value}</div>
                <div className="text-xs opacity-70">{s.label}</div>
              </div>
            ))}
          </div>
      </PremiumHero>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Major Railway Corridors - Gradient Cards */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">MAJOR CORRIDORS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Railway Corridors of Pakistan</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Pakistan Railways operates over 7,791 kilometers of track across four major corridor systems. These corridors form the backbone of the nation's rail infrastructure, connecting all major cities and economic centers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {majorCorridors.map((corridor, i) => (
              <Card key={i} className={`${corridor.gradient} border hover-lift group`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${corridor.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <corridor.icon className={`w-6 h-6 ${corridor.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base group-hover:text-primary transition-colors">{corridor.name}</h3>
                      <p className="text-xs text-muted-foreground">{corridor.route}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">{corridor.distance}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Train className="w-3 h-3" /> {corridor.trains} trains</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {corridor.stations} stations</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{corridor.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search & Train Selector */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">SELECT A TRAIN</p>
            <h2 className="text-xl sm:text-2xl font-bold">Browse All Train Routes</h2>
            <p className="text-sm text-muted-foreground mt-1">Search by city name or train name to find available routes</p>
          </div>
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search routes by city or train name..."
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Route list */}
          <div className="space-y-3 max-w-4xl mx-auto">
            {filtered.map((route, i) => (
              <Card key={i} className="hover-lift group border hover:border-primary/30">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors">{route.from}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors">{route.to}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground ml-7">
                        <span className="flex items-center gap-1">
                          <Train className="w-3.5 h-3.5" /> {route.trains.length} train{route.trains.length > 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {route.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 ml-7 md:ml-0">
                      {route.trains.slice(0, 4).map((t) => (
                        <Link
                          key={t.id}
                          to={`/train/${t.id}`}
                          className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors font-medium"
                        >
                          {t.name} {t.number}
                        </Link>
                      ))}
                      {route.trains.length > 4 && (
                        <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                          +{route.trains.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Train className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No routes found matching "{searchQuery}"</p>
            </div>
          )}
        </section>

        {/* Why Track Routes Section */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">ROUTE TRACKING BENEFITS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Why Use Our Route Guide?</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Our comprehensive route guide helps you plan every aspect of your Pakistan Railways journey, from departure to destination.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: Wifi, gradient: "gradient-card-emerald", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", title: "Real-Time Route Tracking", desc: "Every train on every route is tracked in real-time with GPS. See exactly where trains are positioned along their route, current speeds, and whether they're running on schedule or experiencing delays." },
              { icon: Gauge, gradient: "gradient-card-amber", iconBg: "bg-amber-500/15", iconColor: "text-amber-500", title: "Accurate Journey Times", desc: "Our journey time estimates factor in actual running patterns, not just scheduled times. Know the real expected duration for your route based on current train performance data and historical trends." },
              { icon: BarChart3, gradient: "gradient-card-blue", iconBg: "bg-blue-500/15", iconColor: "text-blue-500", title: "Compare Multiple Trains", desc: "Each route shows all available trains with their schedules, coach types, and fare classes. Compare express vs. passenger trains, AC vs. economy, and departure times to pick the perfect option." },
              { icon: Globe, gradient: "gradient-card-purple", iconBg: "bg-purple-500/15", iconColor: "text-purple-500", title: "Complete Station Guide", desc: "Every route includes detailed station information — platform numbers, facilities available, connecting trains, and estimated arrival/departure times at each stop along the way." },
              { icon: Shield, gradient: "gradient-card-rose", iconBg: "bg-rose-500/15", iconColor: "text-rose-500", title: "Plan Connections Safely", desc: "For multi-leg journeys, our route data helps you identify the best junction stations for connections. We show buffer times needed and alternative trains in case of missed connections." },
              { icon: Star, gradient: "gradient-card-teal", iconBg: "bg-teal-500/15", iconColor: "text-teal-500", title: "Bilingual Route Names", desc: "All route and station information is available in both English and Urdu. Search in either language and view complete route details with station names in your preferred script." },
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

        {/* Pakistan Railway Network Overview - Rich Gradient Cards */}
        <section className="mb-12 sm:mb-16 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">COMPREHENSIVE GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Pakistan Railway Network Overview</h2>
            <p className="text-sm text-muted-foreground mt-2">7,791 km of track • 342+ stations • 70 million passengers annually</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="gradient-card-emerald border hover-lift group">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Route className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h4 className="font-bold text-sm">Main Line — The Backbone</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">The Main Line stretches 1,687 km from Karachi to Peshawar, handling 60% of all passenger traffic. Key stations: Hyderabad, Sukkur, Multan, Khanewal, Sahiwal, Lahore, Gujranwala, Wazirabad, Jhelum, and Rawalpindi.</p>
              </CardContent>
            </Card>
            <Card className="gradient-card-amber border hover-lift group">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Train className="w-5 h-5 text-amber-500" />
                  </div>
                  <h4 className="font-bold text-sm">Express vs Passenger Trains</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed"><strong className="text-foreground">Express/Mail trains</strong> are faster with fewer stops (18-30h on main line) and offer AC coaches, sleeper berths, and dining. <strong className="text-foreground">Passenger trains</strong> stop at every station — slower but more affordable for rural communities.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-hero-gradient text-primary-foreground border-0 overflow-hidden relative mb-6">
            <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
            <CardContent className="p-5 sm:p-6 relative">
              <h4 className="font-bold text-sm mb-3">🗺️ Route Planning Checklist</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Check if direct trains exist or if you need a junction connection",
                  "Compare express vs passenger — speed vs cost tradeoff",
                  "Book AC coaches for summer journeys (May–September)",
                  "Verify running days — not all trains operate daily",
                  "Use Live Tracker on travel day to monitor delays",
                  "UP trains go south→north, DN trains go north→south",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs opacity-90">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Tools */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">RELATED TOOLS</p>
            <h2 className="text-xl sm:text-2xl font-bold">Plan Your Journey</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Train, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any train in real-time with GPS positioning and live speed data.", link: "/train" },
              { icon: MapPin, gradient: "gradient-card-amber", title: "Journey Planner", desc: "Compare routes and find the best train for your schedule and budget.", link: "/planner" },
              { icon: Globe, gradient: "gradient-card-blue", title: "Stations Directory", desc: "Browse 342+ stations with facilities, connecting trains, and GPS locations.", link: "/stations" },
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
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">GOT QUESTIONS?</p>
            <h2 className="text-2xl font-bold">Route Maps & Guide FAQs</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl mx-auto">Everything you need to know about Pakistan Railway routes, train selection, connections, and journey planning.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {routeFaqs.map((faq, i) => (
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
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Track Your Train?</h2>
          <p className="text-base opacity-80 max-w-xl mx-auto mb-6">Start tracking any Pakistan Railways train in real-time. See live GPS positions, speeds, delays, and accurate ETAs — completely free.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/train">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Train className="w-4 h-4" /> Open Live Tracker
              </Button>
            </Link>
            <Link to="/find-my-train">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <Navigation className="w-4 h-4" /> Find My Train (GPS)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": routeFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
    </main>
  );
}
