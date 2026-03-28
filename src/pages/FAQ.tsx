import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Train, CreditCard, Navigation, MapPin, Zap, Smartphone, Shield, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import type { ReactNode } from "react";

const IL = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="text-primary font-semibold hover:underline">{children}</Link>
);

const faqCategories: {
  id: string; title: string; icon: any; gradient: string;
  faqs: { q: string; a: string; rich: ReactNode }[];
}[] = [
  {
    id: "travel", title: "Travel & On-Board Experience", icon: HelpCircle, gradient: "gradient-card-emerald",
    faqs: [
      { q: "What is the best seat position on a Pakistan Railways train?", a: "For comfort on long journeys, request a lower berth in AC Sleeper class — it doubles as a seat during the day and a bed at night. In Economy class, window seats are preferable for views and ventilation. On the Karachi–Lahore route, the left side (when facing the engine) offers scenic views through Sindh's farmlands. Avoid seats near the bathroom or near the coupling between coaches due to noise.", rich: <>For comfort on long journeys, request a lower berth in AC Sleeper class — it doubles as a seat during the day and a bed at night. In Economy class, window seats are preferable for views and ventilation. On the Karachi–Lahore route, the left side (when facing the engine) offers scenic views through Sindh's farmlands. Avoid seats near the bathroom or near the coupling between coaches due to noise. Compare train classes on our <IL to="/ticket-pricing">Ticket Pricing</IL> page.</> },
      { q: "Are there charging ports and power outlets on trains?", a: "Green Line Express and Pak Business Express have power outlets in AC Business and AC Standard coaches at every seat pair. Most other Express trains have limited outlets — typically 2-4 per coach near the doors. Carry a power bank for reliability. Passenger trains generally have no charging facilities.", rich: <><IL to="/green-line-express">Green Line Express</IL> and Pak Business Express have power outlets in AC Business and AC Standard coaches at every seat pair. Most other <IL to="/express-trains">Express trains</IL> have limited outlets — typically 2-4 per coach near the doors. Carry a power bank for reliability. Passenger trains generally have no charging facilities.</> },
      { q: "Can I bring my bicycle or large sports equipment on a train?", a: "Bicycles can be transported in the luggage van (brake van) of Express trains for a nominal fee of Rs. 100-300 depending on the route. You must check it in at the parcel counter at least 30 minutes before departure. Cricket kits, golf bags, and surfboards follow the same process. Items exceeding 2 meters in length may be refused during peak travel periods.", rich: <>Bicycles can be transported in the luggage van (brake van) of Express trains for a nominal fee of Rs. 100-300 depending on the route. You must check it in at the parcel counter at least 30 minutes before departure. Cricket kits, golf bags, and surfboards follow the same process. Items exceeding 2 meters in length may be refused during peak travel periods. Check <IL to="/buy-tickets">how to buy tickets</IL> and arrange luggage transport.</> },
      { q: "Is it safe to travel by train at night in Pakistan?", a: "Night travel on Express and AC trains is generally safe. AC coaches are locked from inside and attended by staff. The TTE (Ticket Checking Examiner) patrols the coaches periodically. Keep valuables in your carry-on rather than the overhead rack. For female solo travelers, Ladies' compartments are available on most Express services — request this when booking.", rich: <>Night travel on Express and AC trains is generally safe. AC coaches are locked from inside and attended by staff. The TTE (Ticket Checking Examiner) patrols the coaches periodically. Keep valuables in your carry-on rather than the overhead rack. For female solo travelers, Ladies' compartments are available on most Express services — request this when booking. <IL to="/train">Track your train live</IL> to know exactly when it will arrive.</> },
      { q: "What medical facilities are available on trains and at stations?", a: "Major stations like Lahore Junction, Karachi Cantt, Rawalpindi, and Multan Cantt have first-aid rooms staffed during operating hours. On-board, the guard's van carries a basic first-aid kit. For emergencies, pull the emergency chain (penalty applies for misuse) or inform the TTE who can arrange medical assistance at the next station.", rich: <>Major stations like Lahore Junction, Karachi Cantt, Rawalpindi, and Multan Cantt have first-aid rooms staffed during operating hours. Browse our <IL to="/stations">Stations Directory</IL> for facilities at each station. On-board, the guard's van carries a basic first-aid kit. For emergencies, pull the emergency chain (penalty applies for misuse) or inform the TTE who can arrange medical assistance at the next station.</> },
      { q: "Can I travel with pets on Pakistan Railways?", a: "Small pets in secure carriers may be allowed in the luggage van (not passenger coaches) at the discretion of the station master. There is no official pet-friendly coach. Guide dogs for visually impaired passengers are permitted in passenger coaches with proper documentation. Contact the station master at least 24 hours before travel to arrange pet transport.", rich: <>Small pets in secure carriers may be allowed in the luggage van (not passenger coaches) at the discretion of the station master. There is no official pet-friendly coach. Guide dogs for visually impaired passengers are permitted in passenger coaches with proper documentation. Contact the station master at least 24 hours before travel to arrange pet transport.</> },
      { q: "What happens if I miss my train?", a: "If you miss your train, your ticket becomes void — there is no automatic rebooking. Visit the reservation counter within 4 hours with your ticket and CNIC to request a transfer to the next available train on the same route (subject to seat availability and a Rs. 50 transfer fee). After 4 hours, no transfer or refund is possible.", rich: <>If you miss your train, your ticket becomes void — there is no automatic rebooking. Visit the reservation counter within 4 hours with your ticket and CNIC to request a transfer to the next available train on the same route (subject to seat availability and a Rs. 50 transfer fee). After 4 hours, no transfer or refund is possible. Use <IL to="/train">Live Train Tracker</IL> and <IL to="/check-delays">Check Delays</IL> to monitor your train before heading to the station.</> },
    ],
  },
  {
    id: "routes", title: "Routes & Connections", icon: CreditCard, gradient: "gradient-card-amber",
    faqs: [
      { q: "How do I travel from Karachi to Quetta by train?", a: "The Bolan Mail (3UP/4DN) historically served Karachi–Quetta via Jacobabad and the Bolan Pass, but this service has been suspended. Currently, no direct train runs the full Karachi–Quetta route. Travelers typically take a train to Jacobabad or Sukkur and then continue by road. The Jaffar Express (39UP) connects Jacobabad to Peshawar via the northern route. Check current service status on our live tracker.", rich: <>The Bolan Mail (3UP/4DN) historically served Karachi–Quetta via Jacobabad and the Bolan Pass, but this service has been suspended. Currently, no direct train runs the full Karachi–Quetta route. Travelers typically take a train to Jacobabad or Sukkur and then continue by road. The Jaffar Express (39UP) connects Jacobabad to Peshawar via the northern route. Check current service status on our <IL to="/train">Live Train Tracker</IL>.</> },
      { q: "Which trains connect Faisalabad to Lahore?", a: "Historically, the Ghouri Express (113UP/114DN) and Badar Express (111UP/112DN) served the Faisalabad–Lahore route with a journey time of 3 hours 30 minutes. Some of these services are currently inactive. Several long-distance Express trains from Karachi/Multan also stop at Faisalabad en route to Lahore. Check our live schedule for current availability.", rich: <>Historically, the Ghouri Express (113UP/114DN) and Badar Express (111UP/112DN) served the Faisalabad–Lahore route with a journey time of 3 hours 30 minutes. Some of these services are currently inactive. Several long-distance Express trains from Karachi/Multan also stop at Faisalabad en route to Lahore. Check our <IL to="/schedule">live schedule</IL> for current availability.</> },
      { q: "Is there a train from Lahore to Sialkot?", a: "The Allama Iqbal Express (9UP/10DN) connects Karachi to Sialkot via Lahore. For dedicated short-distance service, the Sialkot Express (171UP/172DN) runs between Lahore and Wazirabad Junction. The Lasani Express (125UP/126DN) also served this corridor. Journey time is approximately 3-4.5 hours depending on the service.", rich: <>The Allama Iqbal Express (9UP/10DN) connects Karachi to Sialkot via Lahore. For dedicated short-distance service, the Sialkot Express (171UP/172DN) runs between Lahore and Wazirabad Junction. Journey time is approximately 3-4.5 hours depending on the service. Use our <IL to="/planner">Journey Planner</IL> to find the best connection.</> },
      { q: "What is the Karachi Circular Railway (KCR)?", a: "The KCR is an urban commuter rail service running within Karachi between Orangi and Dabheji stations. The full loop covers approximately 44 km with 30+ stops. Currently the service operates with limited frequency. When fully operational, it connects major Karachi neighborhoods including SITE, Nazimabad, North Karachi, and Landhi. Journey time is approximately 1.5 hours for the full circuit.", rich: <>The KCR is an urban commuter rail service running within Karachi between Orangi and Dabheji stations. The full loop covers approximately 44 km with 30+ stops. Currently the service operates with limited frequency. When fully operational, it connects major Karachi neighborhoods including SITE, Nazimabad, North Karachi, and Landhi. Explore Karachi <IL to="/stations">stations</IL> on our directory.</> },
      { q: "Can I travel from Multan to Lahore by train?", a: "Yes! The Musa Pak Express (115UP) departs Multan Cantt at 06:00 and arrives Lahore Jn at 11:30 — a 5 hour 30 minute journey. Additionally, many long-distance Express trains from Karachi stop at both Multan and Lahore. The Bahauddin Zikria Express (25UP/26DN) serves Karachi–Multan directly in 16 hours.", rich: <>Yes! The Musa Pak Express (115UP) departs Multan Cantt at 06:00 and arrives Lahore Jn at 11:30 — a 5 hour 30 minute journey. Additionally, many long-distance Express trains from Karachi stop at both Multan and Lahore. View the complete <IL to="/schedule">train schedule</IL> or use the <IL to="/planner">Journey Planner</IL> to compare options.</> },
      { q: "What branch lines does Pakistan Railways operate?", a: "Beyond ML-1, Pakistan Railways operates branch lines including: Lahore–Faisalabad–Sargodha, Rawalpindi–Havelian (for Hazara Express), Malakwal–Pind Dadan Khan, Lahore–Narowal, Multan–Dera Ghazi Khan, Sukkur–Rohri–Jacobabad, and Hyderabad–Mirpur Khas. Not all branch lines have active services — check our schedule page for current operations.", rich: <>Beyond ML-1, Pakistan Railways operates branch lines including: Lahore–Faisalabad–Sargodha, Rawalpindi–Havelian (for Hazara Express), Malakwal–Pind Dadan Khan, Lahore–Narowal, Multan–Dera Ghazi Khan, Sukkur–Rohri–Jacobabad, and Hyderabad–Mirpur Khas. Not all branch lines have active services — explore our <IL to="/routes">Route Maps</IL> and <IL to="/schedule">schedule page</IL> for current operations.</> },
    ],
  },
  {
    id: "accessibility", title: "Accessibility & Special Needs", icon: Navigation, gradient: "gradient-card-blue",
    faqs: [
      { q: "Are Pakistan Railways stations wheelchair accessible?", a: "Major stations like Lahore Junction, Karachi Cantt, and Rawalpindi have platform ramps and level boarding areas, though accessibility varies. Many smaller stations lack wheelchair ramps. Pakistan Railways staff are generally helpful and will assist with boarding. Contact the station master 24 hours ahead to arrange assistance. AC coaches have wider aisles than Economy class.", rich: <>Major stations like Lahore Junction, Karachi Cantt, and Rawalpindi have platform ramps and level boarding areas, though accessibility varies. Many smaller stations lack wheelchair ramps. Browse our <IL to="/stations">Stations Directory</IL> for details on each station's facilities. Contact the station master 24 hours ahead to arrange assistance. AC coaches have wider aisles than Economy class.</> },
      { q: "What concessions are available for persons with disabilities?", a: "Persons with disabilities holding a government-issued disability certificate receive a 50% fare concession on all classes and all train types. One attendant/companion can travel at the same 50% discounted rate. Present the disability certificate and CNIC at the reservation counter. Online booking with this discount requires visiting a counter for verification.", rich: <>Persons with disabilities holding a government-issued disability certificate receive a 50% fare concession on all classes and all train types. One attendant/companion can travel at the same 50% discounted rate. Present the disability certificate and CNIC at the reservation counter. Check our <IL to="/ticket-pricing">Ticket Pricing</IL> page for full fare details and <IL to="/buy-tickets">how to buy tickets</IL>.</> },
      { q: "Are there Ladies' compartments on Pakistan Railways trains?", a: "Yes, most Express and AC trains have designated Ladies' compartments or reserved sections. These coaches are marked and attended by female staff on premium services. Women can also book seats in general coaches. During Eid and peak seasons, additional Ladies' coaches may be added. Request a Ladies' compartment seat when booking at the counter or call 117.", rich: <>Yes, most <IL to="/express-trains">Express and AC trains</IL> have designated Ladies' compartments or reserved sections. These coaches are marked and attended by female staff on premium services. Women can also book seats in general coaches. During Eid and peak seasons, additional Ladies' coaches may be added. Request a Ladies' compartment seat when <IL to="/buy-tickets">booking</IL> at the counter or call 117.</> },
      { q: "Can elderly passengers get assistance at stations?", a: "Porters (coolies) are available at all major stations for Rs. 100-300 depending on the station and luggage. Senior citizens (60+) can request wheelchair assistance at Lahore, Karachi, and Rawalpindi stations. Pakistan Railways also offers 25% fare concession for passengers aged 60 and above with valid CNIC verification.", rich: <>Porters (coolies) are available at all major <IL to="/stations">stations</IL> for Rs. 100-300 depending on the station and luggage. Senior citizens (60+) can request wheelchair assistance at Lahore, Karachi, and Rawalpindi stations. Pakistan Railways also offers 25% fare concession for passengers aged 60 and above with valid CNIC verification.</> },
      { q: "Are there family compartments available?", a: "Dedicated family compartments are not standard on Pakistan Railways. However, in AC Sleeper class, you can book a 4-berth or 6-berth section which effectively functions as a private family space. Request adjacent berths when booking at the counter. On some premium services, the TTE can help rearrange seating to accommodate families together.", rich: <>Dedicated family compartments are not standard on Pakistan Railways. However, in AC Sleeper class, you can book a 4-berth or 6-berth section which effectively functions as a private family space. Request adjacent berths when <IL to="/buy-tickets">booking at the counter</IL>. On some premium services like <IL to="/green-line-express">Green Line Express</IL>, the TTE can help rearrange seating to accommodate families together.</> },
      { q: "What if I have a medical condition that requires special seating?", a: "Passengers with medical conditions requiring lower berths can request them at the booking counter with a medical certificate. Oxygen-dependent passengers should inform the station master at least 48 hours before departure. Diabetic passengers can carry insulin and syringes with a doctor's letter. There is no surcharge for medical accommodation requests.", rich: <>Passengers with medical conditions requiring lower berths can request them at the booking counter with a medical certificate. Oxygen-dependent passengers should inform the station master at least 48 hours before departure. Diabetic passengers can carry insulin and syringes with a doctor's letter. There is no surcharge for medical accommodation requests.</> },
    ],
  },
  {
    id: "practical", title: "Practical Travel Tips", icon: Smartphone, gradient: "gradient-card-purple",
    faqs: [
      { q: "What should I pack for a long train journey in Pakistan?", a: "Essential items: water bottles (platform vendors may run out), snacks, phone charger/power bank, light blanket (AC coaches can be cold), toilet paper/tissues, hand sanitizer, and a small lock for luggage. For overnight journeys, bring earplugs and an eye mask. Carry cash in small denominations for platform food vendors. A window shade or scarf helps block afternoon sun.", rich: <>Essential items: water bottles (platform vendors may run out), snacks, phone charger/power bank, light blanket (AC coaches can be cold), toilet paper/tissues, hand sanitizer, and a small lock for luggage. For overnight journeys, bring earplugs and an eye mask. Carry cash in small denominations for platform food vendors. Check the <IL to="/schedule-guide">Schedule Guide</IL> for seasonal travel tips.</> },
      { q: "How do platform tickets work at Pakistan Railways stations?", a: "Platform tickets cost Rs. 10-20 and allow non-passengers to enter the platform area to see off or receive travelers. Purchase from the ticket window at the station entrance. Platform tickets are not valid for boarding trains. During Eid and holidays, platform ticket sales may be restricted to reduce overcrowding.", rich: <>Platform tickets cost Rs. 10-20 and allow non-passengers to enter the platform area to see off or receive travelers. Purchase from the ticket window at the <IL to="/stations">station entrance</IL>. Platform tickets are not valid for boarding trains. During Eid and holidays, platform ticket sales may be restricted to reduce overcrowding.</> },
      { q: "What is the luggage limit and baggage policy?", a: "Each passenger is allowed up to 40 kg of free luggage on Express and Mail trains, and 30 kg on Passenger services. Excess luggage is charged at Rs. 2-5 per kg depending on the route. Luggage should be stored under your berth (Sleeper class) or in the overhead rack. Valuable items should be kept with you at all times.", rich: <>Each passenger is allowed up to 40 kg of free luggage on Express and Mail trains, and 30 kg on Passenger services. Excess luggage is charged at Rs. 2-5 per kg depending on the route. Luggage should be stored under your berth (Sleeper class) or in the overhead rack. See <IL to="/ticket-pricing">Ticket Pricing</IL> for fare details by class.</> },
      { q: "How do I handle connections between trains?", a: "Pakistan Railways does not issue connecting tickets or guarantee connections. If your journey requires changing trains (e.g., Multan to Peshawar via Lahore), book each leg separately and allow at least 3-4 hours between trains to account for delays. At junction stations like Lahore, Rawalpindi, and Sukkur, the station master's office can advise on connecting services.", rich: <>Pakistan Railways does not issue connecting tickets or guarantee connections. If your journey requires changing trains, use our <IL to="/planner">Journey Planner</IL> to find the best connections. Book each leg separately and allow at least 3-4 hours between trains to account for delays. Use <IL to="/check-delays">Check Delays</IL> to monitor both trains in real time.</> },
      { q: "What food and beverages are available during the journey?", a: "Premium trains like Green Line and Pak Business include meals in AC Business class fares. On other trains, vendors board at major stops selling chai (Rs. 20-30), biryani (Rs. 150-250), samosas, and cold drinks. Lahore Junction, Multan Cantt, and Sukkur are famous for their platform food. Carry your own water — train taps are not for drinking.", rich: <>Premium trains like <IL to="/green-line-express">Green Line</IL> and Pak Business include meals in AC Business class fares. On other trains, vendors board at major stops selling chai (Rs. 20-30), biryani (Rs. 150-250), samosas, and cold drinks. Lahore Junction, Multan Cantt, and Sukkur are famous for their platform food. Browse our <IL to="/stations">Stations Directory</IL> for facilities at each stop.</> },
      { q: "How do I file a complaint about my train journey?", a: "File complaints through: (1) Pakistan Railways helpline 117 — available 24/7, (2) Email: complaints@pakrailways.gov.pk, (3) Visit the Station Master's office at any station, (4) Pakistan Citizens Portal app for formal grievances. Include your train number, date, coach number, and booking reference. Response time is typically 7-14 working days for formal complaints.", rich: <>File complaints through: (1) Pakistan Railways helpline 117 — available 24/7, (2) Email: complaints@pakrailways.gov.pk, (3) Visit the Station Master's office at any <IL to="/stations">station</IL>, (4) Pakistan Citizens Portal app for formal grievances. Include your train number, date, coach number, and booking reference. You can also <IL to="/contact">contact us</IL> for platform-related issues.</> },
    ],
  },
];

export default function FAQPage() {
  const allFaqs = faqCategories.flatMap(cat => cat.faqs);
  return (
    <div>
      <SEOHead
        title="Pakistan Railways FAQ — 25+ Travel Questions 2026"
        description="Answers to 25+ Pakistan Railways questions — on-board tips, route connections, wheelchair access, luggage policy, and practical travel advice."
        canonical="/faq"
        keywords="pakistan railways FAQ, train travel questions pakistan, wheelchair access pakistan railways, ladies compartment train, luggage limit pakistan railways, platform ticket price, train complaint number, pakistan railway rules, first time train travel tips"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "FAQ", url: "/faq" }]}
        faqSchema={allFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Pakistan Railways FAQ",
          "description": "25+ frequently asked questions about Pakistan Railways travel",
          "url": "https://trackmytrain.pk/faq",
          "mainEntity": { "@type": "FAQPage" },
          "isPartOf": { "@type": "WebSite", "name": "Track My Train", "url": "https://trackmytrain.pk" }
        }]}
      />
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>FAQs</span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <HelpCircle className="w-4 h-4" /> Help Center
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              Pakistan Railway<br />
              <span className="text-gradient-gold">Frequently Asked Questions</span>
            </h1>
            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mt-4">
              Find answers to common questions about Pakistan Railways — booking, tickets, travel tips, live tracking, and everything for a smooth journey.
            </p>
            <p className="opacity-60 text-sm mt-2">پاکستان ریلوے سے متعلق عام سوالات اور جوابات</p>
          </div>
        </div>
      </section>

      {/* Category Jump Cards */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {faqCategories.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`}>
              <Card className={`${cat.gradient} border hover-lift group cursor-pointer`}>
                <CardContent className="p-4 text-center">
                  <cat.icon className="w-5 h-5 text-primary mx-auto mb-1 transition-transform duration-300 group-hover:scale-110" />
                  <div className="text-sm font-bold">{cat.title}</div>
                  <div className="text-[10px] text-muted-foreground">{cat.faqs.length} questions</div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {faqCategories.map((cat) => (
            <section key={cat.id} id={cat.id}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{cat.title}</h2>
                  <p className="text-xs text-muted-foreground">{cat.faqs.length} frequently asked questions</p>
                </div>
              </div>
              <Accordion type="single" collapsible>
                {cat.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`${cat.id}-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-medium">
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                        {faq.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pl-9 leading-relaxed">{faq.rich}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>

        {/* Quick Links */}
        <section className="mt-12 sm:mt-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">NEED MORE HELP?</p>
            <h2 className="text-xl sm:text-2xl font-bold">Explore More Resources</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Train, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any train in real-time.", link: "/train" },
              { icon: BookOpen, gradient: "gradient-card-amber", title: "Travel Blog", desc: "Guides, tips, and travel articles.", link: "/blog" },
              { icon: Shield, gradient: "gradient-card-blue", title: "Contact Us", desc: "Get in touch with our team.", link: "/contact" },
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

        {/* Rich SEO Help Center */}
        <section className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">HELP CENTER</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Pakistan Railways Help Center</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="gradient-card-emerald border hover-lift group">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <BookOpen className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h4 className="font-bold text-sm">Comprehensive Coverage</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">This FAQ covers everything from ticket booking, fare inquiries, and refund policies to live train tracking and journey planning. Whether you're a first-time traveler or a regular commuter, find answers to all your Pakistan Railways questions here.</p>
              </CardContent>
            </Card>
            <Card className="bg-hero-gradient text-primary-foreground border-0 overflow-hidden relative hover-lift">
              <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
              <CardContent className="p-5 relative">
                <h4 className="font-bold text-sm mb-3">📞 Official Pakistan Railways Contact</h4>
                <div className="space-y-2 text-xs opacity-90">
                  <p>Helpline: <strong>117</strong> (24/7)</p>
                  <p>Website: <strong>pak-railways.gov.pk</strong></p>
                  <p className="opacity-70 mt-2">TrackMyTrain.pk is an independent service — not affiliated with Pakistan Railways. For official ticketing and reservations, contact PR directly.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": faqCategories.flatMap(cat => cat.faqs.map(f => ({
          "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a }
        })))
      })}} />
    </div>
  );
}
