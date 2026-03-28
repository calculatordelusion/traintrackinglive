import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { popularRoutes } from "@/data/routes";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Search, ArrowRight, HelpCircle, Train, Clock, MapPin, Zap, Navigation, CreditCard } from "lucide-react";
import PremiumHero from "@/components/PremiumHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import RelatedLinks from "@/components/RelatedLinks";
import { fetchAllTrains } from "@/lib/trainApi";
import { Skeleton } from "@/components/ui/skeleton";

interface TrainData {
  id: number; number: string; name: string; nameUrdu: string;
  from: string; to: string; type: string; departureTime: string;
  arrivalTime: string; duration: string; status: string; days: string[]; stops: number;
}

const scheduleFaqs = [
  { q: "How often are train schedules updated?", a: "Our train schedules are synchronized with Pakistan Railways' official timetable. We update schedules whenever Pakistan Railways announces changes, which typically happens during seasonal schedule revisions or when new trains are introduced." },
  { q: "Are the departure and arrival times accurate?", a: "The scheduled times shown are the official Pakistan Railways timetable times. However, actual departure and arrival times may vary due to delays. Use our Live Trains feature to check real-time status and actual running times." },
  { q: "How can I find trains between two cities?", a: "Use our Journey Planner tool to search for trains between any two stations. Simply select your departure and arrival stations, and we'll show all available trains with their timings, durations, and fare information." },
  { q: "Do all trains run every day?", a: "No, not all trains run daily. Some trains operate on specific days of the week. Check the train details page for the exact running days. Most express trains like Tezgam, Green Line, and Karakoram Express run daily." },
  { q: "What time should I arrive at the station?", a: "Arrive at least 30-45 minutes before departure for express trains and 15-20 minutes for passenger trains. During peak seasons like Eid, arrive at least 1 hour early to avoid rush and secure your seat." },
  { q: "How do I know if a train is delayed today?", a: "Visit our Live Trains page to see real-time status of all running trains. Trains with delays will show the exact delay duration. You can also search for your specific train by name or number to check its current status." },
  { q: "What is the difference between Express, AC, and Passenger trains?", a: "Express trains are faster long-distance services with fewer stops and multiple coach classes. AC trains are premium air-conditioned services like Green Line and Business Express. Passenger trains are slower, stop at every station, and are the most affordable option." },
  { q: "Can I check the schedule of a specific train?", a: "Yes! Click on any train in the schedule table to view its complete details including all stops, platform numbers, distances, running days, and live tracking information. You can also search by train name or number." },
  { q: "What happens during fog season schedule changes?", a: "During fog season (December–February), Pakistan Railways often runs revised schedules with reduced speeds in Punjab. Trains may depart earlier or later than normal to avoid dense morning fog. Our schedule page automatically reflects any temporary timetable changes announced by PR." },
  { q: "How do I read the train schedule table?", a: "Each row shows: Train Number, Name, Route (origin → destination), Departure time, Arrival time, Duration, and Type (Express/AC/Passenger). Click 'Track Live' to see real-time GPS position. Use filters to show only Express, AC, or Passenger trains." },
  { q: "Are there overnight trains available?", a: "Yes, most long-distance express trains operate as overnight services. Trains departing Karachi between 15:00–19:00 arrive in Lahore the next morning. AC Sleeper class provides berths with bedding for comfortable overnight travel. Tezgam, Karakoram Express, and Shalimar Express are popular overnight options." },
  { q: "What is the earliest and latest train departure?", a: "The earliest trains typically depart around 05:00-06:00 (passenger trains), while the latest express departures are around 22:00-23:00. Major stations like Lahore and Karachi Cantt have trains departing throughout the day. Check our full schedule for exact timings on your route." },
  { q: "How many stops does each train make?", a: "Express trains typically make 15-30 stops on long routes like Karachi–Peshawar, while passenger trains stop at every station (50-80+ stops). Premium trains like Green Line and Business Express make the fewest stops (10-15), resulting in faster journey times." },
  { q: "Can I track a train's schedule history for punctuality?", a: "Our platform shows current real-time status for all trains. While we don't display historical punctuality data, checking the Live Trains page regularly will give you a sense of which trains tend to run on time. Generally, premium AC trains maintain better punctuality than older express services." },
  { q: "Do schedules change during Eid holidays?", a: "Yes, Pakistan Railways typically runs special Eid trains and adjusts schedules during major holidays. Additional coaches are added to popular trains, and some special services operate on routes not normally served. Schedule changes are announced 1-2 weeks before Eid and are reflected on our platform." },
  { q: "What is the difference between UP and DN trains?", a: "UP trains travel from south to north or west to east (e.g., Karachi to Lahore), while DN (Down) trains travel in the opposite direction. For example, Tezgam 7UP runs Karachi → Rawalpindi and Tezgam 8DN runs Rawalpindi → Karachi. This naming convention helps identify travel direction." },
];

export default function SchedulePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "express" | "passenger" | "ac">("all");
  const [allTrains, setAllTrains] = useState<TrainData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try { const data = await fetchAllTrains(); setAllTrains(data || []); }
      catch (e) { console.error("Failed to fetch trains:", e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = allTrains;
    if (filter !== "all") list = list.filter(t => t.type === filter);
    if (search.length > 1) {
      const q = search.toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.number.toLowerCase().includes(q) || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q) || t.nameUrdu.includes(search));
    }
    return list;
  }, [search, filter, allTrains]);

  const typeCounts = useMemo(() => {
    const counts = { all: allTrains.length, express: 0, passenger: 0, ac: 0 };
    for (const t of allTrains) {
      if (t.type === "express") counts.express++;
      else if (t.type === "passenger") counts.passenger++;
      else if (t.type === "ac") counts.ac++;
    }
    return counts;
  }, [allTrains]);

  return (
    <main>
      <SEOHead
        title="Pakistan Railways Train Schedule & Timetable 2026 — All 164+ Trains"
        description={`Complete Pakistan Railways train schedule 2026. View departure, arrival times for ${allTrains.length || 164}+ trains. Browse Express, AC, Passenger timetables. Live train tracking integration. Updated official timetable.`}
        canonical="/schedule"
        keywords="pakistan railway schedule 2026, train schedule pakistan, pakistan train timetable, railway time table, train timing today, pakistan railways departure time, express train schedule, train timetable updated, pakistan railway time table today"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Train Schedule", url: "/schedule" }]}
        faqSchema={scheduleFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Pakistan Railways Train Schedule 2026",
          "description": "Complete timetable of 164+ Pakistan Railways trains with departure/arrival times, stops, and running days",
          "url": "https://trackmytrain.pk/schedule",
          "numberOfItems": allTrains.length || 164,
          "itemListElement": (allTrains.length > 0 ? allTrains.slice(0, 20) : []).map((t, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": `${t.name} (${t.number})`,
            "url": `https://trackmytrain.pk/train/${t.id}`,
            "item": {
              "@type": "Trip",
              "name": t.name,
              "departureTime": t.departureTime,
              "arrivalTime": t.arrivalTime,
              "provider": { "@type": "Organization", "name": "Pakistan Railways" }
            }
          }))
        }]}
      />
      <PremiumHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Train Schedule" }]}
        badge="OFFICIAL TIMETABLES • UPDATED 2026"
        title={<>Pakistan Railways{" "}<span className="text-gradient-gold">Schedule & Timetables</span></>}
        subtitle={`Browse complete train schedules, departure times, and routes for all ${allTrains.length || 164}+ Pakistan Railways trains across 342+ stations.`}
        subtitleUrdu="پاکستان ریلوے ٹرین شیڈول اور ٹائم ٹیبل ۲۰۲۶"
        centered
      />

      {/* Floating Stats */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: loading ? "..." : `${allTrains.length}+`, label: "Total Trains", icon: Train, gradient: "gradient-card-emerald" },
            { value: "342+", label: "Stations", icon: MapPin, gradient: "gradient-card-amber" },
            { value: loading ? "..." : String(typeCounts.express), label: "Express Trains", icon: Zap, gradient: "gradient-card-blue" },
            { value: loading ? "..." : String(typeCounts.ac), label: "AC Premium", icon: Navigation, gradient: "gradient-card-purple" },
          ].map((s, i) => (
            <Card key={i} className={`${s.gradient} border hover-lift group`}>
              <CardContent className="p-4 text-center">
                <s.icon className="w-5 h-5 text-primary mx-auto mb-1 transition-transform duration-300 group-hover:scale-110" />
                <div className="text-xl font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">

        {/* Popular Routes - Gradient Cards */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TOP ROUTES</p>
            <h2 className="text-2xl font-bold">Popular Routes</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {popularRoutes.slice(0, 6).map((route, i) => {
              const gradients = ["gradient-card-emerald", "gradient-card-amber", "gradient-card-blue", "gradient-card-purple", "gradient-card-rose", "gradient-card-teal"];
              return (
                <Card key={i} className={`${gradients[i]} border hover-lift group cursor-pointer`} onClick={() => setSearch(route.from)}>
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-bold text-primary mb-1">{route.trainCount} trains</div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="text-sm font-semibold">{route.from}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-semibold">{route.to}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{route.duration}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {(["all", "express", "passenger", "ac"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === f ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f === "all" ? `All (${typeCounts.all})` : f === "ac" ? `AC (${typeCounts.ac})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${typeCounts[f]})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search train by name, number, or route..." className="pl-10 rounded-xl" />
        </div>

        {/* Table */}
        <h2 className="text-xl font-bold mb-4">All Train Schedules ({loading ? "..." : filtered.length} trains)</h2>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}
          </div>
        ) : (
          <>
            <div className="overflow-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left py-3 px-4 font-medium">#</th>
                    <th className="text-left py-3 px-4 font-medium">Train</th>
                    <th className="text-left py-3 px-4 font-medium">Route</th>
                    <th className="text-left py-3 px-4 font-medium">Departure</th>
                    <th className="text-left py-3 px-4 font-medium">Arrival</th>
                    <th className="text-left py-3 px-4 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((train) => (
                    <tr key={train.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-muted-foreground text-xs">{train.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{train.name} {train.number}</div>
                        <div className="text-xs text-muted-foreground">{train.nameUrdu}</div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{train.from} → {train.to}</td>
                      <td className="py-3 px-4 font-medium">{train.departureTime}</td>
                      <td className="py-3 px-4 font-medium">{train.arrivalTime}</td>
                      <td className="py-3 px-4 text-muted-foreground">{train.duration}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${train.type === 'ac' ? 'bg-accent/10 text-accent-foreground' : train.type === 'express' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {train.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Link to={`/train/${train.id}`} className="text-primary text-xs font-medium hover:underline">Track Live →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">No trains found matching "{search}"</div>
            )}
          </>
        )}

        {/* Quick Links */}
        <section className="mt-12 sm:mt-16 mb-8">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">EXPLORE MORE</p>
            <h2 className="text-xl sm:text-2xl font-bold">Related Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Navigation, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any train's real-time position on an interactive map.", link: "/train" },
              { icon: MapPin, gradient: "gradient-card-amber", title: "Journey Planner", desc: "Find the best routes between any two stations.", link: "/planner" },
              { icon: CreditCard, gradient: "gradient-card-blue", title: "Ticket Pricing", desc: "Complete fare chart for all classes and routes.", link: "/ticket-pricing" },
            ].map((tool, i) => (
              <Link key={i} to={tool.link}>
                <Card className={`${tool.gradient} border hover-lift group h-full`}>
                  <CardContent className="p-5">
                    <tool.icon className="w-8 h-8 text-primary mb-3 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="font-bold mb-1 text-sm group-hover:text-primary transition-colors">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Travel Tips */}
        <section className="mt-12 sm:mt-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TRAVEL INFORMATION</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Train Travel Tips & Information</h2>
            <p className="text-sm text-muted-foreground mt-1">Essential tips for traveling by train in Pakistan</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: "🕐", title: "Arrive Early", desc: "Reach the station at least 30-45 minutes before departure for express trains. During Eid and holiday seasons, arrive 1 hour early to navigate the crowds.", gradient: "gradient-card-emerald" },
              { icon: "🎫", title: "Advance Booking", desc: "Book tickets 15-30 days before travel for AC and Business class on popular trains. Walk-in tickets are usually available for Economy and Passenger trains.", gradient: "gradient-card-amber" },
              { icon: "📍", title: "Platform Info", desc: "Check platform numbers on departure boards at the station. Our live tracker shows which station the train is approaching so you can prepare for boarding.", gradient: "gradient-card-blue" },
              { icon: "🍽️", title: "Food & Amenities", desc: "Major junction stations like Lahore, Multan, and Sukkur have food vendors and waiting rooms. Premium trains like Green Line offer complimentary meals in Business class.", gradient: "gradient-card-purple" },
              { icon: "🔋", title: "Stay Charged", desc: "Carry a power bank for long journeys. AC Business and some Express coaches have charging points. WiFi is available on Green Line Business class only.", gradient: "gradient-card-rose" },
              { icon: "🧭", title: "Track Your Train", desc: "Use our Live Tracker to monitor your train before heading to the station. Check delay status and get accurate ETAs so you know exactly when to arrive.", gradient: "gradient-card-teal" },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group`}>
                <CardContent className="p-5">
                  <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110 inline-block">{item.icon}</div>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12 sm:mt-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-3">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold">Schedule & Timetable FAQs</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {scheduleFaqs.map((faq, i) => (
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

        {/* Rich SEO Editorial Content */}
        <section className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">COMPREHENSIVE GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Pakistan Railways Schedule Guide 2026</h2>
            <p className="text-sm text-muted-foreground mt-2">Everything you need to know about train timings, routes, and planning your journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: Train, gradient: "gradient-card-emerald", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", title: "Vast Network Coverage", desc: `Pakistan Railways operates ${allTrains.length || 164}+ trains across 342+ stations from Karachi to Peshawar. Our timetable includes all express, AC, and passenger trains with accurate departure and arrival times.` },
              { icon: MapPin, gradient: "gradient-card-amber", iconBg: "bg-amber-500/15", iconColor: "text-amber-500", title: "All Major Corridors", desc: "The schedule covers Main Line 1 (Karachi–Peshawar), Karachi–Quetta via Bolan Pass, Lahore–Rawalpindi corridor, and all branch lines. Green Line, Tezgam, Karakoram Express run daily." },
              { icon: Zap, gradient: "gradient-card-blue", iconBg: "bg-blue-500/15", iconColor: "text-blue-500", title: "Real-Time Integration", desc: "Combine schedule data with our Live Train Tracker for actual running status and delays. Check the Delay Checker tool to monitor punctuality before heading to the station." },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group`}>
                <CardContent className="p-5">
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h4 className="font-bold text-sm mb-2">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Peak Travel Season Guide */}
          <Card className="bg-hero-gradient text-primary-foreground border-0 overflow-hidden relative mb-6">
            <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
            <CardContent className="p-5 sm:p-6 relative">
              <h3 className="font-bold text-base mb-3">🗓️ Peak Travel Season Calendar 2026</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { period: "Eid ul-Fitr", months: "March", tip: "Book 15-30 days early. Extra trains added." },
                  { period: "Summer Rush", months: "Jun–Aug", tip: "Students travel home. AC classes fill fast." },
                  { period: "Eid ul-Adha", months: "June", tip: "Heaviest traffic. Special trains announced." },
                  { period: "Fog Season", months: "Dec–Feb", tip: "Expect 3-6hr delays in Punjab corridor." },
                ].map((s, i) => (
                  <div key={i} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 border border-primary-foreground/10">
                    <div className="font-bold text-sm">{s.period}</div>
                    <div className="text-xs opacity-70 mb-1">{s.months}</div>
                    <div className="text-[10px] opacity-80">{s.tip}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule Reading Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="gradient-card-purple border hover-lift group">
              <CardContent className="p-5">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> How to Read Our Schedule
                </h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {[
                    "Filter by type: Express (fastest), AC (premium), Passenger (all stops)",
                    "Search by train name, number, or city for quick results",
                    "Click any train row → full details with all stops & live position",
                    "Duration shows scheduled time — check Live Tracker for actual ETAs",
                    "Train numbers: odd = UP (south→north), even = DN (north→south)",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="gradient-card-rose border hover-lift group">
              <CardContent className="p-5">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> Journey Duration Guide
                </h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  {[
                    { route: "Karachi → Lahore", express: "18h", passenger: "28h+" },
                    { route: "Lahore → Rawalpindi", express: "4h", passenger: "8h+" },
                    { route: "Karachi → Quetta", express: "12h", passenger: "18h+" },
                    { route: "Lahore → Multan", express: "5h", passenger: "9h+" },
                    { route: "Karachi → Peshawar", express: "24h", passenger: "36h+" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
                      <span className="font-medium text-foreground">{r.route}</span>
                      <div className="flex gap-3">
                        <span className="text-primary font-semibold">⚡ {r.express}</span>
                        <span className="text-muted-foreground">🚂 {r.passenger}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": scheduleFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
      <RelatedLinks context="schedule" />
    </main>
  );
}
