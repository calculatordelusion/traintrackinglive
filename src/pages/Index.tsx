import { useState, useEffect, useMemo } from "react";
import { useStaggeredAnimation } from "@/hooks/useStaggeredAnimation";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Search, Train, MapPin, Clock, ArrowRight, Wifi, Navigation, Globe, Shield, ChevronRight, Star, Quote, BookOpen, Zap, Users, Radio, Newspaper, BarChart3, Bell, Map, Route, Gauge, Eye, Landmark, CreditCard, Leaf, CheckCircle2, Info, AlertTriangle, TrendingUp, CalendarDays, Ticket, Package, Timer, FileText } from "lucide-react";

// Train images (unique per train, WebP optimized)
import greenLineTrainImg from "@/assets/trains/green-line-train.webp";
import tezgamExpressImg from "@/assets/trains/tezgam-express.webp";
import karakoramExpressImg from "@/assets/trains/karakoram-express.webp";
import khyberMailImg from "@/assets/trains/khyber-mail.webp";
import businessExpressImg from "@/assets/trains/business-express.webp";
import jaffarExpressImg from "@/assets/trains/jaffar-express.webp";

// Station images (unique per station, WebP format)
import lahoreStationImg from "@/assets/stations/lahore-station.webp";
import karachiStationImg from "@/assets/stations/karachi-station.webp";
import rawalpindiStationImg from "@/assets/stations/rawalpindi-station.webp";
import multanStationImg from "@/assets/stations/multan-station.webp";
import peshawarStationImg from "@/assets/stations/peshawar-station.webp";
import quettaStationImg from "@/assets/stations/quetta-station.webp";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trains, searchTrains } from "@/data/trains";
import { popularRoutes } from "@/data/routes";
import { stations } from "@/data/stations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fetchLivePositions, type LiveStats } from "@/lib/trainApi";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import heroTrainBg from "@/assets/hero-train-bg.webp";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof trains>([]);
  const [showResults, setShowResults] = useState(false);
  const [stats, setStats] = useState<LiveStats>({ moving: 0, atStation: 0, total: 0, liveCount: 0 });
  const [liveTrainIds, setLiveTrainIds] = useState<Set<number>>(new Set());
  const { stats: netStats } = useNetworkStats();

  useEffect(() => {
    const loadLive = async () => {
      try {
        const { stats: s, liveTrainIds: ids } = await fetchLivePositions();
        setStats(s);
        setLiveTrainIds(new Set(ids));
      } catch (e) { console.error("Failed to fetch live data:", e); }
    };
    loadLive();
    const interval = setInterval(loadLive, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeTrains = useMemo(() => trains.filter(t => t.status === "active").slice(0, 6), []);

  const featureCards = useStaggeredAnimation(80);
  const topTrainsAnim = useStaggeredAnimation(100);
  const liveTrainsAnim = useStaggeredAnimation(80);
  const stationsAnim = useStaggeredAnimation(100);
  const whyChooseAnim = useStaggeredAnimation(80);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.length > 1) {
      setSearchResults(searchTrains(q).slice(0, 8));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const faqs = [
    { q: "How can I track my train in Pakistan right now?", a: "Open Track My Train, type your train's name or number into the search bar, and tap the result. You'll instantly see the train's live GPS position on the map, its current speed, how many minutes late it is (if any), and updated arrival estimates for every upcoming station. The page refreshes automatically every 5 seconds, so you can leave it open and watch progress in real-time without reloading." },
    { q: "What details are shown when I track a train?", a: "Each train's live page displays: exact GPS coordinates plotted on an interactive map, real-time speed in km/h, accumulated delay in minutes, a progress bar showing how far along the route the train has traveled, and an estimated time of arrival (ETA) at the next station and all remaining stops. We also show the official schedule alongside the live data so you can compare expected vs. actual timings at a glance." },
    { q: "How reliable are the delay and ETA estimates?", a: "Our algorithm cross-references the train's actual GPS position with the official Pakistan Railways timetable and calculates accumulated delay. Accuracy is typically ±3 to 5 minutes for most services. ETAs adjust dynamically as the train speeds up, slows down, or waits at a signal stop, so the estimate gets more precise the closer the train is to your station." },
    { q: "Do I need to download an app or create an account?", a: "No — Track My Train works entirely in your browser. Open trackmytrain.pk on any phone, tablet, or computer and start tracking instantly. There's no app to install, no account to create, and no personal information collected. The site is lightweight and optimized to load fast even on 2G or 3G mobile data, so you can check your train anywhere in Pakistan." },
    { q: "Which trains are covered by Track My Train?", a: "We cover every active Pakistan Railways passenger service — that includes Express trains like Tezgam, Karakoram, Shalimar, and Allama Iqbal; premium AC services like Green Line Express and Business Express; and local Passenger trains on branch lines. In total, our system monitors 164+ scheduled services running across 342+ stations from Karachi to Peshawar and Quetta to Lahore." },
    { q: "Is Track My Train the same as Pakistan Railways' official website?", a: "No. Track My Train (trackmytrain.pk) is a fully independent platform built by a team of developers and railway enthusiasts. We are not affiliated with, endorsed by, or connected to Pakistan Railways or any government agency. Our goal is to make train information more accessible and user-friendly for everyday passengers. For official ticket bookings and reservations, please use Pakistan Railways' own channels or call the helpline 117." },
    { q: "How is 'Find My Train' different from regular tracking?", a: "Regular tracking lets you search for a train by name or number. 'Find My Train' flips it around — you grant location access on your phone, and our system matches your GPS coordinates against all active train routes to figure out which train you're currently riding. This is especially handy when you boarded a connecting service and aren't sure of the train number, or when you want to share your live position with family waiting at the station." },
    { q: "Can I plan a complete journey between two stations?", a: "Absolutely. Our Journey Planner lets you pick any departure and arrival station from the full Pakistan Railways network. It then searches through all 164+ trains — including intermediate stops — and shows you every direct option sorted by travel time. For each result you see departure time, arrival time, total duration, train type (Express/AC/Passenger), and running days, so you can compare and pick the best fit." },
    { q: "Does Track My Train work during festivals and holidays?", a: "Yes. In fact, we're most useful during Eid, national holidays, and summer rush when delays are more common. Our live GPS data captures exactly what's happening on the ground — whether a train is stuck at a crossing, delayed at a junction, or running on schedule. We recommend checking 30–60 minutes before you head to the station during peak periods so you can adjust your plans accordingly." },
    { q: "How does Track My Train make money if it's free?", a: "The platform sustains itself through contextual advertisements displayed on the site. We do not charge users, sell personal data, or gate any features behind a paywall. Every tool — live tracking, journey planner, schedule lookup, delay alerts — is free and always will be. Our philosophy is that essential public transport information should be available to everyone without barriers." },
    { q: "What is the fastest train from Karachi to Lahore?", a: "The Green Line Express is the fastest train on the Karachi–Lahore route, completing the journey in approximately 18 hours. It offers AC Business, AC Standard, and Economy class seating with modern amenities. Other popular options include the Tezgam (22 hours), Karakoram Express (22 hours), and Business Express (20 hours). You can compare all Karachi–Lahore trains side by side on our Journey Planner page." },
    { q: "How do I check Pakistan Railways ticket prices online?", a: "Visit our Ticket Pricing page to see fares for all major routes. Prices vary by train type and class — Economy class starts from Rs. 300 for short routes, while AC Business class on premium Express trains can cost Rs. 5,000–9,000 for long-distance journeys like Karachi to Peshawar. Our fare comparison tool shows prices for every class so you can pick what fits your budget." },
    { q: "Can I track the Green Line Express in real-time?", a: "Yes! The Green Line Express (Train 101UP/102DN) between Islamabad and Karachi is fully tracked on our platform. Open the Live Tracker, search 'Green Line', and you'll see its exact GPS position, current speed, delay status, and ETAs for all stations including Lahore, Multan, Sukkur, and Hyderabad. The Green Line page also has dedicated schedule and fare information." },
    { q: "What stations have WiFi and VIP lounges in Pakistan?", a: "Lahore Junction is the most well-equipped station with WiFi, VIP lounge, food court, ATM, parking, and medical aid. Other major stations like Rawalpindi, Karachi Cantt, and Multan Cantt offer food courts, ATMs, and parking. You can explore all station amenities on our Stations Directory — each station page lists every available facility including waiting rooms, ticket counters, restrooms, and accessibility features." },
    { q: "How accurate is the Find My Train GPS feature?", a: "Find My Train uses your phone's built-in GPS to detect your position and cross-references it against all active train routes in our database. Accuracy depends on your phone's GPS chip and signal quality, but in most cases it identifies the correct train within 30 seconds. It works best when the train is moving (not stationary at a platform where multiple trains may be present). For best results, ensure location services are enabled and you have a clear sky view." },
    { q: "Does Track My Train show train delays during fog season?", a: "Yes, and fog season (December–February) is when our platform is most valuable. Pakistan Railways trains frequently experience 2–8 hour delays during heavy fog in Punjab and upper Sindh. Our live GPS tracking shows you the actual position and accumulated delay for every train, so you can avoid arriving at the station hours early only to wait in the cold. We recommend checking delays 1–2 hours before your scheduled departure during winter months." },
    { q: "What is the cheapest train from Karachi to Lahore?", a: "The cheapest options are the Tezgam Express and Karakoram Express, both offering Economy class seats for approximately Rs. 1,500. The journey takes 20–22 hours. For slightly more comfort, AC Standard class on these trains costs Rs. 3,000–3,500. If budget is your primary concern, the Tezgam is the most popular choice among daily commuters and students." },
    { q: "How do I get a student discount on Pakistan Railways?", a: "Students enrolled in recognized Pakistani institutions receive a 25% discount on all ticket classes. To avail this, present your valid student ID card at the booking counter along with your CNIC. The discount applies to all train types including Express and AC services. Some trains also offer special student concessions during summer break (June–August) — ask at the counter for current promotions." },
    { q: "Can I carry luggage on Pakistan Railways trains?", a: "Yes. Each passenger is allowed up to 40 kg of free luggage on Express and Mail trains, and 30 kg on Passenger services. Excess luggage is charged at Rs. 2–5 per kg depending on the route. Luggage should be stored under your berth (Sleeper class) or in the overhead rack. For very large items like furniture or motorcycles, use the separate freight/parcel service available at major stations." },
    { q: "Is there food available on Pakistan Railways trains?", a: "Yes. Premium trains like the Green Line Express and Business Express offer on-board catering with meals included in AC Business class tickets. On other trains, vendors board at major stations selling tea, snacks, biryani, and cold drinks. Lahore Junction, Multan Cantt, and Sukkur stations are known for their platform food stalls. We recommend carrying your own water and snacks for long journeys as vendors may run out during peak hours." },
    { q: "How can I check if my train is running today?", a: "Open Track My Train and search for your train by name or number. If the train shows a 'LIVE' badge with a green dot, it is currently running and you can see its exact GPS position. If it shows 'Active' without a live badge, it is scheduled to run today but hasn't departed yet. If it shows 'Inactive', the service may be suspended or doesn't run on this day of the week. You can also check our Schedule page for running days." },
    { q: "What happens if Pakistan Railways cancels my train?", a: "If Pakistan Railways cancels a scheduled service, passengers are entitled to a full refund or can transfer their ticket to the next available train on the same route. Cancellations are rare and usually occur due to extreme weather (floods, heavy fog) or infrastructure emergencies. Our platform shows cancellation notices when available. For refund processing, visit the booking counter at any major station with your ticket and CNIC within 72 hours of the cancellation." },
  ];

  const topTrains = [
    { name: "Green Line Express", number: "101UP/102DN", route: "Islamabad → Karachi", duration: "18h", type: "Premium AC", gradient: "gradient-card-emerald", icon: Leaf, iconColor: "text-emerald-500", desc: "Pakistan's fastest and most popular premium train service. AC Business, AC Standard & Economy classes with modern amenities, on-board catering, and power outlets. The Green Line covers 1,228 km with stops at Lahore, Multan, Sukkur, and Hyderabad.", link: "/green-line-express", badge: "PREMIUM", image: greenLineTrainImg, imageAlt: "Green Line Express premium AC train at Pakistan Railways station" },
    { name: "Tezgam Express", number: "7UP/8DN", route: "Karachi → Rawalpindi", duration: "22h", type: "Express", gradient: "gradient-card-amber", icon: Zap, iconColor: "text-amber-500", desc: "One of Pakistan's oldest and most iconic express trains, the Tezgam has been running since 1973. Known for its reliability and affordable Economy class, it serves major stations across Punjab and Sindh daily with stops at Hyderabad, Sukkur, Multan, and Lahore.", link: "/train/7", badge: "ICONIC", image: tezgamExpressImg, imageAlt: "Tezgam Express train moving through Punjab countryside with golden wheat fields" },
    { name: "Karakoram Express", number: "11UP/12DN", route: "Karachi → Lahore", duration: "22h", type: "Express", gradient: "gradient-card-blue", icon: Train, iconColor: "text-blue-500", desc: "Named after the Karakoram mountain range, this popular express train connects Pakistan's two largest cities. It offers Sleeper, AC Standard, and Economy classes. The Karakoram is one of the most searched trains on our platform, especially for business travelers.", link: "/train/11", badge: "POPULAR", image: karakoramExpressImg, imageAlt: "Karakoram Express train on the Karachi to Lahore route at sunset" },
    { name: "Khyber Mail", number: "1UP/2DN", route: "Karachi → Peshawar", duration: "30h 30m", type: "Express", gradient: "gradient-card-purple", icon: Route, iconColor: "text-purple-500", desc: "The longest-running daily service in Pakistan, covering the entire Main Line 1 from Karachi Cantt to Peshawar Cantt — a 1,680 km journey through all four provinces. The Khyber Mail is essential for travelers heading to KPK and the northern regions.", link: "/train/1", badge: "LONGEST", image: khyberMailImg, imageAlt: "Khyber Mail train crossing bridge through mountainous landscape in Pakistan" },
    { name: "Business Express", number: "5UP/6DN", route: "Karachi → Lahore", duration: "20h", type: "Express", gradient: "gradient-card-rose", icon: TrendingUp, iconColor: "text-rose-500", desc: "Tailored for business travelers who need speed and comfort, the Business Express is one of the faster Karachi–Lahore options. It offers AC Sleeper, AC Parlour, and AC Business class with comfortable seating and on-board refreshments.", link: "/train/5", badge: "BUSINESS", image: businessExpressImg, imageAlt: "Business Express modern train at platform ready for departure at night" },
    { name: "Jaffar Express", number: "39UP/40DN", route: "Quetta → Peshawar", duration: "24h", type: "Express", gradient: "gradient-card-teal", icon: Map, iconColor: "text-teal-500", desc: "Connecting Balochistan to KPK through Punjab, the Jaffar Express is the primary link for Quetta-bound travelers from northern Pakistan. It passes through the dramatic Bolan Pass landscape and serves as a vital transport artery for western Pakistan.", link: "/train/39", badge: "SCENIC", image: jaffarExpressImg, imageAlt: "Jaffar Express scenic railway route through Bolan Pass canyon in Balochistan" },
  ];

  const majorStations = [
    { name: "Lahore Junction", nameUrdu: "لاہور جنکشن", slug: "lahore-junction", trains: 25, province: "Punjab", gradient: "gradient-card-emerald", desc: "Pakistan's busiest railway station and the crown jewel of the network. A magnificent colonial-era building serving 25+ daily trains. Hub for Green Line Express, Tezgam, and all major north-south services.", facilities: ["VIP Lounge", "WiFi", "Food Court", "ATM", "Medical Aid"], image: lahoreStationImg, imageAlt: "Lahore Junction railway station historic colonial architecture with passengers" },
    { name: "Karachi Cantt", nameUrdu: "کراچی کینٹ", slug: "karachi-cantt", trains: 22, province: "Sindh", gradient: "gradient-card-amber", desc: "The southern terminus of Main Line 1 and departure point for most long-distance trains. Karachi Cantt handles 22+ daily departures connecting Sindh to Punjab, KPK, and Balochistan.", facilities: ["Waiting Room", "Food Court", "ATM", "Parking"], image: karachiStationImg, imageAlt: "Karachi Cantt railway station platform with arriving train" },
    { name: "Rawalpindi", nameUrdu: "راولپنڈی", slug: "rawalpindi", trains: 16, province: "Punjab", gradient: "gradient-card-blue", desc: "Gateway to Islamabad and the federal capital region. Rawalpindi station serves travelers heading to the twin cities and is a key stop for all Peshawar-bound express trains including the Khyber Mail and Awam Express.", facilities: ["Waiting Room", "Food Court", "ATM", "Parking"], image: rawalpindiStationImg, imageAlt: "Rawalpindi railway station platform with train approaching" },
    { name: "Multan Cantt", nameUrdu: "ملتان کینٹ", slug: "multan-cantt", trains: 12, province: "Punjab", gradient: "gradient-card-purple", desc: "A major junction in southern Punjab serving the agricultural heartland. Multan Cantt connects travelers from the cotton belt to both Karachi and Lahore, with services to Quetta via the western rail corridor.", facilities: ["Waiting Room", "Food Court", "ATM", "WiFi"], image: multanStationImg, imageAlt: "Multan Cantt railway station junction in southern Punjab" },
    { name: "Peshawar Cantt", nameUrdu: "پشاور کینٹ", slug: "peshawar-cantt", trains: 8, province: "KPK", gradient: "gradient-card-rose", desc: "The northernmost major terminus of Pakistan Railways, serving KPK and the gateway to the Khyber Pass. Peshawar Cantt is the final stop for iconic services like the Khyber Mail, Awam Express, and Tezgam.", facilities: ["Waiting Room", "Food Stalls", "ATM"], image: peshawarStationImg, imageAlt: "Peshawar Cantt railway station northern terminus with mountains" },
    { name: "Quetta", nameUrdu: "کوئٹہ", slug: "quetta", trains: 4, province: "Balochistan", gradient: "gradient-card-teal", desc: "Capital of Balochistan province and the western anchor of Pakistan's rail network. The Quetta railway station is famous for its location near the scenic Bolan Pass and is served by the Jaffar Express and Bolan Mail.", facilities: ["Waiting Room", "Food Stalls"], image: quettaStationImg, imageAlt: "Quetta railway station with dramatic Balochistan mountain backdrop" },
  ];

  return (
    <main>
      <SEOHead
        title="Track My Train — Train Tracking Live Pakistan | Railway Status 2026"
        description="Track My Train is Pakistan's live railway status platform for 164+ trains. Check current train position, ETA, running status, and GPS-based updates across major routes and stations."
        canonical="/"
        keywords="train tracking live, track my train, pakistan railway live tracking, train tracker pakistan, live train status pakistan, pakistan train running status, real time train tracking pakistan, pakistan railways live status today 2026"
        ogImage="https://trackmytrain.pk/og-image.jpg"
        faqSchema={faqs}
        alternateUrdu="/ur"
        additionalSchemas={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Track My Train — Live Train Tracking Pakistan",
            "alternateName": ["TrackMyTrain.pk", "Train Tracking Live Pakistan", "ٹریک مائی ٹرین"],
            "url": "https://trackmytrain.pk",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "Web",
            "browserRequirements": "Requires JavaScript",
            "inLanguage": ["en", "ur"],
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR", "availability": "https://schema.org/InStock" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2450", "bestRating": "5" },
            "featureList": ["Real-time GPS train tracking with 5-second updates", "Live delay alerts and accurate ETAs", "Journey planner covering 342+ stations", "164+ trains tracked", "Bilingual interface (English & Urdu)", "Find My Train GPS auto-detection", "Ticket pricing comparison"],
            "author": { "@type": "Organization", "name": "Track My Train", "url": "https://trackmytrain.pk", "foundingDate": "2024", "foundingLocation": {"@type": "Place", "name": "Lahore, Pakistan"}, "areaServed": {"@type": "Country", "name": "Pakistan"} },
            "dateModified": "2026-03-28",
            "screenshot": "https://trackmytrain.pk/og-image.jpg"
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Track My Train",
            "alternateName": "TrackMyTrain.pk",
            "url": "https://trackmytrain.pk",
            "inLanguage": ["en", "ur"],
            "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://trackmytrain.pk/train?q={search_term_string}" }, "query-input": "required name=search_term_string" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Track My Train",
            "url": "https://trackmytrain.pk",
            "logo": "https://trackmytrain.pk/logo.png",
            "description": "Pakistan's #1 independent train tracking live platform. Free real-time GPS tracking for 164+ Pakistan Railways trains across 342+ stations.",
            "foundingDate": "2024",
            "foundingLocation": { "@type": "Place", "name": "Lahore, Pakistan" },
            "areaServed": { "@type": "Country", "name": "Pakistan" },
            "knowsAbout": ["Pakistan Railways", "Train Tracking Live", "GPS Navigation", "Railway Schedules", "Live Train Status", "Real-time Tracking"],
            "contactPoint": { "@type": "ContactPoint", "email": "info@trackmytrain.pk", "contactType": "customer service", "availableLanguage": ["English", "Urdu"] }
          }
        ]}
      />
      {/* Hero Section */}
      <section aria-label="Hero — Live train tracking" className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        {/* Multi-layer background */}
        <div className="absolute inset-0">
          <img src={heroTrainBg} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-[0.12]" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--hero-gradient-end)/0.9)]" />
        </div>
        {/* Decorative gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[hsl(152_55%_40%/0.07)] blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-[hsl(43_74%_49%/0.05)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[hsl(152_60%_30%/0.06)] blur-3xl" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative container mx-auto px-4 py-14 sm:py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 bg-[hsl(152_55%_40%/0.15)] backdrop-blur-sm border border-[hsl(152_55%_40%/0.3)] rounded-full px-5 py-2.5 text-sm mb-7 shadow-lg shadow-[hsl(152_55%_40%/0.1)]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(152_55%_45%)] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[hsl(152_55%_45%)]" />
              </span>
              <span className="font-semibold tracking-wider text-[hsl(152_55%_45%)]">LIVE GPS TRACKING • UPDATED EVERY 5 SECONDS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-5 leading-[1.08] drop-shadow-sm">
              Track My Train —{" "}
              <span className="text-gradient-gold">Live Railway GPS Tracker</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl opacity-85 mb-8 sm:mb-10 max-w-2xl leading-relaxed">
              See exactly where your Pakistan Railways train is right now. Live GPS positions, up-to-the-second delay info, and accurate ETAs for {netStats.totalTrains || "164"}+ trains across {netStats.totalStations || "342"}+ stations — completely free, no signup needed.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 sm:mb-10">
              <Link to="/train">
                <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 gap-2 rounded-xl font-bold shadow-lg shadow-accent/25 px-7 text-base">
                  <Train className="w-5 h-5" /> Open Live Tracker <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/find-my-train">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 gap-2 rounded-xl font-semibold px-6">
                  <Navigation className="w-4 h-4" /> Find My Train (GPS)
                </Button>
              </Link>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 gap-2 rounded-xl font-semibold px-6">
                  <Clock className="w-4 h-4" /> View Schedules
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm opacity-75">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[hsl(152_55%_50%)]" /> 100% Free Forever</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[hsl(152_55%_50%)]" /> No Account Required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[hsl(152_55%_50%)]" /> Works on 2G/3G</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[hsl(152_55%_50%)]" /> Bilingual (EN & اردو)</span>
            </div>
          </div>

          {/* Stats - Desktop sidebar */}
          <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
            {[
              { icon: Wifi, value: stats.running || stats.liveCount || stats.moving, label: "Moving Trains", color: "text-emerald-400", bg: "bg-emerald-500/15" },
              { icon: Train, value: stats.atStation, label: "At Stations", color: "text-amber-400", bg: "bg-amber-500/15" },
              { icon: Zap, value: stats.total, label: "Total Trains", color: "text-blue-400", bg: "bg-blue-500/15" },
            ].map((stat, i) => (
              <div key={i} className="bg-card/90 backdrop-blur-md text-card-foreground rounded-xl px-5 py-3.5 flex items-center gap-3.5 shadow-xl border border-border/50 hover-lift cursor-default">
                <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-2xl font-black stat-counter ${stat.color} tracking-tight`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats - Mobile inline */}
          <div className="grid grid-cols-3 gap-3 mt-10 lg:hidden">
            {[
              { value: stats.running || stats.liveCount || stats.moving, label: "Moving", color: "text-emerald-400" },
              { value: stats.atStation, label: "At Station", color: "text-amber-400" },
              { value: stats.total, label: "Total", color: "text-blue-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-primary-foreground/8 backdrop-blur-sm rounded-xl p-3.5 text-center border border-primary-foreground/10 shadow-lg">
                <div className={`text-2xl font-black stat-counter ${stat.color} tracking-tight`}>{stat.value}</div>
                <div className="text-xs opacity-70 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section aria-label="Train search" className="container mx-auto px-4 -mt-6 sm:-mt-8 relative z-10">
        <Card className="shadow-xl border-primary/10">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-1">Search Any Train</h2>
            <p className="text-sm text-muted-foreground mb-4">Enter train number, name, or route to start tracking</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search train by name or number (e.g., Tezgam, 7UP)..."
                className="pl-10 h-12 text-base"
                aria-label="Search trains"
                aria-autocomplete="list"
                aria-controls={showResults && searchResults.length > 0 ? "search-results" : undefined}
                aria-expanded={showResults && searchResults.length > 0}
                role="combobox"
                onFocus={() => searchQuery.length > 1 && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
              {showResults && searchResults.length > 0 && (
                <div id="search-results" role="listbox" aria-label="Search results" className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-xl shadow-lg z-50 max-h-80 overflow-auto">
                  {searchResults.map((train) => (
                    <Link key={train.id} to={`/train/${train.id}`} role="option" className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-b last:border-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">#{train.id}</div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm truncate">{train.name} {train.number}</div>
                        <div className="text-xs text-muted-foreground">{train.from} → {train.to}</div>
                      </div>
                      <div className="shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${liveTrainIds.has(train.id) ? 'bg-primary/10 text-primary' : train.status === 'active' ? 'bg-accent/10 text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {liveTrainIds.has(train.id) ? '🟢 Live' : train.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Gradient Feature Cards - Hero Boxes */}
      <section className="container mx-auto px-4 py-10 sm:py-14">
        <div ref={featureCards.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            { gradient: "gradient-card-emerald", icon: Radio, iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", badge: "LIVE", badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", title: "Live Train Tracker", desc: "View all active trains across Pakistan with real-time GPS positions, speeds, and delay information. See trains moving on the map in real-time with 5-second updates.", link: "/train" },
            { gradient: "gradient-card-amber", icon: Clock, iconBg: "bg-amber-500/15", iconColor: "text-amber-500", badge: "SCHEDULES", badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400", title: "Train Schedules & Timetables", desc: `Browse complete Pakistan Railways timetables with departure and arrival times for all ${netStats.totalStations || 342}+ stations. Updated daily with latest schedule changes.`, link: "/schedule" },
            { gradient: "gradient-card-blue", icon: Navigation, iconBg: "bg-blue-500/15", iconColor: "text-blue-500", badge: "GPS", badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400", title: "Find My Train (GPS)", desc: "Already on a train? Use your phone's GPS to automatically detect which train you're riding. Share your live location with family waiting at the station.", link: "/find-my-train" },
            { gradient: "gradient-card-purple", icon: Route, iconBg: "bg-purple-500/15", iconColor: "text-purple-500", badge: "ROUTES", badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400", title: "Journey Planner", desc: "Compare routes, stops, journey times, and fare classes between any two stations. Find the best train for your schedule and budget across Pakistan.", link: "/planner" },
            { gradient: "gradient-card-rose", icon: Bell, iconBg: "bg-rose-500/15", iconColor: "text-rose-500", badge: "DELAYS", badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400", title: "Check Train Delays", desc: "Real-time delay monitoring for every Pakistan Railways train. See accumulated delay in minutes, understand why trains are late, and get adjusted ETAs before heading to the station.", link: "/check-delays" },
            { gradient: "gradient-card-teal", icon: Map, iconBg: "bg-teal-500/15", iconColor: "text-teal-500", badge: "EXPLORE", badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400", title: "Stations Directory", desc: `Explore ${netStats.totalStations || 342}+ Pakistan Railways stations with Urdu names, GPS coordinates, connecting trains, and platform facilities. Your complete station guide.`, link: "/stations" },
          ].map((card, i) => (
            <Link key={i} to={card.link} {...featureCards.getAnimationProps(i)}>
              <Card className={`${card.gradient} border hover-lift group h-full cursor-pointer`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${card.badgeColor}`}>{card.badge}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Open <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== NEW: Top Express Trains of Pakistan ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TOP EXPRESS TRAINS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Pakistan's Most Popular Express Trains — Track Live</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
              From the iconic Tezgam to the premium Green Line Express, these are the most searched and most-ridden express trains on the Pakistan Railways network. 
              Each card links to live GPS tracking, real-time delay status, complete schedules, and station-by-station ETAs.
            </p>
          </div>
          <div ref={topTrainsAnim.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topTrains.map((train, i) => (
              <Link key={i} to={train.link} {...topTrainsAnim.getAnimationProps(i)}>
                <Card className={`${train.gradient} border hover-lift group h-full cursor-pointer overflow-hidden`}>
                  <img
                    src={train.image}
                    alt={train.imageAlt}
                    width={640}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl ${train.gradient === 'gradient-card-emerald' ? 'bg-emerald-500/15' : train.gradient === 'gradient-card-amber' ? 'bg-amber-500/15' : train.gradient === 'gradient-card-blue' ? 'bg-blue-500/15' : train.gradient === 'gradient-card-purple' ? 'bg-purple-500/15' : train.gradient === 'gradient-card-rose' ? 'bg-rose-500/15' : 'bg-teal-500/15'} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                          <train.icon className={`w-5 h-5 ${train.iconColor}`} />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary`}>{train.badge}</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">{train.number}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{train.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span>{train.route}</span>
                      <span className="text-border">•</span>
                      <span>{train.duration}</span>
                      <span className="text-border">•</span>
                      <span>{train.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{train.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Track Live <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/express-trains"><Button variant="outline" className="rounded-xl gap-2"><Zap className="w-4 h-4" /> View All Express Trains</Button></Link>
          </div>
        </div>
      </section>

      {/* Live Trains Now */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <p className="text-xs font-bold text-primary tracking-wider mb-1">REAL-TIME DATA</p>
              <h2 className="text-xl sm:text-2xl font-bold">Live Trains Now</h2>
              <p className="text-sm text-muted-foreground">Trains currently running across Pakistan — updated every 5 seconds</p>
            </div>
            <Link to="/train" className="text-sm text-primary font-medium hover:underline flex items-center gap-1 shrink-0">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div ref={liveTrainsAnim.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {activeTrains.map((train, i) => (
              <Link key={train.id} to={`/train/${train.id}`} {...liveTrainsAnim.getAnimationProps(i)}>
                <Card className="hover:shadow-lg hover:border-primary/30 transition-all group h-full hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {liveTrainIds.has(train.id) && (
                        <span className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary live-pulse" /> LIVE
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">#{train.id}</span>
                    </div>
                    <h3 className="font-bold group-hover:text-primary transition-colors">{train.name} {train.number}</h3>
                    <p className="text-sm text-muted-foreground">{train.from} → {train.to}</p>
                    <p className="text-xs text-muted-foreground mt-1">{train.nameUrdu}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/train"><Button variant="outline" className="rounded-xl">View All Live Trains</Button></Link>
          </div>
        </div>
      </section>

      {/* ===== NEW: Major Railway Stations Hub ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">MAJOR RAILWAY STATIONS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Pakistan's Busiest Railway Stations — Live Arrivals & Departures</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
              Explore the most important railway stations in Pakistan. Each station page shows live train arrivals, departure schedules, 
              platform facilities, GPS coordinates, connecting trains, and nearby amenities. Perfect for planning your journey or tracking arrivals at your destination.
            </p>
          </div>
          <div ref={stationsAnim.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {majorStations.map((station, i) => (
              <Link key={i} to={`/stations/${station.slug}`} {...stationsAnim.getAnimationProps(i)}>
                <Card className={`${station.gradient} border hover-lift group h-full cursor-pointer overflow-hidden`}>
                  <img
                    src={station.image}
                    alt={station.imageAlt}
                    width={640}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-36 object-cover"
                  />
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <Landmark className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{station.trains}+ Trains</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{station.province}</span>
                    </div>
                    <h3 className="font-bold text-base mb-0.5 group-hover:text-primary transition-colors">{station.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{station.nameUrdu}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{station.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {station.facilities.slice(0, 4).map((f) => (
                        <span key={f} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{f}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Station <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/stations"><Button variant="outline" className="rounded-xl gap-2"><Landmark className="w-4 h-4" /> Explore All {netStats.totalStations || 342}+ Stations</Button></Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Gradient Cards */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-bold text-primary tracking-wider mb-2">WHY CHOOSE US</p>
          <h2 className="text-2xl sm:text-3xl font-bold">What Makes Track My Train Different</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">We built Track My Train from scratch for Pakistani travelers — every feature is designed to answer the one question you always have: "Where is my train right now?"</p>
        </div>
        <div ref={whyChooseAnim.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: Wifi, iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", gradient: "gradient-card-emerald", title: "GPS-Verified Positions", desc: "Every dot on our map comes from a verified GPS coordinate — not an estimate or a guess. We cross-check positions against the known route geometry and discard outliers, so you see only clean, reliable location data for each train." },
            { icon: Gauge, iconBg: "bg-amber-500/15", iconColor: "text-amber-500", gradient: "gradient-card-amber", title: "Smart Delay Engine", desc: "Our delay engine doesn't just subtract two timestamps. It factors in the train's current speed, upcoming scheduled stops, and historical slow zones to produce ETAs that are typically accurate within ±3–5 minutes — more reliable than station announcement boards." },
            { icon: Globe, iconBg: "bg-blue-500/15", iconColor: "text-blue-500", gradient: "gradient-card-blue", title: "Complete Network Coverage", desc: "From Main Line 1 (Karachi–Peshawar) to the Bolan Mail corridor and branch lines in Punjab and Sindh — if Pakistan Railways runs it, we track it. Express, Mail, Passenger, and premium AC services are all included." },
            { icon: Shield, iconBg: "bg-purple-500/15", iconColor: "text-purple-500", gradient: "gradient-card-purple", title: "Zero Data Collection", desc: "We don't ask for your email, phone number, or location history. There are no premium tiers or paywalled features. Open the site, track your train, close the tab — that's it. Public transport info should be public, period." },
            { icon: Navigation, iconBg: "bg-rose-500/15", iconColor: "text-rose-500", gradient: "gradient-card-rose", title: "Auto-Detect My Train", desc: "Already onboard but not sure of the train number? Grant location access and our 'Find My Train' feature matches your GPS to the nearest active route. Perfect for sharing your live position with family waiting at the destination station." },
            { icon: Globe, iconBg: "bg-teal-500/15", iconColor: "text-teal-500", gradient: "gradient-card-teal", title: "English & Urdu Interface", desc: "Station names, train names, and search all work in both English and Urdu script. Whether you type 'Lahore' or 'لاہور', you'll find what you're looking for. Accessibility for every Pakistani traveler is a core design principle." },
          ].map((feature, i) => (
            <Card key={i} className={`${feature.gradient} border hover-lift group`} {...whyChooseAnim.getAnimationProps(i)}>
              <CardContent className="p-5 sm:p-6">
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== NEW: Pakistan Railways Complete Guide (Long-form editorial) ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-xs font-bold text-primary tracking-wider mb-2">COMPREHENSIVE GUIDE</p>
              <h2 className="text-2xl sm:text-3xl font-bold">The Complete Pakistan Railways Travel Guide 2026</h2>
              <p className="text-sm text-muted-foreground mt-2">Everything you need to know about train travel in Pakistan — from booking tickets to understanding classes, delays, and the best routes for your journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Understanding Train Classes */}
              <Card className="gradient-card-emerald border">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                      <Package className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="font-bold">Train Classes & Seating Types</h3>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>Pakistan Railways offers multiple seating classes to suit every budget and comfort preference. Understanding these classes is essential for choosing the right ticket:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">AC Business Class</strong> — The most premium option with reclining seats, air conditioning, complimentary meals, power outlets, and extra legroom. Available on Green Line Express and Business Express.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">AC Standard Class</strong> — Air-conditioned coaches with comfortable cushioned seats. A great balance between comfort and affordability for long-distance travel.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">AC Sleeper</strong> — Berths with air conditioning for overnight journeys. Top choice for Karachi–Lahore and Karachi–Peshawar routes where overnight travel is common.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Economy Class</strong> — The most affordable option with basic seating. Available on all train types. Perfect for short to medium-distance trips under 6 hours.</span></li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Booking Guide */}
              <Card className="gradient-card-amber border">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-amber-500" />
                    </div>
                    <h3 className="font-bold">How to Book Pakistan Railways Tickets</h3>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>Booking train tickets in Pakistan is straightforward once you know the available channels. Here's your step-by-step guide for 2026:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Station Ticket Counter</strong> — Visit any major station's booking window. Bring your CNIC/ID. Counters open 24 hours at larger stations like Lahore Junction and Karachi Cantt.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Pakistan Railways E-Ticketing</strong> — Book online through the official PR website. Pay via bank transfer, JazzCash, or Easypaisa. E-tickets are sent to your phone.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Advance Booking</strong> — Tickets can be booked up to 30 days in advance for Express trains. AC Business and Sleeper fill up fast during Eid — book at least 2 weeks early.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Cancellation & Refunds</strong> — Cancellations made 24+ hours before departure receive 75% refund. Same-day cancellations receive 50%. Visit our <Link to="/blog/pakistan-railways-ticket-refund-process-2026" className="text-primary font-medium underline">refund guide</Link> for details.</span></li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Peak Season Travel Tips */}
              <Card className="gradient-card-blue border">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold">Peak Season & Fog Delay Tips</h3>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>Pakistan Railways experiences massive demand spikes during festivals and harsh delays during winter fog. Here's how to navigate both like a pro:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Eid Rush (2x per year)</strong> — Trains sell out 3–4 weeks before Eid-ul-Fitr and Eid-ul-Adha. Book the moment dates are announced. Special Eid trains are added on major routes — check our <Link to="/schedule" className="text-primary font-medium underline">schedule page</Link> for updates.</span></li>
                      <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Fog Season (Dec–Feb)</strong> — Dense fog in Punjab causes average delays of 3–8 hours. Always check live delay status on our tracker before leaving home. Consider afternoon departures which face less fog.</span></li>
                      <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Summer (May–Jul)</strong> — AC classes sell out fast. Book Economy if AC is unavailable. Carry water and snacks as vendors may run out on fully-packed trains during peak summer travel.</span></li>
                      <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Pro Tip</strong> — Use our <Link to="/check-delays" className="text-primary font-medium underline">delay checker</Link> 1–2 hours before your scheduled departure to see if your train is running late. This simple habit can save you hours of waiting at the platform.</span></li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Safety & Travel Essentials */}
              <Card className="gradient-card-purple border">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-500" />
                    </div>
                    <h3 className="font-bold">Safety & Essential Packing List</h3>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>Whether you're a first-time railway traveler or a seasoned commuter, these tips will make your Pakistan Railways journey safer and more comfortable:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Keep Tickets & CNIC Ready</strong> — Ticket inspectors (TTE) check tickets at random. Always keep your printed or e-ticket and original CNIC accessible throughout the journey.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Luggage Security</strong> — Use chain locks for large bags in Economy class. Keep valuables in a cross-body bag. Overhead racks are suitable for small bags only.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Essentials to Carry</strong> — Phone charger (power outlets available in AC classes), water bottles, snacks, a light blanket for overnight journeys, and any medication you may need.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /><span><strong className="text-foreground">Emergency Contacts</strong> — Pakistan Railways helpline: <strong className="text-foreground">117</strong>. Railway Police: <strong className="text-foreground">1166</strong>. Save these numbers before your journey. Report any issues to the station master immediately.</span></li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">HOW IT WORKS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Three Steps to Track Any Train</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Our system ingests live GPS telemetry from across the Pakistan Railways network and turns it into clear, actionable information you can use at the station or on the go.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: "1", gradient: "gradient-card-emerald", title: "Search or Browse", desc: "Type a train name, number, or route into the search bar — or browse the full live-trains list. Results appear instantly with live/offline badges so you can spot active services at a glance. You can also filter by Express, AC, or Passenger type." },
              { step: "2", gradient: "gradient-card-amber", title: "View Live Position & Delays", desc: "Tap any train to open its dedicated tracking page. You'll see the GPS marker on an interactive map, current speed, delay in minutes, and a progress bar along the route. The page auto-refreshes every 5 seconds — no need to hit reload." },
              { step: "3", gradient: "gradient-card-blue", title: "Check ETAs & Share", desc: "Scroll down to the station schedule to see updated ETAs for every upcoming stop. Share the page link with family so they can watch the same live feed. On mobile, you can also use 'Find My Train' to auto-detect the train you're riding." },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group text-center`}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground mx-auto mb-4 flex items-center justify-center text-2xl font-bold transition-transform duration-300 group-hover:scale-110">{item.step}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pakistan Railway Network at a Glance ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">NETWORK OVERVIEW</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Pakistan Railway Network at a Glance — Key Facts & Figures 2026</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
              Pakistan Railways operates one of South Asia's largest rail networks, connecting major cities from Karachi to Peshawar and Quetta to Sialkot.
              Here's a data-driven snapshot of the network that millions depend on every day.
            </p>
          </div>

          {/* Network Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { value: "7,791 km", label: "Total Track Length", desc: "Spanning all 4 provinces and AJK, making it the 42nd largest rail network globally", icon: Route, gradient: "gradient-card-emerald" },
              { value: "1,228 km", label: "Longest Corridor", desc: "Main Line 1: Karachi Cantt to Peshawar Cantt — the backbone of the network", icon: Train, gradient: "gradient-card-amber" },
              { value: "70M+", label: "Annual Passengers", desc: "Over 70 million passenger journeys recorded each year across all services", icon: Users, gradient: "gradient-card-blue" },
              { value: "1855", label: "Year Established", desc: "The Scinde Railway opened Pakistan's first line — Karachi to Kotri — in 1855", icon: Landmark, gradient: "gradient-card-purple" },
            ].map((stat, i) => (
              <Card key={i} className={`${stat.gradient} border hover-lift`}>
                <CardContent className="p-4 sm:p-5">
                  <stat.icon className="w-7 h-7 text-primary mb-2" />
                  <div className="text-xl sm:text-2xl font-black">{stat.value}</div>
                  <div className="text-sm font-semibold mt-1">{stat.label}</div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{stat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Railway Divisions */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-4 text-center">Pakistan Railways Operational Divisions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: "Lahore Division", hq: "Lahore", stations: "150+", coverage: "Central & Northern Punjab", gradient: "gradient-card-emerald" },
                { name: "Karachi Division", hq: "Karachi", stations: "120+", coverage: "Sindh Coastal & Southern", gradient: "gradient-card-amber" },
                { name: "Rawalpindi Division", hq: "Rawalpindi", stations: "80+", coverage: "Islamabad Capital & Northern", gradient: "gradient-card-blue" },
                { name: "Multan Division", hq: "Multan", stations: "95+", coverage: "Southern Punjab & DG Khan", gradient: "gradient-card-purple" },
                { name: "Sukkur Division", hq: "Sukkur", stations: "85+", coverage: "Upper Sindh & Jacobabad", gradient: "gradient-card-rose" },
                { name: "Quetta Division", hq: "Quetta", stations: "55+", coverage: "Balochistan & Bolan Corridor", gradient: "gradient-card-teal" },
              ].map((div, i) => (
                <Card key={i} className={`${div.gradient} border`}>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-sm">{div.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">HQ: {div.hq} • {div.stations} Stations</p>
                    <p className="text-xs text-muted-foreground">{div.coverage}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Network Description — Visual Editorial */}
          <div className="max-w-5xl mx-auto mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { icon: Landmark, gradient: "gradient-card-emerald", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", title: "National Rail Operator", desc: "Pakistan Railways is the state-owned railway, headquartered in Lahore. The network traces its origins to 1855, when the Scinde Railway opened the first line in South Asia between Karachi and Kotri." },
                { icon: Route, gradient: "gradient-card-amber", iconBg: "bg-amber-500/15", iconColor: "text-amber-500", title: "ML-1 Backbone", desc: "Main Line 1 (ML-1), the 1,228-km trunk route from Karachi to Peshawar, handles 60% of all traffic. The CPEC-backed ML-1 Upgrade aims to boost speeds from 100 to 160 km/h by 2028." },
                { icon: Train, gradient: "gradient-card-blue", iconBg: "bg-blue-500/15", iconColor: "text-blue-500", title: "Diverse Train Fleet", desc: "The network operates Express services (Green Line, Tezgam), Mail trains (Khyber Mail, Bolan Mail), regional Passenger services, and premium AC-only trains plus a growing freight division." },
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
          </div>
        </div>
      </section>
      {/* Popular Routes */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">POPULAR CORRIDORS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Most Searched Train Routes in Pakistan</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">These are the routes travelers search for most. Each corridor is served by multiple daily trains offering Economy, AC Standard, AC Business, and Sleeper classes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {popularRoutes.map((route, i) => (
              <Card key={i} className="hover-lift group border overflow-hidden">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-primary">{route.from}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="font-bold text-primary">{route.to}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Duration: {route.duration}</p>
                  <p className="text-sm text-muted-foreground mb-3">Fare: {route.fare}</p>
                  <div className="flex flex-wrap gap-1">
                    {route.trains.map((t) => (
                      <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/routes"><Button variant="outline" className="rounded-xl">Explore All Routes</Button></Link>
          </div>
        </div>
      </section>

      {/* Key Stats Banner */}
      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { value: `${netStats.totalTrains || 164}+`, label: "Trains Tracked Daily", desc: "Express, Mail, Passenger & AC" },
              { value: "100K+", label: "Monthly Active Users", desc: "Trusted by thousands daily" },
              { value: `${netStats.totalStations || 342}+`, label: "Stations Covered", desc: "Nationwide complete coverage" },
              { value: "24/7", label: "Live GPS Updates", desc: "Real-time every 5 seconds" },
            ].map((s, i) => (
              <div key={i} className="hover-lift cursor-default">
                <div className="text-3xl sm:text-4xl font-black text-gradient-gold">{s.value}</div>
                <div className="text-sm font-semibold mt-1">{s.label}</div>
                <div className="text-xs opacity-70 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEW: Karachi–Lahore Deep Dive (Content Hub) ===== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs font-bold text-primary tracking-wider mb-2">ROUTE SPOTLIGHT</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Karachi to Lahore Train — Complete Route Guide 2026</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
                The Karachi–Lahore corridor is Pakistan's busiest railway route, carrying millions of passengers annually across 1,228 km of track through Sindh and Punjab.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Distance", value: "1,228 km", icon: Route, gradient: "gradient-card-emerald" },
                { label: "Fastest Train", value: "Green Line (18h)", icon: Timer, gradient: "gradient-card-amber" },
                { label: "Daily Trains", value: "12+ Services", icon: Train, gradient: "gradient-card-blue" },
                { label: "Fare From", value: "Rs. 1,500", icon: CreditCard, gradient: "gradient-card-purple" },
              ].map((stat, i) => (
                <Card key={i} className={`${stat.gradient} border`}>
                  <CardContent className="p-4 text-center">
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Editorial Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="gradient-card-emerald border hover-lift group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h4 className="font-bold text-sm">Route Overview</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The <strong className="text-foreground">Karachi–Lahore corridor</strong> runs 1,228 km along Main Line 1, connecting Pakistan's largest city (16M population) with its cultural capital (13M). 12+ daily services range from Economy on Tezgam (Rs. 1,500) to AC Business on Green Line (Rs. 8,000).
                  </p>
                </CardContent>
              </Card>
              <Card className="gradient-card-amber border hover-lift group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Navigation className="w-5 h-5 text-amber-500" />
                    </div>
                    <h4 className="font-bold text-sm">Key Stops & Duration</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Major stations: <strong className="text-foreground">Hyderabad</strong> (2.5h), <strong className="text-foreground">Sukkur</strong> (8h), <strong className="text-foreground">Multan</strong> (14h), <strong className="text-foreground">Sahiwal</strong> (16h), then Lahore Junction. Green Line is fastest at 18h; Tezgam & Karakoram take 20–22h.
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-hero-gradient text-primary-foreground border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
              <CardContent className="p-5 sm:p-6 relative">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-5 h-5 text-accent" />
                  <h4 className="font-bold text-sm">💡 Travel Pro Tip — Fog Season</h4>
                </div>
                <p className="text-xs opacity-90 leading-relaxed mb-4">
                  During fog season (December–February), Karachi–Lahore trains routinely experience 3–6 hour delays as they approach Punjab. Check our live delay checker before heading to the station. Night departures from Karachi Cantt (15:00–18:00) arrive in Lahore the next morning — ideal for sleeping through the journey.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/train"><Button size="sm" className="rounded-xl gap-1.5 bg-primary-foreground text-primary hover:bg-primary-foreground/90"><Radio className="w-3.5 h-3.5" /> Track Live</Button></Link>
                  <Link to="/planner"><Button size="sm" variant="outline" className="rounded-xl gap-1.5 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><Route className="w-3.5 h-3.5" /> Plan Journey</Button></Link>
                  <Link to="/ticket-pricing"><Button size="sm" variant="outline" className="rounded-xl gap-1.5 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><CreditCard className="w-3.5 h-3.5" /> Compare Fares</Button></Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== Lahore to Islamabad Route Spotlight ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs font-bold text-primary tracking-wider mb-2">ROUTE SPOTLIGHT</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Lahore to Islamabad/Rawalpindi Train — Route Guide 2026</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
                The Lahore–Rawalpindi corridor is Pakistan's second busiest rail route, connecting Punjab's capital with the federal capital twin cities.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Distance", value: "288 km", icon: Route, gradient: "gradient-card-emerald" },
                { label: "Fastest Train", value: "Business Exp (4h)", icon: Timer, gradient: "gradient-card-amber" },
                { label: "Daily Trains", value: "8+ Services", icon: Train, gradient: "gradient-card-blue" },
                { label: "Fare From", value: "Rs. 500", icon: CreditCard, gradient: "gradient-card-rose" },
              ].map((stat, i) => (
                <Card key={i} className={`${stat.gradient} border`}>
                  <CardContent className="p-4 text-center">
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Editorial Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="gradient-card-blue border hover-lift group">
                <CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    <Zap className="w-5 h-5 text-blue-500" />
                  </div>
                  <h4 className="font-bold text-xs mb-1.5">Fastest Service</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Business Express completes the 288 km in ~4 hours with stops at Gujranwala, Wazirabad, and Jhelum. Green Line & Tezgam also cover this corridor.</p>
                </CardContent>
              </Card>
              <Card className="gradient-card-rose border hover-lift group">
                <CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    <MapPin className="w-5 h-5 text-rose-500" />
                  </div>
                  <h4 className="font-bold text-xs mb-1.5">Key Stops</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Gujranwala (1h, Punjab's 3rd largest city), Wazirabad Junction, Lala Musa Junction, Jhelum, and Gujar Khan — all through fertile central Punjab.</p>
                </CardContent>
              </Card>
              <Card className="gradient-card-teal border hover-lift group">
                <CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    <Timer className="w-5 h-5 text-teal-500" />
                  </div>
                  <h4 className="font-bold text-xs mb-1.5">Commuter Tip</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Same-day return? Take 07:00 Business Express, return on 17:00 service. Economy from Rs. 500 — cheaper and more comfortable than buses.</p>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-hero-gradient text-primary-foreground border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
              <CardContent className="p-5 sm:p-6 relative">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <h4 className="font-bold text-sm">⚠️ Fog Season Warning — Punjab Corridor</h4>
                </div>
                <p className="text-xs opacity-90 leading-relaxed mb-4">
                  This route is heavily impacted by dense fog during December–February. Delays of 2–5 hours are common. Always check our live delay tracker before departing. Afternoon services face less fog than morning trains.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/train"><Button size="sm" className="rounded-xl gap-1.5 bg-primary-foreground text-primary hover:bg-primary-foreground/90"><Radio className="w-3.5 h-3.5" /> Track Live</Button></Link>
                  <Link to="/planner"><Button size="sm" variant="outline" className="rounded-xl gap-1.5 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><Route className="w-3.5 h-3.5" /> Plan Journey</Button></Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== Train Travel Essentials Checklist ===== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TRAVELER ESSENTIALS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">What to Know Before Traveling by Train in Pakistan</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
              Whether you're a first-time train traveler or a seasoned commuter, these essential tips and facts will help you navigate the Pakistan Railways experience smoothly in 2026.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: FileText, gradient: "gradient-card-emerald", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500",
                title: "Documents You Need",
                items: [
                  "CNIC (Computerized National Identity Card) for all adults",
                  "B-Form or parent's CNIC for children under 18",
                  "Passport for foreign nationals",
                  "Printed or digital e-ticket/booking confirmation",
                  "Student ID for 25% student discount",
                  "Disability certificate for 50% concession"
                ]
              },
              {
                icon: Clock, gradient: "gradient-card-amber", iconBg: "bg-amber-500/15", iconColor: "text-amber-500",
                title: "Arrival & Timing Guide",
                items: [
                  "Arrive 30-45 min early for Express trains",
                  "1 hour early during Eid & holiday rush",
                  "15-20 min for local Passenger services",
                  "Check live delays before leaving home",
                  "Platform assignments shown on station boards",
                  "Night trains: arrive with extra buffer for safety"
                ]
              },
              {
                icon: Shield, gradient: "gradient-card-blue", iconBg: "bg-blue-500/15", iconColor: "text-blue-500",
                title: "Safety & Comfort Tips",
                items: [
                  "Keep valuables secure, use locks on luggage",
                  "Carry water and snacks for long journeys",
                  "AC coaches can get cold — bring a light shawl",
                  "Charge devices before boarding (outlets limited)",
                  "Use TrackMyTrain to share location with family",
                  "Emergency helpline: 117 (available 24/7)"
                ]
              },
              {
                icon: CreditCard, gradient: "gradient-card-purple", iconBg: "bg-purple-500/15", iconColor: "text-purple-500",
                title: "Fare & Discount Guide",
                items: [
                  "Economy: Rs. 300–1,500 (short to long distance)",
                  "AC Standard: Rs. 1,000–5,000",
                  "AC Business: Rs. 3,000–9,000 (premium trains)",
                  "Students: 25% off with valid college ID",
                  "Senior citizens (60+): 25% discount with CNIC",
                  "Children under 3: travel free (without seat)"
                ]
              },
              {
                icon: MapPin, gradient: "gradient-card-rose", iconBg: "bg-rose-500/15", iconColor: "text-rose-500",
                title: "Station Facilities to Expect",
                items: [
                  "Major stations: AC waiting rooms, food courts, ATMs",
                  "Mid-size stations: basic waiting area, ticket counter",
                  "Small stops: platform shelter and water tap",
                  "Lahore Jn: VIP lounge, WiFi, medical aid",
                  "Most stations have separate waiting for women",
                  "Parking available at all major stations"
                ]
              },
              {
                icon: Gauge, gradient: "gradient-card-teal", iconBg: "bg-teal-500/15", iconColor: "text-teal-500",
                title: "Understanding Train Types",
                items: [
                  "Express: fastest, fewer stops, AC + Economy",
                  "Mail: similar to Express, traditional naming",
                  "Passenger: all-stop local service, cheapest fares",
                  "AC Only: premium Green Line, Business Express",
                  "Freight: cargo only, not tracked on our platform",
                  "Special: Eid/holiday extra trains (seasonal)"
                ]
              },
            ].map((card, i) => (
              <Card key={i} className={`${card.gradient} border hover-lift group`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <h3 className="font-bold text-sm">{card.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* ===== Train Comparison: Karachi to Lahore ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs font-bold text-primary tracking-wider mb-2">HEAD-TO-HEAD COMPARISON</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Best Karachi to Lahore Trains Compared — 2026 Guide</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
                Not sure which train to take from Karachi to Lahore? We've compared every major service on this route side-by-side — duration, fare, classes, comfort, and punctuality — so you can pick the perfect option for your budget and schedule.
              </p>
            </div>
            <Card className="gradient-card-emerald border overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary/10 border-b border-primary/20">
                        <th className="text-left p-3 sm:p-4 font-bold text-foreground whitespace-nowrap"><Train className="w-3.5 h-3.5 inline mr-1.5 text-primary" />Train Name</th>
                        <th className="text-left p-3 sm:p-4 font-bold text-foreground whitespace-nowrap"><Clock className="w-3.5 h-3.5 inline mr-1.5 text-primary" />Duration</th>
                        <th className="text-left p-3 sm:p-4 font-bold text-foreground whitespace-nowrap">Economy</th>
                        <th className="text-left p-3 sm:p-4 font-bold text-foreground whitespace-nowrap">AC Fare</th>
                        <th className="text-left p-3 sm:p-4 font-bold text-foreground whitespace-nowrap">Classes</th>
                        <th className="text-left p-3 sm:p-4 font-bold text-foreground whitespace-nowrap"><Star className="w-3.5 h-3.5 inline mr-1.5 text-accent" />Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Green Line Express", duration: "18h", economy: "Rs. 2,200", ac: "Rs. 5,500–8,000", classes: "AC Business, AC Standard, Economy", best: "Speed & comfort", highlight: true },
                        { name: "Business Express", duration: "20h", economy: "Rs. 1,800", ac: "Rs. 4,500–7,000", classes: "AC Parlour, AC Sleeper, Economy", best: "Business travelers", highlight: false },
                        { name: "Karakoram Express", duration: "22h", economy: "Rs. 1,500", ac: "Rs. 3,500–5,500", classes: "AC Sleeper, AC Standard, Economy", best: "Budget AC travel", highlight: false },
                        { name: "Tezgam Express", duration: "22h", economy: "Rs. 1,500", ac: "Rs. 3,000–5,000", classes: "AC Standard, Economy", best: "Affordable reliability", highlight: false },
                        { name: "Shalimar Express", duration: "21h", economy: "Rs. 1,500", ac: "Rs. 3,500–5,000", classes: "AC Sleeper, Economy", best: "Night travel", highlight: false },
                        { name: "Allama Iqbal Express", duration: "24h", economy: "Rs. 1,400", ac: "Rs. 3,200–4,800", classes: "AC Standard, Economy", best: "Budget travelers", highlight: false },
                      ].map((train, i) => (
                        <tr key={i} className={`border-b border-primary/10 last:border-0 ${train.highlight ? 'bg-primary/5' : 'hover:bg-primary/5'} transition-colors`}>
                          <td className="p-3 sm:p-4 font-semibold text-foreground whitespace-nowrap">
                            {train.highlight && <span className="text-[10px] bg-accent/15 text-accent px-1.5 py-0.5 rounded mr-2 font-bold">⚡ FASTEST</span>}
                            {train.name}
                          </td>
                          <td className="p-3 sm:p-4 text-muted-foreground whitespace-nowrap font-medium">{train.duration}</td>
                          <td className="p-3 sm:p-4 text-muted-foreground whitespace-nowrap">{train.economy}</td>
                          <td className="p-3 sm:p-4 text-primary font-medium whitespace-nowrap">{train.ac}</td>
                          <td className="p-3 sm:p-4 text-muted-foreground">{train.classes}</td>
                          <td className="p-3 sm:p-4 text-muted-foreground whitespace-nowrap">{train.best}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card className="gradient-card-amber border hover-lift group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Star className="w-5 h-5 text-amber-500" />
                    </div>
                    <h4 className="font-bold text-sm">Our Recommendation</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Green Line Express</strong> is the clear winner for speed & comfort — 2–4 hours faster with the best AC Business experience. For budget travelers, <strong className="text-foreground">Tezgam Express</strong> at Rs. 1,500 Economy is the most popular choice.
                  </p>
                </CardContent>
              </Card>
              <Card className="gradient-card-purple border hover-lift group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Clock className="w-5 h-5 text-purple-500" />
                    </div>
                    <h4 className="font-bold text-sm">Night Travel Tip</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Most trains depart 15:00–19:00, arriving next morning 09:00–14:00. Book AC Sleeper to sleep through the 22h journey. <strong className="text-foreground">Shalimar Express</strong> (16:00 departure) is ideal for overnight sleeper travel.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Pakistan Railways History & Heritage ===== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs font-bold text-primary tracking-wider mb-2">HERITAGE & HISTORY</p>
              <h2 className="text-2xl sm:text-3xl font-bold">The History of Pakistan Railways — From 1855 to 2026</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
                Pakistan's railway network has a rich 170-year history. Understanding its evolution helps explain the network's current layout, strengths, and ongoing modernization under CPEC.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {[
                {
                  gradient: "gradient-card-emerald", icon: Landmark, iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500",
                  title: "The Colonial Era (1855–1947)",
                  desc: "The Scinde Railway opened the Karachi–Kotri line on 13 May 1855 — the first railway in South Asia. By 1947, the network under British India had expanded to over 13,000 km of track across the subcontinent. After partition, Pakistan inherited approximately 8,122 km of track, 801 locomotives, and over 30,000 freight and passenger wagons."
                },
                {
                  gradient: "gradient-card-amber", icon: TrendingUp, iconBg: "bg-amber-500/15", iconColor: "text-amber-500",
                  title: "Expansion & Golden Age (1947–1990)",
                  desc: "Post-independence, Pakistan Railways became the country's primary transport artery. The 1960s–70s saw peak ridership with over 100 million annual passengers. Iconic trains like Tezgam (1973), Khyber Mail, and Bolan Mail became household names. The railway employed over 150,000 people and was Pakistan's single largest employer."
                },
                {
                  gradient: "gradient-card-blue", icon: AlertTriangle, iconBg: "bg-blue-500/15", iconColor: "text-blue-500",
                  title: "Decline & Challenges (1990–2015)",
                  desc: "Road transport investment, aging infrastructure, and institutional neglect led to a steep decline. By 2014, only 28 out of 190 scheduled trains were operational. Track speed dropped to 60 km/h on most sections. Passenger numbers fell from 100M to under 50M annually. Many branch lines were abandoned or became freight-only corridors."
                },
                {
                  gradient: "gradient-card-purple", icon: Zap, iconBg: "bg-purple-500/15", iconColor: "text-purple-500",
                  title: "Revival & CPEC Modernization (2015–2026)",
                  desc: "The ML-1 Upgrade Project under CPEC ($6.8 billion) aims to transform the Karachi–Peshawar corridor with 160 km/h speeds, dual track, modern signaling, and new rolling stock. The Green Line Express launched in 2019 as a premium AC service. By 2026, Pakistan Railways operates 164+ daily services across 7,791 km of active track."
                },
              ].map((era, i) => (
                <Card key={i} className={`${era.gradient} border hover-lift group`}>
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 rounded-xl ${era.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                        <era.icon className={`w-5 h-5 ${era.iconColor}`} />
                      </div>
                      <h3 className="font-bold text-sm">{era.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{era.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-hero-gradient text-primary-foreground border-0 overflow-hidden relative hover-lift">
                <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
                <CardContent className="p-5 sm:p-6 relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Landmark className="w-5 h-5 text-accent" />
                    <h4 className="font-bold text-sm">🏛️ Key Milestones</h4>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "1855 — Karachi–Kotri line opens (first in South Asia)",
                      "1886 — Bolan Pass railway through Balochistan completed",
                      "1973 — Iconic Tezgam Express inaugurated",
                      "2019 — Green Line Express launches as first modern premium train",
                      "2022 — ML-1 Upgrade groundbreaking under CPEC ($6.8B)",
                      "2030 — High-speed rail planned for Karachi–Lahore",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs opacity-90 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="gradient-card-rose border hover-lift group">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Eye className="w-5 h-5 text-rose-500" />
                    </div>
                    <h4 className="font-bold text-sm">Did You Know?</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    <strong className="text-foreground">Lahore Junction's</strong> building was designed by British architect William Brunton and completed in 1860. It's one of the finest examples of Victorian Gothic railway architecture in South Asia and is a protected heritage building.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The station's <strong className="text-foreground">original clock tower</strong> still functions after 165 years of continuous operation — making it one of the oldest working railway clocks in the world.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Seasonal Travel Calendar ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">SEASONAL GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Best Time to Travel by Train in Pakistan — Month-by-Month Guide 2026</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
              Train travel conditions in Pakistan vary dramatically by season. This month-by-month guide helps you plan the perfect trip — avoiding fog delays, Eid rush, and extreme heat while catching the best weather windows.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                season: "🌸 Spring", months: "March – May", gradient: "gradient-card-emerald",
                rating: "★★★★★ Best Season",
                tips: [
                  "Perfect weather across all routes (15–30°C)",
                  "No fog delays — trains run on schedule",
                  "Ideal for scenic Bolan Pass & northern routes",
                  "Book 1 week ahead for Express trains",
                  "AC Standard is comfortable, save on AC Business",
                ]
              },
              {
                season: "☀️ Summer", months: "June – August", gradient: "gradient-card-amber",
                rating: "★★★☆☆ Hot but Functional",
                tips: [
                  "Extreme heat in Sindh & Punjab (40–50°C)",
                  "AC classes sell out fast — book 2 weeks early",
                  "Economy class very uncomfortable without AC",
                  "Carry extra water (3L+ for long journeys)",
                  "Night departures preferred to avoid peak heat",
                ]
              },
              {
                season: "🍂 Autumn", months: "September – November", gradient: "gradient-card-blue",
                rating: "★★★★☆ Great Value Season",
                tips: [
                  "Monsoon rains may cause delays (Aug–Sep)",
                  "October–November: excellent weather returns",
                  "Lower demand = easier to get last-minute tickets",
                  "Eid-ul-Adha may fall in this period — check dates",
                  "Best time for budget travel on all routes",
                ]
              },
              {
                season: "❄️ Winter", months: "December – February", gradient: "gradient-card-purple",
                rating: "★★☆☆☆ Fog Season — Delays Expected",
                tips: [
                  "Dense fog causes 3–8 hour delays in Punjab",
                  "ALWAYS check live delays before going to station",
                  "Carry warm clothes — Economy coaches are cold",
                  "Afternoon departures face less fog than morning",
                  "Sindh & Balochistan routes less affected by fog",
                ]
              },
            ].map((s, i) => (
              <Card key={i} className={`${s.gradient} border hover-lift group`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="text-2xl mb-2">{s.season}</div>
                  <div className="text-xs text-muted-foreground mb-1">{s.months}</div>
                  <div className="text-xs font-bold text-primary mb-4">{s.rating}</div>
                  <ul className="space-y-2">
                    {s.tips.map((tip, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== More Route Spotlights: Karachi–Peshawar & Lahore–Multan ===== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">MORE ROUTES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Other Popular Pakistan Railways Routes — 2026 Guide</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
              Beyond Karachi–Lahore and Lahore–Islamabad, these heavily searched routes connect Pakistan's major economic and cultural centers.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Karachi to Peshawar */}
            <Card className="gradient-card-emerald border hover-lift">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <Route className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Karachi to Peshawar Train</h3>
                    <p className="text-xs text-muted-foreground">1,680 km • 30h 30m • 4+ daily trains</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  The <strong className="text-foreground">longest daily rail journey</strong> in Pakistan, stretching the entire length of Main Line 1. The
                  <strong className="text-foreground"> Khyber Mail</strong> (Train 1UP/2DN) is the flagship service, departing Karachi Cantt every evening and arriving at
                  Peshawar Cantt 30.5 hours later. Key stops include Hyderabad, Sukkur, Multan, Lahore, Rawalpindi, and Attock. The route crosses the
                  Indus River at the historic Attock Bridge — one of Pakistan's most scenic rail moments. Economy fare: Rs. 2,000. AC Business: Rs. 9,000.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Khyber Mail", "Awam Express", "Tezgam", "Karakoram*"].map(t => (
                    <span key={t} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{t}</span>
                  ))}
                </div>
                <Link to="/train" className="text-xs text-primary font-medium inline-flex items-center gap-1 hover:underline">
                  Track Karachi–Peshawar Trains <ArrowRight className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>

            {/* Lahore to Multan */}
            <Card className="gradient-card-amber border hover-lift">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center">
                    <Route className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Lahore to Multan Train</h3>
                    <p className="text-xs text-muted-foreground">331 km • 5–6 hours • 10+ daily trains</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Connecting Punjab's capital with the <strong className="text-foreground">City of Saints</strong>, this busy corridor serves students, business travelers,
                  and families. The fastest service is the <strong className="text-foreground">Green Line Express</strong> completing the run in ~5 hours, while local
                  Passenger trains take 7–8 hours. Key stops include Okara, Sahiwal, and Khanewal Junction. Economy fares start at just Rs. 600, making it
                  one of the most affordable intercity routes. During the mango season (June–July), this route sees massive freight and passenger traffic.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Green Line", "Tezgam", "Karakoram", "Shalimar", "Bahauddin Zakariya"].map(t => (
                    <span key={t} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{t}</span>
                  ))}
                </div>
                <Link to="/train" className="text-xs text-primary font-medium inline-flex items-center gap-1 hover:underline">
                  Track Lahore–Multan Trains <ArrowRight className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>

            {/* Rawalpindi to Karachi */}
            <Card className="gradient-card-blue border hover-lift">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <Route className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Rawalpindi to Karachi Train</h3>
                    <p className="text-xs text-muted-foreground">1,228 km • 22–24 hours • 6+ daily trains</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  The reverse of the Karachi–Lahore corridor, this route connects the <strong className="text-foreground">federal capital region</strong> with Pakistan's
                  largest city. The <strong className="text-foreground">Green Line Express</strong> and <strong className="text-foreground">Business Express</strong> are the
                  premium options, while the Tezgam and Awam Express serve budget travelers. All northbound trains pass through Lahore Junction, making it
                  possible to break the journey for a Lahore stopover. Government employees and military families are the heaviest users of this corridor.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Green Line", "Business Express", "Tezgam", "Awam Express"].map(t => (
                    <span key={t} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{t}</span>
                  ))}
                </div>
                <Link to="/train" className="text-xs text-primary font-medium inline-flex items-center gap-1 hover:underline">
                  Track Rawalpindi–Karachi Trains <ArrowRight className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>

            {/* Quetta to Peshawar */}
            <Card className="gradient-card-purple border hover-lift">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Route className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Quetta to Peshawar Train</h3>
                    <p className="text-xs text-muted-foreground">1,587 km • 24 hours • 2 daily trains</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Pakistan's most <strong className="text-foreground">scenic and adventurous railway journey</strong>. The <strong className="text-foreground">Jaffar Express</strong> traverses
                  the dramatic Bolan Pass — a 14-km climb through narrow gorges in Balochistan — before crossing the Sulaiman Mountains into Punjab.
                  This route is a bucket-list journey for railway enthusiasts worldwide. The train passes through Sibi (one of the hottest cities on Earth),
                  then through Multan, Lahore, and Rawalpindi before reaching Peshawar. Economy fare: Rs. 1,800. Limited AC availability — book early.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Jaffar Express", "Bolan Mail*"].map(t => (
                    <span key={t} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{t}</span>
                  ))}
                </div>
                <Link to="/train" className="text-xs text-primary font-medium inline-flex items-center gap-1 hover:underline">
                  Track Quetta–Peshawar Trains <ArrowRight className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== Pakistan Railways vs Bus vs Air Travel ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs font-bold text-primary tracking-wider mb-2">TRAVEL COMPARISON</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Train vs Bus vs Air — Which is Best for Travel in Pakistan?</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
                Many travelers wonder whether to take a train, bus, or flight. Here's an honest comparison across key factors to help you make the right choice for your next trip.
              </p>
            </div>
            <Card className="gradient-card-blue border overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary/10 border-b border-primary/20">
                        <th className="text-left p-3 sm:p-4 font-bold text-foreground whitespace-nowrap">Factor</th>
                        <th className="text-left p-3 sm:p-4 font-bold text-primary whitespace-nowrap">🚂 Train</th>
                        <th className="text-left p-3 sm:p-4 font-bold text-foreground whitespace-nowrap">🚌 Bus</th>
                        <th className="text-left p-3 sm:p-4 font-bold text-foreground whitespace-nowrap">✈️ Flight</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {[
                        { factor: "Karachi–Lahore Cost", train: "Rs. 1,500–8,000", bus: "Rs. 3,000–6,000", air: "Rs. 12,000–25,000" },
                        { factor: "Karachi–Lahore Time", train: "18–22 hours", bus: "16–20 hours", air: "2 hours" },
                        { factor: "Comfort Level", train: "★★★★★ (AC Business)", bus: "★★★☆☆", air: "★★★★☆" },
                        { factor: "Luggage Allowance", train: "40 kg free", bus: "15–20 kg", air: "20–30 kg" },
                        { factor: "Safety Record", train: "Very Good", bus: "Moderate", air: "Excellent" },
                        { factor: "Scenic Views", train: "★★★★★", bus: "★★★☆☆", air: "★★☆☆☆" },
                        { factor: "Sleep Comfort", train: "AC Sleeper berths", bus: "Reclining seats", air: "N/A (short flight)" },
                        { factor: "Availability", train: "12+ daily", bus: "20+ daily", air: "4–6 daily" },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-primary/10 last:border-0 hover:bg-primary/5 transition-colors">
                          <td className="p-3 sm:p-4 font-semibold text-foreground whitespace-nowrap">{row.factor}</td>
                          <td className="p-3 sm:p-4 text-primary font-semibold">{row.train}</td>
                          <td className="p-3 sm:p-4">{row.bus}</td>
                          <td className="p-3 sm:p-4">{row.air}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card className="gradient-card-emerald border hover-lift group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h4 className="font-bold text-sm">Our Verdict: Train Wins</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    For Karachi–Lahore, <strong className="text-foreground">train is the best value</strong>. More legroom, 40 kg free luggage, ability to walk around, and AC Sleeper berths for overnight travel — all at a fraction of flight prices. Buses can't match AC Business comfort.
                  </p>
                </CardContent>
              </Card>
              <Card className="gradient-card-amber border hover-lift group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Zap className="w-5 h-5 text-amber-500" />
                    </div>
                    <h4 className="font-bold text-sm">When to Fly Instead</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    If you're doing Karachi–Islamabad for business and need same-day return, flying makes sense. For family travel, holidays, or budget trips — the train is unbeatable. Use our <Link to="/planner" className="text-primary font-medium underline">Journey Planner</Link> to compare.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TRUSTED BY THOUSANDS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">What Travelers Are Saying</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">Thousands of Pakistani commuters, families, and frequent travelers rely on Track My Train every day to stay informed and save time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { quote: "I track my father's Tezgam from Karachi to Lahore every week. Now I know exactly when to leave home for the station — no more waiting in the parking lot for 2 hours.", name: "Ahmed R.", city: "Lahore", stars: 5 },
              { quote: "As a daily Rawalpindi–Lahore commuter, I check delays before leaving the office. It's saved me from standing on a cold platform more times than I can count. Simple, fast, and always accurate.", name: "Fatima K.", city: "Islamabad", stars: 5 },
              { quote: "My parents only read Urdu. They were thrilled when I showed them they could search stations in Urdu script and track trains on their own phone. Accessibility done right!", name: "M. Ali Shahid", city: "Multan", stars: 5 },
            ].map((t, i) => (
              <Card key={i} className="hover-lift group">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/20 mb-3" />
                  <p className="text-sm text-muted-foreground mb-4 italic leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{t.name[0]}</div>
                    <div><div className="text-sm font-medium">{t.name}</div><div className="text-xs text-muted-foreground">{t.city}</div></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">COMPLETE TOOLKIT</p>
            <h2 className="text-xl sm:text-2xl font-bold">Plan Your Journey End-to-End</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Use our comprehensive suite of free tools to discover trains, explore stations, check fares, and plan the perfect railway journey across Pakistan.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: MapPin, gradient: "gradient-card-emerald", title: "Journey Planner", desc: "Compare routes, stops, and journey times between any two stations.", link: "/planner" },
              { icon: Globe, gradient: "gradient-card-blue", title: "Stations Directory", desc: `Explore ${netStats.totalStations || 342}+ Pakistan Railways stations with full details.`, link: "/stations" },
              { icon: Train, gradient: "gradient-card-amber", title: "Live Train Map", desc: "See all trains on an interactive map with GPS positions.", link: "/train" },
              { icon: BarChart3, gradient: "gradient-card-purple", title: "Ticket Pricing", desc: "Check fare classes and pricing for all train routes.", link: "/ticket-pricing" },
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
        </div>
      </section>

      {/* Travel Guides */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">KNOWLEDGE BASE</p>
            <h2 className="text-xl sm:text-2xl font-bold">Travel Guides & Tips</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">Learn everything about train travel in Pakistan with our detailed guides, travel tips, and expert advice for a comfortable journey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { tag: "GUIDE", gradient: "gradient-card-emerald", title: "How to Check Train Delays", desc: "Master delay tracking with our comprehensive guide. Learn to read late minutes, understand ETA calculations, and use our platform to track delays across all Pakistan Railways trains in real-time.", slug: "check-delays" },
              { tag: "TRAVEL", gradient: "gradient-card-amber", title: "5 Most Scenic Train Journeys", desc: "From the Bolan Pass to the Attock Bridge over the Indus River — discover the most beautiful and breathtaking train routes in Pakistan that every traveler should experience at least once.", slug: "best-scenic-routes" },
              { tag: "ESSENTIAL", gradient: "gradient-card-blue", title: "Ticket Refund Guide 2026", desc: "Complete step-by-step guide to cancelling your Pakistan Railways tickets and getting refunds. Updated with the latest deduction policies, processing times, and eligibility rules for 2026.", slug: "how-to-refund-tickets" },
            ].map((post, i) => (
              <Link key={i} to={`/blog/${post.slug}`}>
                <Card className={`${post.gradient} border hover-lift group h-full`}>
                  <CardContent className="p-5 sm:p-6">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{post.tag}</span>
                    <h3 className="font-bold text-sm mt-3 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{post.desc}</p>
                    <span className="text-xs text-primary font-medium mt-3 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Read More <ArrowRight className="w-3 h-3" /></span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/blog"><Button variant="outline" className="rounded-xl">View All Articles</Button></Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">GOT QUESTIONS?</p>
            <h2 className="text-xl sm:text-2xl font-bold">Frequently Asked Questions About Train Tracking in Pakistan</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">Everything you need to know about tracking trains in Pakistan. Click on a question to expand the answer.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium">{i + 1}. {faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Track Your Train?</h2>
          <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto mb-8">Open the live tracker, search your train, and get instant GPS positions, delay info, and ETAs — all free, no signup required. Join thousands of travelers who never miss their train.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/train">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Train className="w-4 h-4" /> Start Tracking Now
              </Button>
            </Link>
            <Link to="/planner">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <MapPin className="w-4 h-4" /> Plan a Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}