import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Shield, Globe, Zap, HelpCircle, Train, Navigation, ArrowRight, Star, Eye, Smartphone, Clock, MapPin, Route, Calendar, CreditCard, AlertTriangle, Search, Layers, BarChart3, Wifi, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";

const aboutFaqs = [
  { q: "Is TrackMyTrain.pk affiliated with Pakistan Railways?", a: "No. TrackMyTrain.pk is a completely independent platform created by passionate developers and railway enthusiasts. We are NOT affiliated with, endorsed by, or connected to Pakistan Railways or any government body. For official ticketing and reservations, contact Pakistan Railways helpline 117." },
  { q: "How does TrackMyTrain.pk get its data?", a: "We use publicly available GPS tracking data and official Pakistan Railways schedule information to provide real-time train positions, delay calculations, and estimated arrival times. Our system processes thousands of GPS coordinates per minute to ensure accuracy." },
  { q: "Is TrackMyTrain.pk free to use?", a: "Yes! Our platform is 100% free with no hidden costs, subscriptions, premium tiers, or ads. We believe every Pakistani traveler deserves access to reliable train tracking information without barriers." },
  { q: "Do I need to create an account?", a: "No account or registration is required. Simply visit our website and start tracking trains immediately. We don't collect personal data or require any sign-up. Even the Find My Train GPS feature works without any account." },
  { q: "How accurate is the live tracking?", a: "Our GPS-based tracking is typically accurate within 100-500 meters. Train positions update every 5 seconds, and delay calculations are accurate within ±5 minutes for most journeys. We use the Haversine formula for precise distance calculations." },
  { q: "Does it work on all devices?", a: "Yes! TrackMyTrain.pk is fully responsive and works on any device — smartphones, tablets, laptops, and desktops. It's optimized for slow 2G/3G connections common in rural Pakistan. No app download required." },
  { q: "How many trains does TrackMyTrain.pk track?", a: "We track over 164 Pakistan Railways trains including major express services like Khyber Mail, Tezgam, Green Line Express, Allama Iqbal Express, Karakoram Express, and Shalimar Express. This covers all main-line corridors from Karachi to Peshawar, Quetta, and Sialkot." },
  { q: "Can I track freight trains on TrackMyTrain.pk?", a: "Currently, TrackMyTrain.pk focuses on passenger trains. Freight train tracking is not available because freight movements are handled separately by Pakistan Railways and do not follow fixed public schedules." },
  { q: "How often does the train position data refresh?", a: "Live train positions refresh every 5 seconds in the tracker view and every 30 seconds on individual train detail pages. This near-real-time frequency ensures you always see the most current position of any running train." },
  { q: "What is the 'Find My Train' feature?", a: "Find My Train uses your phone's GPS to automatically detect which train you're currently on. It calculates your proximity to all active trains and identifies the closest match within 2 km, so you can instantly see your train's schedule, delay status, and next stop without searching." },
  { q: "Does TrackMyTrain.pk work offline?", a: "Basic schedule and station information is cached for offline access via our service worker. However, live GPS tracking requires an active internet connection. We've optimized data payloads to work even on very slow 2G connections." },
  { q: "How can I report incorrect data or suggest improvements?", a: "Visit our Contact page at trackmytrain.pk/contact to report data issues, suggest features, or provide feedback. We actively monitor all submissions and typically respond within 2-3 business days. Community feedback is essential to keeping our data accurate." },
  { q: "What routes does TrackMyTrain.pk cover?", a: "We cover all major Pakistan Railways corridors including the Main Line (Karachi–Lahore–Peshawar), the Bolan corridor (Quetta link), branch lines to Sialkot, Faisalabad, Havelian, and more. Over 342 stations across all four provinces are included." },
  { q: "Is there an app for TrackMyTrain.pk?", a: "TrackMyTrain.pk is a Progressive Web App (PWA) — you can add it to your home screen on Android or iOS for an app-like experience without downloading anything from an app store. Simply open the website in your browser and use 'Add to Home Screen'." },
  { q: "How does the delay calculation work?", a: "Our delay algorithm compares the train's real-time GPS position against its scheduled timetable. We calculate expected position based on departure time, average speed between stations, and scheduled stop durations, then measure the deviation to produce an accurate delay figure in minutes." },
  { q: "Can I plan a multi-stop journey on TrackMyTrain.pk?", a: "Yes! Our Journey Planner at trackmytrain.pk/planner lets you select origin and destination stations and shows all available direct trains. For multi-stop journeys, you can check connecting trains at junction stations like Lahore, Rawalpindi, Multan, or Sukkur." },
];

const teamValues = [
  { icon: Target, title: "Accuracy First", desc: "Every data point is verified. We combine GPS tracking with official schedules to deliver the most reliable train information in Pakistan.", gradient: "gradient-card-emerald" },
  { icon: Users, title: "Built for Everyone", desc: "Bilingual support (English & Urdu), mobile-optimized, works on slow 2G/3G networks. Designed for every Pakistani traveler regardless of device or location.", gradient: "gradient-card-amber" },
  { icon: Shield, title: "Privacy by Design", desc: "No accounts required, no personal data tracking, no data selling. GPS data from Find My Train is processed locally and never stored on our servers.", gradient: "gradient-card-blue" },
  { icon: Globe, title: "Independence", desc: "We operate independently, free from political or commercial pressure. Our only allegiance is to Pakistani travelers who depend on accurate information.", gradient: "gradient-card-purple" },
  { icon: Zap, title: "Speed & Performance", desc: "Optimized for Pakistan's mobile networks. Pages load in under 2 seconds, data refreshes every 5 seconds, and the entire platform works on basic 2G connections.", gradient: "gradient-card-rose" },
  { icon: Star, title: "Community Driven", desc: "Built by Pakistani developers and railway enthusiasts. We listen to user feedback and continuously improve based on what our community needs most.", gradient: "gradient-card-teal" },
];

export default function AboutPage() {
  return (
    <div>
      <SEOHead
        title="About Track My Train — Pakistan's #1 Independent Train Tracking Platform"
        description="Track My Train is Pakistan's most trusted independent railway tracking service. Learn about our mission, team values, and how we provide free real-time GPS tracking for 164+ Pakistan Railways trains across 342+ stations."
        canonical="/about"
        keywords="about track my train, trackmytrain.pk, pakistan train tracking platform, pakistan railways independent tracker, who made trackmytrain, pakistan railway app, train tracker pakistan"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "About Us", url: "/about" }]}
        faqSchema={aboutFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Track My Train",
          "description": "Pakistan's most trusted independent railway tracking service providing free real-time GPS tracking for 164+ Pakistan Railways trains across 342+ stations.",
          "mainEntity": {
            "@type": "Organization",
            "name": "Track My Train",
            "url": "https://trackmytrain.pk",
            "foundingDate": "2024",
            "foundingLocation": { "@type": "Place", "name": "Lahore, Pakistan" },
            "description": "Independent platform providing free, real-time GPS train tracking for Pakistan Railways passengers.",
            "knowsAbout": ["Pakistan Railways", "Train Tracking", "GPS Navigation", "Railway Schedules", "Live Train Status"],
            "areaServed": { "@type": "Country", "name": "Pakistan" }
          }
        }]}
      />
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>About Us</span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <Shield className="w-4 h-4" /> Pakistan's #1 Independent Train Tracker
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              About <span className="text-gradient-gold">TrackMyTrain.pk</span>
            </h1>
            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mt-4">
              Pakistan's independent, community-driven platform dedicated to simplifying railway travel for millions of passengers. Free, accurate, and built with love.
            </p>
            <p className="opacity-60 text-sm mt-2">ہمارے بارے میں — پاکستان کا نمبر ون ٹرین ٹریکنگ پلیٹ فارم</p>
          </div>
        </div>
      </section>

      {/* Floating Stats */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "164+", label: "Trains Tracked", icon: Train, gradient: "gradient-card-emerald" },
            { value: "100K+", label: "Monthly Users", icon: Users, gradient: "gradient-card-amber" },
            { value: "342+", label: "Stations Covered", icon: Navigation, gradient: "gradient-card-blue" },
            { value: "24/7", label: "Live Updates", icon: Clock, gradient: "gradient-card-purple" },
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
        {/* Our Story */}
        <section className="mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">OUR STORY</p>
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2"><Heart className="w-6 h-6 text-primary" /> How It All Started</h2>
          </div>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p className="text-base leading-relaxed">The journey of <strong className="text-foreground">TrackMyTrain.pk</strong> began with a simple, frustrating experience shared by millions of Pakistanis: standing on a railway platform in the scorching summer heat, unsure when the train would actually arrive. No reliable information, no live updates — just uncertainty.</p>
            <p className="text-base leading-relaxed">In Pakistan, train travel is more than just transportation — it's the lifeline of the nation. From Karachi to Peshawar, the railway connects communities, families, and dreams. Yet despite its importance, reliable real-time information has always been hard to come by. <strong className="text-foreground">We believed there had to be a better way.</strong></p>
            <p className="text-base leading-relaxed">TrackMyTrain.pk was born out of this conviction. We built a platform that takes complex GPS data, schedule information, and delay calculations, and presents them in a simple, accessible format that anyone can use — whether they're a tech-savvy professional in Islamabad or a first-time smartphone user in rural Sindh. Our mission is to ensure no Pakistani traveler is ever left guessing about their train again.</p>
          </div>
        </section>

        {/* The Problem We Solve */}
        <section className="mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">THE CHALLENGE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Why Pakistan Needed a Better Train Tracker</h2>
          </div>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p className="text-base leading-relaxed">Pakistan Railways operates one of the largest railway networks in South Asia, spanning over <strong className="text-foreground">7,791 kilometers of track</strong> across four provinces. Every day, millions of Pakistanis depend on trains for intercity travel — from daily commuters between Lahore and Rawalpindi to families traveling from Karachi to Multan for festivals and reunions.</p>
            <p className="text-base leading-relaxed">Despite the critical importance of rail travel, passengers have historically faced significant challenges. Trains frequently run late — sometimes by hours — without any reliable way for passengers to check real-time status. Platforms get overcrowded as travelers arrive hours early "just in case." Families waiting to receive passengers at destination stations have no way to know when the train will actually arrive. This uncertainty causes missed connections, wasted time, and unnecessary anxiety for millions of people every day.</p>
            <p className="text-base leading-relaxed">Before TrackMyTrain.pk, passengers had limited options: calling the Pakistan Railways helpline (117), which is often busy; asking station staff who may not have up-to-date information; or simply waiting and hoping. There was no centralized, free, real-time platform that gave passengers the power to check their train's exact position, speed, and estimated arrival time from their own phone.</p>
            <p className="text-base leading-relaxed"><strong className="text-foreground">That's exactly what we set out to change.</strong> TrackMyTrain.pk was designed from the ground up to solve this problem — giving every Pakistani with a phone or computer instant access to live train positions, accurate delay calculations, and comprehensive schedule information, completely free of charge.</p>
          </div>
        </section>

        {/* How Our Technology Works */}
        <section className="mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TECHNOLOGY</p>
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2"><Layers className="w-6 h-6 text-primary" /> How Our Tracking Technology Works</h2>
          </div>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p className="text-base leading-relaxed">At the core of TrackMyTrain.pk is a sophisticated real-time tracking engine that processes thousands of GPS data points every minute. Here's how we deliver accurate, reliable train position data to your screen:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              {[
                { icon: Wifi, title: "GPS Data Collection", desc: "Our system continuously receives GPS coordinates from Pakistan Railways trains equipped with tracking devices. Each data point includes latitude, longitude, speed, heading, and timestamp — allowing us to pinpoint every active train's exact position on the network." },
                { icon: BarChart3, title: "Delay Algorithm", desc: "We compare real-time GPS positions against the official timetable using a proprietary algorithm. By calculating expected position based on departure time, average section speeds, and scheduled halt durations, we produce delay figures accurate within ±5 minutes for most services." },
                { icon: MapPin, title: "Route Matching", desc: "Raw GPS coordinates are matched to the nearest railway line segment using geospatial algorithms. This allows us to determine exactly which section of track a train is on, which station it last passed, and which station it's approaching — even when GPS accuracy fluctuates." },
                { icon: Zap, title: "Optimized Delivery", desc: "Train data is compressed and cached at multiple layers to minimize bandwidth consumption. The entire tracking payload for 164+ trains is under 50 KB, making it usable even on Pakistan's slowest 2G mobile connections in rural areas." },
              ].map((t, i) => (
                <Card key={i} className="border">
                  <CardContent className="p-5">
                    <t.icon className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-bold text-sm mb-2">{t.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-base leading-relaxed mt-4">Our commitment to technical excellence means we're constantly refining these systems. We monitor data quality, optimize refresh rates, and improve our delay prediction algorithms based on historical patterns — all to ensure you get the most reliable train tracking experience possible.</p>
          </div>
        </section>

        {/* Our Values - Gradient Cards */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">OUR VALUES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">What We Stand For</h2>
            <p className="text-sm text-muted-foreground mt-1">The principles that guide everything we build</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {teamValues.map((v, i) => (
              <Card key={i} className={`${v.gradient} border hover-lift group`}>
                <CardContent className="p-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What We Offer - Expanded */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">FEATURES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">What TrackMyTrain.pk Offers</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">A complete suite of free tools designed for every aspect of your railway journey in Pakistan</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Eye, title: "Live GPS Tracking", desc: "Real-time positions for 164+ trains", gradient: "gradient-card-emerald" },
              { icon: Navigation, title: "Find My Train", desc: "Auto-detect your train via GPS", gradient: "gradient-card-amber" },
              { icon: Clock, title: "Delay Checker", desc: "Accurate delay status & ETAs", gradient: "gradient-card-blue" },
              { icon: Smartphone, title: "Mobile First", desc: "Works on any device, any network", gradient: "gradient-card-purple" },
              { icon: Route, title: "Journey Planner", desc: "Find trains between any two stations", gradient: "gradient-card-rose" },
              { icon: Calendar, title: "Full Schedules", desc: "Complete timetables for all trains", gradient: "gradient-card-teal" },
              { icon: CreditCard, title: "Ticket Pricing", desc: "Fare info across all classes", gradient: "gradient-card-emerald" },
              { icon: MapPin, title: "342+ Stations", desc: "Detailed info for every station", gradient: "gradient-card-amber" },
            ].map((f, i) => (
              <Card key={i} className={`${f.gradient} border hover-lift group`}>
                <CardContent className="p-4 text-center">
                  <f.icon className="w-8 h-8 text-primary mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
                  <h4 className="font-bold text-sm mb-0.5">{f.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Coverage & Network */}
        <section className="mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">COVERAGE</p>
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2"><Route className="w-6 h-6 text-primary" /> Our Railway Network Coverage</h2>
          </div>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p className="text-base leading-relaxed">TrackMyTrain.pk provides comprehensive coverage of the Pakistan Railways network. Our platform tracks trains across all major railway corridors in the country, connecting the four provinces of Punjab, Sindh, Khyber Pakhtunkhwa, and Balochistan.</p>

            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {[
                { title: "Main Line (ML-1)", desc: "The backbone of Pakistan Railways — Karachi Cantt to Peshawar Cantt via Hyderabad, Sukkur, Multan, Lahore, and Rawalpindi. Services include Khyber Mail, Tezgam, Green Line Express, and Awam Express.", trains: "40+ trains" },
                { title: "Punjab Routes", desc: "Branch lines serving Faisalabad, Sialkot, Gujranwala, Sahiwal, Bahawalpur, and Rahim Yar Khan. Key services include Allama Iqbal Express and Millat Express.", trains: "20+ trains" },
                { title: "Sindh Corridors", desc: "Routes through Hyderabad, Nawabshah, Sukkur, and Rohri connecting southern Pakistan to the main line. Multiple daily services between Karachi and interior Sindh.", trains: "15+ trains" },
                { title: "KPK & Balochistan", desc: "Services to Peshawar, Nowshera, Havelian (Hazara Express), and the Quetta route via Jacobabad. Coverage includes the scenic Bolan Pass corridor.", trains: "10+ trains" },
              ].map((r, i) => (
                <Card key={i} className="border">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-sm mb-1">{r.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{r.desc}</p>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{r.trains}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-base leading-relaxed">Whether you're tracking the <Link to="/green-line-express" className="text-primary hover:underline font-medium">Green Line Express</Link> from Karachi to Islamabad, checking if the Khyber Mail is running on time, or finding <Link to="/express-trains" className="text-primary hover:underline font-medium">express trains</Link> between Lahore and Rawalpindi, TrackMyTrain.pk has you covered with real-time data you can trust.</p>
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="mb-12 sm:mb-16 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">OUR JOURNEY</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Key Milestones</h2>
          </div>
          <div className="space-y-0">
            {[
              { year: "2024", title: "Platform Launch", desc: "TrackMyTrain.pk goes live with GPS tracking for the first 50 trains on the Main Line corridor." },
              { year: "2024", title: "100+ Trains Added", desc: "Expanded coverage to 100+ trains including branch lines to Sialkot, Faisalabad, and Quetta." },
              { year: "2025", title: "Find My Train Feature", desc: "Launched the revolutionary GPS-based 'Find My Train' feature that auto-detects your train." },
              { year: "2025", title: "342+ Stations", desc: "Complete station coverage across all four provinces with facilities information and train listings." },
              { year: "2026", title: "164+ Active Trains", desc: "Full network coverage with real-time tracking, delay monitoring, and comprehensive journey planning tools." },
            ].map((m, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary" />
                  {i < 4 && <div className="w-0.5 h-12 bg-border" />}
                </div>
                <div className="pb-6 flex-1">
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{m.year}</span>
                  <h4 className="font-bold text-sm mt-1">{m.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-3">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold">Everything You Want to Know About TrackMyTrain.pk</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">We've answered the most common questions from our users. If you don't find what you're looking for, visit our <Link to="/contact" className="text-primary hover:underline">Contact page</Link> or <Link to="/faq" className="text-primary hover:underline">full FAQ section</Link>.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {aboutFaqs.map((faq, i) => (
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

        {/* Explore Our Tools */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">EXPLORE</p>
            <h2 className="text-xl sm:text-2xl font-bold">Try Our Free Railway Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Train, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any of 164+ trains in real-time with GPS accuracy, speed data, and delay status.", link: "/train" },
              { icon: Search, gradient: "gradient-card-amber", title: "Find My Train", desc: "Use your phone's GPS to instantly identify which train you're on without searching.", link: "/find-my-train" },
              { icon: Route, gradient: "gradient-card-blue", title: "Journey Planner", desc: "Search trains between any two stations. View schedules, durations, and running days.", link: "/planner" },
              { icon: AlertTriangle, gradient: "gradient-card-rose", title: "Delay Checker", desc: "Check live delay status for every running train. Get accurate ETAs at your station.", link: "/check-delays" },
              { icon: Calendar, gradient: "gradient-card-purple", title: "Train Schedules", desc: "Complete timetables with arrival/departure times, halt durations, and platform info.", link: "/schedule" },
              { icon: MapPin, gradient: "gradient-card-teal", title: "Station Directory", desc: "Browse 342+ stations with facilities, train listings, and location information.", link: "/stations" },
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

        {/* Disclaimer */}
        <Card className="gradient-card-rose border max-w-3xl mx-auto">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold mb-2">⚠️ Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              TrackMyTrain.pk is an independent platform and is NOT affiliated with, endorsed by, or connected to Pakistan Railways or any government body. We use publicly available data to provide information services to the traveling public. For official ticketing and reservations, contact Pakistan Railways helpline: <strong className="text-foreground">117</strong>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Footer */}
      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Start Tracking Trains Now</h2>
          <p className="text-base opacity-80 max-w-xl mx-auto mb-6">Free, no signup required. Track any Pakistan Railways train in real-time with GPS accuracy.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/train">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Train className="w-4 h-4" /> Open Live Tracker
              </Button>
            </Link>
            <Link to="/planner">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <Navigation className="w-4 h-4" /> Plan a Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}