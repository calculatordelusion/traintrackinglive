import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Train, ArrowRight, Clock, Zap, HelpCircle, Star, Navigation, MapPin, Shield, BarChart3, Utensils, Wind, Sofa, CreditCard } from "lucide-react";
import PremiumHero from "@/components/PremiumHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import RelatedLinks from "@/components/RelatedLinks";
import { fetchAllTrains } from "@/lib/trainApi";
import { Skeleton } from "@/components/ui/skeleton";

interface TrainData {
  id: number; number: string; name: string; nameUrdu: string;
  from: string; to: string; type: string; departureTime: string;
  arrivalTime: string; duration: string; status: string; days: string[];
}

const featuredTrains = [
  { name: "Green Line Express", tag: "FLAGSHIP", route: "Karachi → Islamabad", duration: "16 hrs", gradient: "gradient-card-emerald", features: ["AC Business", "Premium Meals", "WiFi"], desc: "Pakistan's flagship premium train with luxury AC coaches and complimentary gourmet meals. The preferred choice for business travelers between Karachi and the capital.", id: 5 },
  { name: "Tezgam Express", tag: "POPULAR", route: "Karachi → Rawalpindi", duration: "24 hrs", gradient: "gradient-card-amber", features: ["Economy", "AC Standard", "Historic"], desc: "One of Pakistan's most iconic and historic trains, serving millions of passengers annually. Affordable fares with multiple class options for every budget.", id: 7 },
  { name: "Karakoram Express", tag: "FAST", route: "Karachi → Lahore", duration: "17 hrs", gradient: "gradient-card-blue", features: ["AC Sleeper", "Dining Car", "Popular"], desc: "Named after the majestic Karakoram mountain range, this train offers comfortable overnight travel with AC sleeper berths and dining car service.", id: 41 },
  { name: "Shalimar Express", tag: "VALUE", route: "Karachi → Lahore", duration: "18 hrs", gradient: "gradient-card-purple", features: ["Economy", "Affordable", "Daily"], desc: "The most affordable daily express service on the busy Karachi-Lahore corridor. Reliable schedule with economy and business class options.", id: 9 },
  { name: "Business Express", tag: "FASTEST", route: "Karachi → Lahore", duration: "15 hrs", gradient: "gradient-card-rose", features: ["AC Business", "Fastest", "Premium"], desc: "The fastest train on the Karachi-Lahore route, completing the journey in just 15 hours. Premium AC business class with minimal stops.", id: 33 },
  { name: "Khyber Mail", tag: "ICONIC", route: "Peshawar → Karachi", duration: "24 hrs", gradient: "gradient-card-teal", features: ["Full Route", "Historic", "Scenic"], desc: "The legendary cross-country service traversing the entire Main Line 1 from Peshawar to Karachi. One of the longest and most scenic railway journeys in Pakistan.", id: 1 },
];

const expressCategories = [
  { title: "Super Express", desc: "Fastest category with minimal stops. Green Line, Business Express.", detail: "15-16 hour journeys", icon: "⚡", gradient: "gradient-card-emerald" },
  { title: "Standard Express", desc: "Standard express with moderate stops. Karakoram, Shalimar, Allama Iqbal.", detail: "17-20 hour journeys", icon: "🚂", gradient: "gradient-card-amber" },
  { title: "Mail Express", desc: "Historic services with slightly more stops. Khyber Mail, Tezgam.", detail: "22-26 hour journeys", icon: "📬", gradient: "gradient-card-blue" },
];

const expressFaqs = [
  { q: "What is an Express train in Pakistan Railways?", a: "Express trains are faster long-distance services that skip many smaller stations to reduce journey time. They typically offer better amenities including AC coaches, dining cars, and more comfortable seating compared to passenger trains. Express trains are the backbone of Pakistan's inter-city rail travel." },
  { q: "How are Express trains different from Mail trains?", a: "Mail trains were historically used to carry post/mail alongside passengers and are slightly slower than Express trains, making a few more stops. Today, the distinction is mostly historical as both offer similar services and comfort levels. Examples of Mail trains include Khyber Mail and Tezgam." },
  { q: "Which is the fastest express train in Pakistan?", a: "The Business Express and Green Line Express are among the fastest, covering Karachi to Lahore in about 15-16 hours with minimal stops. They use well-maintained track sections and offer premium AC business class service with complimentary meals." },
  { q: "What is the difference between Express and Passenger trains?", a: "Express trains are faster long-distance services that make fewer stops, offer multiple coach classes (Economy, Business, AC Standard, AC Business, Sleeper), and run on fixed schedules. Passenger trains are slower, stop at every station, are more affordable, and primarily serve shorter routes and rural areas." },
  { q: "Do Express trains have dining facilities?", a: "Yes, most Express trains have pantry/dining cars serving hot meals, snacks, tea, and beverages throughout the journey. AC class passengers on premium trains like Green Line and Business Express get complimentary meals included in their ticket price." },
  { q: "How far in advance should I book Express train tickets?", a: "For popular routes like Karachi-Lahore or during holidays (Eid, summer), book 15-30 days in advance. AC classes fill up faster than economy, so plan accordingly. Online booking is available 24/7 through the official Pakistan Railways website." },
  { q: "Are Express trains air-conditioned?", a: "Most Express trains offer multiple AC classes including AC Business, AC Parlor, AC Sleeper, and AC Standard. Economy class is fan-cooled but still comfortable for budget travelers. Not all classes are available on every train." },
  { q: "How do I track an express train in real-time?", a: "Visit our Live Trains page or search for your train by name or number. You'll see the exact GPS position, current speed, delay status, and estimated arrival times at all upcoming stations. Our data refreshes every 5 seconds for real-time accuracy." },
  { q: "Do express trains run on time?", a: "Pakistan Railways express trains have an average on-time performance of about 60-70%. Delays are common due to track conditions, weather, and operational issues. Use our Live Train Tracker to check real-time delay status before heading to the station." },
  { q: "Can I book express train tickets online?", a: "Yes, express train tickets can be booked online through the official Pakistan Railways website (pak-railways.gov.pk) or mobile app. You can pay via credit/debit cards, JazzCash, or Easypaisa. E-tickets are delivered instantly to your email." },
  { q: "Which express trains have sleeping berths?", a: "AC Sleeper class is available on major overnight express trains including Karakoram Express, Tezgam, Khyber Mail, and Allama Iqbal Express. Sleeper berths come with bedding, blankets, and pillows for comfortable overnight travel." },
  { q: "What is the cheapest express train?", a: "The Shalimar Express offers the most affordable fares on the Karachi-Lahore route with economy class starting around Rs. 1,500-1,800. Passenger trains are even cheaper but significantly slower. For the best value, compare fares on our Ticket Pricing page." },
  { q: "What amenities are available in AC Business class?", a: "AC Business class offers wide reclining seats with extra legroom, full air conditioning, complimentary hot meals and beverages, blankets and pillows, charging points, and priority boarding. On Green Line Express, WiFi is also available. AC Business coaches are typically the newest in the fleet." },
  { q: "How many express trains run daily in Pakistan?", a: "Pakistan Railways operates approximately 74+ express and AC trains daily across its network. This includes Super Express (Green Line, Business Express), Standard Express (Karakoram, Shalimar), and Mail trains (Khyber Mail, Tezgam). Not all run daily — check our schedule for specific running days." },
  { q: "Can I carry luggage on express trains?", a: "Yes, each passenger is allowed up to 40 kg of luggage free of charge on express trains. Luggage is stored in overhead racks or under seats. For excess baggage, a nominal fee is charged per kg. Large items like bicycles or furniture require separate booking through the parcels department." },
  { q: "Are there women-only coaches on express trains?", a: "Some express trains designate specific coaches or sections for women travelers, particularly Economy class. Check with station staff when boarding. Premium AC classes are generally mixed seating. Families are also given preference in certain coach assignments." },
  { q: "What happens if an express train is cancelled?", a: "If Pakistan Railways cancels a train, passengers receive a full refund at any booking counter with no deductions. Online ticket holders get refunds credited to their original payment method within 7-14 business days. Alternate trains may be arranged depending on the route." },
];

export default function ExpressTrainsPage() {
  const [allTrains, setAllTrains] = useState<TrainData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllTrains();
        setAllTrains(data || []);
      } catch (e) { console.error("Failed to fetch trains:", e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const expressTrains = useMemo(() => allTrains.filter(t => t.type === "express" || t.type === "ac"), [allTrains]);
  const acTrains = useMemo(() => expressTrains.filter(t => t.type === "ac"), [expressTrains]);
  const regularExpress = useMemo(() => expressTrains.filter(t => t.type === "express"), [expressTrains]);

  return (
    <main>
      <SEOHead
        title="Pakistan Railways Express Trains 2026 — Complete List, Schedule, Fares & Live Tracking"
        description="All Pakistan Railways express and AC trains — Green Line, Tezgam, Karakoram, Business Express. Live train tracking, schedules, routes, ticket prices, and booking info. Updated 2026."
        canonical="/express-trains"
        keywords="pakistan express trains list, tezgam express schedule, karakoram express, business express pakistan, AC train pakistan, fastest trains pakistan, express train schedule 2026, premium trains pakistan, all express trains pakistan railway"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Express Trains", url: "/express-trains" }]}
        faqSchema={expressFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Pakistan Railways Express Trains",
          "description": "Complete list of all premium express and AC train services operated by Pakistan Railways",
          "url": "https://trackmytrain.pk/express-trains",
          "numberOfItems": 20,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Green Line Express (5UP/6DN) — Karachi to Islamabad" },
            { "@type": "ListItem", "position": 2, "name": "Tezgam Express (7UP/8DN) — Karachi to Rawalpindi" },
            { "@type": "ListItem", "position": 3, "name": "Karakoram Express (11UP/12DN) — Karachi to Lahore" },
            { "@type": "ListItem", "position": 4, "name": "Khyber Mail (1UP/2DN) — Karachi to Peshawar" },
            { "@type": "ListItem", "position": 5, "name": "Business Express (5UP/6DN) — Karachi to Lahore" },
            { "@type": "ListItem", "position": 6, "name": "Shalimar Express — Karachi to Lahore" },
            { "@type": "ListItem", "position": 7, "name": "Allama Iqbal Express — Karachi to Sialkot" },
          ]
        }]}
      />
      <PremiumHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Express Trains" }]}
        badge="PREMIUM EXPRESS & AC TRAIN SERVICES"
        badgeIcon={<Zap className="w-3.5 h-3.5 text-[hsl(152_55%_45%)]" />}
        title={<>Pakistan Railways<br /><span className="text-gradient-gold">Express Trains — Complete Guide</span></>}
        subtitle="Complete list of all express and AC trains with real-time tracking, schedules, routes, and booking information. Find the perfect train for your journey."
        subtitleUrdu="پاکستان ریلوے ایکسپریس ٹرینیں — مکمل فہرست اور ٹریکنگ"
        centered
      />

      {/* Floating Stats */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: loading ? "..." : expressTrains.length, label: "Express Trains", icon: Train, gradient: "gradient-card-emerald" },
            { value: loading ? "..." : acTrains.length, label: "AC Premium", icon: Star, gradient: "gradient-card-amber" },
            { value: loading ? "..." : regularExpress.length, label: "Regular Express", icon: Zap, gradient: "gradient-card-blue" },
            { value: "24/7", label: "Live Tracking", icon: Navigation, gradient: "gradient-card-purple" },
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

        {/* Featured Express Trains */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">FEATURED TRAINS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Express Trains</h2>
            <p className="text-sm text-muted-foreground mt-1">Most popular premium train services across Pakistan</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredTrains.map((t, i) => (
              <Link key={i} to={`/train/${t.id}`}>
                <Card className={`${t.gradient} border hover-lift group h-full overflow-hidden`}>
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">{t.tag}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-bold mb-0.5 group-hover:text-primary transition-colors">{t.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>{t.route}</span>
                    </div>
                    <div className="text-xs font-semibold text-primary mb-3">{t.duration} Journey</div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{t.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.features.map((f, j) => (
                        <span key={j} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{f}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose Express */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">ADVANTAGES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Why Choose Express Trains?</h2>
            <p className="text-sm text-muted-foreground mt-1">Premium services for comfortable long-distance travel across Pakistan</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Zap, title: "Faster Journey", desc: "Skip smaller stations, save 3-6 hours compared to passenger trains", gradient: "gradient-card-emerald" },
              { icon: Sofa, title: "Better Comfort", desc: "AC coaches, reclining seats, and dedicated sleeping berths", gradient: "gradient-card-amber" },
              { icon: Utensils, title: "Dining Cars", desc: "Hot meals, snacks, and beverages served throughout the journey", gradient: "gradient-card-blue" },
              { icon: Clock, title: "Regular Schedule", desc: "Fixed schedules with better on-time performance and reliability", gradient: "gradient-card-purple" },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group`}>
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Express Categories */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">CATEGORIES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Express Train Categories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {expressCategories.map((cat, i) => (
              <Card key={i} className={`${cat.gradient} border hover-lift group`}>
                <CardContent className="p-5">
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{cat.desc}</p>
                  <span className="text-[10px] font-semibold text-primary">{cat.detail}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Trains Listing */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-2xl font-bold">All Express & AC Trains</h2>
              <p className="text-sm text-muted-foreground">Click any train to track live position and view full schedule</p>
            </div>
            <div className="flex gap-2">
              <Link to="/train"><Button variant="outline" size="sm" className="rounded-xl gap-1"><Navigation className="w-3 h-3" /> Track All Live</Button></Link>
              <Link to="/ticket-pricing"><Button variant="outline" size="sm" className="rounded-xl gap-1"><CreditCard className="w-3 h-3" /> Ticket Prices</Button></Link>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-xl" />)}
            </div>
          ) : (
            <>
              {/* AC Premium */}
              {acTrains.length > 0 && (
                <>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-accent/20 text-accent-foreground">PREMIUM</span>
                    AC / Premium Trains ({acTrains.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {acTrains.map((train) => (
                      <Link key={train.id} to={`/train/${train.id}`}>
                        <Card className="gradient-card-amber border hover-lift group h-full">
                          <CardContent className="p-5">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent-foreground">AC PREMIUM</span>
                              <span className="text-xs text-muted-foreground">#{train.id}</span>
                            </div>
                            <h3 className="font-bold group-hover:text-primary transition-colors">
                              {train.name} <span className="text-muted-foreground font-normal text-sm">{train.number}</span>
                            </h3>
                            <p className="text-xs text-destructive mb-1">{train.nameUrdu}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                              <span>{train.from}</span>
                              <ArrowRight className="w-3 h-3" />
                              <span>{train.to}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {train.departureTime} → {train.arrivalTime}</span>
                              <span className="font-medium text-primary">{train.duration}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {/* Regular Express */}
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">EXPRESS</span>
                Express Trains ({regularExpress.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {regularExpress.map((train) => (
                  <Link key={train.id} to={`/train/${train.id}`}>
                    <Card className="hover-lift group h-full hover:border-primary/30 transition-all">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">EXPRESS</span>
                          <span className="text-xs text-muted-foreground">#{train.id}</span>
                        </div>
                        <h3 className="font-bold group-hover:text-primary transition-colors">
                          {train.name} <span className="text-muted-foreground font-normal text-sm">{train.number}</span>
                        </h3>
                        <p className="text-xs text-destructive mb-1">{train.nameUrdu}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                          <span>{train.from}</span>
                          <ArrowRight className="w-3 h-3" />
                          <span>{train.to}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {train.departureTime} → {train.arrivalTime}</span>
                          <span className="font-medium text-primary">{train.duration}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Rich SEO Editorial Content */}
        <section className="mb-12 sm:mb-16 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">COMPLETE GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Express Trains — Everything You Need to Know</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="gradient-card-emerald border hover-lift group">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Star className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h4 className="font-bold text-sm">Premium AC Trains</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed"><strong className="text-foreground">Green Line Express</strong> (Karachi ↔ Islamabad) offers luxury AC coaches, gourmet meals, and WiFi. <strong className="text-foreground">Business Express</strong> is the fastest on Karachi–Lahore at just 15 hours. Premium services designed for business travelers.</p>
              </CardContent>
            </Card>
            <Card className="gradient-card-amber border hover-lift group">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Shield className="w-5 h-5 text-amber-500" />
                  </div>
                  <h4 className="font-bold text-sm">Historic Express Services</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed"><strong className="text-foreground">Tezgam Express</strong> and <strong className="text-foreground">Khyber Mail</strong> are Pakistan's most iconic trains. Khyber Mail traverses the entire Main Line 1 from Peshawar to Karachi. <strong className="text-foreground">Karakoram Express</strong> offers overnight AC sleeper berths with dining car service.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-hero-gradient text-primary-foreground border-0 overflow-hidden relative mb-6">
            <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
            <CardContent className="p-5 sm:p-6 relative">
              <h4 className="font-bold text-sm mb-3">🎯 How to Choose the Right Express Train</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Super Express trains save 3-6 hours vs standard express",
                  "AC Business for max comfort, Economy for budget travel",
                  "Check running days — not all express trains run daily",
                  "Overnight departures (15:00-19:00) let you sleep through the journey",
                  "Book 15-30 days ahead for Eid/peak — AC sells out first",
                  "Use Live Tracker on travel day for real-time delay status",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs opacity-90">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="gradient-card-blue border hover-lift group">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                </div>
                <h4 className="font-bold text-xs mb-1.5">Booking Tips</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Book online at pak-railways.gov.pk up to 30 days ahead. Pay via JazzCash, Easypaisa, or cards. E-tickets delivered instantly to your email.</p>
              </CardContent>
            </Card>
            <Card className="gradient-card-purple border hover-lift group">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
                <h4 className="font-bold text-xs mb-1.5">Punctuality Stats</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Express trains average 60-70% on-time. Green Line & Business Express perform best. Fog season (Dec-Feb) causes most delays in Punjab.</p>
              </CardContent>
            </Card>
            <Card className="gradient-card-rose border hover-lift group">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <Train className="w-5 h-5 text-rose-500" />
                </div>
                <h4 className="font-bold text-xs mb-1.5">Fleet Size</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{expressTrains.length || 74}+ express & AC trains daily. Includes Super Express, Standard Express, and historic Mail services across all corridors.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-3">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold">Express Trains FAQs</h2>
            <p className="text-sm text-muted-foreground mt-1">Common questions about Pakistan Railways express and AC trains</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {expressFaqs.map((faq, i) => (
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

        {/* Quick Links */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">EXPLORE MORE</p>
            <h2 className="text-xl sm:text-2xl font-bold">Related Tools & Resources</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Navigation, gradient: "gradient-card-emerald", title: "Journey Planner", desc: "Compare express trains between any two stations with timing & duration.", link: "/planner" },
              { icon: CreditCard, gradient: "gradient-card-amber", title: "Ticket Pricing", desc: "Complete fare chart for all classes across major routes.", link: "/ticket-pricing" },
              { icon: MapPin, gradient: "gradient-card-blue", title: "Railway Stations", desc: "Browse 342+ stations and find which trains stop at each.", link: "/stations" },
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Track Express Trains Live</h2>
          <p className="text-base opacity-80 max-w-xl mx-auto mb-6">See real-time GPS locations, speeds, delays, and ETAs for all Express trains. Updated every 5 seconds.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/train">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Train className="w-4 h-4" /> Track Trains Live
              </Button>
            </Link>
            <Link to="/schedule">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <Clock className="w-4 h-4" /> View Full Schedule
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": expressFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
      <RelatedLinks context="general" />
    </main>
  );
}
