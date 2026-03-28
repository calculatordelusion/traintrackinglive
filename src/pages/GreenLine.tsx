import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RelatedLinks from "@/components/RelatedLinks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Train, Clock, MapPin, Star, Zap, Shield, Wifi, Utensils, BatteryCharging, ArrowRight, Navigation, CreditCard, HelpCircle, Users, Gauge, Route, Calendar } from "lucide-react";
import PremiumHero from "@/components/PremiumHero";
import { fetchTrainDetail, type TrainDetail } from "@/lib/trainApi";
import SEOHead from "@/components/SEOHead";

const routeStations = [
  { name: "Karachi Cantt", platform: "Platform 1", time: "15:30", type: "Departure", day: "Day 1" },
  { name: "Hyderabad Junction", platform: "Platform 2", time: "18:45", type: "Stop", day: "Day 1" },
  { name: "Sukkur Junction", platform: "Platform 1", time: "23:30", type: "Stop", day: "Day 1" },
  { name: "Multan Cantt", platform: "Platform 3", time: "04:15", type: "Stop", day: "Day 2" },
  { name: "Sahiwal", platform: "Platform 1", time: "05:50", type: "Stop", day: "Day 2" },
  { name: "Lahore Junction", platform: "Platform 4", time: "08:00", type: "Stop", day: "Day 2" },
  { name: "Rawalpindi", platform: "Platform 1", time: "11:15", type: "Stop", day: "Day 2" },
  { name: "Margala (Islamabad)", platform: "Platform 1", time: "12:00", type: "Arrival", day: "Day 2" },
];

const coachClasses = [
  { name: "AC Business", fare: "Rs. 6,500", gradient: "gradient-card-emerald", features: ["Reclining seats with extra legroom", "Complimentary gourmet meals & beverages", "Power outlets at every seat", "Free WiFi connectivity", "Priority boarding & dedicated staff"] },
  { name: "AC Standard", fare: "Rs. 3,200", gradient: "gradient-card-blue", features: ["Air-conditioned coaches", "Comfortable reserved seating", "Charging points available", "Meal service (paid)", "Great value for AC travel"] },
  { name: "AC Sleeper", fare: "Rs. 4,800", gradient: "gradient-card-purple", features: ["Individual sleeping berths", "Privacy curtains", "Bedding & pillows provided", "AC throughout the night", "Ideal for overnight comfort"] },
  { name: "Economy", fare: "Rs. 1,200", gradient: "gradient-card-amber", features: ["Standard comfortable seating", "Fan-cooled coaches", "Budget-friendly travel", "Reserved seat option", "Accessible to all travelers"] },
];

const premiumFeatures = [
  { icon: Wifi, title: "Free WiFi", desc: "High-speed internet in Business class for seamless connectivity throughout your journey", gradient: "gradient-card-emerald" },
  { icon: Utensils, title: "Meal Service", desc: "Complimentary gourmet meals and hot beverages served fresh in AC Business class", gradient: "gradient-card-amber" },
  { icon: BatteryCharging, title: "Power Outlets", desc: "Charging facilities at every seat — keep your devices powered for the entire 20-hour journey", gradient: "gradient-card-blue" },
  { icon: Shield, title: "Security", desc: "Dedicated Railways Police Force onboard ensuring 24/7 passenger safety and security", gradient: "gradient-card-purple" },
  { icon: Gauge, title: "Punctuality", desc: "One of Pakistan Railways' most punctual services with 85%+ on-time performance rate", gradient: "gradient-card-rose" },
  { icon: Users, title: "Professional Staff", desc: "Trained hospitality staff providing attentive service throughout the journey", gradient: "gradient-card-teal" },
];

const greenLineFaqs = [
  { q: "What is the Green Line Express?", a: "The Green Line Express (5UP/6DN) is Pakistan Railways' flagship premium train service connecting Karachi Cantt to Margala (Islamabad). It's widely regarded as the best train in Pakistan, offering AC Business class with complimentary meals, free WiFi, power outlets, and professional hospitality staff." },
  { q: "What is the Green Line Express schedule?", a: "The 5UP departs Karachi Cantt daily at 15:30 and arrives at Margala (Islamabad) at 12:00 the next day (~20h 30m). The 6DN departs Margala daily at 14:30 and arrives at Karachi Cantt at 11:00 the next day (~20h 30m)." },
  { q: "What are the ticket prices for Green Line Express?", a: "Fares start from Rs. 1,200 for Economy class, Rs. 3,200 for AC Standard, Rs. 4,800 for AC Sleeper, and Rs. 6,500 for AC Business class. AC Business includes complimentary meals and WiFi." },
  { q: "Does the Green Line Express have WiFi?", a: "Yes, AC Business class passengers enjoy complimentary WiFi connectivity throughout the journey. This makes Green Line the only Pakistan Railways train with onboard internet service." },
  { q: "What meals are served on Green Line Express?", a: "AC Business class passengers receive complimentary gourmet meals including dinner, breakfast, and beverages. Other classes can purchase meals from the pantry car. The menu includes both Pakistani and continental options." },
  { q: "How many stops does the Green Line Express make?", a: "The Green Line Express makes 6 major stops: Hyderabad, Sukkur, Multan Cantt, Sahiwal, Lahore Junction, and Rawalpindi — before arriving at Margala (Islamabad). This limited number of stops ensures faster journey times." },
  { q: "How do I book Green Line Express tickets?", a: "Tickets can be booked online at pak-railways.gov.pk, through the Pakistan Railways mobile app, or at any major railway station counter. For peak seasons and holidays, advance booking of 15-30 days is strongly recommended, especially for AC Business class." },
  { q: "Is the Green Line Express air-conditioned?", a: "Yes, the Green Line offers multiple AC classes: AC Business (premium with meals), AC Standard (comfortable AC travel), and AC Sleeper (overnight berths). Economy class is fan-cooled." },
  { q: "How can I track Green Line Express live?", a: "You can track the Green Line Express in real-time on Track My Train. Our live tracker shows the exact GPS position, current speed, delay status, and estimated arrival times at all upcoming stations, updated every 5 seconds." },
  { q: "What is the distance covered by Green Line Express?", a: "The Green Line Express covers approximately 1,200 km between Karachi Cantt and Margala (Islamabad), traversing through the entire length of Pakistan's Main Line 1 (ML-1)." },
  { q: "Is the Green Line Express safe for families?", a: "Yes, the Green Line is one of the safest trains in Pakistan. It has dedicated Railways Police onboard, CCTV surveillance, and well-lit coaches. AC Business and AC Sleeper classes are especially popular with families traveling with children." },
  { q: "What is the rating of Green Line Express?", a: "The Green Line Express has a user rating of 4.8/5 stars, making it the highest-rated train service in Pakistan. Passengers consistently praise its punctuality, comfort, meal service, and professional staff." },
];

export default function GreenLinePage() {
  const [trainData, setTrainData] = useState<TrainDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTrainDetail(5);
        setTrainData(data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <main>
      <SEOHead
        title="Green Line Express — Schedule, Fares & Tracking 2026"
        description="Green Line Express (5UP/6DN) complete guide — Karachi to Islamabad schedule, AC class fares Rs 1,200–6,500, live GPS tracking, and booking tips."
        canonical="/green-line-express"
        keywords="green line express, green line train pakistan, karachi islamabad train, green line express schedule 2026, green line ticket price, 5UP 6DN train, green line express booking, green line express fare, green line stops, green line express timing"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Express Trains", url: "/express-trains" }, { name: "Green Line Express", url: "/green-line-express" }]}
        faqSchema={greenLineFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "Trip",
          "name": "Green Line Express (5UP/6DN)",
          "description": "Pakistan Railways' flagship premium train service from Karachi Cantt to Margala (Islamabad) with AC Business class, complimentary meals, and WiFi.",
          "departureStation": { "@type": "TrainStation", "name": "Karachi Cantt" },
          "arrivalStation": { "@type": "TrainStation", "name": "Margala (Islamabad)" },
          "provider": { "@type": "Organization", "name": "Pakistan Railways" }
        }, {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Green Line Express Coach Classes Comparison",
          "description": "Compare all 4 coach classes on the Green Line Express — AC Business, AC Standard, AC Sleeper, and Economy — with fares, features, and comfort ratings.",
          "numberOfItems": 4,
          "itemListElement": coachClasses.map((c, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": `${c.name} — ${c.fare}`,
            "description": c.features.join(". ") + "."
          }))
        }]}
      />
      <PremiumHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Express Trains", to: "/express-trains" }, { label: "Green Line Express" }]}
        badge="PAKISTAN'S #1 PREMIUM TRAIN"
        title={<>Green Line Express{" "}<span className="text-gradient-gold">5UP / 6DN</span><br /><span className="text-xl sm:text-2xl md:text-3xl font-bold opacity-80">Complete Guide 2026</span></>}
        subtitle="Pakistan Railways' flagship premium train — Karachi Cantt to Margala (Islamabad). AC Business class, complimentary meals, free WiFi, and real-time GPS tracking."
        subtitleUrdu="گرین لائن ایکسپریس — کراچی سے اسلام آباد"
        centered
      >
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <Link to="/train/5">
            <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
              <Navigation className="w-4 h-4" /> Track Green Line Live
            </Button>
          </Link>
          <Link to="/ticket-pricing">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-[hsl(0_0%_100%/0.3)] bg-transparent text-primary-foreground hover:bg-[hsl(0_0%_100%/0.1)] rounded-xl gap-2">
              <CreditCard className="w-4 h-4" /> View Ticket Prices
            </Button>
          </Link>
        </div>
      </PremiumHero>

      {/* Floating Stats */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "5UP/6DN", label: "Train Numbers", icon: Train, gradient: "gradient-card-emerald" },
            { value: "Daily", label: "Frequency", icon: Calendar, gradient: "gradient-card-amber" },
            { value: "1,200 km", label: "Total Distance", icon: Route, gradient: "gradient-card-blue" },
            { value: "★ 4.8", label: "User Rating", icon: Star, gradient: "gradient-card-purple" },
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

        {/* About Section */}
        <section className="mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">ABOUT</p>
            <h2 className="text-2xl sm:text-3xl font-bold">About Green Line Express</h2>
          </div>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p className="text-base leading-relaxed">
              The <strong className="text-foreground">Green Line Express (5UP/6DN)</strong> stands as one of Pakistan Railways' most prestigious and sought-after train services, establishing a vital connection between <strong className="text-foreground">Karachi Cantt</strong> and <strong className="text-foreground">Margala (Islamabad)</strong>. Since its inception, this flagship service has set the benchmark for premium rail travel in Pakistan, offering an experience that combines modern comfort with the timeless romance of train journeys.
            </p>
            <p className="text-base leading-relaxed">
              What sets the Green Line apart is its unwavering commitment to punctuality, passenger comfort, and professional service. The train features state-of-the-art coaches, including AC Business class with reclining seats, complimentary meals, and charging facilities — making it the preferred choice for business travelers, families, and tourists alike. Whether you're traveling for work or pleasure, the Green Line promises a journey as memorable as the destination.
            </p>
            <p className="text-base leading-relaxed">
              Covering approximately <strong className="text-foreground">1,200 km</strong> along Pakistan's Main Line 1, the Green Line Express traverses through the heart of the country, passing through major cities including Hyderabad, Sukkur, Multan, Lahore, and Rawalpindi. The journey takes approximately <strong className="text-foreground">20 hours and 30 minutes</strong>, with the train departing daily from both terminals.
            </p>
          </div>
        </section>

        {/* Premium Features */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">PREMIUM AMENITIES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Why Green Line is Pakistan's Best Train</h2>
            <p className="text-sm text-muted-foreground mt-1">Unmatched comfort and service on every journey</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {premiumFeatures.map((f, i) => (
              <Card key={i} className={`${f.gradient} border hover-lift group`}>
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{f.title}</h4>
                  <p className="text-xs text-muted-foreground leading-snug">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Route & Stations */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">ROUTE MAP</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Route & Major Stations</h2>
            <p className="text-sm text-muted-foreground mt-1">8 major stops across 1,200 km — Karachi to Islamabad</p>
          </div>
          <div className="max-w-2xl mx-auto">
            {routeStations.map((station, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${i === 0 || i === routeStations.length - 1 ? "bg-primary border-primary" : "bg-background border-primary/50"} z-10 transition-transform group-hover:scale-125`} />
                  {i < routeStations.length - 1 && <div className="w-0.5 flex-1 bg-primary/20" />}
                </div>
                <Card className={`flex-1 mb-3 hover-lift group-hover:border-primary/30 transition-all ${i === 0 ? "gradient-card-emerald" : i === routeStations.length - 1 ? "gradient-card-blue" : ""}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{station.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span>{station.platform}</span>
                        <span>•</span>
                        <span>{station.day}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{station.time}</div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${station.type === "Departure" ? "bg-primary/10 text-primary" : station.type === "Arrival" ? "bg-accent/10 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                        {station.type}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Schedule */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TIMETABLE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Daily Schedule</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { train: "5UP", route: "Karachi Cantt → Margala", dep: "15:30", depStation: "Karachi Cantt", arr: "12:00 (+1)", arrStation: "Margala", duration: "~20h 30m", gradient: "gradient-card-emerald" },
              { train: "6DN", route: "Margala → Karachi Cantt", dep: "14:30", depStation: "Margala", arr: "11:00 (+1)", arrStation: "Karachi Cantt", duration: "~20h 30m", gradient: "gradient-card-blue" },
            ].map((s, i) => (
              <Card key={i} className={`${s.gradient} border hover-lift group`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">{s.train}</span>
                    <span className="text-sm font-medium text-muted-foreground">{s.route}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">{s.dep}</div>
                      <div className="text-xs text-muted-foreground">{s.depStation}</div>
                    </div>
                    <div className="flex flex-col items-center px-3">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground mt-1">{s.duration}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{s.arr}</div>
                      <div className="text-xs text-muted-foreground">{s.arrStation}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Coach Classes & Fares */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TICKET PRICES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Available Coach Classes & Fares</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose the class that suits your budget and comfort</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {coachClasses.map((c, i) => (
              <Card key={i} className={`${c.gradient} border hover-lift group h-full`}>
                <CardContent className="p-5">
                  <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{c.name}</h3>
                  <div className="text-xl font-black text-primary mb-3">{c.fare}</div>
                  <ul className="space-y-1.5">
                    {c.features.map((f, j) => (
                      <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-primary mt-0.5">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Live Tracking CTA */}
        <section className="mb-12 sm:mb-16">
          <Card className="gradient-card-emerald border overflow-hidden">
            <CardContent className="p-6 sm:p-10 text-center">
              <Navigation className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Track Green Line Live</h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-4">
                Monitor the Green Line train in real-time. View current position, speed, delay status, and accurate ETAs for all upcoming stations on your route. Data refreshes every 5 seconds.
              </p>
              {trainData?.livePosition && (
                <div className="inline-flex items-center gap-3 bg-primary/10 rounded-xl px-4 py-2 mb-4 text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-medium">Currently {trainData.livePosition.status === "moving" ? `moving at ${trainData.livePosition.speed} km/h` : trainData.livePosition.status === "at-station" ? `at ${trainData.livePosition.lastStation}` : trainData.livePosition.status}</span>
                  {trainData.livePosition.delayMinutes > 0 && <span className="text-destructive font-medium">({trainData.livePosition.delayMinutes}m late)</span>}
                </div>
              )}
              <div className="flex justify-center">
                <Link to="/train/5">
                  <Button size="lg" className="rounded-xl font-semibold gap-2">
                    <Train className="w-4 h-4" /> Open Live Tracker
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-3">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold">Green Line Express FAQs</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {greenLineFaqs.map((faq, i) => (
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

        {/* Booking & Travel Tips */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TRAVEL TIPS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Green Line Booking & Travel Tips</h2>
            <p className="text-sm text-muted-foreground mt-1">Plan your Green Line journey like a pro</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: "🎫", title: "Book 15-30 Days Early", desc: "AC Business class seats sell out fast, especially during Eid, summer vacations, and weekends. Book online at pak-railways.gov.pk or at any major railway station counter for guaranteed reservation.", gradient: "gradient-card-emerald" },
              { icon: "🧳", title: "Luggage Allowance", desc: "Each passenger can carry up to 40kg of luggage. Keep valuables in your carry-on bag. AC Business passengers get priority luggage handling and dedicated storage space in the coach.", gradient: "gradient-card-amber" },
              { icon: "📍", title: "Best Boarding Stations", desc: "Karachi Cantt and Lahore Junction offer the best facilities — waiting lounges, food stalls, and clean restrooms. Intermediate stations like Sukkur and Multan also have good platforms.", gradient: "gradient-card-blue" },
              { icon: "🍽️", title: "Meal Service Details", desc: "AC Business includes complimentary dinner (departing Karachi) and breakfast (arriving Islamabad). Menu features biryani, grilled chicken, fresh naan, and beverages. Other classes can buy from the pantry car.", gradient: "gradient-card-purple" },
              { icon: "📱", title: "Track Your Journey", desc: "Use our live tracker to share your real-time location with family. The GPS updates every 5 seconds showing your exact position, speed, and ETA at the next station along the 1,200 km route.", gradient: "gradient-card-rose" },
              { icon: "🌙", title: "Overnight Comfort", desc: "The Green Line departs at 15:30 and arrives next day at 12:00. AC Sleeper berths offer the best overnight comfort with individual beds, pillows, and blankets. Light sleepers should bring earplugs.", gradient: "gradient-card-teal" },
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

        {/* Related Links */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">EXPLORE MORE</p>
            <h2 className="text-xl sm:text-2xl font-bold">Related Tools & Resources</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Zap, gradient: "gradient-card-emerald", title: "All Express Trains", desc: "Browse all express and AC trains with schedules and live tracking.", link: "/express-trains" },
              { icon: CreditCard, gradient: "gradient-card-amber", title: "Ticket Pricing", desc: "Complete fare chart for all classes across all major routes.", link: "/ticket-pricing" },
              { icon: MapPin, gradient: "gradient-card-blue", title: "Journey Planner", desc: "Plan your route and compare trains between any two stations.", link: "/planner" },
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Travel on Green Line?</h2>
          <p className="text-base opacity-80 max-w-xl mx-auto mb-6">Track the Green Line Express in real-time, check ticket prices, and plan your perfect journey across Pakistan.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/train/5">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Train className="w-4 h-4" /> Track Green Line Live
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
        "mainEntity": greenLineFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
      <RelatedLinks context="train" currentName="Green Line Express" />
    </main>
  );
}
