import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Clock, Globe, Mail, Shield, AlertTriangle, Search, Train, HelpCircle, Building2, Landmark, Headphones, ExternalLink, MessageSquare, Ticket, Stethoscope, Siren } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";

const helplines = [
  { name: "Pakistan Railways General Helpline", number: "117", desc: "Toll-free 24/7 helpline for train inquiries, booking status, complaints, lost & found, and general information. Works from any phone network across Pakistan.", icon: Headphones, highlight: true },
  { name: "Railway Police Helpline", number: "1316", desc: "Report theft, security concerns, harassment, or criminal activity on trains and railway premises. Available 24/7 across all provinces.", icon: Shield },
  { name: "Rescue Service", number: "1122", desc: "Emergency medical assistance and rescue services. Call for medical emergencies on trains or at railway stations.", icon: Stethoscope },
  { name: "National Emergency", number: "115", desc: "General emergency helpline for Pakistan. Use for any life-threatening situation.", icon: Siren },
  { name: "Pakistan Railways HQ (Lahore)", number: "042-99201773", desc: "Pakistan Railways Headquarters, Empress Road, Lahore. For administrative inquiries and official correspondence.", icon: Building2 },
  { name: "Ministry of Railways (Islamabad)", number: "051-99201601", desc: "Ministry of Railways, 4th Floor, Block D, Pak Secretariat, Islamabad. For policy-level queries and ministerial correspondence.", icon: Landmark },
  { name: "Mobile / WhatsApp Helpline", number: "0300-8008787", desc: "Pakistan Railways official mobile and WhatsApp helpline. Send messages for quick assistance with booking and schedule queries.", icon: MessageSquare },
  { name: "General Inquiries (Lahore)", number: "042-99201116", desc: "Pakistan Railways general inquiry line. Available during office hours for detailed administrative queries (Mon–Fri 9 AM – 5 PM).", icon: Phone },
];

const divisions = [
  { name: "Lahore Division", city: "Lahore", region: "Punjab Headquarters", phone: "042-99211125", address: "Divisional Superintendent Office, Lahore Junction, Empress Road, Lahore", stationPhone: "042-99211131", stationMaster: "042-99211133" },
  { name: "Rawalpindi Division", city: "Rawalpindi", region: "Northern Region", phone: "051-99270055", address: "Divisional Superintendent Office, Rawalpindi Cantt Railway Station, Rawalpindi", stationPhone: "051-99270056", stationMaster: "051-99270058" },
  { name: "Karachi Division", city: "Karachi", region: "Sindh Headquarters", phone: "021-99213276", address: "Divisional Superintendent Office, Karachi City Railway Station, Karachi", stationPhone: "021-99213277", stationMaster: "021-99213279" },
  { name: "Multan Division", city: "Multan", region: "Southern Punjab", phone: "061-99210172", address: "Divisional Superintendent Office, Multan Cantt Railway Station, Multan", stationPhone: "061-99210173", stationMaster: "061-99210175" },
  { name: "Sukkur Division", city: "Sukkur", region: "Upper Sindh", phone: "071-99310069", address: "Divisional Superintendent Office, Sukkur Railway Station, Sukkur", stationPhone: "071-99310069", stationMaster: "071-99310071" },
  { name: "Quetta Division", city: "Quetta", region: "Balochistan Headquarters", phone: "081-99202071", address: "Divisional Superintendent Office, Quetta Railway Station, Quetta", stationPhone: "081-99202072", stationMaster: "081-99202074" },
  { name: "Peshawar Division", city: "Peshawar", region: "KPK Headquarters", phone: "091-99212317", address: "Divisional Superintendent Office, Peshawar Cantt Railway Station, Peshawar", stationPhone: "091-99212318", stationMaster: "091-99212320" },
];

const majorStations = [
  { station: "Lahore Junction", city: "Lahore", inquiry: "042-99211131", master: "042-99211133" },
  { station: "Karachi City", city: "Karachi", inquiry: "021-99213277", master: "021-99213279" },
  { station: "Rawalpindi", city: "Rawalpindi", inquiry: "051-99270056", master: "051-99270058" },
  { station: "Peshawar Cantt", city: "Peshawar", inquiry: "091-99212318", master: "091-99212320" },
  { station: "Multan Cantt", city: "Multan", inquiry: "061-99210173", master: "061-99210175" },
  { station: "Faisalabad", city: "Faisalabad", inquiry: "041-99230281", master: "041-99230283" },
  { station: "Quetta", city: "Quetta", inquiry: "081-99202072", master: "081-99202074" },
  { station: "Hyderabad", city: "Hyderabad", inquiry: "022-99210183", master: "022-99210185" },
  { station: "Sukkur", city: "Sukkur", inquiry: "071-99310069", master: "071-99310071" },
  { station: "Bahawalpur", city: "Bahawalpur", inquiry: "062-99270025", master: "062-99270027" },
];

const onlineServices = [
  { name: "Pakistan Railways Official Website", url: "https://www.pakrail.gov.pk", desc: "Official Pakistan Railways website for schedules, announcements, and information.", icon: Globe },
  { name: "Online Ticket Booking (Bookme.pk)", url: "https://bookme.pk", desc: "Authorized online ticket booking partner for Pakistan Railways e-ticketing.", icon: Ticket },
  { name: "Ministry of Railways", url: "https://www.railways.gov.pk", desc: "Official Ministry of Railways website for policies, tenders, and government correspondence.", icon: Landmark },
  { name: "General Email", url: "mailto:info@railways.gov.pk", desc: "General inquiries and correspondence: info@railways.gov.pk", icon: Mail },
];

const whenToCall = [
  { scenario: "Train schedule inquiry", contact: "Helpline 117", icon: Clock },
  { scenario: "Booking status or PNR check", contact: "Helpline 117", icon: Search },
  { scenario: "Lost luggage on train", contact: "Railway Police 1316 + Station Master", icon: AlertTriangle },
  { scenario: "Medical emergency on train", contact: "Rescue 1122 + Train Guard", icon: Stethoscope },
  { scenario: "Theft or harassment on train", contact: "Railway Police 1316", icon: Shield },
  { scenario: "Complaint about service", contact: "Helpline 117 + Email", icon: MessageSquare },
  { scenario: "Online booking issues", contact: "Bookme.pk Support", icon: Globe },
  { scenario: "Track maintenance / delay info", contact: "Helpline 117", icon: Train },
];

const faqs = [
  { q: "What is the Pakistan Railways helpline number?", a: "The official Pakistan Railways helpline number is 117. This toll-free number is available 24/7 and can be used for train inquiries, schedule information, reservation status, complaints, and general information. It works from any mobile or landline network across Pakistan." },
  { q: "How do I file a complaint against Pakistan Railways?", a: "You can file a complaint through multiple channels: (1) Call the helpline 117, (2) Visit the official website pakrail.gov.pk and use their complaint portal, (3) Email at info@railways.gov.pk, (4) Visit the nearest Station Master's office in person, or (5) Contact the Divisional Superintendent's office of your region." },
  { q: "Can I check my train ticket status by phone?", a: "Yes, call 117 and provide your PNR number or booking reference. The helpline staff can check your reservation status, confirm seat assignments, and provide information about waitlisted tickets. You can also check status online at pakrail.gov.pk or bookme.pk." },
  { q: "What are Pakistan Railways office hours?", a: "Pakistan Railways headquarters and divisional offices generally operate Monday to Friday, 9:00 AM to 5:00 PM. Station booking offices operate extended hours (typically 8 AM to 10 PM), and the helpline 117 is available 24/7. Major stations like Lahore Junction, Karachi City, and Rawalpindi have booking counters open until late evening." },
  { q: "How do I contact the Railway Police?", a: "The Railway Police can be reached at their helpline number 1316, which works across all provinces. Every major railway station has a Railway Police post for reporting theft, lost items, harassment, or security concerns. For life-threatening emergencies, also call 115." },
  { q: "Where is Pakistan Railways headquarters located?", a: "Pakistan Railways headquarters is located on Empress Road, Lahore, Punjab. The Ministry of Railways is separately located at 4th Floor, Block D, Pak Secretariat, Islamabad. The Lahore headquarters handles operational matters, while the Islamabad ministry deals with policy and governance." },
  { q: "How many railway divisions does Pakistan Railways have?", a: "Pakistan Railways operates through 7 railway divisions: Lahore, Rawalpindi, Karachi, Multan, Sukkur, Quetta, and Peshawar. Each division is headed by a Divisional Superintendent (DS) who manages train operations, stations, and staff in their region." },
  { q: "Can I book train tickets online in Pakistan?", a: "Yes, Pakistan Railways offers online ticket booking through Bookme.pk, the authorized e-ticketing partner. You can book seats for most passenger and express trains, select your preferred class, and receive e-tickets via email and SMS. Some trains may only be bookable at station counters." },
  { q: "What should I do if I lose my belongings on a train?", a: "Immediately report to the Railway Police at 1316 and contact the Station Master at your destination or the next major station. Also call helpline 117 to register the loss. Provide details like the train number, coach number, seat number, and description of lost items. Pakistan Railways maintains a Lost & Found department at major stations." },
  { q: "Is there a WhatsApp number for Pakistan Railways?", a: "Yes, Pakistan Railways offers WhatsApp assistance at 0300-8008787. You can send messages for quick help with booking queries, schedule information, and general assistance during working hours." },
  { q: "How do I contact the Divisional Superintendent of my area?", a: "Each of the 7 divisions has a Divisional Superintendent office at the divisional headquarters station. You can call the divisional office numbers listed on this page, or visit the office in person during working hours (Mon–Fri, 9 AM – 5 PM). For Lahore call 042-99211125, Rawalpindi 051-99270055, Karachi 021-99213276, Multan 061-99210172, Sukkur 071-99310069, Quetta 081-99202071, and Peshawar 091-99212317." },
  { q: "What is the Pakistan Railways complaint email address?", a: "For complaints and general correspondence, email info@railways.gov.pk. For ministerial-level complaints, you can contact the Federal Minister's office at federalminister@railways.gov.pk or the State Minister's office at mos@railways.gov.pk. Include your ticket details and a description of the issue for faster resolution." },
  { q: "Are Pakistan Railways helpline numbers toll-free?", a: "Yes, the main helpline 117 is toll-free when dialed from any landline or mobile network in Pakistan. However, divisional office numbers and station inquiry numbers are regular landline numbers and standard call charges apply. The WhatsApp helpline (0300-8008787) uses your regular data/messaging plan." },
  { q: "How do I report a railway crossing hazard or track issue?", a: "Report any track damage, crossing gate malfunctions, or infrastructure hazards immediately by calling helpline 117 or the nearest station's inquiry number. For emergencies involving immediate danger, call 115 (National Emergency) or 1122 (Rescue Service). Providing the exact location (nearest station or crossing gate number) helps response teams arrive faster." },
  { q: "Can I contact Pakistan Railways on social media?", a: "Pakistan Railways maintains an official presence on social media platforms. However, for urgent matters, the most reliable channels remain the helpline 117, Railway Police 1316, and direct station contact numbers. Social media responses may be slower than phone or in-person communication." },
  { q: "What is the inquiry number for Lahore Railway Station?", a: "The inquiry number for Lahore Junction Railway Station is 042-99211131. The Station Master can be reached at 042-99211133. The Divisional Superintendent's office in Lahore is at 042-99211125. For general helpline assistance, call 117 toll-free." },
];

export default function RailwayHelpline() {
  return (
    <div>
      <SEOHead
        title="Pakistan Railways Helpline Numbers & Offices — Complete Contact Directory 2026"
        description="Complete directory of Pakistan Railways helpline numbers (117, 1316), all 7 divisional offices, major station contacts, and online services. Verified, official contact information updated for 2026."
        canonical="/railway-helpline"
        keywords="pakistan railways helpline, railway helpline 117, pakistan railways contact number, railway police 1316, pakistan railways offices, divisional superintendent, railway station phone numbers, pakistan railways complaint, railway inquiry number, pakrail helpline"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Railway Helpline & Offices", url: "/railway-helpline" },
        ]}
        faqSchema={faqs}
      />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-4">
              <Phone className="w-3.5 h-3.5" />
              OFFICIAL VERIFIED DIRECTORY
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
              Pakistan Railways <span className="text-accent">Helpline</span> Numbers & Offices
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Complete contact directory for Pakistan Railways — helpline numbers, all 7 divisional headquarters, 
              major station inquiry numbers, and online services. All numbers verified and updated for 2026.
            </p>
          </div>

          {/* Primary Helpline Hero Card */}
          <Card className="max-w-md mx-auto bg-primary/10 border-primary/30 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-3">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <p className="text-xs font-bold text-primary tracking-wider mb-1">PAKISTAN RAILWAYS HELPLINE</p>
              <a href="tel:117" className="text-5xl font-black text-foreground hover:text-primary transition-colors">117</a>
              <p className="text-muted-foreground text-sm mt-2">Toll-Free • Available 24/7 • All Networks</p>
              <p className="text-xs text-muted-foreground mt-1">Train inquiries, booking status, complaints, lost & found</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* All Helplines */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black mb-2">Primary Helplines & Emergency Numbers</h2>
          <p className="text-muted-foreground mb-8">Essential contact numbers for Pakistan Railways passengers. Save these numbers for quick access during your journey.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {helplines.map((h) => (
              <Card key={h.number + h.name} className={`group hover:shadow-lg transition-all ${h.highlight ? "border-primary/40 bg-primary/5" : ""}`}>
                <CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${h.highlight ? "bg-primary/20" : "bg-muted"}`}>
                    <h.icon className={`w-5 h-5 ${h.highlight ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <p className="font-bold text-sm mb-1">{h.name}</p>
                  <a href={`tel:${h.number.replace(/-/g, "")}`} className="text-xl font-black text-primary hover:underline">{h.number}</a>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{h.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Divisional Offices */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black mb-2">7 Divisional Headquarters</h2>
          <p className="text-muted-foreground mb-8">Pakistan Railways operates through 7 regional divisions, each managed by a Divisional Superintendent (DS). Contact the division office for regional complaints, operational queries, and administrative matters.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {divisions.map((d) => (
              <Card key={d.city} className="hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-base">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.region}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Phone className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="text-muted-foreground text-xs">DS Office: </span>
                        <a href={`tel:${d.phone.replace(/-/g, "")}`} className="font-semibold hover:text-primary transition-colors">{d.phone}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <span className="text-muted-foreground text-xs">Station Inquiry: </span>
                        <a href={`tel:${d.stationPhone.replace(/-/g, "")}`} className="font-semibold hover:text-primary transition-colors">{d.stationPhone}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">{d.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Major Station Contact Table */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black mb-2">Major Station Contact Numbers</h2>
          <p className="text-muted-foreground mb-8">Direct inquiry and station master phone numbers for Pakistan's busiest railway stations. For other stations, call helpline 117.</p>
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 sm:p-4 font-bold">Station</th>
                    <th className="text-left p-3 sm:p-4 font-bold">City</th>
                    <th className="text-left p-3 sm:p-4 font-bold">Inquiry Number</th>
                    <th className="text-left p-3 sm:p-4 font-bold">Station Master</th>
                  </tr>
                </thead>
                <tbody>
                  {majorStations.map((s, i) => (
                    <tr key={s.station} className={`border-b last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="p-3 sm:p-4 font-semibold">{s.station}</td>
                      <td className="p-3 sm:p-4 text-muted-foreground">{s.city}</td>
                      <td className="p-3 sm:p-4">
                        <a href={`tel:${s.inquiry.replace(/-/g, "")}`} className="text-primary hover:underline font-medium">{s.inquiry}</a>
                      </td>
                      <td className="p-3 sm:p-4">
                        <a href={`tel:${s.master.replace(/-/g, "")}`} className="text-primary hover:underline font-medium">{s.master}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground mt-3 italic">* Phone numbers are official and verified. Numbers may change — always confirm via helpline 117 for the most up-to-date contact information.</p>
        </div>
      </section>

      {/* When to Call Which Number */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black mb-2">When to Call Which Number</h2>
          <p className="text-muted-foreground mb-8">Quick reference guide to help you contact the right department for your specific need.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whenToCall.map((w) => (
              <Card key={w.scenario} className="hover:shadow-md transition-all">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <w.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{w.scenario}</p>
                    <p className="text-xs text-primary font-bold mt-0.5">{w.contact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Online & Digital Services */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black mb-2">Online & Digital Services</h2>
          <p className="text-muted-foreground mb-8">Official Pakistan Railways websites, booking portals, and email contacts for digital access to railway services.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {onlineServices.map((s) => (
              <Card key={s.name} className="hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm mb-1">{s.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{s.desc}</p>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                        {s.url.replace("https://", "").replace("mailto:", "")} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm mb-1">Important Notice</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All phone numbers listed on this page are sourced from official Pakistan Railways records and verified sources. 
                    Phone numbers may change without prior notice. For the most current and accurate information, always verify by calling the 
                    toll-free helpline <strong>117</strong>. This page is maintained by Track My Train, an independent tracking platform, 
                    and is not officially affiliated with Pakistan Railways. For official matters, visit{" "}
                    <a href="https://www.pakrail.gov.pk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">pakrail.gov.pk</a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black mb-6">General Office Hours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-5 text-center">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-bold text-sm">HQ & Divisional Offices</p>
                <p className="text-muted-foreground text-xs mt-1">Monday – Friday</p>
                <p className="font-semibold text-sm text-primary">9:00 AM – 5:00 PM</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center">
                <Ticket className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-bold text-sm">Booking Counters</p>
                <p className="text-muted-foreground text-xs mt-1">Daily (including weekends)</p>
                <p className="font-semibold text-sm text-primary">8:00 AM – 10:00 PM</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center">
                <Headphones className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-bold text-sm">Helpline 117</p>
                <p className="text-muted-foreground text-xs mt-1">Every day, all year</p>
                <p className="font-semibold text-sm text-primary">24 Hours / 7 Days</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-8">Common questions about Pakistan Railways helplines, offices, and contact procedures.</p>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-black mb-3">Need to Track Your Train?</h2>
          <p className="text-muted-foreground mb-6 text-sm">Use our free live GPS tracker to see exactly where your train is right now — no signup needed.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/train" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors shadow-md">
              <Train className="w-4 h-4" /> Track Live Trains
            </Link>
            <Link to="/find-my-train" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-primary font-bold text-sm hover:bg-primary/5 transition-colors">
              <Search className="w-4 h-4" /> Find My Train
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-muted-foreground font-bold text-sm hover:bg-muted transition-colors">
              <HelpCircle className="w-4 h-4" /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
