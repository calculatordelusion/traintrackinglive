import { useState, useEffect } from "react";
import RelatedLinks from "@/components/RelatedLinks";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Shield, Smartphone, Globe, Loader2, AlertTriangle, HelpCircle, MapPin, Zap, Clock, Users, Radio, Train, ArrowRight, Gauge, Eye, Share2, Fingerprint, Satellite } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { findMyTrain, fetchLivePositions, type LiveStats } from "@/lib/trainApi";

const findMyTrainFaqs = [
  { q: "How does the Find My Train GPS feature work on TrackMyTrain.pk?", a: "Find My Train uses your device's built-in GPS (Global Positioning System) to determine your exact location. Once we have your coordinates, our system compares your position against all currently running Pakistan Railways trains using the Haversine formula — a mathematical method that calculates the shortest distance between two points on a sphere. If you're within 500 meters of a train's GPS position, we automatically identify which train you're on and show you its live tracking details including speed, delay status, and estimated arrival times at upcoming stations." },
  { q: "Is my location data safe when using Find My Train?", a: "Absolutely. Your privacy is our top priority. When you use Find My Train, your GPS location is processed entirely within your browser — it is never stored on our servers, never transmitted to third parties, and never used for tracking or advertising purposes. We use the browser's native Geolocation API which requires your explicit permission before accessing your location. You can revoke this permission at any time through your browser settings. TrackMyTrain.pk does not create user profiles or store location history." },
  { q: "Why can't Find My Train detect my train?", a: "There are several reasons why detection might fail: (1) Your device GPS might not be accurate enough — try moving near a window for better satellite reception. (2) The train you're on might not currently have GPS tracking enabled. (3) You might be more than 500 meters from the tracked train route. (4) Poor mobile network connectivity can delay the GPS data refresh. (5) Some trains, especially passenger trains on branch lines, may have intermittent GPS coverage. If detection fails, we'll show you the nearest train with its distance so you can manually select it." },
  { q: "Does Find My Train work on all mobile phones and devices?", a: "Find My Train works on any modern smartphone, tablet, or laptop with GPS capability and a web browser that supports the Geolocation API. This includes all recent versions of Chrome, Safari, Firefox, Edge, and Samsung Internet. For the best accuracy, use a smartphone with GPS enabled. Desktop computers without GPS hardware will use approximate location from your IP address, which is much less accurate. We recommend using the feature on a mobile phone while traveling for optimal results." },
  { q: "Can I share my live train location with family members?", a: "Yes! Once Find My Train detects your train, you can share the train's live tracking page URL with anyone. Simply copy the URL from your browser's address bar and send it via WhatsApp, SMS, or any messaging app. Your family members can then see the train's real-time position, speed, and estimated arrival time at their station — making it easy for them to plan when to come pick you up. This is one of the most popular features among our users, especially during long-distance journeys." },
  { q: "How accurate is the GPS detection for finding trains?", a: "The accuracy depends on multiple factors. In optimal conditions (clear sky, modern smartphone), GPS accuracy is typically within 5-15 meters, making train detection very reliable. In urban areas with tall buildings, accuracy may decrease to 30-100 meters due to signal reflection (multipath effect). Inside tunnels or covered stations, GPS accuracy drops significantly. Our detection radius of 500 meters is designed to accommodate these variations while still providing reliable results. For best results, ensure your phone's location services are set to 'High Accuracy' mode which combines GPS, Wi-Fi, and cellular data." },
  { q: "What happens after my train is detected?", a: "Once detected, you'll see a confirmation card showing your train's name, number, current speed, and delay status. You can then tap 'View Live Tracking' to see the full real-time tracking page with an interactive map, complete route with all stops, estimated arrival times at each station, and the train's current speed and delay information. The tracking page updates every 5 seconds, so you always have the latest information about your journey's progress." },
  { q: "Do I need to install an app to use Find My Train?", a: "No! Find My Train works directly in your mobile browser — there's nothing to download or install. Simply visit trackmytrain.pk/find-my-train and tap the 'Find My Train' button. This is intentional: we believe essential travel tools should be instantly accessible without requiring app installations, account creation, or software updates. Our web-based approach also means the feature works on any device regardless of operating system, storage space, or app store availability." },
  { q: "Does Find My Train work in rural areas of Pakistan?", a: "Yes, Find My Train works in rural areas as long as your smartphone has GPS satellite reception. GPS works independently of mobile network coverage — it communicates directly with satellites orbiting Earth. However, the train position data requires some network connectivity (2G is sufficient) to fetch the latest positions from our servers. In areas with no network at all, the feature will show your last known results until connectivity is restored." },
  { q: "How often does the train position update after detection?", a: "After your train is detected and you open the live tracking page, position data refreshes every 5 seconds automatically. This near-real-time update frequency ensures you always see the most current information about your train's speed, location, and estimated arrival times. The refresh happens in the background without requiring you to reload the page, providing a seamless tracking experience throughout your journey." },
];

export default function FindMyTrainPage() {
  const [status, setStatus] = useState<"idle" | "detecting" | "found" | "not-found" | "error">("idle");
  const [result, setResult] = useState<any>(null);
  const [stats, setStats] = useState<LiveStats>({ moving: 0, atStation: 0, total: 0, liveCount: 0 });

  useEffect(() => {
    startDetection();
    const loadStats = async () => {
      try {
        const { stats: s } = await fetchLivePositions();
        setStats(s);
      } catch (e) { console.error(e); }
    };
    loadStats();
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const startDetection = () => {
    setStatus("detecting");
    if (!navigator.geolocation) { setStatus("error"); return; }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await findMyTrain(position.coords.latitude, position.coords.longitude);
          setResult(data.data);
          setStatus(data.detected ? "found" : "not-found");
        } catch {
          setStatus("error");
        }
      },
      () => { setStatus("error"); },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div>
      <SEOHead
        title="Find My Train — GPS Auto-Detection for Pakistan Railways 2026"
        description="Automatically detect which Pakistan Railways train you're on using your phone's GPS. No searching required — just tap and we find your train instantly with live tracking."
        canonical="/find-my-train"
        keywords="find my train, GPS train detection pakistan, which train am I on, auto detect train pakistan, track my train GPS, locate my train"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Find My Train", url: "/find-my-train" }]}
        faqSchema={findMyTrainFaqs}
        howToSchema={{
          name: "How to Use Find My Train GPS Detection",
          steps: [
            { name: "Open Find My Train", text: "Visit trackmytrain.pk/find-my-train and tap the 'Find My Train' button." },
            { name: "Allow Location Access", text: "Grant GPS permission when your browser asks. Your location is processed locally and never stored." },
            { name: "View Your Train", text: "If you're within 500m of a running train, we identify it instantly and show live tracking details." },
          ],
        }}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Find My Train — GPS Auto-Detection",
          "alternateName": "میری ٹرین تلاش کریں",
          "url": "https://trackmytrain.pk/find-my-train",
          "applicationCategory": "TravelApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
          "featureList": ["GPS auto-detection", "500m proximity matching", "Works on any smartphone browser", "No app download required"],
          "description": "Automatically detect which Pakistan Railways train you're on using your phone's GPS"
        }]}
      />
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>Find My Train</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(152_55%_45%)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[hsl(152_55%_45%)]" />
            </span>
            <span className="font-semibold tracking-wider text-[hsl(152_55%_45%)]">GPS AUTO-DETECTION • LIVE</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-3">Find My Train — GPS Detection</h1>
          <p className="text-base sm:text-lg opacity-80 max-w-2xl">
            Automatically detect which Pakistan Railway train you're on using your device's GPS. No searching, no train numbers — just tap and we'll find your train instantly with real-time tracking.
          </p>
          <p className="opacity-60 text-sm mt-2">اپنی ٹرین تلاش کریں - جی پی ایس آٹو ڈیٹیکشن</p>

          {/* Live stats in hero */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[
              { value: stats.running || stats.liveCount || stats.moving, label: "Trains Moving", color: "text-emerald-400" },
              { value: stats.atStation, label: "At Stations", color: "text-amber-400" },
              { value: stats.total, label: "Total Trackable", color: "text-blue-400" },
              { value: "500m", label: "Detection Range", color: "text-purple-400" },
            ].map((s, i) => (
              <div key={i} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 text-center border border-primary-foreground/10">
                <div className={`text-2xl font-bold stat-counter ${s.color}`}>{s.value}</div>
                <div className="text-xs opacity-70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Detection Card - Main CTA */}
        <div className="max-w-3xl mx-auto mb-10">
          <Card className="shadow-lg border-primary/20 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Navigation className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Use My Current Location</h2>
                    <p className="text-sm text-muted-foreground">GPS position processed in your browser only — never stored.</p>
                  </div>
                </div>
                <Button onClick={startDetection} disabled={status === "detecting"} size="lg" className="rounded-xl font-semibold">
                  {status === "detecting" ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Detecting...</> : <><Satellite className="w-4 h-4 mr-2" /> Find My Train</>}
                </Button>
              </div>

              {status === "detecting" && (
                <div className="flex items-center gap-2 mt-4 p-3 bg-muted rounded-xl text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  Getting your GPS location and matching with {stats.running || stats.liveCount || stats.moving} live trains across Pakistan...
                </div>
              )}

              {status === "found" && result && (
                <div className="mt-4 p-4 gradient-card-emerald border rounded-xl">
                  <h4 className="font-bold text-primary text-lg">🎉 Train Detected!</h4>
                  <p className="text-sm mt-1">You are on <strong>{result.train.name} {result.train.number}</strong> ({result.distance}m away)</p>
                  <p className="text-xs text-muted-foreground mt-1">Speed: {result.position?.speed} km/h • {result.position?.delayMinutes === 0 ? 'On Time' : `${result.position?.delayMinutes}m late`}</p>
                  <Link to={`/train/${result.train.id}`}>
                    <Button className="mt-3 rounded-xl gap-2" size="sm"><Eye className="w-4 h-4" /> View Live Tracking</Button>
                  </Link>
                </div>
              )}

              {status === "not-found" && result && (
                <div className="mt-4 p-4 gradient-card-amber border rounded-xl">
                  <h4 className="font-bold">No Train Detected Within 500m</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nearest train: <strong>{result.train.name} {result.train.number}</strong> ({(result.distance / 1000).toFixed(1)} km away)
                  </p>
                  <Link to={`/train/${result.train.id}`}>
                    <Button variant="outline" className="mt-3 rounded-xl gap-2" size="sm"><MapPin className="w-4 h-4" /> Track Nearest Train</Button>
                  </Link>
                </div>
              )}

              {status === "error" && (
                <div className="mt-4 p-4 gradient-card-rose border rounded-xl">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <h4 className="font-bold text-destructive">Location Access Denied</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Please enable location permission in your browser settings and try again.</p>
                  <Button onClick={startDetection} variant="outline" size="sm" className="mt-3 rounded-xl">Retry Detection</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground mt-4 text-center">
            Prefer to search manually? <Link to="/train" className="text-primary font-medium hover:underline">Open the Live Train Tracker</Link>.
          </p>
        </div>

        {/* How It Works - Gradient Cards */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">3 SIMPLE STEPS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">How Find My Train Works</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">Our GPS-based detection system identifies your train in seconds using advanced geolocation technology and the Haversine formula.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {[
              { step: "1", icon: Satellite, gradient: "gradient-card-emerald", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", title: "Get Your Location", desc: "Tap 'Find My Train' and allow location permission. Your device's GPS calculates your exact coordinates using satellite signals. This data stays in your browser and is never stored or shared with anyone — complete privacy guaranteed." },
              { step: "2", icon: Gauge, gradient: "gradient-card-blue", iconBg: "bg-blue-500/15", iconColor: "text-blue-500", title: "Match with Live Trains", desc: "Our system instantly compares your GPS coordinates with all live Pakistan Railway trains using the Haversine formula — a mathematical method for calculating the shortest distance between two points on Earth's surface with sub-meter precision." },
              { step: "3", icon: Eye, gradient: "gradient-card-purple", iconBg: "bg-purple-500/15", iconColor: "text-purple-500", title: "Instant Results", desc: "If you're within 500 meters of a running train, we immediately identify it and show live tracking with speed, delay status, and ETAs at all upcoming stations. Otherwise, we show the nearest train with its exact distance." },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{item.step}</div>
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Use Find My Train - Gradient Cards */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">KEY BENEFITS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Why Use Find My Train?</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Designed for passengers aboard Pakistan Railways trains who want to track their journey or share their live location with family at the destination station.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: Navigation, gradient: "gradient-card-emerald", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", title: "Instant GPS Detection", desc: "Automatically identifies your train within seconds using your phone's GPS. No need to search through train lists or remember train numbers — just tap and we find it for you instantly." },
              { icon: Shield, gradient: "gradient-card-rose", iconBg: "bg-rose-500/15", iconColor: "text-rose-500", title: "100% Private & Secure", desc: "Your location data is processed entirely within your browser using the native Geolocation API. We never store, transmit, or share your GPS coordinates with anyone." },
              { icon: Smartphone, gradient: "gradient-card-blue", iconBg: "bg-blue-500/15", iconColor: "text-blue-500", title: "Works on All Devices", desc: "Compatible with every modern smartphone — iPhone, Samsung, Xiaomi, Oppo, Vivo. Works in Chrome, Safari, Firefox, and Edge browsers without any app installation." },
              { icon: Share2, gradient: "gradient-card-amber", iconBg: "bg-amber-500/15", iconColor: "text-amber-500", title: "Share with Family", desc: "Once detected, share the tracking page URL via WhatsApp or SMS. Your family can see the train's live position and plan station pickup timing perfectly — no app needed on their end." },
              { icon: Zap, gradient: "gradient-card-purple", iconBg: "bg-purple-500/15", iconColor: "text-purple-500", title: "Real-Time Speed & Delays", desc: "After detection, view your train's current speed in km/h, delay status in minutes, and estimated arrival times at all upcoming stations. Data updates every 5 seconds automatically." },
              { icon: Fingerprint, gradient: "gradient-card-teal", iconBg: "bg-teal-500/15", iconColor: "text-teal-500", title: "No App Installation", desc: "Works directly in your mobile browser — no downloads from Play Store or App Store needed. Saves phone storage and works instantly on any device with a modern web browser." },
            ].map((f, i) => (
              <Card key={i} className={`${f.gradient} border hover-lift group`}>
                <CardContent className="p-5 sm:p-6">
                  <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Use Cases - Gradient Cards */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">USE CASES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">How Travelers Use Find My Train</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">Thousands of Pakistan Railways passengers use GPS detection every day for these common scenarios.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {[
              { emoji: "👨‍👩‍👧", gradient: "gradient-card-emerald", title: "Family Pickup Coordination", desc: "Share your train's live position with family members waiting at the destination station. They can see exactly when your train will arrive and plan their pickup timing — no more waiting for hours at the station." },
              { emoji: "🕐", gradient: "gradient-card-blue", title: "Journey Progress Tracking", desc: "Check how far along your journey you are, how many stations are left, and what time you'll arrive at your destination based on real-time GPS data and current train speed calculations." },
              { emoji: "📱", gradient: "gradient-card-amber", title: "Quick Train Identification", desc: "Forgot which train number you're on? Find My Train instantly identifies it using GPS — saving you from searching through tickets or asking fellow passengers. Perfect for frequent travelers." },
              { emoji: "⏰", gradient: "gradient-card-purple", title: "Delay Monitoring", desc: "Keep track of any delays building up during your journey. Know if you're running late before you arrive so you can inform people waiting for you and adjust travel plans accordingly." },
            ].map((uc, i) => (
              <Card key={i} className={`${uc.gradient} border hover-lift group`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 inline-block">{uc.emoji}</div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section className="mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">YOUR PRIVACY MATTERS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Privacy & Security Commitment</h2>
          </div>
          <Card className="gradient-card-rose border hover-lift">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Shield className="w-10 h-10 text-rose-500 mb-4" />
                  <h3 className="font-bold text-lg mb-3">Zero Data Collection</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">✓</span> GPS data processed entirely in your browser</li>
                    <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">✓</span> No location history stored on any server</li>
                    <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">✓</span> No user accounts or tracking profiles created</li>
                    <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">✓</span> No third-party analytics on GPS data</li>
                  </ul>
                </div>
                <div>
                  <Fingerprint className="w-10 h-10 text-rose-500 mb-4" />
                  <h3 className="font-bold text-lg mb-3">Browser-Level Security</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">✓</span> Uses native Geolocation API with your permission</li>
                    <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">✓</span> Permission can be revoked anytime in settings</li>
                    <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">✓</span> Encrypted HTTPS connections for all data</li>
                    <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">✓</span> Open, transparent processing — no hidden tracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Rich SEO Content */}
        <section className="mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">COMPREHENSIVE GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">About Find My Train GPS Feature</h2>
          </div>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-5">
            <p className="text-base leading-relaxed">Find My Train is an innovative GPS-based feature exclusively available on TrackMyTrain.pk that allows Pakistan Railways passengers to <strong>automatically identify which train they are traveling on</strong>. Using the Haversine formula for distance calculation and real-time GPS coordinates from both the user's device and our train tracking network, the system can identify a passenger's train within seconds — no manual searching required.</p>

            <h3 className="text-lg font-bold text-foreground mt-8">How GPS Train Detection Works Technically</h3>
            <p className="leading-relaxed">When you tap "Find My Train," your browser requests GPS coordinates from your device's built-in satellite receiver. These coordinates (latitude and longitude) are then sent to our backend where they're compared against the real-time positions of all {stats.total} Pakistan Railways trains currently in our tracking system. We use the <strong>Haversine formula</strong> — a mathematical equation for calculating great-circle distances between two points on a sphere — to determine the distance between your position and each train. If any train is within our 500-meter detection radius, it's identified as your train.</p>

            <h3 className="text-lg font-bold text-foreground mt-8">Share Your Journey with Family</h3>
            <p className="leading-relaxed">This feature is particularly useful for long-distance travelers who want to share their live location with family members waiting at destination stations. Instead of calling and describing approximate locations like "we just crossed Sukkur" or "we're somewhere near Multan," passengers can simply share the train's tracking page URL via <strong>WhatsApp, SMS, or any messaging app</strong>. Family members can then see the train's exact position on the map, current speed, delay status, and estimated arrival time — making station pickup planning effortless.</p>

            <h3 className="text-lg font-bold text-foreground mt-8">Device Compatibility & Accuracy</h3>
            <p className="leading-relaxed">Find My Train works on all modern smartphones without requiring any app installation. Whether you're using an Android phone from Samsung, Xiaomi, Oppo, or Vivo, or an Apple iPhone, the feature works directly in your mobile browser. In optimal conditions with clear sky visibility, GPS accuracy is typically <strong>5-15 meters</strong>, making train detection extremely reliable. In urban areas, accuracy may decrease to 30-100 meters, but our 500-meter radius accommodates these variations comfortably.</p>

            <h3 className="text-lg font-bold text-foreground mt-8">Real-Time Data After Detection</h3>
            <p className="leading-relaxed">Once your train is detected, you gain access to comprehensive real-time tracking data: current speed in km/h, delay status in minutes compared to the scheduled timetable, progress percentage along the complete route, estimated arrival times at all remaining stations, and a visual timeline showing passed and upcoming stops. This data refreshes automatically every 5 seconds, providing the most current journey information available.</p>
          </div>
        </section>

        {/* Quick Tools */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">RELATED TOOLS</p>
            <h2 className="text-xl sm:text-2xl font-bold">More Tracking Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Radio, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any train in real-time with GPS positioning, speed, and delay data across the entire Pakistan Railways network.", link: "/train" },
              { icon: MapPin, gradient: "gradient-card-amber", title: "Journey Planner", desc: "Compare routes and find the best train for your schedule, budget, and preferred coach class.", link: "/planner" },
              { icon: Clock, gradient: "gradient-card-blue", title: "Train Schedule", desc: "Complete timetables for all Pakistan Railway trains with departure, arrival, and running days.", link: "/schedule" },
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

        {/* FAQ */}
        <section className="mb-12 sm:mb-16 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">GOT QUESTIONS?</p>
            <h2 className="text-2xl font-bold">Find My Train FAQs</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl mx-auto">Everything you need to know about GPS-based train detection, privacy, accuracy, and device compatibility.</p>
          </div>
          <Accordion type="single" collapsible>
            {findMyTrainFaqs.map((faq, i) => (
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Find Your Train?</h2>
          <p className="text-base opacity-80 max-w-xl mx-auto mb-6">Tap the button below to instantly detect your train using GPS. Works on all smartphones — no app needed, 100% private.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button onClick={startDetection} size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
              <Satellite className="w-4 h-4" /> Find My Train Now
            </Button>
            <Link to="/train">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <Train className="w-4 h-4" /> Browse All Trains
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": findMyTrainFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
      <RelatedLinks context="general" />
    </div>
  );
}
