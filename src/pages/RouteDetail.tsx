import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Train, Clock, MapPin, ArrowRight, Route, CreditCard, Radio, Navigation, Lightbulb, CheckCircle2, AlertTriangle, Landmark, Timer, Zap } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { getRouteBySlug } from "@/data/routeDetails";
import NotFound from "./NotFound";

export default function RouteDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const route = getRouteBySlug(slug || "");

  if (!route) return <NotFound />;

  const title = `${route.from} to ${route.to} Train — Live Status, Schedule & Fares 2026`;
  const description = `Track ${route.from} to ${route.to} trains live. ${route.dailyTrains}+ daily services, ${route.distance} journey, fares from ${route.fareFrom}. Real-time GPS tracking, delays & ETAs. Fastest: ${route.fastestTrain} (${route.fastestDuration}).`;

  return (
    <div>
      <SEOHead
        title={title}
        description={description}
        canonical={`/routes/${route.slug}`}
        keywords={`${route.from.toLowerCase()} to ${route.to.toLowerCase()} train, ${route.from.toLowerCase()} ${route.to.toLowerCase()} train ticket price, ${route.from.toLowerCase()} to ${route.to.toLowerCase()} train schedule 2026, ${route.from.toLowerCase()} to ${route.to.toLowerCase()} train live status, ${route.from.toLowerCase()} se ${route.to.toLowerCase()} train, is ${route.from.toLowerCase()} to ${route.to.toLowerCase()} train late today`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Routes", url: "/routes" },
          { name: `${route.from} to ${route.to}`, url: `/routes/${route.slug}` },
        ]}
        faqSchema={route.faqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "TravelAction",
          "name": `${route.from} to ${route.to} Train`,
          "fromLocation": { "@type": "Place", "name": route.from + ", Pakistan" },
          "toLocation": { "@type": "Place", "name": route.to + ", Pakistan" },
          "distance": { "@type": "QuantitativeValue", "value": route.distance.replace(/,/g, "").replace(" km", ""), "unitCode": "KMT" },
        }, {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": `Trains from ${route.from} to ${route.to}`,
          "description": `All ${route.dailyTrains}+ daily train services on the ${route.from}–${route.to} railway route with schedules, durations, and live tracking.`,
          "url": `https://trackmytrain.pk/routes/${route.slug}`,
          "numberOfItems": route.trainOptions.length,
          "itemListElement": route.trainOptions.map((train, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": train.name,
            "url": `https://trackmytrain.pk/train/${train.id}`,
            "item": {
              "@type": "TrainTrip",
              "name": train.name,
              "trainNumber": train.number,
              "departureStation": { "@type": "TrainStation", "name": `${route.from} Station` },
              "arrivalStation": { "@type": "TrainStation", "name": `${route.to} Station` },
              "provider": { "@type": "Organization", "name": "Pakistan Railways" }
            }
          }))
        }, {
          "@context": "https://schema.org",
          "@type": "Trip",
          "name": `${route.from} to ${route.to} Train Journey`,
          "description": route.quickAnswer,
          "itinerary": {
            "@type": "ItemList",
            "itemListElement": route.keyStops.map((stop, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": stop
            }))
          },
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": route.fareFrom.replace(/[^0-9]/g, ""),
            "highPrice": route.fareTo.replace(/[^0-9]/g, ""),
            "priceCurrency": "PKR",
            "offerCount": route.dailyTrains
          }
        }]}
      />

      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-4">
              <Route className="w-3.5 h-3.5" /> ROUTE GUIDE • LIVE TRACKING
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
              {route.from} to {route.to} Train{" "}
              <span className="text-gradient-gold">Live Tracking & Schedule</span>
            </h1>
            <p className="text-base sm:text-lg opacity-90 mb-6 max-w-2xl">{route.quickAnswer}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/train">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl font-semibold">
                  <Radio className="w-4 h-4" /> Track Live Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/planner">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 gap-2 rounded-xl">
                  <Navigation className="w-4 h-4" /> Plan This Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Distance", value: route.distance, icon: Route, gradient: "gradient-card-emerald" },
            { label: "Fastest Train", value: `${route.fastestDuration}`, icon: Timer, gradient: "gradient-card-amber" },
            { label: "Daily Trains", value: `${route.dailyTrains}+ Services`, icon: Train, gradient: "gradient-card-blue" },
            { label: "Fare From", value: route.fareFrom, icon: CreditCard, gradient: "gradient-card-purple" },
          ].map((stat, i) => (
            <Card key={i} className={`${stat.gradient} border shadow-lg`}>
              <CardContent className="p-4 text-center">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-[11px] text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Train Options Table */}
      <section className="container mx-auto px-4 py-10 sm:py-14">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">All Trains from {route.from} to {route.to}</h2>
        <p className="text-sm text-muted-foreground mb-6">Compare all daily train services on this route — click any train for live GPS tracking.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {route.trainOptions.map((train, i) => (
            <Link key={i} to={`/train/${train.id}`}>
              <Card className="hover-lift group border h-full cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{train.type}</span>
                    <span className="text-xs font-mono text-muted-foreground">{train.number}</span>
                  </div>
                  <h3 className="font-bold group-hover:text-primary transition-colors">{train.name}</h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {train.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {route.from} → {route.to}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Track Live <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Key Stops */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Key Stations on the {route.from}–{route.to} Route</h2>
          <p className="text-sm text-muted-foreground mb-6">Major stops along the {route.distance} corridor. Click any station for live arrivals and facilities.</p>
          <div className="flex flex-wrap gap-3">
            {route.keyStops.map((stop, i) => (
              <Link key={i} to="/stations" className="flex items-center gap-2 bg-card border rounded-xl px-4 py-3 hover:border-primary/30 hover:shadow-md transition-all group">
                <Landmark className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm group-hover:text-primary transition-colors">{stop}</span>
                {i < route.keyStops.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground ml-1" />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="container mx-auto px-4 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Complete Guide: {route.from} to {route.to} Train Journey 2026</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            {route.detailContent.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" /> Travel Tips: {route.from} to {route.to}
            </h2>
            <div className="space-y-3">
              {route.travelTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-card border rounded-xl p-4">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links / Related */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-lg font-bold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: `Track ${route.from}–${route.to} Live`, icon: Radio, link: "/train", gradient: "gradient-card-emerald" },
            { label: "Check Train Delays", icon: AlertTriangle, link: "/check-delays", gradient: "gradient-card-amber" },
            { label: "Compare Ticket Prices", icon: CreditCard, link: "/ticket-pricing", gradient: "gradient-card-blue" },
            { label: "Explore All Routes", icon: Route, link: "/routes", gradient: "gradient-card-purple" },
          ].map((item, i) => (
            <Link key={i} to={item.link}>
              <Card className={`${item.gradient} border hover-lift group h-full`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{item.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{route.from} to {route.to} Train — Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground mb-6">Everything travelers ask about the {route.from}–{route.to} railway route.</p>
            <Accordion type="single" collapsible>
              {route.faqs.map((faq, i) => (
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
      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Track Your {route.from}–{route.to} Train Now</h2>
          <p className="text-base opacity-80 max-w-lg mx-auto mb-6">Get real-time GPS position, live delay status, and accurate ETAs for every train on the {route.from}–{route.to} route. 100% free.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/train">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Train className="w-4 h-4" /> Start Tracking Now
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
    </div>
  );
}
