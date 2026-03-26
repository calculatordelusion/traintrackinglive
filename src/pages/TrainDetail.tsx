import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Train, Wifi, Navigation, AlertTriangle, Calendar, CreditCard, Route, Search, HelpCircle, Shield, Users, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchTrainDetail, type TrainDetail } from "@/lib/trainApi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import RelatedLinks from "@/components/RelatedLinks";

export default function TrainDetailPage() {
  const { id } = useParams();
  const [train, setTrain] = useState<TrainDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTrainDetail(Number(id));
        setTrain(data);
        setLastUpdate(new Date());
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading train details...</p>
      </div>
    );
  }

  if (!train) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Train className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">Train Not Found</h1>
        <p className="text-muted-foreground mb-6">The train you're looking for doesn't exist.</p>
        <Link to="/train"><Button>Back to Live Trains</Button></Link>
      </div>
    );
  }

  const pos = train.livePosition;
  const isLive = !!pos;
  const speed = pos?.speed ?? 0;
  const delay = pos?.delayMinutes ?? 0;
  const statusTag = !isLive ? "Not Running" : delay === 0 ? "On Time" : delay < 15 ? "Slight Delay" : "Delayed";
  const statusColor = !isLive ? "bg-muted text-muted-foreground" : delay === 0 ? "bg-primary/10 text-primary" : delay < 15 ? "bg-accent/20 text-accent-foreground" : "bg-destructive/10 text-destructive";

  const trainFaqs = [
    { q: `What is the route of ${train.name} ${train.number}?`, a: `${train.name} ${train.number} runs from ${train.from} to ${train.to}. The total journey takes ${train.duration}. It departs from ${train.from} at ${train.departureTime} and arrives at ${train.to} at ${train.arrivalTime}${train.stops.length > 0 ? `, stopping at ${train.stops.length} stations along the way` : ""}.` },
    { q: `Is ${train.name} running today?`, a: `${train.name} ${train.number} runs on: ${train.days.join(", ")}. It is currently ${train.status === "active" ? "active and operational" : "inactive/suspended"}. Use TrackMyTrain.pk's live tracker to check the real-time status and position.` },
    { q: `How can I track ${train.name} in real-time?`, a: `You can track ${train.name} ${train.number} live on this page! When the train is running, you'll see its exact GPS position, current speed, delay status, and progress along the route. Data refreshes every 30 seconds automatically.` },
    { q: `What is the departure time of ${train.name}?`, a: `${train.name} ${train.number} departs from ${train.from} at ${train.departureTime}. The train arrives at its destination ${train.to} at ${train.arrivalTime}, with a total journey duration of ${train.duration}. Note that actual departure times may vary due to operational delays.` },
    { q: `Is ${train.name} delayed today?`, a: isLive ? (delay > 0 ? `Currently, ${train.name} ${train.number} is running approximately ${delay} minutes late. You can monitor the live delay status on this page, which updates every 30 seconds.` : `${train.name} ${train.number} is currently running on time with no reported delays.`) : `${train.name} ${train.number} is not currently running. Check back during its operating hours to see live delay status. You can also visit our Check Delays page for status of all trains.` },
    { q: `What type of train is ${train.name}?`, a: `${train.name} is classified as a${train.type === "ac" ? "n AC (air-conditioned)" : train.type === "express" ? "n express" : ` ${train.type}`} train. ${train.type === "ac" ? "AC trains offer premium air-conditioned coaches with comfortable seating, making them ideal for long-distance travel." : train.type === "express" ? "Express trains are faster intercity services that make limited stops compared to passenger trains, reducing overall journey time." : "This train type provides affordable connectivity between stations on its route."}` },
    { q: `How many stops does ${train.name} make?`, a: train.stops.length > 0 ? `${train.name} ${train.number} makes ${train.stops.length} stops between ${train.from} and ${train.to}. The complete route includes both major junction stations and smaller intermediate stops. You can see the full list of stops with arrival/departure times in the Route & Schedule section above.` : `Detailed stop information for ${train.name} ${train.number} is available when you view the full schedule. The train operates between ${train.from} and ${train.to} with a journey time of ${train.duration}.` },
    { q: `How fast does ${train.name} travel?`, a: isLive ? `${train.name} ${train.number} is currently traveling at ${speed} km/h. Train speeds vary throughout the journey based on track conditions, station approaches, and speed restrictions. Express trains on the Main Line typically average 60-80 km/h including stops.` : `${train.name} ${train.number} is not currently running, so live speed data is unavailable. When active, you can see the real-time speed on this page. Pakistan Railways express trains typically travel at 60-100 km/h depending on the section of track.` },
  ];

  return (
    <div>
      <SEOHead
        title={`${train.name} ${train.number} — Live Status, Route & Schedule 2026`}
        description={`Track ${train.name} ${train.number} live — ${train.from} to ${train.to}. Real-time GPS position, speed ${speed > 0 ? `(${speed} km/h)` : ""}, delay status${delay > 0 ? ` (${delay} min late)` : ""}, and full route schedule. Journey time: ${train.duration}.`}
        canonical={`/train/${train.id}`}
        keywords={`${train.name} live status, ${train.name} ${train.number} tracking, ${train.name} delay, ${train.from} to ${train.to} train, ${train.name} schedule, pakistan railways ${train.name}`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Live Trains", url: "/train" },
          { name: `${train.name} ${train.number}`, url: `/train/${train.id}` },
        ]}
        faqSchema={trainFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "Trip",
          "name": `${train.name} ${train.number}`,
          "description": `${train.name} train service from ${train.from} to ${train.to}. Duration: ${train.duration}. Departure: ${train.departureTime}.`,
          "departureTime": train.departureTime,
          "arrivalTime": train.arrivalTime,
          "itinerary": {
            "@type": "ItemList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": train.from },
              { "@type": "ListItem", "position": 2, "name": train.to }
            ]
          },
          "provider": {
            "@type": "Organization",
            "name": "Pakistan Railways"
          }
        }]}
      />
      <section className="bg-hero-gradient text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-2">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <Link to="/train" className="opacity-70 hover:opacity-100">Live Trains</Link>
            <span className="opacity-50">›</span>
            <span>{train.name} {train.number}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Link to="/train" className="inline-flex items-center gap-1 text-sm text-primary mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to all trains
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {isLive && (
                        <span className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary live-pulse" /> LIVE
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">#{train.id}</span>
                    </div>
                    <h1 className="text-2xl font-bold">{train.name} {train.number}</h1>
                    <p className="text-muted-foreground">{train.nameUrdu}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor}`}>{statusTag}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <MapPin className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="text-xs text-muted-foreground">Route</div>
                    <div className="text-sm font-medium">{train.from} → {train.to}</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="text-xs text-muted-foreground">Duration</div>
                    <div className="text-sm font-medium">{train.duration}</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <Navigation className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="text-xs text-muted-foreground">Speed</div>
                    <div className="text-sm font-medium">{isLive ? `${speed} km/h` : "—"}</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <Wifi className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="text-xs text-muted-foreground">Delay</div>
                    <div className="text-sm font-medium">{isLive ? (delay > 0 ? `${delay} min late` : "On Time") : "—"}</div>
                  </div>
                </div>

                {pos && (
                  <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-medium">Current Position:</span>
                      <span className="text-muted-foreground">Between {pos.lastStation} and {pos.nextStation}</span>
                    </div>
                    <div className="mt-2">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pos.progress}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{train.from}</span>
                        <span>{Math.round(pos.progress)}% complete</span>
                        <span>{train.to}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* About This Train */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-3">About {train.name}</h2>
                <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                  <p><strong className="text-foreground">{train.name} ({train.nameUrdu})</strong> is a {train.type === "ac" ? "premium air-conditioned" : train.type === "express" ? "popular express" : train.type} train service operated by Pakistan Railways on the {train.from} to {train.to} route. With a journey time of {train.duration}, it is one of the key rail services connecting these important cities.</p>
                  <p>The train departs from {train.from} at {train.departureTime} and arrives at {train.to} at {train.arrivalTime}. It operates on {train.days.length === 7 ? "all days of the week (daily service)" : `selected days: ${train.days.join(", ")}`}, making it a {train.days.length === 7 ? "reliable daily" : "scheduled"} option for passengers traveling this route.</p>
                  <p>{train.type === "ac" ? `As an AC (air-conditioned) service, ${train.name} offers premium comfort with climate-controlled coaches, making it especially popular during Pakistan's hot summer months. AC trains typically feature padded seating, cleaner interiors, and a more comfortable travel experience compared to standard services.` : train.type === "express" ? `As an express service, ${train.name} makes fewer stops than passenger trains, resulting in shorter overall journey times. Express trains are the most popular category among intercity travelers in Pakistan, offering a good balance of speed, comfort, and affordability.` : `${train.name} provides essential connectivity for passengers along its route, serving both major stations and smaller intermediate stops.`}</p>
                  <p>You can track {train.name} in real-time on this page whenever it's running. Our GPS-based tracking shows the train's exact position, current speed, and delay status with updates every 30 seconds. For ticket pricing information, visit our <Link to="/ticket-pricing" className="text-primary hover:underline">ticket pricing page</Link>. To check all available trains on this corridor, use the <Link to="/planner" className="text-primary hover:underline">journey planner</Link>.</p>
                </div>
              </CardContent>
            </Card>

            {/* Route Timeline */}
            {train.stops.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4">Route & Schedule</h2>
                  <div className="space-y-0">
                    {train.stops.map((stop, i) => {
                      const isPassed = pos ? (pos.progress / 100) * train.stops[train.stops.length - 1].distance > stop.distance : false;
                      const isCurrent = pos && pos.lastStation === stop.station;
                      return (
                        <div key={i} className="flex items-start gap-4 relative">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full border-2 ${
                              isCurrent ? 'bg-primary border-primary scale-125' : 
                              i === 0 ? 'bg-primary border-primary' : 
                              i === train.stops.length - 1 ? 'bg-destructive border-destructive' : 
                              isPassed ? 'bg-primary/50 border-primary/50' : 'bg-card border-muted-foreground/30'
                            }`} />
                            {i < train.stops.length - 1 && (
                              <div className={`w-0.5 h-12 ${isPassed ? 'bg-primary/50' : 'bg-border'}`} />
                            )}
                          </div>
                          <div className="pb-6 flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`font-medium text-sm ${isCurrent ? 'text-primary font-bold' : ''}`}>
                                {stop.station} {isCurrent && '📍'}
                              </span>
                              <div className="text-xs text-muted-foreground">
                                {stop.distance > 0 ? `${stop.distance} km` : "Origin"}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {stop.arrival !== "--" && <span>Arr: {stop.arrival}</span>}
                              {stop.arrival !== "--" && stop.departure !== "--" && <span className="mx-1">|</span>}
                              {stop.departure !== "--" && <span>Dep: {stop.departure}</span>}
                              {stop.day > 1 && <span className="ml-2 text-primary">(Day {stop.day})</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Train FAQ */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold">Frequently Asked Questions About {train.name}</h2>
                </div>
                <Accordion type="single" collapsible>
                  {trainFaqs.map((faq, i) => (
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

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">Train Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium capitalize">{train.type}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="font-medium capitalize">{train.status}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Departure</span><span className="font-medium">{train.departureTime}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Arrival</span><span className="font-medium">{train.arrivalTime}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{train.duration}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Runs On</span><span className="font-medium text-xs">{train.days.join(", ")}</span></div>
                  {train.stops.length > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Total Stops</span><span className="font-medium">{train.stops.length}</span></div>}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Wifi className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold mb-1">{isLive ? "Live Tracking Active" : "Tracking Available"}</h3>
                <p className="text-sm opacity-80">Data updates every 30 seconds</p>
                <p className="text-xs opacity-60 mt-2">Last updated: {lastUpdate.toLocaleTimeString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">Explore More</h3>
                <div className="space-y-2">
                  <Link to="/schedule" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Calendar className="w-4 h-4 text-primary" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Full Schedule</div><div className="text-[10px] text-muted-foreground">All train timetables</div></div>
                  </Link>
                  <Link to="/check-delays" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-destructive" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Check Delays</div><div className="text-[10px] text-muted-foreground">Live delay monitor</div></div>
                  </Link>
                  <Link to="/planner" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center"><Route className="w-4 h-4 text-accent-foreground" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Journey Planner</div><div className="text-[10px] text-muted-foreground">Plan your trip</div></div>
                  </Link>
                  <Link to="/ticket-pricing" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center"><CreditCard className="w-4 h-4 text-secondary-foreground" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Ticket Prices</div><div className="text-[10px] text-muted-foreground">Fares & classes</div></div>
                  </Link>
                  <Link to="/find-my-train" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Search className="w-4 h-4 text-primary" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">Find My Train</div><div className="text-[10px] text-muted-foreground">GPS auto-detect</div></div>
                  </Link>
                  <Link to="/stations" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center"><MapPin className="w-4 h-4 text-accent-foreground" /></div>
                    <div><div className="text-sm font-medium group-hover:text-primary transition-colors">All Stations</div><div className="text-[10px] text-muted-foreground">342+ station directory</div></div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <RelatedLinks context="train" currentName={train?.name} />
    </div>
  );
}