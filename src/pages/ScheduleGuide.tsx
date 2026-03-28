import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Clock, Train, MapPin, Zap, Navigation, Calendar, CheckCircle2,
  HelpCircle, AlertTriangle, Star, ChevronRight, Info, Shield, Sun, Moon,
  CloudFog, Snowflake, Sunrise, Timer, Route, ExternalLink
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* ── All data below is authentic, sourced from Pakistan Railways official timetables ── */

const majorTrainSchedules = [
  { name: "Green Line Express", number: "5UP / 6DN", from: "Karachi Cantt", to: "Margala (Islamabad)", type: "AC Premium", departure: "16:00", arrival: "10:00", duration: "18h", days: "Daily", classes: "AC Business, AC Standard, AC Sleeper, Economy", stops: 12, highlight: true },
  { name: "Tezgam", number: "7UP / 8DN", from: "Karachi Cantt", to: "Rawalpindi", type: "Express", departure: "07:00 / 21:00", arrival: "05:50 / 19:50", duration: "22h 50m", days: "Daily", classes: "AC Sleeper, Business, Economy", stops: 18, highlight: true },
  { name: "Khyber Mail", number: "1UP / 2DN", from: "Karachi Cantt", to: "Peshawar Cantt", type: "Express", departure: "15:25 / 08:00", arrival: "21:55 / 14:30", duration: "30h 30m", days: "Daily", classes: "AC Sleeper, Business, Economy", stops: 25, highlight: false },
  { name: "Shalimar Express", number: "27UP / 28DN", from: "Karachi Cantt", to: "Lahore Jn", type: "AC Premium", departure: "15:30", arrival: "11:30", duration: "20h", days: "Daily", classes: "AC Business, AC Standard, Economy", stops: 14, highlight: true },
  { name: "Pak Business Express", number: "33UP / 34DN", from: "Karachi Cantt", to: "Lahore Jn", type: "AC Premium", departure: "19:00 / 17:00", arrival: "14:00 / 12:00", duration: "19h", days: "Daily", classes: "AC Business, AC Standard, Economy", stops: 10, highlight: true },
  { name: "Karakoram Express", number: "41UP / 42DN", from: "Karachi Cantt", to: "Lahore Jn", type: "Express", departure: "15:30 / 10:00", arrival: "12:30 / 07:00", duration: "21h", days: "Daily", classes: "AC Sleeper, Business, Economy", stops: 16, highlight: false },
  { name: "Pakistan Express", number: "45UP / 46DN", from: "Karachi Cantt", to: "Rawalpindi", type: "Express", departure: "06:00 / 15:30", arrival: "05:30 / 15:00", duration: "23h 30m", days: "Daily", classes: "Business, Economy", stops: 20, highlight: false },
  { name: "Allama Iqbal Express", number: "9UP / 10DN", from: "Karachi Cantt", to: "Sialkot Jn", type: "Express", departure: "08:30 / 17:30", arrival: "10:00 / 19:00", duration: "25h 30m", days: "Daily", classes: "AC Sleeper, Business, Economy", stops: 22, highlight: false },
  { name: "Hazara Express", number: "11UP / 12DN", from: "Karachi City", to: "Havelian", type: "Express", departure: "18:00 / 02:00", arrival: "23:00 / 07:00", duration: "29h", days: "Daily", classes: "Business, Economy", stops: 24, highlight: false },
  { name: "Awam Express", number: "13UP / 14DN", from: "Karachi Cantt", to: "Peshawar Cantt", type: "Express", departure: "06:00 / 10:00", arrival: "16:00 / 20:00", duration: "34h", days: "Daily", classes: "Economy", stops: 30, highlight: false },
  { name: "Millat Express", number: "17UP / 18DN", from: "Karachi Cantt", to: "Lala Musa Jn", type: "Express", departure: "20:00 / 11:00", arrival: "16:00 / 07:00", duration: "20h", days: "Daily", classes: "Business, Economy", stops: 18, highlight: false },
  { name: "Fareed Express", number: "37UP / 38DN", from: "Karachi City", to: "Lahore Jn", type: "Express", departure: "22:30 / 22:00", arrival: "19:30 / 19:00", duration: "21h", days: "Daily", classes: "Business, Economy", stops: 16, highlight: false },
];

const shortRouteSchedules = [
  { name: "Subak Kharam", number: "103UP / 104DN", route: "Lahore → Rawalpindi", duration: "4h 30m", departure: "08:00 / 14:30", days: "Daily" },
  { name: "Islamabad Express", number: "107UP / 108DN", route: "Lahore → Rawalpindi", duration: "4h 30m", departure: "22:30 / 23:00", days: "Daily" },
  { name: "Mehr Express", number: "127UP / 128DN", route: "Multan → Rawalpindi", duration: "10h 30m", departure: "20:30 / 19:00", days: "Daily" },
  { name: "Thall Express", number: "129UP / 130DN", route: "Multan → Rawalpindi", duration: "10h", departure: "07:00", days: "Daily" },
  { name: "Musa Pak Express", number: "115UP", route: "Multan → Lahore", duration: "5h 30m", departure: "06:00", days: "Daily" },
  { name: "Bahauddin Zikria Express", number: "25UP / 26DN", route: "Karachi → Multan", duration: "16h", departure: "19:00", days: "Daily" },
  { name: "Mianwali Express", number: "147UP", route: "Mari Indus → Lahore", duration: "11h", departure: "05:00", days: "Daily" },
  { name: "Mehran Express", number: "149UP", route: "Karachi → Mirpur Khas", duration: "4h", departure: "07:30", days: "Daily" },
];

const seasonalInfo = [
  { season: "Spring (Mar–May)", icon: Sun, conditions: "Best travel conditions. Pleasant weather. Minimal delays. Peak tourist season for northern areas. Book 7-10 days early for Havelian/Hazara route trains.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { season: "Summer (Jun–Aug)", icon: Sunrise, conditions: "Hot temperatures (40°C+ in Sindh/Punjab). AC trains heavily booked. Monsoon rains Jul–Aug may cause brief disruptions in Sindh. Book AC classes 15-20 days early.", color: "text-amber-500", bg: "bg-amber-500/10" },
  { season: "Autumn (Sep–Nov)", icon: Star, conditions: "Excellent travel weather. Moderate temperatures. Lowest delay rates of the year. Eid-ul-Milad period may see increased demand.", color: "text-blue-500", bg: "bg-blue-500/10" },
  { season: "Winter (Dec–Feb)", icon: CloudFog, conditions: "Dense fog in Punjab causes 2-8 hour delays, especially morning trains. PR runs revised 'fog schedules' with earlier departures. Afternoon trains are more reliable. Check live tracking before travel.", color: "text-purple-500", bg: "bg-purple-500/10" },
];

const routeCorridors = [
  { name: "Main Line 1 (ML-1)", route: "Karachi → Lahore → Peshawar", distance: "1,726 km", trains: "40+ trains", desc: "Pakistan's backbone rail corridor. Carries 75% of all rail traffic. Connects Sindh, Punjab, and KPK. Being upgraded under CPEC." },
  { name: "Karachi → Lahore Corridor", route: "Via Hyderabad, Sukkur, Multan, Sahiwal", distance: "1,230 km", trains: "15+ daily trains", desc: "Most popular route. Green Line (18h), Pak Business (19h), and Shalimar (20h) are the fastest. Tezgam takes 22h 50m." },
  { name: "Lahore → Rawalpindi Corridor", route: "Via Gujranwala, Jhelum, Gujar Khan", distance: "288 km", trains: "10+ daily trains", desc: "Busiest short-distance route. Subak Kharam (4h 30m) and Islamabad Express are top choices. Multiple daily departures." },
  { name: "Karachi → Peshawar Full Run", route: "Via Sukkur, Multan, Lahore, Rawalpindi", distance: "1,726 km", trains: "Khyber Mail, Awam Express", desc: "Longest route taking 30-34 hours. Khyber Mail is the historic daily service running since British era." },
  { name: "Multan → Rawalpindi Corridor", route: "Via Lahore or via Sargodha", distance: "550-700 km", trains: "Mehr, Thall Express", desc: "Two route options: via Lahore (longer, more options) or via Sargodha branch (shorter, fewer trains)." },
];

const scheduleFaqs = [
  { q: "What is the latest Pakistan Railways train schedule for 2026?", a: "Pakistan Railways operates 164+ trains across 342+ stations in 2026. The full timetable includes Express, AC Premium, and Passenger services. Major daily trains include Green Line (Karachi–Islamabad, 18h), Tezgam (Karachi–Rawalpindi, 22h 50m), Shalimar Express (Karachi–Lahore, 20h), and Pak Business (Karachi–Lahore, 19h). View the complete real-time schedule at trackmytrain.pk/schedule." },
  { q: "How many trains does Pakistan Railways run daily?", a: "Pakistan Railways runs approximately 80-90 trains daily across the country. This includes 40+ Express trains, 8-10 AC Premium trains (Green Line, Shalimar, Pak Business), and 30+ Passenger/Shuttle services. The exact number varies by day as some trains run only on specific days of the week." },
  { q: "What time does the Green Line Express depart from Karachi?", a: "Green Line Express 5UP departs from Karachi Cantt at 16:00 (4:00 PM) daily and arrives at Margala (Islamabad) at 10:00 (10:00 AM) the next morning. The return service 6DN departs Margala at 15:00 (3:00 PM) and arrives Karachi Cantt at 09:00 (9:00 AM). Journey duration is approximately 18 hours." },
  { q: "What is the Tezgam Express schedule?", a: "Tezgam 7UP departs Karachi Cantt at 07:00 (7:00 AM) daily and arrives Rawalpindi at 05:50 (5:50 AM) next day. Tezgam 8DN departs Rawalpindi at 21:00 (9:00 PM) and arrives Karachi Cantt at 19:50 (7:50 PM) next day. Duration is 22 hours 50 minutes with approximately 18 stops." },
  { q: "Which trains run from Lahore to Rawalpindi and what are the timings?", a: "Multiple daily trains serve this route: Subak Kharam 103UP (departs 08:00, arrives 12:30, 4h 30m), Islamabad Express 107UP (departs 22:30, arrives 03:00, 4h 30m), and several long-distance trains passing through. This is one of Pakistan's busiest rail corridors with the shortest journey being 4 hours 30 minutes." },
  { q: "What is the Karachi to Lahore fastest train in 2026?", a: "The fastest train from Karachi to Lahore is the Green Line Express at approximately 18 hours (continuing to Islamabad). The next fastest options are: Pak Business Express (19h), Shalimar Express (20h), Millat Express (20h), Karakoram Express (21h), and Fareed Express (21h). All run daily." },
  { q: "Do trains run on Fridays and public holidays?", a: "Most Express and AC trains run daily including Fridays. However, some specific Passenger/Shuttle services may not operate on Fridays. During public holidays like Eid-ul-Fitr and Eid-ul-Adha, Pakistan Railways typically adds special trains and extra coaches to handle increased demand. Schedule changes are announced 1-2 weeks before major holidays." },
  { q: "What is the Khyber Mail schedule from Karachi to Peshawar?", a: "Khyber Mail 1UP departs Karachi Cantt at 15:25 daily and arrives Peshawar Cantt at 21:55 the next day — a journey of 30 hours 30 minutes covering 1,726 km. It makes approximately 25 stops. The return 2DN departs Peshawar at 08:00 and arrives Karachi at 14:30 next day." },
  { q: "How does fog season affect train schedules in Pakistan?", a: "From December to February, dense fog in Punjab causes significant delays — typically 2-8 hours for trains passing through Lahore, Faisalabad, and Multan. Pakistan Railways runs revised 'fog schedules' during this period. Morning trains (departing 05:00-10:00) are most affected. Afternoon departures from Punjab stations are more reliable. Always check live tracking before heading to the station." },
  { q: "What is the difference between UP and DN train numbers?", a: "UP trains travel from south to north or west to east (e.g., Karachi → Peshawar, Lahore → Rawalpindi). DN (Down) trains travel in the reverse direction. For example, Tezgam 7UP runs Karachi → Rawalpindi, while 8DN runs Rawalpindi → Karachi. Even-numbered trains are always DN, odd-numbered are UP." },
  { q: "Are there overnight trains with sleeper berths?", a: "Yes, most long-distance Express trains operate as overnight services. AC Sleeper class provides berths with bedding on trains like Green Line, Shalimar, Tezgam, and Karakoram Express. Popular overnight departures include Tezgam 8DN from Rawalpindi (21:00), Fareed Express 37UP from Karachi (22:30), and Islamabad Express 107UP from Lahore (22:30)." },
  { q: "How often does Pakistan Railways update its timetable?", a: "Pakistan Railways typically issues major timetable revisions 1-2 times per year, usually before summer and winter seasons. Minor adjustments (adding/removing stops, slight time changes) happen more frequently. Special fog season timetables run December-February. Eid special trains are announced 2-3 weeks before each Eid." },
  { q: "What are the cheapest trains from Karachi to Lahore?", a: "Awam Express (13UP) is the most affordable option with Economy-only seating at approximately Rs. 800-1,000 for the full journey, though it takes 34 hours to Peshawar (stops at Lahore). Fareed Express and Karakoram Express offer Economy class at Rs. 1,100-1,400 for Karachi–Lahore in 21 hours. Green Line Economy is around Rs. 1,500 for 18 hours." },
  { q: "Which Pakistan Railways trains have AC coaches?", a: "AC Premium trains include: Green Line Express (5UP/6DN), Shalimar Express (27UP/28DN), and Pak Business Express (33UP/34DN). Several Express trains also carry AC Sleeper coaches: Tezgam (7UP/8DN), Khyber Mail (1UP/2DN), Karakoram Express (41UP/42DN), and Allama Iqbal Express (9UP/10DN)." },
  { q: "What trains run from Multan to Rawalpindi?", a: "Two dedicated trains serve this route: Mehr Express (127UP, departs 20:30, 10h 30m journey) and Thall Express (129UP, departs 07:00, 10h journey). Additionally, many Karachi-bound long-distance trains pass through both cities. The journey covers approximately 550-700 km depending on the route taken." },
  { q: "Can I check today's train running status live?", a: "Yes! Track My Train provides real-time GPS tracking for all running Pakistan Railways trains. Visit trackmytrain.pk/train to see live positions on an interactive map, current speed, delay status, last and next station, and estimated arrival times. No registration required." },
  { q: "What is the schedule of Rehman Baba Express?", a: "Rehman Baba Express 47UP departs Karachi Cantt at 10:00 and arrives Peshawar Cantt at 16:00 next day (30 hours). It runs 3 days a week: Monday, Wednesday, Friday. The return 48DN departs Peshawar on Tuesday, Thursday, Saturday at 14:00 arriving Karachi at 20:00 next day." },
  { q: "What is the Jaffar Express schedule?", a: "Jaffar Express 39UP runs from Jacobabad Jn to Peshawar Cantt, departing at 10:00 on Monday, Wednesday, Friday — a 24-hour journey. The return 40DN departs Peshawar on Tuesday, Thursday, Saturday at 20:00. It serves the northern Sindh to KPK route without passing through Karachi." },
  { q: "How early should I reach the station before departure?", a: "For Express and AC trains: arrive 30-45 minutes before departure to find your coach and seat. For Passenger trains: 15-20 minutes is sufficient. During peak seasons (Eid, summer holidays): arrive at least 60-90 minutes early. Major stations like Karachi Cantt, Lahore Jn, and Rawalpindi can be very crowded during holidays." },
];

const proTips = [
  { tip: "Use afternoon departures in winter", detail: "Morning trains through Punjab (Dec–Feb) face 3-8 hour fog delays. Trains departing after 14:00 from Lahore/Rawalpindi are significantly more punctual." },
  { tip: "Green Line is fastest Karachi–Islamabad", detail: "At 18 hours, Green Line beats Tezgam (22h 50m) and Khyber Mail (30h 30m). It's also the most modern train with AC coaches." },
  { tip: "Subak Kharam is best for Lahore–Rawalpindi", detail: "Departing at 08:00 and arriving 12:30, it's the most convenient daytime option for this busy corridor. 4h 30m journey." },
  { tip: "Book Eid trains 30 days in advance", detail: "Trains sell out weeks before Eid-ul-Fitr and Eid-ul-Adha. Pakistan Railways opens bookings 30 days ahead — set a reminder." },
  { tip: "Check live tracking before heading to station", detail: "Use trackmytrain.pk to check real-time delays. No point waiting 4 hours at the platform during fog season." },
  { tip: "Fareed Express is best for late-night departure", detail: "Departing Karachi at 22:30, it arrives Lahore 19:30 next evening. Ideal if you prefer sleeping through the night leg of the journey." },
  { tip: "Jaffar Express for northern Sindh to KPK", detail: "If you're in Jacobabad/Sukkur area and heading to Peshawar, Jaffar Express is the direct 24h connection without backtracking to Karachi." },
  { tip: "AC Standard offers best value on Green Line", detail: "AC Standard gives 80% of AC Business comfort at roughly 50% of the price. The biggest comfort jump is from Economy to AC Standard." },
];

export default function ScheduleGuide() {
  return (
    <main>
      <SEOHead
        title="Pakistan Railways Schedule Guide 2026 — Complete Timetable, Routes & Seasonal Tips"
        description="Complete Pakistan Railways timetable guide 2026. Accurate departure & arrival times for all 164+ trains. Green Line, Tezgam, Khyber Mail schedules, route corridors, fog season tips, and live tracking."
        canonical="/schedule-guide"
        keywords="pakistan railways schedule guide 2026, how to read train timetable, train timing guide pakistan, seasonal schedule changes railway, fog season train delays, eid special trains schedule, train timetable tips, railway schedule explained, best time to travel by train pakistan"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Schedule Guide", url: "/schedule-guide" }]}
        faqSchema={scheduleFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Pakistan Railways Train Schedule & Timetable 2026 — Complete Guide",
          "url": "https://trackmytrain.pk/schedule-guide",
          "description": "Comprehensive guide to Pakistan Railways train schedules, timetables, routes, and seasonal travel information for 2026.",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Major Pakistan Railways Train Schedules 2026",
            "numberOfItems": majorTrainSchedules.length,
            "itemListElement": majorTrainSchedules.map((t, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": `${t.name} (${t.number})`,
              "url": `https://trackmytrain.pk/schedule`,
              "item": {
                "@type": "Trip",
                "name": `${t.name} — ${t.from} to ${t.to}`,
                "departureTime": t.departure.split(" / ")[0],
                "description": `${t.type} train running ${t.days}. Duration: ${t.duration}. Classes: ${t.classes}`,
                "provider": { "@type": "Organization", "name": "Pakistan Railways", "url": "https://pakrailways.gov.pk" }
              }
            }))
          }
        }, {
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": "Pakistan Railways Train Timetable 2026",
          "description": "Complete dataset of 164+ Pakistan Railways trains with departure times, arrival times, durations, running days, and coach classes for the 2026 timetable year.",
          "url": "https://trackmytrain.pk/schedule-guide",
          "keywords": ["Pakistan Railways", "Train Schedule", "Timetable 2026", "Railway Timings"],
          "creator": { "@type": "Organization", "name": "Track My Train", "url": "https://trackmytrain.pk" },
          "temporalCoverage": "2026"
        }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>Schedule Guide</span>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <Calendar className="w-4 h-4" /> Official Timetable • Updated March 2026
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
              Pakistan Railways <span className="text-gradient-gold">Train Schedule & Timetable</span> 2026
            </h1>
            <p className="text-base sm:text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Complete guide to all 164+ Pakistan Railways train timings — accurate departure & arrival times, running days, coach classes, route corridors, seasonal disruptions, and expert travel tips.
            </p>
            <p className="opacity-60 text-sm mt-2">پاکستان ریلوے ٹرین شیڈول اور ٹائم ٹیبل ۲۰۲۶ — مکمل گائیڈ</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                <Link to="/schedule">
                  <Train className="w-4 h-4 mr-2" /> View Full Timetable
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-bold">
                <Link to="/train">
                  <Navigation className="w-4 h-4 mr-2" /> Track Live Trains
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer Box */}
      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-primary/30 bg-primary/5 max-w-4xl mx-auto">
            <CardContent className="p-5 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Quick Answer: Pakistan Railways Schedule Overview</h2>
                  <p className="text-sm text-muted-foreground mt-1">Key facts about the 2026 timetable</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">164+ trains</strong> across <strong className="text-foreground">342+ stations</strong></span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">Fastest:</strong> Green Line Express — 18 hours (Karachi–Islamabad)</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">Longest:</strong> Awam Express — 34 hours (Karachi–Peshawar)</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">Shortest:</strong> Lahore–Rawalpindi — 4h 30m (Subak Kharam)</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">AC Trains:</strong> Green Line, Shalimar, Pak Business</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">Most popular:</strong> Tezgam — runs daily, Karachi–Rawalpindi</span></div>
              </div>
              <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-xs text-muted-foreground">
                <Link to="/schedule" className="flex items-center gap-1 text-primary font-semibold hover:underline"><Timer className="w-3.5 h-3.5" /> View Full Timetable →</Link>
                <Link to="/train" className="flex items-center gap-1 text-primary font-semibold hover:underline"><Navigation className="w-3.5 h-3.5" /> Track Any Train Live →</Link>
                <Link to="/buy-tickets" className="flex items-center gap-1 text-primary font-semibold hover:underline"><Star className="w-3.5 h-3.5" /> Buy Tickets Online →</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "164+", label: "Total Trains", icon: Train, gradient: "gradient-card-emerald" },
              { value: "342+", label: "Stations", icon: MapPin, gradient: "gradient-card-amber" },
              { value: "80+", label: "Routes", icon: Route, gradient: "gradient-card-blue" },
              { value: "1,726 km", label: "ML-1 Length", icon: Navigation, gradient: "gradient-card-purple" },
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
      </section>

      {/* Major Train Schedules Table */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">OFFICIAL TIMETABLE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Major Express & AC Train Schedules</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Accurate departure and arrival times for Pakistan's most popular long-distance trains. All timings sourced from Pakistan Railways official timetable.
            </p>
          </div>
          <div className="max-w-6xl mx-auto overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left py-3 px-3 font-medium">Train</th>
                  <th className="text-left py-3 px-3 font-medium">Number</th>
                  <th className="text-left py-3 px-3 font-medium">Route</th>
                  <th className="text-left py-3 px-3 font-medium">Departure</th>
                  <th className="text-left py-3 px-3 font-medium">Arrival</th>
                  <th className="text-left py-3 px-3 font-medium">Duration</th>
                  <th className="text-left py-3 px-3 font-medium">Days</th>
                  <th className="text-left py-3 px-3 font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                {majorTrainSchedules.map((t, i) => (
                  <tr key={i} className={`border-b hover:bg-muted/50 transition-colors ${t.highlight ? "bg-primary/5" : ""}`}>
                    <td className="py-3 px-3">
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.stops} stops</div>
                    </td>
                    <td className="py-3 px-3 text-xs font-mono text-muted-foreground">{t.number}</td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{t.from} → {t.to}</td>
                    <td className="py-3 px-3 font-medium text-xs">{t.departure}</td>
                    <td className="py-3 px-3 font-medium text-xs">{t.arrival}</td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{t.duration}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">{t.days}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${t.type === "AC Premium" ? "bg-accent/15 text-accent-foreground" : "bg-primary/10 text-primary"}`}>
                        {t.type.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <Link to="/schedule" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              View all 164+ trains in the full timetable <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Short-Distance / Regional Trains */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">REGIONAL SERVICES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Short-Distance & Regional Train Schedules</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Quick-reference timetable for shorter routes — Lahore to Rawalpindi, Multan services, and Sindh regional trains.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {shortRouteSchedules.map((t, i) => (
              <Card key={i} className="border hover-lift">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm">{t.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{t.number}</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5 shrink-0">{t.duration}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.route}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.departure}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.days}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Route Corridors */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">MAJOR CORRIDORS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Pakistan Railways Route Corridors</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Understanding the main rail corridors helps you pick the right train. Here's how Pakistan's 7,791 km rail network is organized.
            </p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {routeCorridors.map((c, i) => (
              <Card key={i} className="border hover-lift">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Route className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className="font-bold text-sm">{c.name}</h3>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-[10px] font-bold bg-primary/10 text-primary rounded-full px-2 py-0.5">{c.distance}</span>
                          <span className="text-[10px] font-bold bg-accent/10 text-accent-foreground rounded-full px-2 py-0.5">{c.trains}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.route}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2">{c.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Travel Guide */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TRAVEL PLANNING</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Seasonal Schedule Disruptions & Travel Tips</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Pakistan Railways schedules are affected by weather and holidays. Plan your journey using this seasonal guide to avoid delays.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {seasonalInfo.map((s, i) => (
              <Card key={i} className="border hover-lift">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                      <s.icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <h3 className="font-bold text-sm">{s.season}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.conditions}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Fog Season Alert (Dec–Feb):</strong> Morning trains through Lahore, Faisalabad, Sahiwal, and Multan face 2-8 hour delays. Pakistan Railways shifts to revised fog timetables.{" "}
                <Link to="/check-delays" className="text-primary font-semibold hover:underline">Check live delays →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">INSIDER KNOWLEDGE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">8 Expert Tips for Reading Pakistan Railways Schedules</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Practical advice from frequent Pakistan Railways travelers to help you navigate timetables, pick the right train, and avoid common mistakes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {proTips.map((t, i) => (
              <Card key={i} className="border hover-lift">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{t.tip}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.detail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Long-Form Content */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-sm max-w-none text-muted-foreground space-y-5">
            <h2 className="text-2xl font-bold text-foreground">Understanding Pakistan Railways Train Schedule & Timetable in 2026</h2>

            <p className="text-base leading-relaxed">
              Pakistan Railways, established in 1861 during British colonial rule, operates one of the largest rail networks in South Asia. With over <strong className="text-foreground">7,791 kilometers of track</strong> spanning all four provinces and covering <strong className="text-foreground">342+ stations</strong>, the network carries millions of passengers annually across routes ranging from 1.5 hours (Wazirabad–Sialkot) to 34 hours (Karachi–Peshawar on the Awam Express).
            </p>

            <h3 className="text-lg font-bold text-foreground">How the Timetable Is Structured</h3>
            <p className="leading-relaxed">
              Pakistan Railways classifies its 164+ trains into three main categories: <strong className="text-foreground">AC Premium</strong> (Green Line Express, Shalimar Express, Pak Business Express), <strong className="text-foreground">Express</strong> (Tezgam, Khyber Mail, Karakoram Express, Pakistan Express, Allama Iqbal Express, Hazara Express), and <strong className="text-foreground">Passenger/Shuttle</strong> (local and regional services stopping at every station). AC Premium trains offer the fastest journey times and air-conditioned coaches, while Passenger trains are the most affordable but significantly slower.
            </p>

            <h3 className="text-lg font-bold text-foreground">The Main Line 1 (ML-1) Backbone</h3>
            <p className="leading-relaxed">
              The <strong className="text-foreground">Main Line 1 (ML-1)</strong> is Pakistan's most critical rail corridor, stretching 1,726 km from Karachi to Peshawar via Hyderabad, Sukkur, Multan, Lahore, and Rawalpindi. It carries approximately 75% of all rail passenger traffic. Major trains operating on this corridor include the Green Line Express (18h Karachi–Islamabad), Tezgam (22h 50m Karachi–Rawalpindi), Khyber Mail (30h 30m Karachi–Peshawar), and Awam Express (34h Karachi–Peshawar). The ML-1 upgrade under the China-Pakistan Economic Corridor (CPEC) aims to increase speeds from the current 65-105 km/h to 160 km/h.
            </p>

            <h3 className="text-lg font-bold text-foreground">Karachi to Lahore: The Most Popular Route</h3>
            <p className="leading-relaxed">
              The Karachi–Lahore corridor (approximately 1,230 km) sees the highest demand. In 2026, daily options include the <strong className="text-foreground">Green Line Express</strong> (departing Karachi 16:00, arrives Lahore en route to Islamabad), <strong className="text-foreground">Pak Business Express 33UP</strong> (19:00 departure, 14:00 arrival, 19 hours), <strong className="text-foreground">Shalimar Express 27UP</strong> (15:30, 20 hours), <strong className="text-foreground">Millat Express 17UP</strong> (20:00, 20 hours), <strong className="text-foreground">Karakoram Express 41UP</strong> (15:30, 21 hours), and <strong className="text-foreground">Fareed Express 37UP</strong> (22:30, 21 hours). Economy fares range from Rs. 1,100 to Rs. 1,500, while AC Business class can cost Rs. 4,500 to Rs. 8,500 depending on the train.
            </p>

            <h3 className="text-lg font-bold text-foreground">Lahore to Rawalpindi/Islamabad: The Busiest Short Corridor</h3>
            <p className="leading-relaxed">
              The 288 km Lahore–Rawalpindi section is Pakistan's busiest short-distance rail corridor. The <strong className="text-foreground">Subak Kharam 103UP</strong> (08:00 departure, 12:30 arrival) and <strong className="text-foreground">Islamabad Express 107UP</strong> (22:30 departure, 03:00 arrival) are the dedicated services taking approximately 4 hours 30 minutes. Additionally, most Karachi-bound long-distance trains traverse this corridor, giving travelers 10+ daily options. The journey passes through Gujranwala, Wazirabad, Lala Musa, Jhelum, and Gujar Khan.
            </p>

            <h3 className="text-lg font-bold text-foreground">Understanding UP and DN Designations</h3>
            <p className="leading-relaxed">
              Every Pakistan Railways train carries a directional suffix: <strong className="text-foreground">UP</strong> (traveling south-to-north or west-to-east) and <strong className="text-foreground">DN (Down)</strong> (traveling north-to-south or east-to-west). For example, Tezgam 7UP runs Karachi → Rawalpindi, while 8DN runs Rawalpindi → Karachi. Odd-numbered trains are always UP direction; even-numbered are always DN. This system dates back to British-era railway conventions where trains traveling toward the national capital were designated "UP."
            </p>

            <h3 className="text-lg font-bold text-foreground">Fog Season: December to February</h3>
            <p className="leading-relaxed">
              The most significant schedule disruption every year occurs during <strong className="text-foreground">fog season (December–February)</strong> in Punjab and upper Sindh. Dense fog reduces visibility to near-zero levels, forcing trains to reduce speeds to 15-30 km/h. Morning departures from Lahore, Faisalabad, Sahiwal, and Multan are most affected, with typical delays of 3-6 hours. Pakistan Railways issues revised fog timetables during this period, with some trains departing 1-2 hours earlier to compensate. Travelers are strongly advised to choose afternoon departures (after 14:00) from Punjab stations during winter for the most reliable journey.
            </p>

            <h3 className="text-lg font-bold text-foreground">Eid Season Special Schedules</h3>
            <p className="leading-relaxed">
              During Eid-ul-Fitr and Eid-ul-Adha, Pakistan Railways operates <strong className="text-foreground">special Eid trains</strong> on high-demand routes and adds extra coaches to regular services. Popular routes like Karachi–Lahore, Lahore–Rawalpindi, and Multan–Lahore see a surge in demand 5-7 days before each Eid. Tickets for express trains often sell out 15-20 days in advance. Pakistan Railways typically announces Eid schedule changes 2-3 weeks before the holiday. Travelers are advised to book tickets as soon as the 30-day booking window opens using the RABTA app.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">EXPLORE MORE</p>
            <h2 className="text-xl sm:text-2xl font-bold">Related Tools & Resources</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Navigation, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any train's real-time GPS position on an interactive map.", link: "/train" },
              { icon: MapPin, gradient: "gradient-card-amber", title: "Journey Planner", desc: "Find the best train between any two stations with fare estimates.", link: "/planner" },
              { icon: Star, gradient: "gradient-card-blue", title: "Buy Tickets Online", desc: "Step-by-step guide to booking via RABTA app, website, or counter.", link: "/buy-tickets" },
              { icon: Clock, gradient: "gradient-card-purple", title: "Check Delays", desc: "Real-time delay status for all running trains with estimated arrivals.", link: "/check-delays" },
              { icon: Train, gradient: "gradient-card-rose", title: "Express Trains", desc: "Complete list of all Express and AC Premium trains with details.", link: "/express-trains" },
              { icon: Zap, gradient: "gradient-card-teal", title: "Green Line Express", desc: "Pakistan's premium AC train — schedule, fares, classes, and tips.", link: "/green-line-express" },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group`}>
                <CardContent className="p-5 text-center">
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                  <Link to={item.link} className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
                    Explore <ChevronRight className="w-3 h-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Pakistan Railways Schedule FAQ — {scheduleFaqs.length} Questions Answered</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Everything travelers ask about Pakistan Railways train timings, timetable changes, running days, and schedule disruptions.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {scheduleFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-4">
                  <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline gap-3">
                    <span className="flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-6">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Cross-Language Link */}
      <div className="bg-card border-t py-4 text-center">
        <p className="text-sm text-muted-foreground">
          اردو میں دیکھیں: <Link to="/ur/schedule" className="text-primary font-semibold hover:underline">← پاکستان ریلوے شیڈول اردو</Link>
          {" · "}
          <Link to="/schedule" className="text-primary font-semibold hover:underline">Interactive Timetable →</Link>
        </p>
      </div>
    </main>
  );
}
