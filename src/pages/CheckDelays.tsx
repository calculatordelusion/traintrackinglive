import { useState, useEffect, useMemo } from "react";
import RelatedLinks from "@/components/RelatedLinks";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Train, Clock, AlertTriangle, CheckCircle, ArrowRight, Navigation, HelpCircle, TrendingUp, Timer, Search, XCircle, Activity } from "lucide-react";
import PremiumHero from "@/components/PremiumHero";
import SEOHead from "@/components/SEOHead";
import { fetchLivePositions, type LiveTrainPosition } from "@/lib/trainApi";

function formatDelay(minutes: number) {
  if (minutes <= 0) return "On Time";
  if (minutes < 60) return `${minutes}m late`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m late` : `${h}h late`;
}

function delayColor(minutes: number) {
  if (minutes <= 0) return "text-emerald-600 dark:text-emerald-400";
  if (minutes <= 15) return "text-amber-600 dark:text-amber-400";
  if (minutes <= 60) return "text-orange-600 dark:text-orange-400";
  return "text-destructive";
}

function delayBadge(minutes: number) {
  if (minutes <= 0) return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  if (minutes <= 15) return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  if (minutes <= 60) return "bg-orange-500/10 text-orange-700 dark:text-orange-400";
  return "bg-destructive/10 text-destructive";
}

const delayFaqs = [
  { q: "How accurate is the delay information?", a: "Our delay data comes from real-time GPS tracking of Pakistan Railways trains. Positions and delay calculations are updated every 5 seconds, providing near-instant accuracy. Delays are computed by comparing the train's current position against its scheduled timetable." },
  { q: "Why are trains delayed in Pakistan?", a: "Common reasons include track maintenance on the aging ML-1 corridor, weather conditions (fog in Punjab during winter, monsoon flooding), signal failures, locomotive breakdowns, and operational scheduling conflicts at major junctions like Lahore and Sukkur." },
  { q: "What does 'On Time' mean?", a: "A train is considered 'On Time' when it is running within 5 minutes of its scheduled departure or arrival time. Trains with 0 minutes delay are running exactly on schedule." },
  { q: "Which trains are most often delayed?", a: "Long-distance trains like Khyber Mail and Tezgam that cover the full ML-1 route (Karachi to Peshawar) are more prone to delays due to the longer distance and more stops. Premium trains like Green Line and Business Express tend to have better on-time performance." },
  { q: "How can I avoid delays?", a: "Choose premium express trains (Green Line, Business Express) which have priority scheduling. Travel during off-peak seasons (avoid Eid holidays). Check our live tracker before departing for the station. Morning departures tend to be more punctual than evening ones." },
  { q: "Can I get a refund for delayed trains?", a: "Pakistan Railways offers partial refunds for significant delays (typically 3+ hours). Contact the station master or file a complaint at the Pakistan Railways helpline (117) with your ticket details. Refund policies vary by class and delay duration." },
  { q: "How do I track a specific train's delay?", a: "Use our Live Train Tracker — search by train name or number to see real-time GPS position, current speed, delay status, and estimated arrival times at all upcoming stations. Data refreshes every 5 seconds." },
  { q: "What time of year has the most delays?", a: "Winter months (December-February) see increased delays due to dense fog in Punjab and Sindh. Monsoon season (July-September) can cause flooding-related disruptions. Eid holidays also see heavy congestion leading to delays." },
];

export default function CheckDelays() {
  const [positions, setPositions] = useState<LiveTrainPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "delayed" | "ontime" | "severe">("all");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const load = async () => {
      try {
        const result = await fetchLivePositions();
        setPositions(result.positions || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
    interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeTrains = useMemo(() =>
    positions.filter(p => p.status === "moving" || p.status === "at-station"),
    [positions]
  );

  const delayedTrains = useMemo(() => activeTrains.filter(t => t.delayMinutes > 0), [activeTrains]);
  const onTimeTrains = useMemo(() => activeTrains.filter(t => t.delayMinutes <= 0), [activeTrains]);
  const severeDelays = useMemo(() => activeTrains.filter(t => t.delayMinutes >= 60), [activeTrains]);
  const avgDelay = useMemo(() => {
    if (activeTrains.length === 0) return 0;
    return Math.round(activeTrains.reduce((sum, t) => sum + t.delayMinutes, 0) / activeTrains.length);
  }, [activeTrains]);
  const maxDelay = useMemo(() => Math.max(0, ...activeTrains.map(t => t.delayMinutes)), [activeTrains]);
  const onTimePercent = useMemo(() => {
    if (activeTrains.length === 0) return 0;
    return Math.round((onTimeTrains.length / activeTrains.length) * 100);
  }, [activeTrains, onTimeTrains]);

  const filteredTrains = useMemo(() => {
    let list = activeTrains;
    if (filter === "delayed") list = delayedTrains;
    else if (filter === "ontime") list = onTimeTrains;
    else if (filter === "severe") list = severeDelays;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.number.toLowerCase().includes(q) ||
        t.from.toLowerCase().includes(q) ||
        t.to.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => b.delayMinutes - a.delayMinutes);
  }, [activeTrains, delayedTrains, onTimeTrains, severeDelays, filter, search]);

  return (
    <main>
      <SEOHead
        title="Train Delay Checker — Is My Train Late? 2026"
        description="Check Pakistan Railways train delays in real time. See late minutes, revised ETAs, and delay status for all running trains. Essential for fog season."
        canonical="/check-delays"
        keywords="train delay checker pakistan, is my train late today, pakistan train delay, check train delay pakistan, pakistan railways delay status, train late today, tezgam delay, green line express late, fog delay trains pakistan, winter train delay 2026"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Check Delays", url: "/check-delays" }]}
        faqSchema={delayFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Pakistan Railways Delay Checker",
          "url": "https://trackmytrain.pk/check-delays",
          "applicationCategory": "TravelApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
          "description": "Real-time delay status checker for all Pakistan Railways trains with GPS-based accuracy"
        }]}
      />
      <PremiumHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Check Delays" }]}
        badge="REAL-TIME DELAY MONITOR"
        badgeIcon={<Activity className="w-3.5 h-3.5 text-[hsl(152_55%_45%)]" />}
        title={<>Pakistan Railways<br /><span className="text-gradient-gold">Train Delay Status — Live</span></>}
        subtitle="Check real-time delay status of all running Pakistan Railways trains. Live GPS-based tracking updated every 5 seconds with accurate ETAs and delay calculations."
        subtitleUrdu="پاکستان ریلوے ٹرین تاخیر کی صورتحال — لائیو"
        centered
      />

      {/* Floating Stats */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
          ) : [
            { value: `${onTimePercent}%`, label: "On-Time Rate", icon: CheckCircle, gradient: "gradient-card-emerald" },
            { value: `${avgDelay}m`, label: "Avg Delay", icon: Timer, gradient: "gradient-card-amber" },
            { value: String(delayedTrains.length), label: "Delayed Trains", icon: AlertTriangle, gradient: "gradient-card-rose" },
            { value: String(activeTrains.length), label: "Active Trains", icon: Train, gradient: "gradient-card-blue" },
          ].map((s, i) => (
            <Card key={i} className={`${s.gradient} border hover-lift group`}>
              <CardContent className="p-4 text-center">
                <s.icon className="w-5 h-5 text-primary mx-auto mb-1 transition-transform duration-300 group-hover:scale-110" />
                <div className="text-2xl font-black text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">

        {/* Delay Overview Cards */}
        <section className="mb-10 sm:mb-14">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">OVERVIEW</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Current Delay Summary</h2>
            <p className="text-sm text-muted-foreground mt-1">Real-time overview of Pakistan Railways punctuality</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {loading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />) : [
              { icon: CheckCircle, title: "On Time", count: onTimeTrains.length, desc: "Running on schedule", gradient: "gradient-card-emerald" },
              { icon: Clock, title: "Minor Delay", count: activeTrains.filter(t => t.delayMinutes > 0 && t.delayMinutes <= 30).length, desc: "Under 30 min late", gradient: "gradient-card-amber" },
              { icon: AlertTriangle, title: "Major Delay", count: activeTrains.filter(t => t.delayMinutes > 30 && t.delayMinutes < 60).length, desc: "30-60 min late", gradient: "gradient-card-blue" },
              { icon: XCircle, title: "Severe Delay", count: severeDelays.length, desc: "Over 1 hour late", gradient: "gradient-card-rose" },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group`}>
                <CardContent className="p-5 text-center">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
                  <div className="text-2xl font-black text-primary">{item.count}</div>
                  <h4 className="font-bold text-sm mb-0.5">{item.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {!loading && maxDelay > 0 && (
            <div className="mt-6 max-w-4xl mx-auto">
              <Card className="gradient-card-rose border">
                <CardContent className="p-5 flex flex-col sm:flex-row items-center gap-4">
                  <AlertTriangle className="w-8 h-8 text-destructive shrink-0" />
                  <div className="text-center sm:text-left flex-1">
                    <h4 className="font-bold text-sm">Maximum Delay Right Now</h4>
                    <p className="text-xs text-muted-foreground">
                      The most delayed active train is currently running <strong className="text-destructive">{formatDelay(maxDelay)}</strong>
                    </p>
                  </div>
                  <Link to="/train">
                    <Button size="sm" variant="outline" className="rounded-xl gap-1 shrink-0">
                      <Navigation className="w-3 h-3" /> View on Map
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </section>

        {/* Filters + Train List */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">All Train Delays</h2>
              <p className="text-sm text-muted-foreground">Click any train to view live position and full schedule</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, number, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: "all" as const, label: `All (${activeTrains.length})` },
              { key: "delayed" as const, label: `Delayed (${delayedTrains.length})` },
              { key: "ontime" as const, label: `On Time (${onTimeTrains.length})` },
              { key: "severe" as const, label: `Severe (${severeDelays.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === tab.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
            </div>
          ) : filteredTrains.length === 0 ? (
            <Card className="border">
              <CardContent className="p-10 text-center">
                <CheckCircle className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-1">No Trains Found</h3>
                <p className="text-sm text-muted-foreground">
                  {search ? "No trains match your search." : "No trains in this category right now. Check back soon!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTrains.map((train) => (
                <Link key={train.id} to={`/train/${train.id}`}>
                  <Card className="hover-lift group h-full hover:border-primary/30 transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${delayBadge(train.delayMinutes)}`}>
                          {train.delayMinutes <= 0 ? "ON TIME" : train.delayMinutes < 30 ? "MINOR DELAY" : train.delayMinutes < 60 ? "MAJOR DELAY" : "SEVERE DELAY"}
                        </span>
                        <span className="text-xs text-muted-foreground">#{train.id}</span>
                      </div>
                      <h3 className="font-bold group-hover:text-primary transition-colors">
                        {train.name}
                        <span className="text-muted-foreground font-normal text-sm ml-1">{train.number}</span>
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                        <span>{train.from}</span>
                        <ArrowRight className="w-3 h-3" />
                        <span>{train.to}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className={`w-2 h-2 rounded-full ${train.status === "moving" ? "bg-primary animate-pulse" : "bg-amber-500"}`} />
                          <span className="capitalize">{train.status === "at-station" ? `At ${train.lastStation}` : `${train.speed} km/h`}</span>
                        </div>
                        <span className={`font-bold text-sm ${delayColor(train.delayMinutes)}`}>
                          {formatDelay(train.delayMinutes)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Understanding Delays */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Understanding Train Delays</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "🌫️", title: "Weather Conditions", desc: "Dense fog in Punjab (Dec-Feb), monsoon flooding (Jul-Sep), and extreme heat can all cause significant delays on the ML-1 corridor.", gradient: "gradient-card-blue" },
              { icon: "🔧", title: "Track Maintenance", desc: "Ongoing ML-1 upgrades and routine maintenance require speed restrictions and temporary closures, affecting train schedules across the network.", gradient: "gradient-card-amber" },
              { icon: "🚦", title: "Signal & Operations", desc: "Signal failures at major junctions, locomotive breakdowns, and crew changeover delays at stations like Lahore and Sukkur.", gradient: "gradient-card-rose" },
              { icon: "🎉", title: "Holiday Rush", desc: "Eid ul-Fitr, Eid ul-Adha, and summer holidays see 300%+ passenger surges, causing congestion and longer boarding times at all major stations.", gradient: "gradient-card-purple" },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group`}>
                <CardContent className="p-5 flex gap-4">
                  <div className="text-2xl shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="mb-12 sm:mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Pakistan Railways Train Delays — Real-Time Guide 2026</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p className="text-base leading-relaxed">
              Pakistan Railways operates over <strong className="text-foreground">150 trains daily</strong> across a network of 7,791 km, connecting major cities from Peshawar to Karachi. While the railway system is the backbone of inter-city travel for millions of Pakistanis, delays remain a common challenge due to aging infrastructure, weather conditions, and operational constraints.
            </p>
            <p className="text-base leading-relaxed">
              Our <strong className="text-foreground">real-time delay checker</strong> uses GPS-based tracking updated every 5 seconds to provide the most accurate delay information available. Unlike estimated schedules, our data reflects the actual position of each train on the network, calculating delays by comparing live GPS coordinates against the official timetable.
            </p>
            <p className="text-base leading-relaxed">
              The <strong className="text-foreground">Main Line 1 (ML-1)</strong> from Karachi to Peshawar handles the majority of express traffic and is the most delay-prone corridor. The ongoing ML-1 upgrade project (with Chinese investment) aims to increase speeds from 65-105 km/h to 160 km/h, which will significantly reduce journey times and delays once completed. Premium trains like the <strong className="text-foreground">Green Line Express</strong> and <strong className="text-foreground">Business Express</strong> receive scheduling priority and maintain the best on-time performance records.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-3">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold">Train Delay FAQs</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {delayFaqs.map((faq, i) => (
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

        {/* Related */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">EXPLORE MORE</p>
            <h2 className="text-xl sm:text-2xl font-bold">Related Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Navigation, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any train's real-time position on an interactive map.", link: "/train" },
              { icon: TrendingUp, gradient: "gradient-card-amber", title: "Express Trains", desc: "Browse all express trains with schedules and live tracking.", link: "/express-trains" },
              { icon: Clock, gradient: "gradient-card-blue", title: "Full Schedule", desc: "Complete timetable for all Pakistan Railways trains.", link: "/schedule" },
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
      </div>

      {/* CTA Footer */}
      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Never Miss a Train Again</h2>
          <p className="text-base opacity-80 max-w-xl mx-auto mb-6">Track all Pakistan Railways trains in real-time. Get accurate delay status, ETAs, and live GPS positions updated every 5 seconds.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/train">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Train className="w-4 h-4" /> Track Trains Live
              </Button>
            </Link>
            <Link to="/planner">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <Clock className="w-4 h-4" /> Plan Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": delayFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
      <RelatedLinks context="general" />
    </main>
  );
}
