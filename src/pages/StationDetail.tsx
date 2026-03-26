import { useParams, Link } from "react-router-dom";
import RelatedLinks from "@/components/RelatedLinks";
import { getStationBySlug } from "@/data/stations";
import { trains } from "@/data/trains";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Train, Clock, Route, Calendar, Navigation, CreditCard, AlertTriangle, HelpCircle, Search, Shield, Globe, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";

export default function StationDetailPage() {
  const { slug } = useParams();
  const station = getStationBySlug(slug || "");

  if (!station) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">Station Not Found</h1>
        <Link to="/stations"><Button>Back to Stations</Button></Link>
      </div>
    );
  }

  const stationTrains = trains.filter(t => station.trainIds.includes(t.id));
  const expressTrains = stationTrains.filter(t => t.type === "express" || t.type === "ac");
  const activeTrains = stationTrains.filter(t => t.status === "active");

  const stationFaqs = [
    { q: `How many trains stop at ${station.name} railway station?`, a: `${station.name} railway station is served by ${stationTrains.length} trains. Of these, ${activeTrains.length} are currently active and running on schedule. The station connects ${station.city} to major cities across Pakistan via the Pakistan Railways network.` },
    { q: `What facilities are available at ${station.name} station?`, a: `${station.name} station offers the following facilities: ${station.facilities.join(", ")}. These amenities ensure a comfortable experience for passengers traveling through ${station.city}, ${station.province}.` },
    { q: `Where is ${station.name} railway station located?`, a: `${station.name} (${station.nameUrdu}) railway station is located in ${station.city}, ${station.province}, Pakistan. The exact coordinates are latitude ${station.lat.toFixed(4)} and longitude ${station.lng.toFixed(4)}. It is accessible by road from the main city center.` },
    { q: `Can I track trains arriving at ${station.name} in real-time?`, a: `Yes! You can track all trains arriving at or departing from ${station.name} in real-time using TrackMyTrain.pk's live GPS tracker. Simply visit the Live Trains page, find your train, and see its exact position, speed, and estimated arrival time at ${station.name}.` },
    { q: `What are the main express trains that stop at ${station.name}?`, a: expressTrains.length > 0 ? `The main express trains stopping at ${station.name} include: ${expressTrains.slice(0, 5).map(t => t.name).join(", ")}${expressTrains.length > 5 ? `, and ${expressTrains.length - 5} more` : ""}. These trains connect ${station.city} to major destinations across Pakistan.` : `Currently, ${station.name} is primarily served by passenger trains. Check our live tracker for the latest services available at this station.` },
    { q: `How do I check delays for trains at ${station.name}?`, a: `To check if trains at ${station.name} are running late, visit our Check Delays page at trackmytrain.pk/check-delays. You can see real-time delay status for every active train, including those stopping at ${station.name}. Delay data is updated every 30 seconds.` },
    { q: `Is there parking available at ${station.name}?`, a: station.facilities.includes("Parking") ? `Yes, ${station.name} has parking facilities available for passengers. However, parking space may be limited during peak travel times such as Eid holidays and weekends. We recommend arriving early during busy periods.` : `${station.name} does not have dedicated parking facilities listed. Passengers typically use nearby public parking areas or arrange drop-off/pickup transportation.` },
    { q: `How can I plan a journey from ${station.name}?`, a: `Use TrackMyTrain.pk's Journey Planner at trackmytrain.pk/planner to find all available trains from ${station.name} to your destination. Enter "${station.name}" as your origin station and select your destination to see all direct train options with schedules, durations, and running days.` },
  ];

  return (
    <div>
      <SEOHead
        title={`${station.name} Railway Station — Trains, Schedule & Facilities 2026`}
        description={`${station.name} (${station.nameUrdu}) railway station in ${station.city}, ${station.province}. View all ${stationTrains.length} trains, schedules, facilities like ${station.facilities.slice(0, 3).join(", ")}, and real-time tracking information.`}
        canonical={`/stations/${slug}`}
        keywords={`${station.name} station, ${station.name} railway station, ${station.city} station trains, ${station.name} schedule, ${station.name} facilities, pakistan railways ${station.city}`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Stations", url: "/stations" },
          { name: station.name, url: `/stations/${slug}` },
        ]}
        faqSchema={stationFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "TrainStation",
          "name": `${station.name} Railway Station`,
          "alternateName": station.nameUrdu,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": station.city,
            "addressRegion": station.province,
            "addressCountry": "Pakistan"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": station.lat,
            "longitude": station.lng
          },
          "amenityFeature": station.facilities.map(f => ({ "@type": "LocationFeatureSpecification", "name": f, "value": true }))
        }]}
      />
      <section className="bg-hero-gradient text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <Link to="/stations" className="opacity-70 hover:opacity-100">Stations</Link>
            <span className="opacity-50">›</span>
            <span>{station.name}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Link to="/stations" className="inline-flex items-center gap-1 text-sm text-primary mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to stations
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold">{station.name} Railway Station</h1>
                <p className="text-muted-foreground">{station.nameUrdu}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {station.city}, {station.province}</span>
                  <span>Lat: {station.lat.toFixed(4)}, Lng: {station.lng.toFixed(4)}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <Train className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="text-lg font-bold text-primary">{stationTrains.length}</div>
                    <div className="text-[10px] text-muted-foreground">Total Trains</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <Globe className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="text-lg font-bold text-primary">{activeTrains.length}</div>
                    <div className="text-[10px] text-muted-foreground">Active Trains</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <Shield className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="text-lg font-bold text-primary">{station.facilities.length}</div>
                    <div className="text-[10px] text-muted-foreground">Facilities</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About This Station */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-3">About {station.name} Railway Station</h2>
                <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                  <p>{station.name} ({station.nameUrdu}) is a railway station located in {station.city}, {station.province}, Pakistan. It is one of the important stations on the Pakistan Railways network, serving as a key stop for {stationTrains.length} trains connecting {station.city} to major cities across the country.</p>
                  <p>The station is equipped with {station.facilities.length} facilities including {station.facilities.join(", ")}, making it a well-serviced stop for passengers. {station.facilities.includes("WiFi") ? "Free WiFi is available for passengers waiting at the station." : ""} {station.facilities.includes("VIP Lounge") ? "A VIP lounge is available for premium class passengers." : ""} {station.facilities.includes("Medical Aid") ? "Medical aid services are available on-site for emergencies." : ""}</p>
                  <p>Travelers can use TrackMyTrain.pk to check real-time positions of all trains arriving at or departing from {station.name}. Our <Link to="/check-delays" className="text-primary hover:underline">delay checker</Link> shows live delay status, and the <Link to="/planner" className="text-primary hover:underline">journey planner</Link> helps you find the best train options from {station.name} to your destination.</p>
                  {expressTrains.length > 0 && (
                    <p>Major express services stopping at {station.name} include {expressTrains.slice(0, 4).map(t => t.name).join(", ")}{expressTrains.length > 4 ? ` and ${expressTrains.length - 4} more` : ""}. These trains provide connectivity to {[...new Set(expressTrains.flatMap(t => [t.from, t.to]).filter(c => c !== station.name))].slice(0, 5).join(", ")} and other destinations.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {stationTrains.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4">All Trains at {station.name} ({stationTrains.length})</h2>
                  <div className="space-y-2">
                    {stationTrains.map((train) => (
                      <Link key={train.id} to={`/train/${train.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">#{train.id}</div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{train.name} {train.number}</div>
                          <div className="text-xs text-muted-foreground">{train.from} → {train.to}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${train.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                            {train.status === "active" ? "Active" : "Inactive"}
                          </span>
                          <span className="text-[10px] text-muted-foreground capitalize">{train.type}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Station FAQ */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold">Frequently Asked Questions About {station.name}</h2>
                </div>
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
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">Station Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {station.facilities.map((f) => (
                    <span key={f} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">{f}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">Facilities information is based on latest available data. Availability may vary during renovations or off-peak hours. Contact station staff for current availability.</p>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Train className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold mb-1">Track Trains Live</h3>
                <p className="text-sm opacity-80">See real-time positions of all {activeTrains.length} active trains at {station.name}</p>
                <Link to="/train">
                  <Button size="sm" className="mt-3 bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl">
                    Open Live Tracker
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <Link to="/train" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Train className="w-4 h-4 text-primary" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Live Trains</div><div className="text-[10px] text-muted-foreground">Track trains in real-time</div></div>
                  </Link>
                  <Link to="/routes" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center"><Route className="w-4 h-4 text-accent-foreground" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Route Maps</div><div className="text-[10px] text-muted-foreground">All railway corridors</div></div>
                  </Link>
                  <Link to="/planner" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center"><Navigation className="w-4 h-4 text-secondary-foreground" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Journey Planner</div><div className="text-[10px] text-muted-foreground">Find trains from {station.name}</div></div>
                  </Link>
                  <Link to="/schedule" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Calendar className="w-4 h-4 text-primary" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Train Schedule</div><div className="text-[10px] text-muted-foreground">Complete timetables</div></div>
                  </Link>
                  <Link to="/check-delays" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-destructive" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Check Delays</div><div className="text-[10px] text-muted-foreground">Live delay status</div></div>
                  </Link>
                  <Link to="/ticket-pricing" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center"><CreditCard className="w-4 h-4 text-secondary-foreground" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Ticket Prices</div><div className="text-[10px] text-muted-foreground">Fares & booking info</div></div>
                  </Link>
                  <Link to="/find-my-train" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Search className="w-4 h-4 text-primary" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Find My Train</div><div className="text-[10px] text-muted-foreground">GPS auto-detect</div></div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <RelatedLinks context="station" currentName={station?.name} />
    </div>
  );
}