import { useState, useMemo } from "react";
import { useStaggeredAnimation } from "@/hooks/useStaggeredAnimation";
import { Link } from "react-router-dom";
import { stations, searchStations } from "@/data/stations";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, HelpCircle, Train, Globe, Building2, ArrowRight, Navigation, Clock, Shield, Star, Landmark, Map, Compass, BarChart3 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";

const stationFaqs = [
  { q: "How many railway stations are there in Pakistan?", a: "Pakistan Railways operates a network of over 342 major railway stations listed in our database, spread across all four provinces and Azad Jammu & Kashmir. These range from major junction stations like Lahore Junction, Karachi Cantt, and Rawalpindi that handle dozens of trains daily, to smaller stations that serve local passenger trains. Our directory includes searchable stations on the Pakistan Railways network with search functionality in both English and Urdu." },
  { q: "Which is the largest railway station in Pakistan?", a: "Lahore Junction (Lahore Railway Station) is the largest and busiest railway station in Pakistan. Built in 1864 during the British colonial era, it features Victorian-Gothic architecture and handles millions of passengers annually. It has 9 platforms and serves as the main hub for Punjab province, connecting to all major cities across the country." },
  { q: "What facilities are available at major Pakistani railway stations?", a: "Major stations like Lahore Junction, Karachi Cantt, Rawalpindi, Peshawar Cantt, and Quetta offer comprehensive facilities including: computerized ticket booking counters, AC and general waiting rooms (separate for men and women), restaurants and tea stalls, prayer rooms, luggage storage, platform shelters, drinking water, restrooms, ATMs, parking areas, porter services, and retiring rooms. Some premium stations also have VIP lounges for AC class passengers." },
  { q: "How do I find which trains stop at a specific station?", a: "Use our station search above to find your station, then click on it to see the station detail page. There you'll find a complete list of all trains that stop at that station, along with their scheduled arrival and departure times, and route information. You can also use our Journey Planner to find trains between two specific stations." },
  { q: "What are the busiest railway stations in Pakistan?", a: "The busiest stations by passenger volume are: Lahore Junction (handling 40+ trains daily, 9 platforms), Karachi Cantt (35+ trains, 6 platforms), Rawalpindi (30+ trains, 5 platforms), Multan Cantt (25+ trains, 5 platforms), and Faisalabad (20+ trains). These junction stations serve as major interchange points where multiple railway lines converge." },
  { q: "Can I buy train tickets at any station?", a: "You can buy tickets at all major stations with computerized booking counters. Smaller stations may only have manual ticket windows with limited train options. For the most convenience, use Pakistan Railways' online booking system or their mobile app to purchase tickets in advance. Major stations also have ticket agents outside the station premises." },
  { q: "How do I find stations between two cities?", a: "Use our Journey Planner tool to search for routes between any two cities. The planner will show you all trains on that route, and each train's detail page shows all intermediate stations with their arrival and departure times. This helps you plan stops along your journey." },
  { q: "Which is the oldest railway station in Pakistan?", a: "Karachi was the first city in South Asia to have a railway, with the Scinde Railway opening in 1855. The first railway line ran between Karachi and Kotri, making the stations along this route among the oldest in the subcontinent. The original Karachi station has been modernized but retains historical significance." },
  { q: "What are junction stations vs terminal stations?", a: "Junction stations are major hubs where two or more railway lines meet, allowing passengers to change trains and routes. Examples include Lahore Jn, Rohri Jn, and Khanewal Jn. Terminal stations are endpoints where railway lines end — trains originate from or terminate at these stations. Karachi Cantt and Peshawar Cantt are examples of terminal stations." },
  { q: "Are Pakistan Railway stations accessible for people with disabilities?", a: "Pakistan Railways has been gradually improving accessibility at major stations. Newer stations and renovated platforms have ramps for wheelchair access. However, many older stations still lack comprehensive accessibility features. It's recommended to contact the station master in advance if you need special assistance. Pakistan Railways provides 50% fare concession for persons with disabilities." },
];

const majorStations = [
  { name: "Lahore Jn.", urdu: "لاہور جنکشن", city: "Lahore, Punjab", platforms: "9 Platforms", type: "junction", gradient: "gradient-card-emerald", desc: "Lahore Junction Railway Station is the largest and busiest railway station in Pakistan. Built during the British colonial era, it serves as the main hub for Pakistan Railways in Punjab province. The iconic Victorian-Gothic architecture makes it one of the most recognizable landmarks in Lahore.", facilities: ["Booking Office", "AC Waiting Room", "Restaurant", "ATM", "Parking", "WiFi", "VIP Lounge", "Medical Aid", "Porter Service", "Retiring Rooms"] },
  { name: "Karachi Cantt", urdu: "کراچی کینٹ", city: "Karachi, Sindh", platforms: "6 Platforms", type: "terminal", gradient: "gradient-card-amber", desc: "Karachi Cantonment Railway Station is the main railway terminus in Karachi and one of the busiest stations in Pakistan. It serves as the southern terminus of Main Line 1, connecting Karachi to Peshawar. The station handles both long-distance express trains and local commuter services.", facilities: ["Booking Office", "AC Waiting Room", "Restaurant", "ATM", "Parking", "Porter Service", "Retiring Rooms", "Medical Room"] },
  { name: "Rawalpindi", urdu: "راولپنڈی", city: "Rawalpindi, Punjab", platforms: "5 Platforms", type: "junction", gradient: "gradient-card-blue", desc: "Rawalpindi Railway Station is a major junction serving the twin cities of Rawalpindi and Islamabad. It is one of the most important stations on the Main Line, connecting the capital region with the rest of Pakistan and serving as a gateway to the northern areas.", facilities: ["Booking Office", "Waiting Room", "Restaurant", "ATM", "Parking", "Porter Service"] },
  { name: "Peshawar Cantt", urdu: "پشاور کینٹ", city: "Peshawar, KPK", platforms: "4 Platforms", type: "terminal", gradient: "gradient-card-purple", desc: "Peshawar Cantonment Railway Station is the northern terminus of Main Line 1 and serves as the gateway to the historic Khyber Pass. It is one of the most strategically important railway stations in Pakistan, connecting Khyber Pakhtunkhwa province to the rest of the country.", facilities: ["Booking Office", "Waiting Room", "Restaurant", "ATM", "Parking"] },
  { name: "Quetta", urdu: "کوئٹہ", city: "Quetta, Balochistan", platforms: "4 Platforms", type: "junction", gradient: "gradient-card-rose", desc: "Quetta Railway Station is the main railway terminus in Balochistan and serves as the junction for trains heading to Iran via Taftan and to Karachi via the Bolan Pass. It is one of the highest major railway stations in Pakistan.", facilities: ["Booking Office", "Waiting Room", "Restaurant", "Parking", "Porter Service"] },
  { name: "Multan Cantt", urdu: "ملتان کینٹ", city: "Multan, Punjab", platforms: "5 Platforms", type: "junction", gradient: "gradient-card-teal", desc: "Multan Cantonment Railway Station is a major junction in southern Punjab, serving the historic city of Multan known as the 'City of Saints'. It connects trains from Karachi, Lahore, and Peshawar, making it an important transit point on the Main Line.", facilities: ["Booking Office", "AC Waiting Room", "Restaurant", "ATM", "Parking", "WiFi"] },
];

const railwayDivisions = [
  { name: "Karachi Division", hq: "Karachi", stations: "~120", line: "Main Line South", gradient: "gradient-card-amber" },
  { name: "Sukkur Division", hq: "Sukkur", stations: "~85", line: "Main Line Central", gradient: "gradient-card-emerald" },
  { name: "Multan Division", hq: "Multan", stations: "~95", line: "Southern Punjab", gradient: "gradient-card-blue" },
  { name: "Lahore Division", hq: "Lahore", stations: "~150", line: "Punjab Region", gradient: "gradient-card-purple" },
  { name: "Rawalpindi Division", hq: "Rawalpindi", stations: "~80", line: "Northern Punjab", gradient: "gradient-card-rose" },
  { name: "Peshawar Division", hq: "Peshawar", stations: "~65", line: "KP Region", gradient: "gradient-card-teal" },
  { name: "Quetta Division", hq: "Quetta", stations: "~55", line: "Balochistan", gradient: "gradient-card-amber" },
];

export default function StationsPage() {
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState<string | null>(null);

  const statsAnim = useStaggeredAnimation(80);
  const toolsAnim = useStaggeredAnimation(80);
  const majorAnim = useStaggeredAnimation(100);
  const divisionsAnim = useStaggeredAnimation(60);

  const filtered = useMemo(() => {
    let list = search.length > 1 ? searchStations(search) : stations;
    if (letter) list = list.filter(s => s.name.startsWith(letter));
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [search, letter]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const provinceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of stations) {
      counts[s.province] = (counts[s.province] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div>
      <SEOHead
        title="All Pakistan Railway Stations 2026 — Complete Directory with Search"
        description={`Browse ${stations.length}+ Pakistan Railways stations. Search by name, city, or province. View station details, connecting trains, platform info, and facilities for every station in Pakistan.`}
        canonical="/stations"
        keywords="pakistan railway stations, railway station list pakistan, lahore junction station, karachi cantt station, rawalpindi railway station, pakistan railway station search, station directory pakistan"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Railway Stations", url: "/stations" }]}
        faqSchema={stationFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Pakistan Railway Stations Directory",
          "description": `Complete list of ${stations.length}+ Pakistan Railways stations with details, facilities, and connecting trains.`,
          "numberOfItems": stations.length,
          "itemListElement": stations.slice(0, 50).map((s, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "TrainStation",
              "name": s.name,
              "url": `https://trackmytrain.pk/stations/${s.slug}`,
              "address": { "@type": "PostalAddress", "addressRegion": s.province, "addressCountry": "PK" }
            }
          }))
        }]}
      />
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>Railway Stations</span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <MapPin className="w-4 h-4" /> {stations.length}+ Railway Stations Across Pakistan
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              Pakistan Railway Stations<br />
              <span className="text-gradient-gold">Complete Directory & Search</span>
            </h1>
            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mt-4">
              Find any railway station in Pakistan. Search by name, city, or province. View station details, trains stopping at each station, and nearby facilities.
            </p>
            <p className="opacity-60 text-sm mt-2">پاکستان ریلوے اسٹیشنز - مکمل ڈائریکٹری اور تلاش</p>
            <div className="max-w-xl mx-auto mt-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />
                <Input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setLetter(null); }}
                  placeholder="Search station by name (e.g., Lahore, Karachi, Rawalpindi)..."
                  className="pl-12 h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats cards floating */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div ref={statsAnim.ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: `${stations.length}+`, label: "Total Stations", icon: MapPin, gradient: "gradient-card-emerald" },
            { value: "7", label: "Railway Divisions", icon: Globe, gradient: "gradient-card-amber" },
            { value: "164+", label: "Active Trains", icon: Train, gradient: "gradient-card-blue" },
            { value: "24/7", label: "Live Tracking", icon: Navigation, gradient: "gradient-card-purple" },
          ].map((s, i) => (
            <Card key={i} className={`${s.gradient} border hover-lift group`} {...statsAnim.getAnimationProps(i)}>
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

        {/* Search Tools Section */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">STATION TOOLS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Station Search Tools</h2>
            <p className="text-sm text-muted-foreground mt-1">Multiple ways to find stations across Pakistan's railway network</p>
          </div>
          <div ref={toolsAnim.ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { icon: Building2, title: "Station Directory", desc: "Browse all railway stations", gradient: "gradient-card-emerald" },
              { icon: Train, title: "Search By Train", desc: "Find stations on a train route", gradient: "gradient-card-amber" },
              { icon: Navigation, title: "Search By Origin", desc: "Find trains from a station", gradient: "gradient-card-blue" },
              { icon: MapPin, title: "Search By Destination", desc: "Find trains to a station", gradient: "gradient-card-purple" },
            ].map((tool, i) => (
              <Card key={i} className={`${tool.gradient} border hover-lift group cursor-pointer`} onClick={() => window.scrollTo({ top: document.getElementById('station-list')?.offsetTop! - 80, behavior: 'smooth' })} {...toolsAnim.getAnimationProps(i)}>
                <CardContent className="p-4 text-center">
                  <tool.icon className="w-7 h-7 text-primary mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
                  <h4 className="font-semibold text-xs mb-1 group-hover:text-primary transition-colors">{tool.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-snug">{tool.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Station Directory */}
        <div id="station-list">
          <h2 className="text-xl font-bold mb-4">All Railway Stations ({filtered.length})</h2>
          <div className="flex flex-wrap gap-1 mb-6">
            <button onClick={() => setLetter(null)} className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${!letter ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}>All</button>
            {alphabet.map((l) => (
              <button key={l} onClick={() => setLetter(l)} className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${letter === l ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}>{l}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((station) => (
              <Link key={station.slug} to={`/stations/${station.slug}`}>
                <Card className="hover:shadow-md hover:border-primary/30 transition-all hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium text-sm">{station.name}</div>
                        <div className="text-xs text-destructive">{station.nameUrdu}</div>
                        <div className="text-xs text-muted-foreground mt-1">{station.city}, {station.province}</div>
                      </div>
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    </div>
                    {station.trainIds.length > 0 && (
                      <div className="text-[10px] text-primary font-medium mt-2">{station.trainIds.length} trains serve this station</div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No stations found matching your search.</div>
          )}
        </div>

        {/* Major Stations Section */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TOP STATIONS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Major Railway Stations in Pakistan</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl mx-auto">The busiest and most important junction and terminal stations across Pakistan's railway network</p>
          </div>
          <div ref={majorAnim.ref} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {majorStations.map((s, i) => (
              <Card key={i} className={`${s.gradient} border hover-lift group overflow-hidden`} {...majorAnim.getAnimationProps(i)}>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">{s.type} Station</span>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{s.name}</h3>
                      <p className="text-sm text-destructive">{s.urdu}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">{s.city}</span>
                      <div className="text-xs font-semibold text-primary">{s.platforms}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.facilities.slice(0, 5).map((f, j) => (
                      <span key={j} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{f}</span>
                    ))}
                    {s.facilities.length > 5 && (
                      <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">+{s.facilities.length - 5} more</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Railway Divisions */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">NETWORK COVERAGE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Pakistan Railways Divisions</h2>
            <p className="text-sm text-muted-foreground mt-1">Pakistan Railways is organized into 7 operating divisions, each managing stations within its jurisdiction</p>
          </div>
          <div ref={divisionsAnim.ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {railwayDivisions.map((div, i) => (
              <Card key={i} className={`${div.gradient} border hover-lift group`} {...divisionsAnim.getAnimationProps(i)}>
                <CardContent className="p-4">
                  <Landmark className="w-6 h-6 text-primary mb-2 transition-transform duration-300 group-hover:scale-110" />
                  <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{div.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">HQ: {div.hq}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-semibold text-primary">{div.stations} stations</span>
                    <span className="text-[10px] text-muted-foreground">• {div.line}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Railway Lines */}
        <section className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">RAILWAY NETWORK</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Main Railway Lines of Pakistan</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Map, gradient: "gradient-card-emerald", title: "Main Line 1 (ML-1)", desc: "Karachi to Peshawar — 1,687 km, the backbone of Pakistan's railway network connecting all major cities." },
              { icon: Compass, gradient: "gradient-card-amber", title: "Bolan Railway", desc: "Connects Quetta to Karachi through the historic Bolan Pass — one of the most scenic rail routes in Asia." },
              { icon: BarChart3, gradient: "gradient-card-blue", title: "Lahore–Faisalabad Line", desc: "Important link connecting Punjab's industrial heartland to the main railway network and major junction stations." },
            ].map((line, i) => (
              <Card key={i} className={`${line.gradient} border hover-lift group`}>
                <CardContent className="p-5">
                  <line.icon className="w-8 h-8 text-primary mb-3 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{line.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{line.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Station Categories */}
        <section className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">STATION TYPES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Station Categories in Pakistan Railways</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Junction Stations", desc: "Major hubs where multiple lines meet (Lahore, Rohri, Khanewal)", icon: "🔀", gradient: "gradient-card-emerald" },
              { title: "Terminal Stations", desc: "End points of lines (Karachi Cantt, Peshawar Cantt)", icon: "🏁", gradient: "gradient-card-amber" },
              { title: "Intermediate Stations", desc: "Regular stops with ticketing facilities along routes", icon: "🚏", gradient: "gradient-card-blue" },
              { title: "Flag Stations", desc: "Small stations where trains stop on request only", icon: "🚩", gradient: "gradient-card-purple" },
            ].map((cat, i) => (
              <Card key={i} className={`${cat.gradient} border hover-lift group`}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <h4 className="font-bold text-xs mb-1 group-hover:text-primary transition-colors">{cat.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-snug">{cat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-3">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold">Railway Stations FAQs</h2>
            <p className="text-sm text-muted-foreground mt-1">Common questions about Pakistan Railway stations and facilities</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {stationFaqs.map((faq, i) => (
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

        {/* SEO Content */}
        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Pakistan Railway Stations — Complete Guide 2026</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-5">
            <h3 className="text-lg font-bold text-foreground">History of Pakistan Railways</h3>
            <p className="leading-relaxed">Pakistan Railways traces its origins to 1855 when the Scinde Railway opened the first railway line in South Asia between Karachi and Kotri. Today, the network spans over 7,791 kilometers with more than 700 railway stations connecting cities and towns across all four provinces. The railway has been instrumental in connecting communities and facilitating trade across Pakistan's diverse geography.</p>

            <h3 className="text-lg font-bold text-foreground">Understanding Station Types</h3>
            <p className="leading-relaxed">Pakistan's railway stations are categorized based on their operational importance. <strong>Junction stations</strong> like Lahore, Rohri, and Khanewal are major hubs where two or more railway lines intersect, allowing passengers to transfer between routes. <strong>Terminal stations</strong> like Karachi Cantt and Peshawar Cantt mark the end of railway lines. <strong>Intermediate stations</strong> are regular stops along routes with full ticketing facilities, while <strong>flag stations</strong> are smaller halts where trains stop on request.</p>

            <h3 className="text-lg font-bold text-foreground">Main Line 1 — The Backbone</h3>
            <p className="leading-relaxed">The ML-1 (Main Line 1) from Karachi to Peshawar is the backbone of Pakistan's railway network, stretching 1,687 kilometers with over 150 stations. It passes through all major cities including Hyderabad, Sukkur, Multan, Lahore, and Rawalpindi. The planned ML-1 upgrade under CPEC aims to modernize this corridor with improved track, signaling, and station infrastructure to increase speeds from 65-105 km/h to 160 km/h.</p>

            <h3 className="text-lg font-bold text-foreground">Tips for Travelers</h3>
            <p className="leading-relaxed">When traveling by train in Pakistan, arrive at the station at least 30-45 minutes before departure for express trains. Major junction stations have multiple platforms, so check the display boards or ask station staff for your train's platform number. Keep your ticket handy as ticket inspectors check during the journey. For the best experience, use our Live Train Tracker to monitor your train's real-time position and any delays before heading to the station.</p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">EXPLORE MORE</p>
            <h2 className="text-xl sm:text-2xl font-bold">Related Tools & Resources</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Train, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any train in real-time with GPS positioning and live speed data.", link: "/train" },
              { icon: Navigation, gradient: "gradient-card-amber", title: "Journey Planner", desc: "Find the best routes between any two stations across Pakistan.", link: "/planner" },
              { icon: Clock, gradient: "gradient-card-blue", title: "Train Schedule", desc: "Complete timetables for all Pakistan Railway trains with timings.", link: "/schedule" },
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
      </div>

      {/* CTA Footer */}
      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Track Your Train Live</h2>
          <p className="text-base opacity-80 max-w-xl mx-auto mb-6">Get real-time GPS location, delay information, and estimated arrival times for all Pakistan Railway trains.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/train">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Train className="w-4 h-4" /> Track Trains Live
              </Button>
            </Link>
            <Link to="/schedule">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <Clock className="w-4 h-4" /> View Train Schedule
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": stationFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
    </div>
  );
}
