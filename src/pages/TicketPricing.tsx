import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, CreditCard, Info, Train, Clock, MapPin, Shield, Star, Smartphone, Building2, Users, Tag, Percent, Navigation, Wallet, BarChart3 } from "lucide-react";
import PremiumHero from "@/components/PremiumHero";
import SEOHead from "@/components/SEOHead";
import RelatedLinks from "@/components/RelatedLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const pricingData = [
  { route: "Karachi → Lahore", economy: "1,800", business: "3,500", ac: "6,500", acBusiness: "9,000", duration: "18-22h" },
  { route: "Karachi → Rawalpindi", economy: "2,200", business: "4,200", ac: "7,500", acBusiness: "10,500", duration: "22-26h" },
  { route: "Karachi → Peshawar", economy: "2,400", business: "4,500", ac: "8,000", acBusiness: "11,500", duration: "24-28h" },
  { route: "Lahore → Rawalpindi", economy: "700", business: "1,400", ac: "2,500", acBusiness: "3,500", duration: "4-5h" },
  { route: "Lahore → Multan", economy: "500", business: "1,000", ac: "1,800", acBusiness: "2,500", duration: "5-6h" },
  { route: "Karachi → Quetta", economy: "1,600", business: "3,000", ac: "5,500", acBusiness: "8,000", duration: "12-14h" },
  { route: "Lahore → Peshawar", economy: "900", business: "1,800", ac: "3,200", acBusiness: "4,500", duration: "7-8h" },
  { route: "Multan → Karachi", economy: "1,500", business: "2,800", ac: "5,200", acBusiness: "7,500", duration: "14-16h" },
  { route: "Karachi → Hyderabad", economy: "400", business: "800", ac: "1,200", acBusiness: "1,800", duration: "2-3h" },
  { route: "Lahore → Faisalabad", economy: "350", business: "900", ac: "1,800", acBusiness: "2,200", duration: "3-4h" },
  { route: "Multan → Rawalpindi", economy: "800", business: "2,000", ac: "4,000", acBusiness: "5,000", duration: "8-10h" },
  { route: "Rawalpindi → Peshawar", economy: "400", business: "1,000", ac: "2,200", acBusiness: "2,800", duration: "3-4h" },
  { route: "Sukkur → Lahore", economy: "1,000", business: "2,500", ac: "4,500", acBusiness: "5,500", duration: "12-14h" },
  { route: "Quetta → Rawalpindi", economy: "1,800", business: "4,000", ac: "7,000", acBusiness: "8,500", duration: "20-24h" },
];

const coachClasses = [
  { cls: "Economy Class", icon: "💺", gradient: "gradient-card-emerald", features: ["Cushioned seats", "Fan cooling", "Basic amenities"], desc: "Basic seating with fan-cooled coaches. Most affordable option for budget-conscious travelers. Available on all express and passenger trains.", fareRange: "Rs. 350 – 2,400" },
  { cls: "Business Class", icon: "🪑", gradient: "gradient-card-amber", features: ["Reclining seats", "AC or fan options", "More legroom"], desc: "Comfortable padded seats with reclining capability and more legroom. Some trains offer meal service in business class.", fareRange: "Rs. 800 – 4,500" },
  { cls: "AC Standard", icon: "❄️", gradient: "gradient-card-blue", features: ["Full AC", "Reclining seats", "Better comfort"], desc: "Air-conditioned coaches with comfortable seating, blankets, and pillows. Meals included on select express trains.", fareRange: "Rs. 1,200 – 8,000" },
  { cls: "AC Business", icon: "⭐", gradient: "gradient-card-purple", features: ["Premium AC", "Meals included", "Priority boarding"], desc: "Premium air-conditioned class with wide luxury seats, complimentary meals, beverages, and priority boarding.", fareRange: "Rs. 1,800 – 11,500" },
  { cls: "AC Sleeper", icon: "🛏️", gradient: "gradient-card-rose", features: ["Sleeper berths", "Full AC", "Bedding provided"], desc: "Air-conditioned sleeping berths ideal for overnight journeys. Bedding, blankets, and pillows provided for comfortable rest.", fareRange: "Rs. 2,500 – 9,000" },
  { cls: "Parlor Car", icon: "👑", gradient: "gradient-card-teal", features: ["Individual pods", "Premium meals", "Entertainment"], desc: "The ultimate luxury class with individual seating pods, gourmet meals, entertainment options, and personal attendant service.", fareRange: "Rs. 5,000 – 12,000" },
];

const ticketFaqs = [
  { q: "How can I book Pakistan Railway tickets online?", a: "You can book tickets through the official Pakistan Railways website (pak-railways.gov.pk) or via the Pakistan Railways mobile app. Create an account, search for your train, select your preferred class, choose your seats, and pay using credit/debit card, JazzCash, Easypaisa, or bank transfer. E-tickets are delivered instantly to your email and can be shown on your phone." },
  { q: "What is the cheapest train class in Pakistan?", a: "Economy Class is the most affordable option, with fares starting from around PKR 350-500 for short distances like Karachi to Hyderabad or Lahore to Faisalabad. Prices vary based on route length and train type — Passenger trains are cheaper than Express trains on the same route." },
  { q: "What is the cancellation policy for train tickets?", a: "Tickets cancelled 24+ hours before departure get a full refund minus a small processing fee (around Rs. 50-100). Cancellations within 24 hours receive a 50% refund. No refund is available after the train has departed. Railway-cancelled trains always get a full refund at any booking counter with no deductions." },
  { q: "Are there any discounts available on train tickets?", a: "Yes! Pakistan Railways offers several discounts: Students get 25-50% off with valid student ID, senior citizens (60+) get 25% off, disabled persons get 50% off with a disability certificate, children aged 3-12 travel at half fare, and children under 3 travel free (without a separate seat). Season tickets for regular commuters also provide significant savings." },
  { q: "What is the difference between AC Standard and AC Business?", a: "AC Business offers wider seats with more recline, complimentary meals, bottled water, and priority boarding. AC Standard has air conditioning with standard reclining seats but fewer premium amenities. AC Business coaches are typically newer and better maintained, making them worth the upgrade on long-distance journeys." },
  { q: "What are the different coach classes in Pakistan Railways?", a: "Pakistan Railways offers 6 travel classes: Economy (fan-cooled basic seating), Business (padded reclining seats), AC Standard (air-conditioned comfortable seating), AC Business (premium AC with meals), AC Sleeper (sleeping berths for overnight travel), and Parlor Car (luxury individual pods with entertainment). Not all classes are available on every train." },
  { q: "Can I change my train ticket to a different date?", a: "Date changes are possible at booking counters, subject to seat availability. Visit the station counter with your original ticket and CNIC at least 6 hours before your scheduled departure. A small change fee of Rs. 50-100 may apply. Online tickets can sometimes be changed through the e-ticketing portal." },
  { q: "What happens if I miss my train?", a: "If you miss your train, the ticket becomes invalid and no refund is given. However, if the train was significantly delayed (30+ minutes past scheduled departure), you can request a full refund at the station counter. Always use our Live Train Tracker to check your train's real-time status before leaving for the station." },
  { q: "Do I need to carry a printed ticket?", a: "For online bookings, you can show the e-ticket on your phone along with your CNIC. For counter bookings, you must carry the physical ticket. It's recommended to keep a screenshot of your e-ticket in case of network issues at the station. Ticket inspectors may also verify your identity during the journey." },
  { q: "How early should I arrive at the station?", a: "Arrive at least 30-45 minutes before departure for express/AC trains, and 15-20 minutes for local/passenger trains. During peak seasons (Eid, summer holidays), arrive 1 hour early to find your coach and seat. Check platform assignments on the station display boards upon arrival." },
  { q: "Are there group booking discounts?", a: "Pakistan Railways offers group rates for parties of 20 or more traveling together. Contact the nearest major station booking office or call Pakistan Railways helpline to arrange group bookings. Group discounts typically range from 10-25% depending on route and class." },
  { q: "Can I buy tickets at any railway station?", a: "You can buy tickets at all major stations with computerized booking counters. Tickets are available up to 30 days in advance. Smaller stations may only have manual ticket windows with limited train options. For the best availability, book online or at major junction stations like Lahore, Karachi Cantt, or Rawalpindi." },
  { q: "Is there a refund for unused return tickets?", a: "Yes, unused return journey tickets can be refunded at any booking counter. The same cancellation policy applies — full refund minus processing fee if cancelled 24+ hours before the return journey departure. Keep both legs of the ticket for refund processing." },
  { q: "Do ticket prices increase during Eid?", a: "Pakistan Railways does not officially increase base fares during Eid, but special Eid trains may have different pricing. The real challenge is availability — tickets sell out weeks in advance for popular routes during Eid ul-Fitr and Eid ul-Adha. Book as early as possible (15-30 days ahead)." },
  { q: "Can I upgrade my ticket class after boarding?", a: "In-train upgrades are sometimes possible if higher-class seats are available. Speak to the train conductor who may allow an upgrade upon payment of the fare difference. This is not guaranteed and depends on seat availability. For guaranteed upgrades, visit the booking counter before departure." },
  { q: "What is the fare for Karachi to Lahore journey?", a: "Karachi to Lahore fares range from Rs. 1,800 (Economy) to Rs. 9,000 (AC Business) depending on train and class. Green Line AC Business costs around Rs. 8,000-9,000, while Tezgam Economy is approximately Rs. 1,800. See our complete fare chart above for all route prices." },
];

export default function TicketPricingPage() {
  return (
    <main>
      <SEOHead
        title="Pakistan Railways Ticket Prices 2026 — Complete Fare Chart All Routes & Classes"
        description="Updated Pakistan Railways fare list 2026. Compare ticket prices for Economy, Business, AC Standard, AC Business, Sleeper & Parlor classes. Karachi to Lahore from Rs. 1,800. All 14 major routes."
        canonical="/ticket-pricing"
        keywords="pakistan railway ticket price 2026, train fare pakistan, karachi lahore train ticket price, pakistan railways fare list, train ticket price chart, economy vs business class train, pakistan railway fare chart, AC business fare pakistan railways"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Ticket Pricing", url: "/ticket-pricing" }]}
        faqSchema={ticketFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Pakistan Railways Ticket Prices & Fare Chart 2026",
          "description": "Complete fare comparison for all Pakistan Railways train classes and routes",
          "url": "https://trackmytrain.pk/ticket-pricing",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Pakistan Railways Fare Chart",
            "numberOfItems": pricingData.length,
            "itemListElement": pricingData.map((r, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": r.route,
              "item": {
                "@type": "PriceSpecification",
                "priceCurrency": "PKR",
                "description": `Economy Rs. ${r.economy} | Business Rs. ${r.business} | AC Standard Rs. ${r.ac} | AC Business Rs. ${r.acBusiness}`
              }
            }))
          }
        }, {
          "@context": "https://schema.org",
          "@type": "Table",
          "name": "Pakistan Railways Ticket Price Comparison Table 2026",
          "description": "Side-by-side fare comparison across Economy, Business, AC Standard, and AC Business classes for 14 major Pakistan Railways routes.",
          "about": {
            "@type": "Thing",
            "name": "Pakistan Railways Fares",
            "description": "Train ticket prices for all classes and routes across Pakistan's railway network"
          }
        }, {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Pakistan Railways Coach Classes Comparison",
          "description": "Compare all 6 coach classes available on Pakistan Railways — from Economy to Parlor Car — with features, comfort level, and fare ranges.",
          "numberOfItems": coachClasses.length,
          "itemListElement": coachClasses.map((c, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": c.cls,
            "description": `${c.desc} Fare range: ${c.fareRange}. Features: ${c.features.join(", ")}.`
          }))
        }]}
      />
      <PremiumHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Ticket Pricing" }]}
        badge="UPDATED FARE LIST 2026"
        badgeIcon={<CreditCard className="w-3.5 h-3.5 text-[hsl(152_55%_45%)]" />}
        title={<>Pakistan Railways<br /><span className="text-gradient-gold">Ticket Prices & Fares 2026</span></>}
        subtitle="Complete and updated fare list for all major routes across Pakistan. Compare prices across Economy, Business, AC Standard, AC Business, Sleeper, and Parlor classes."
        subtitleUrdu="پاکستان ریلوے ٹکٹ کی قیمتیں — تمام کلاسز اور روٹس"
        centered
      />

      {/* Floating Stats */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: `${pricingData.length}+`, label: "Routes Covered", icon: MapPin, gradient: "gradient-card-emerald" },
            { value: "6", label: "Coach Classes", icon: Star, gradient: "gradient-card-amber" },
            { value: "Rs. 350", label: "Lowest Fare", icon: Tag, gradient: "gradient-card-blue" },
            { value: "50%", label: "Max Discount", icon: Percent, gradient: "gradient-card-purple" },
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

        {/* Disclaimer */}
        <Card className="mb-8 bg-accent/5 border-accent/20">
          <CardContent className="p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> Prices shown are approximate and may vary based on train type and seasonal adjustments. 
              For exact fares, please check at the time of booking on the official Pakistan Railways website. Children under 3 travel free; ages 3-12 get 50% discount.
            </p>
          </CardContent>
        </Card>

        {/* Fare Table */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">FARE CHART</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Major Route Fare Chart (PKR)</h2>
            <p className="text-sm text-muted-foreground mt-1">Compare ticket prices across all classes for popular routes</p>
          </div>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-3 font-semibold">Route</th>
                  <th className="text-right p-3 font-semibold">Economy</th>
                  <th className="text-right p-3 font-semibold">Business</th>
                  <th className="text-right p-3 font-semibold">AC Standard</th>
                  <th className="text-right p-3 font-semibold">AC Business</th>
                  <th className="text-right p-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((row, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30 transition-colors even:bg-muted/10">
                    <td className="p-3 font-medium whitespace-nowrap">{row.route}</td>
                    <td className="p-3 text-right text-primary font-medium">Rs. {row.economy}</td>
                    <td className="p-3 text-right">Rs. {row.business}</td>
                    <td className="p-3 text-right">Rs. {row.ac}</td>
                    <td className="p-3 text-right font-medium">Rs. {row.acBusiness}</td>
                    <td className="p-3 text-right text-muted-foreground">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Coach Classes */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">TRAVEL CLASSES</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Train Travel Classes Explained</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose the class that suits your comfort needs and budget</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {coachClasses.map((c, i) => (
              <Card key={i} className={`${c.gradient} border hover-lift group overflow-hidden`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <h3 className="font-bold group-hover:text-primary transition-colors">{c.cls}</h3>
                      <span className="text-xs font-semibold text-primary">{c.fareRange}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
                  <div className="space-y-1.5">
                    {c.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Compare Train Classes — Interactive Side-by-Side */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">SIDE-BY-SIDE COMPARISON</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Compare Train Classes</h2>
            <p className="text-sm text-muted-foreground mt-1">Detailed feature comparison to help you choose the right class for your journey</p>
          </div>

          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-3 font-semibold min-w-[160px]">Feature</th>
                  <th className="text-center p-3 font-semibold min-w-[130px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">💺</span>
                      <span>Economy</span>
                    </div>
                  </th>
                  <th className="text-center p-3 font-semibold min-w-[130px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">❄️</span>
                      <span>AC Standard</span>
                    </div>
                  </th>
                  <th className="text-center p-3 font-semibold min-w-[130px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">⭐</span>
                      <span>AC Business</span>
                    </div>
                  </th>
                  <th className="text-center p-3 font-semibold min-w-[130px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">🛏️</span>
                      <span>AC Sleeper</span>
                    </div>
                  </th>
                  <th className="text-center p-3 font-semibold min-w-[130px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">👑</span>
                      <span>AC Parlor</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Air Conditioning", economy: "❌ Fan only", acStd: "✅ Full AC", acBiz: "✅ Full AC", sleeper: "✅ Full AC", parlor: "✅ Full AC" },
                  { feature: "Seating Type", economy: "Basic padded, 3+3", acStd: "Padded reclining, 2+2", acBiz: "Wide reclining, 160°", sleeper: "Upper/lower berths", parlor: "Private 2/4-berth cabin" },
                  { feature: "Meals Included", economy: "❌ Purchasable", acStd: "❌ Purchasable", acBiz: "✅ Complimentary", sleeper: "❌ Purchasable", parlor: "✅ Complimentary" },
                  { feature: "Bedding Provided", economy: "❌", acStd: "❌", acBiz: "❌", sleeper: "✅ Sheets, pillow, blanket", parlor: "✅ Premium bedding" },
                  { feature: "Power Outlets", economy: "❌", acStd: "⚡ Limited", acBiz: "✅ Every seat", sleeper: "⚡ Shared", parlor: "✅ Every berth" },
                  { feature: "Privacy Level", economy: "Open coach", acStd: "Open coach", acBiz: "Open coach, spacious", sleeper: "Curtained berths", parlor: "Private cabin" },
                  { feature: "Legroom", economy: "Basic", acStd: "Moderate", acBiz: "Generous", sleeper: "Lie-flat berth", parlor: "Lie-flat berth" },
                  { feature: "Toilet Type", economy: "Eastern/Western mix", acStd: "Western + Eastern", acBiz: "Western-style, clean", sleeper: "Western-style", parlor: "Attached Western" },
                  { feature: "Reserved Seat", economy: "✅ (Reserved class)", acStd: "✅ Guaranteed", acBiz: "✅ Guaranteed", sleeper: "✅ Guaranteed", parlor: "✅ Guaranteed" },
                  { feature: "Priority Boarding", economy: "❌", acStd: "❌", acBiz: "✅", sleeper: "❌", parlor: "✅" },
                  { feature: "Fare (KHI→LHR)", economy: "Rs. 1,800", acStd: "Rs. 6,500", acBiz: "Rs. 9,000", sleeper: "Rs. 3,500–6,000", parlor: "Rs. 7,000–9,500" },
                  { feature: "Best For", economy: "Budget / short trips", acStd: "Families / value AC", acBiz: "Business travelers", sleeper: "Overnight budget", parlor: "Luxury overnight" },
                  { feature: "Available On", economy: "All trains", acStd: "Most express", acBiz: "Green Line, Business Exp", sleeper: "Tezgam, Karakoram", parlor: "Green Line, Shalimar" },
                ].map((row, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30 transition-colors even:bg-muted/10">
                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">{row.feature}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{row.economy}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{row.acStd}</td>
                    <td className="p-3 text-center text-xs font-medium text-primary">{row.acBiz}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{row.sleeper}</td>
                    <td className="p-3 text-center text-xs font-medium text-primary">{row.parlor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Class Availability by Train */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { train: "Green Line Express", classes: ["AC Business", "AC Parlor", "AC Standard"], gradient: "gradient-card-emerald", tag: "Premium" },
              { train: "Business Express", classes: ["AC Business", "AC Standard"], gradient: "gradient-card-blue", tag: "Premium" },
              { train: "Tezgam Express", classes: ["AC Sleeper", "AC Standard", "Economy"], gradient: "gradient-card-amber", tag: "Popular" },
              { train: "Karakoram Express", classes: ["AC Sleeper", "AC Standard", "Economy"], gradient: "gradient-card-purple", tag: "Popular" },
              { train: "Shalimar Express", classes: ["AC Parlor", "AC Standard", "Economy"], gradient: "gradient-card-rose", tag: "Classic" },
              { train: "Passenger Trains", classes: ["Economy Reserved", "Economy Unreserved"], gradient: "gradient-card-teal", tag: "Budget" },
            ].map((t, i) => (
              <Card key={i} className={`${t.gradient} border hover-lift`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm">{t.train}</h3>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t.tag}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.classes.map((cls, j) => (
                      <span key={j} className="text-[10px] bg-background/80 border rounded-md px-2 py-0.5 text-muted-foreground">{cls}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Decision Guide */}
          <Card className="mt-8 border">
            <CardContent className="p-5 sm:p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" /> Quick Decision Guide
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">By Journey Duration:</p>
                  <p className="text-muted-foreground flex gap-2"><span>⏱️</span> Under 3 hours → Economy is fine</p>
                  <p className="text-muted-foreground flex gap-2"><span>🕐</span> 3-8 hours → AC Standard recommended</p>
                  <p className="text-muted-foreground flex gap-2"><span>🌙</span> 8-15 hours → AC Sleeper for overnight</p>
                  <p className="text-muted-foreground flex gap-2"><span>✈️</span> 15+ hours → AC Parlor or AC Business</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">By Season:</p>
                  <p className="text-muted-foreground flex gap-2"><span>☀️</span> Summer (May–Sep) → AC classes strongly recommended</p>
                  <p className="text-muted-foreground flex gap-2"><span>❄️</span> Winter (Nov–Feb) → Economy is comfortable & cheaper</p>
                  <p className="text-muted-foreground flex gap-2"><span>🌧️</span> Monsoon (Jul–Sep) → Avoid Economy (closed windows)</p>
                  <p className="text-muted-foreground flex gap-2"><span>🎉</span> Eid season → Book 2-3 weeks early, any class</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How to Book */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">BOOKING GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">How to Book Tickets</h2>
            <p className="text-sm text-muted-foreground mt-1">Three convenient ways to purchase your Pakistan Railway tickets</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Smartphone, gradient: "gradient-card-emerald", title: "📱 Online Booking", desc: "Visit pak-railways.gov.pk or use the official mobile app. Pay with credit/debit card, JazzCash, Easypaisa, or bank transfer. E-tickets delivered instantly to your email." },
              { icon: Building2, gradient: "gradient-card-amber", title: "🏢 Station Counter", desc: "Visit any major railway station booking counter with valid CNIC. Tickets available up to 30 days in advance. Computerized booking at all major stations." },
              { icon: Users, gradient: "gradient-card-blue", title: "🏪 Authorized Agents", desc: "Authorized travel agents can book tickets on your behalf. Small service fee may apply. Convenient for group bookings and travel packages." },
            ].map((method, i) => (
              <Card key={i} className={`${method.gradient} border hover-lift group`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{method.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{method.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Discounts & Tips */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">SAVE MONEY</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Discounts & Booking Tips</h2>
            <p className="text-sm text-muted-foreground mt-1">Ways to save on your Pakistan Railway journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Discounts */}
            <Card className="gradient-card-emerald border hover-lift">
              <CardContent className="p-5 sm:p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Percent className="w-5 h-5 text-primary" /> Available Discounts
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Students", discount: "25-50% off", detail: "With valid student ID card" },
                    { label: "Senior Citizens (60+)", discount: "25% off", detail: "With CNIC verification" },
                    { label: "Disabled Persons", discount: "50% off", detail: "With disability certificate" },
                    { label: "Children (3-12)", discount: "50% off", detail: "Half fare on all classes" },
                    { label: "Children Under 3", discount: "Free", detail: "No separate seat provided" },
                    { label: "Season Tickets", discount: "Up to 30% off", detail: "For regular commuters" },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 py-1.5 border-b border-border/50 last:border-0">
                      <div>
                        <span className="text-sm font-medium">{d.label}</span>
                        <span className="text-[10px] text-muted-foreground block">{d.detail}</span>
                      </div>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">{d.discount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="gradient-card-amber border hover-lift">
              <CardContent className="p-5 sm:p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" /> Smart Booking Tips
                </h3>
                <div className="space-y-2.5 text-sm text-muted-foreground">
                  <p className="flex gap-2"><span>📅</span> Book 3-7 days in advance for popular routes</p>
                  <p className="flex gap-2"><span>💻</span> Online booking available 24/7 on official website</p>
                  <p className="flex gap-2"><span>🔄</span> Return tickets save 10-15% on some routes</p>
                  <p className="flex gap-2"><span>📆</span> Weekday trains are less crowded and easier to book</p>
                  <p className="flex gap-2"><span>🚂</span> Passenger trains are slower but significantly cheaper</p>
                  <p className="flex gap-2"><span>👥</span> Groups of 20+ can get 10-25% group discount</p>
                  <p className="flex gap-2"><span>⚠️</span> Peak season (Eid, holidays) — book extra early</p>
                  <p className="flex gap-2"><span>💳</span> Pay via JazzCash, Easypaisa, or credit/debit cards</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">PAYMENT OPTIONS</p>
            <h2 className="text-xl sm:text-2xl font-bold">Accepted Payment Methods</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { icon: Wallet, title: "JazzCash", desc: "Mobile wallet", gradient: "gradient-card-emerald" },
              { icon: Smartphone, title: "Easypaisa", desc: "Mobile payment", gradient: "gradient-card-amber" },
              { icon: CreditCard, title: "Credit/Debit Card", desc: "Visa, Mastercard", gradient: "gradient-card-blue" },
              { icon: Building2, title: "Bank Transfer", desc: "Online banking", gradient: "gradient-card-purple" },
            ].map((p, i) => (
              <Card key={i} className={`${p.gradient} border hover-lift group`}>
                <CardContent className="p-4 text-center">
                  <p.icon className="w-6 h-6 text-primary mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
                  <h4 className="font-semibold text-xs group-hover:text-primary transition-colors">{p.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-3">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold">Ticket Pricing FAQs</h2>
            <p className="text-sm text-muted-foreground mt-1">Everything you need to know about Pakistan Railway ticket pricing, booking, and discounts</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {ticketFaqs.map((faq, i) => (
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

        {/* Rich SEO Editorial Content */}
        <section className="mb-12 sm:mb-16 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">FARE GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Understanding Pakistan Railway Fares 2026</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: BarChart3, gradient: "gradient-card-emerald", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", title: "How Fares Are Calculated", desc: "Ticket prices depend on distance traveled (per km), train category (Express costs more than Passenger for faster service), and coach class (Economy → Parlor Car). Premium trains like Green Line charge a service premium." },
              { icon: Tag, gradient: "gradient-card-amber", iconBg: "bg-amber-500/15", iconColor: "text-amber-500", title: "Best Fare Tips", desc: "Book 3-7 days early for popular routes. Travel weekdays for less crowding. Students save up to 50%. Passenger trains are significantly cheaper. Return tickets save 10-15% on some routes." },
              { icon: Shield, gradient: "gradient-card-blue", iconBg: "bg-blue-500/15", iconColor: "text-blue-500", title: "Seasonal Adjustments", desc: "Fares may adjust during Eid, summer holidays, and peak seasons. Demand spikes cause tickets to sell out weeks early. Book well in advance and consider alternative dates or classes." },
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

          <Card className="bg-hero-gradient text-primary-foreground border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
            <CardContent className="p-5 sm:p-6 relative">
              <h4 className="font-bold text-sm mb-3">💡 Online vs Counter Booking — Which Is Better?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                  <div className="font-bold text-sm mb-2">📱 Online Booking</div>
                  <ul className="space-y-1 text-xs opacity-90">
                    <li>✓ Available 24/7 — book anytime</li>
                    <li>✓ Instant e-ticket to your email</li>
                    <li>✓ JazzCash, Easypaisa, cards accepted</li>
                    <li>✓ No queues or waiting</li>
                  </ul>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                  <div className="font-bold text-sm mb-2">🏢 Counter Booking</div>
                  <ul className="space-y-1 text-xs opacity-90">
                    <li>✓ Staff assists with seat selection</li>
                    <li>✓ Available up to 30 days in advance</li>
                    <li>✓ Cash payment accepted</li>
                    <li>✓ Better for group bookings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Links */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">PLAN YOUR JOURNEY</p>
            <h2 className="text-xl sm:text-2xl font-bold">Related Tools & Resources</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Navigation, gradient: "gradient-card-emerald", title: "Journey Planner", desc: "Find the best routes between any two stations with timing comparisons.", link: "/planner" },
              { icon: Train, gradient: "gradient-card-amber", title: "Live Train Tracker", desc: "Track any train in real-time with GPS positioning and delay info.", link: "/train" },
              { icon: Clock, gradient: "gradient-card-blue", title: "Train Schedule", desc: "Complete timetables for all Pakistan Railway trains.", link: "/schedule" },
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Book Your Journey?</h2>
          <p className="text-base opacity-80 max-w-xl mx-auto mb-6">Plan your route, compare fares, and track your train in real-time — all in one place.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/planner">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold gap-2">
                <Navigation className="w-4 h-4" /> Plan Your Journey
              </Button>
            </Link>
            <Link to="/train">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <Train className="w-4 h-4" /> Track Trains Live
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": ticketFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
      <RelatedLinks context="general" />
    </main>
  );
}
