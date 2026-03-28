import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CreditCard, Smartphone, Globe, Building2, Clock, Shield, CheckCircle2,
  AlertTriangle, HelpCircle, Wallet, Users, MapPin, Info, Ticket, QrCode, Phone,
  CircleDollarSign, CalendarDays, FileText, Star, Banknote, ChevronRight, ExternalLink
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const bookingFaqs = [
  { q: "How do I book Pakistan Railways tickets online in 2026?", a: "You can book tickets online through the official RABTA app (available on Android and iOS) or the Pakistan Railways website at pakrailways.gov.pk. Create an account using your CNIC number, search for trains between your stations, select your preferred class, and pay using JazzCash, Easypaisa, or a debit/credit card. Your e-ticket is sent to your phone — no printout needed." },
  { q: "What is the RABTA app and is it official?", a: "RABTA is the officially authorized ticketing application by Pakistan Railways, developed by Easyway Innovations. It's available on Google Play Store and Apple App Store. It allows you to search trains, book tickets, check schedules, and manage reservations. It replaced the older Pak Rail Live booking system in 2024." },
  { q: "Can I book train tickets without a CNIC?", a: "No, a valid CNIC (Computerized National Identity Card) is required for all Pakistan Railways ticket bookings — both online and at counters. For foreign nationals, a valid passport number can be used instead. Children under 3 travel free without a ticket; ages 3-12 require a half-fare ticket booked under a parent's CNIC." },
  { q: "How far in advance can I book train tickets?", a: "You can book Pakistan Railways tickets up to 30 days in advance through the RABTA app, online portal, or at station counters. For peak seasons (Eid, summer holidays, December), booking 15-30 days early is strongly recommended as popular trains like Green Line Express and Tezgam sell out quickly." },
  { q: "What payment methods are accepted for online booking?", a: "Pakistan Railways online booking accepts JazzCash, Easypaisa, and debit/credit cards (Visa, Mastercard). JazzCash and Easypaisa are the most popular methods, requiring just your mobile wallet PIN to complete payment. Bank transfers are not directly supported for online bookings." },
  { q: "Can I cancel my train ticket and get a refund?", a: "Yes. Cancellation more than 24 hours before departure: full refund minus Rs. 50 processing fee. Between 4-24 hours: 75% refund. Between 2-4 hours: 50% refund. Less than 2 hours or after departure: no refund. Refunds are processed to your original payment method within 7-10 business days." },
  { q: "Do I need to print my e-ticket?", a: "No, you do not need to print your e-ticket. The digital ticket on your phone (in the RABTA app or the confirmation SMS/email) is sufficient. The ticket checker (TTE) will scan or verify your ticket using your CNIC number and booking reference. However, keeping a screenshot is recommended in case of network issues on the train." },
  { q: "What is the difference between reserved and unreserved tickets?", a: "Reserved tickets guarantee you a specific seat/berth number in your chosen coach class. Unreserved tickets (available on Passenger trains only) allow boarding but without a guaranteed seat — you sit wherever space is available. Express and premium trains like Green Line only offer reserved seats." },
  { q: "Can I change my train or date after booking?", a: "Date changes are allowed once, up to 24 hours before departure, subject to seat availability on the new date. You cannot change the train type, route, or class — you'd need to cancel and rebook. Changes can be made through the RABTA app or at a reservation counter with your booking reference." },
  { q: "Are there student or senior citizen discounts?", a: "Yes. Students with a valid college/university ID get 25% off on Economy and Business class. Senior citizens (60+) receive a 25% concession on all classes with a valid CNIC. Disabled persons with a disability certificate get 50% off. Children aged 3-12 travel at 50% fare. Children under 3 travel free." },
  { q: "What happens if my train is cancelled after I've booked?", a: "If Pakistan Railways cancels a train, you receive a full 100% refund automatically to your original payment method within 5-7 business days. Alternatively, you can transfer your booking to the next available train on the same route at no extra cost. Contact the RABTA helpline (117) or visit the station counter." },
  { q: "Can I book tickets for someone else?", a: "Yes, you can book tickets for other passengers using your account. You'll need their full name and CNIC number. The passenger must carry their original CNIC during travel for verification by the ticket checker. You can book up to 6 tickets per transaction." },
  { q: "Is it cheaper to book online or at the counter?", a: "The fare is the same whether you book online or at the counter. However, online booking saves you the trip to the station and waiting in queues. Occasionally, Pakistan Railways runs promotional discounts exclusive to online/app bookings — typically 5-10% off on select routes." },
  { q: "What should I do if my online payment fails but money is deducted?", a: "If your payment is deducted but the ticket isn't confirmed, wait 30 minutes — the system often auto-reverses failed transactions. If not resolved, contact the RABTA helpline at 117 with your transaction ID and CNIC. You can also email complaints@pakrailways.gov.pk. Refunds for failed transactions typically process within 3-5 business days." },
  { q: "Can I book train tickets at the station on the same day?", a: "Yes, same-day booking is available at station counters subject to seat availability. However, for popular Express trains, same-day seats are rarely available. Passenger trains and less popular routes usually have same-day availability. Arrive at least 1 hour before departure to allow time for ticketing." },
  { q: "What classes are available for online booking?", a: "All classes are available for online booking: Economy, Business, AC Standard, AC Business, AC Sleeper, and Parlor Car. However, not all trains offer all classes. Green Line Express offers AC Business, AC Standard, AC Sleeper, and Economy. Passenger trains typically only offer Economy class." },
];

const bookingMethods = [
  {
    icon: Smartphone, gradient: "gradient-card-emerald",
    iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500",
    title: "RABTA Mobile App",
    subtitle: "Recommended — Fastest Method",
    desc: "Download the official RABTA app from Google Play or App Store. Create an account with your CNIC, search trains, select seats, and pay via JazzCash, Easypaisa, or card. Your e-ticket is stored in the app.",
    pros: ["Fastest booking experience", "E-ticket stored in app", "Real-time seat availability", "Push notification reminders"],
    link: "https://play.google.com/store/apps/details?id=com.easyway.ticket.app",
    linkText: "Download RABTA App",
  },
  {
    icon: Globe, gradient: "gradient-card-blue",
    iconBg: "bg-blue-500/15", iconColor: "text-blue-500",
    title: "Pakistan Railways Website",
    subtitle: "Official Portal — pakrailways.gov.pk",
    desc: "Visit the official Pakistan Railways website, navigate to the booking section, and follow the same process. Best for those who prefer a larger screen or don't want to install an app.",
    pros: ["No app download needed", "Works on any browser", "Full schedule visibility", "Print-friendly receipts"],
    link: "https://www.pakrailways.gov.pk/buy",
    linkText: "Visit Official Website",
  },
  {
    icon: Building2, gradient: "gradient-card-amber",
    iconBg: "bg-amber-500/15", iconColor: "text-amber-500",
    title: "Station Counter",
    subtitle: "Traditional — Walk-in Booking",
    desc: "Visit any major Pakistan Railways station reservation counter with your CNIC. Counters are open 8 AM – 8 PM daily. You'll receive a printed ticket. Best for those without digital payment methods.",
    pros: ["Cash payment accepted", "Assistance from staff", "Immediate physical ticket", "No internet required"],
    link: "/stations",
    linkText: "Find Your Station",
  },
  {
    icon: Phone, gradient: "gradient-card-purple",
    iconBg: "bg-purple-500/15", iconColor: "text-purple-500",
    title: "Railway Helpline (117)",
    subtitle: "Phone Booking — Operator Assisted",
    desc: "Call the Pakistan Railways helpline 117 to book tickets over the phone. An operator will guide you through the process. Payment confirmation is sent via SMS. Available 24/7.",
    pros: ["No internet needed", "Operator guidance", "24/7 availability", "Good for accessibility"],
    link: "tel:117",
    linkText: "Call 117 Now",
  },
];

const stepByStep = [
  { step: 1, title: "Download RABTA or Visit Website", desc: "Install the RABTA app from Google Play / App Store, or go to pakrailways.gov.pk/buy on your browser.", icon: Smartphone },
  { step: 2, title: "Create Account with CNIC", desc: "Register using your 13-digit CNIC number, name, phone number, and email address. Verify via OTP sent to your phone.", icon: FileText },
  { step: 3, title: "Search Your Train", desc: "Enter departure station, arrival station, and travel date. The system shows all available trains with seat counts and fares.", icon: MapPin },
  { step: 4, title: "Select Class & Seats", desc: "Choose your preferred class (Economy, Business, AC Standard, etc.) and select available seats if the option is shown.", icon: Ticket },
  { step: 5, title: "Enter Passenger Details", desc: "Fill in passenger name(s) and CNIC number(s). You can add up to 6 passengers per booking. Children need a parent's CNIC.", icon: Users },
  { step: 6, title: "Pay & Get E-Ticket", desc: "Pay using JazzCash, Easypaisa, or debit/credit card. Your e-ticket with booking reference is sent via SMS, email, and saved in the app.", icon: CreditCard },
];

const paymentMethods = [
  { name: "JazzCash", icon: "📱", desc: "Pakistan's largest mobile wallet. Pay using your JazzCash PIN directly. Instant confirmation. Works with any Jazz SIM.", popular: true },
  { name: "Easypaisa", icon: "💚", desc: "Telenor's mobile wallet service. Link your Easypaisa account and pay with your mobile PIN. Widely used across Pakistan.", popular: true },
  { name: "Debit Card", icon: "💳", desc: "Any Pakistani bank debit card (Visa/Mastercard) works. Enter card details and OTP from your bank. Secure 3D authentication.", popular: false },
  { name: "Credit Card", icon: "🏦", desc: "Visa and Mastercard credit cards accepted. International cards may work but are not guaranteed. Local cards recommended.", popular: false },
];

const cancellationPolicy = [
  { timing: "More than 24 hours before departure", refund: "Full refund minus Rs. 50 processing fee", color: "text-emerald-500" },
  { timing: "4 to 24 hours before departure", refund: "75% refund", color: "text-amber-500" },
  { timing: "2 to 4 hours before departure", refund: "50% refund", color: "text-orange-500" },
  { timing: "Less than 2 hours / After departure", refund: "No refund", color: "text-destructive" },
];

const proTips = [
  { tip: "Book 15-30 days early for Eid travel", detail: "Trains sell out weeks before Eid-ul-Fitr and Eid-ul-Adha. Set a calendar reminder for when booking opens." },
  { tip: "Use JazzCash for fastest checkout", detail: "JazzCash payments process in under 10 seconds compared to card payments which require OTP verification." },
  { tip: "Screenshot your e-ticket", detail: "Mobile data can be unreliable on trains. Save a screenshot of your booking confirmation for offline access." },
  { tip: "Check live delays before heading to station", detail: "Use Track My Train to check if your train is delayed. No point waiting 3 hours at the station during fog season." },
  { tip: "AC Standard is the best value", detail: "AC Standard offers 80% of AC Business comfort at 50% of the price. The biggest comfort jump is from Economy to AC Standard." },
  { tip: "Book return tickets separately", detail: "Pakistan Railways doesn't offer round-trip discounts. Book each leg independently for maximum flexibility on dates." },
  { tip: "Carry original CNIC — always", detail: "The ticket checker (TTE) will verify your identity using your CNIC. Without it, you may be treated as ticketless and fined." },
  { tip: "Choose afternoon departures in winter", detail: "Morning trains in Punjab (Dec-Feb) face 3-8 hour fog delays. Afternoon departures are significantly more reliable." },
];

export default function BuyTickets() {
  return (
    <main>
      <SEOHead
        title="Buy Pakistan Railways Tickets Online — RABTA 2026"
        description="Book Pakistan Railways tickets via RABTA app or website. Pay with JazzCash, Easypaisa, or card. Student discounts, cancellation policy, and step-by-step guide."
        canonical="/buy-tickets"
        keywords="buy train tickets online pakistan, pakistan railways online booking, RABTA app booking, how to book train ticket, pakistan railway e ticket, train ticket booking 2026, JazzCash train ticket, easypaisa train booking, railway ticket cancellation policy, book railway ticket online"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Buy Tickets Online", url: "/buy-tickets" }]}
        faqSchema={bookingFaqs}
        howToSchema={{
          name: "How to Book Pakistan Railways Train Tickets Online",
          steps: stepByStep.map(s => ({ name: s.title, text: s.desc })),
        }}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Buy Pakistan Railways Train Tickets Online in 2026",
          "description": "Complete step-by-step guide to booking train tickets online in Pakistan using the RABTA app, official website, station counters, or helpline.",
          "totalTime": "PT10M",
          "estimatedCost": { "@type": "MonetaryAmount", "currency": "PKR", "value": "350-11500" },
          "tool": [
            { "@type": "HowToTool", "name": "Smartphone or Computer" },
            { "@type": "HowToTool", "name": "CNIC (National ID Card)" },
            { "@type": "HowToTool", "name": "JazzCash, Easypaisa, or Bank Card" }
          ],
          "step": stepByStep.map(s => ({
            "@type": "HowToStep",
            "name": s.title,
            "text": s.desc,
            "position": s.step
          }))
        }, {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Buy Train Tickets Online in Pakistan — 2026 Guide",
          "url": "https://trackmytrain.pk/buy-tickets",
          "description": "Comprehensive guide covering all methods to purchase Pakistan Railways tickets — online app, website, counter, and phone.",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Pakistan Railways Ticket Booking Methods",
            "numberOfItems": 4,
            "itemListElement": bookingMethods.map((m, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": m.title,
              "description": m.desc
            }))
          }
        }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>Buy Tickets Online</span>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <Ticket className="w-4 h-4" /> Updated March 2026
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
              How to Buy <span className="text-gradient-gold">Train Tickets Online</span> in Pakistan
            </h1>
            <p className="text-base sm:text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Complete step-by-step guide to booking Pakistan Railways tickets — via the RABTA app, official website, station counters, or phone. Covers payment methods, cancellation policy, discounts, and expert pro tips.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                <a href="https://play.google.com/store/apps/details?id=com.easyway.ticket.app" target="_blank" rel="noopener noreferrer">
                  <Smartphone className="w-4 h-4 mr-2" /> Download RABTA App
                </a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-bold">
                <Link to="/ticket-pricing">
                  <CreditCard className="w-4 h-4 mr-2" /> View Fare Chart
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer Box — Targets Google SGE / AI Overviews */}
      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-primary/30 bg-primary/5 max-w-4xl mx-auto">
            <CardContent className="p-5 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Quick Answer: How to Book Train Tickets in Pakistan</h2>
                  <p className="text-sm text-muted-foreground mt-1">For those in a hurry — here's the fastest way</p>
                </div>
              </div>
              <ol className="space-y-2 text-sm text-muted-foreground ml-1">
                <li className="flex items-start gap-2"><span className="font-bold text-primary shrink-0">1.</span> Download the <strong className="text-foreground">RABTA app</strong> from Google Play or App Store</li>
                <li className="flex items-start gap-2"><span className="font-bold text-primary shrink-0">2.</span> Register with your <strong className="text-foreground">13-digit CNIC number</strong> and phone</li>
                <li className="flex items-start gap-2"><span className="font-bold text-primary shrink-0">3.</span> Search your route (e.g., Karachi → Lahore) and select a train</li>
                <li className="flex items-start gap-2"><span className="font-bold text-primary shrink-0">4.</span> Choose class (Economy Rs. 350+ / AC Business Rs. 1,800+)</li>
                <li className="flex items-start gap-2"><span className="font-bold text-primary shrink-0">5.</span> Pay via <strong className="text-foreground">JazzCash, Easypaisa, or bank card</strong></li>
                <li className="flex items-start gap-2"><span className="font-bold text-primary shrink-0">6.</span> Receive your <strong className="text-foreground">e-ticket via SMS</strong> — no printout needed</li>
              </ol>
              <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> Takes ~5 minutes</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5 text-primary" /> Book up to 30 days ahead</span>
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary" /> Carry original CNIC on travel day</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4 Booking Methods */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">ALL BOOKING OPTIONS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">4 Ways to Buy Pakistan Railways Tickets</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Whether you prefer digital or in-person booking, here's every method available to purchase train tickets in Pakistan — with pros and direct links.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {bookingMethods.map((method, i) => (
              <Card key={i} className={`${method.gradient} border hover-lift group`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl ${method.iconBg} flex items-center justify-center shrink-0`}>
                      <method.icon className={`w-5 h-5 ${method.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">{method.title}</h3>
                      <p className="text-xs text-muted-foreground">{method.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{method.desc}</p>
                  <ul className="space-y-1.5 mb-4">
                    {method.pros.map((pro, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                  {method.link.startsWith("http") || method.link.startsWith("tel") ? (
                    <a href={method.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                      {method.linkText} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link to={method.link} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                      {method.linkText} <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">STEP-BY-STEP GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">How to Book Train Tickets Online — 6 Simple Steps</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Follow this visual guide to book your first Pakistan Railways ticket in under 5 minutes. Works for RABTA app and the official website.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {stepByStep.map((s) => (
              <Card key={s.step} className="border hover-lift group">
                <CardContent className="p-5 sm:p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-lg font-black">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-sm mb-2">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">PAYMENT OPTIONS</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Accepted Payment Methods for Train Tickets</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Pakistan Railways supports multiple digital payment options. JazzCash and Easypaisa are the most popular and fastest methods.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {paymentMethods.map((pm, i) => (
              <Card key={i} className="border hover-lift text-center">
                <CardContent className="p-5">
                  <div className="text-3xl mb-2">{pm.icon}</div>
                  <h3 className="font-bold text-sm mb-1">{pm.name}</h3>
                  {pm.popular && (
                    <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5 mb-2">MOST POPULAR</span>
                  )}
                  <p className="text-xs text-muted-foreground leading-relaxed">{pm.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-3 bg-accent/10 border border-accent/30 rounded-xl p-4">
              <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Station counter only:</strong> Cash payments (Pakistani Rupees) are accepted at all reservation counters. This is the only method that doesn't require a digital wallet or bank card.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cancellation & Refund Policy */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">KNOW BEFORE YOU BOOK</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Cancellation & Refund Policy</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Understanding the refund timeline helps you make informed booking decisions. Here's the official Pakistan Railways cancellation policy for 2026.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-4 font-semibold">Cancellation Timing</th>
                      <th className="text-left p-4 font-semibold">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancellationPolicy.map((row, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-4 text-muted-foreground">{row.timing}</td>
                        <td className={`p-4 font-semibold ${row.color}`}>{row.refund}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <div className="mt-4 flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> If Pakistan Railways cancels a train, you receive a <strong className="text-foreground">full 100% refund</strong> automatically. For trains cancelled due to weather (fog, floods), the same full-refund policy applies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discounts & Concessions */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">SAVE MONEY</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Discounts & Concessions on Train Tickets</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: "🎓", title: "Student Discount", discount: "25% OFF", desc: "Valid college/university ID required. Applies to Economy and Business class on all Express trains.", gradient: "gradient-card-emerald" },
              { icon: "👴", title: "Senior Citizen (60+)", discount: "25% OFF", desc: "Valid CNIC showing age 60 or above. Applies to all classes and all train types.", gradient: "gradient-card-blue" },
              { icon: "♿", title: "Disability Concession", discount: "50% OFF", desc: "Disability certificate from a government hospital required. Applies to all classes.", gradient: "gradient-card-purple" },
              { icon: "👶", title: "Children (3-12 years)", discount: "50% OFF", desc: "Half-fare ticket booked under parent's CNIC. Children under 3 travel free without a ticket.", gradient: "gradient-card-amber" },
              { icon: "📰", title: "Journalist Discount", discount: "50% OFF", desc: "Valid press card from PFUJ/CPNE required. Advance reservation only — not applicable on same-day booking.", gradient: "gradient-card-rose" },
              { icon: "🎖️", title: "Military & Govt. Concession", discount: "Varies", desc: "Active-duty military personnel and government officials may receive special concessions with valid departmental authorization.", gradient: "gradient-card-teal" },
            ].map((d, i) => (
              <Card key={i} className={`${d.gradient} border hover-lift`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{d.icon}</span>
                    <div>
                      <h3 className="font-bold text-sm">{d.title}</h3>
                      <span className="text-xs font-bold text-primary">{d.discount}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You Need — Requirements Checklist */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">CHECKLIST</p>
            <h2 className="text-2xl sm:text-3xl font-bold">What You Need to Book & Travel</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <Card className="gradient-card-emerald border">
              <CardContent className="p-5 sm:p-6">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-primary" /> For Booking
                </h3>
                <ul className="space-y-2">
                  {[
                    "Valid CNIC (13-digit) or Passport for foreigners",
                    "Active mobile number for OTP verification",
                    "JazzCash, Easypaisa account or bank card",
                    "Travel date (can book up to 30 days ahead)",
                    "Passenger details (name + CNIC for each traveler)",
                  ].map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="gradient-card-blue border">
              <CardContent className="p-5 sm:p-6">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" /> On Travel Day
                </h3>
                <ul className="space-y-2">
                  {[
                    "Original CNIC (mandatory — ticket checker will verify)",
                    "E-ticket on phone or screenshot of booking confirmation",
                    "Arrive at station 30-60 minutes before departure",
                    "Check platform number on station display boards",
                    "Use Track My Train to check live delays before leaving home",
                  ].map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">EXPERT ADVICE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">8 Pro Tips for Smarter Ticket Booking</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Insider tips from frequent Pakistan Railways travelers to save time, money, and avoid common booking mistakes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {proTips.map((t, i) => (
              <Card key={i} className="border hover-lift">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{t.tip}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.detail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Long-Form Content */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-sm max-w-none text-muted-foreground space-y-5">
            <h2 className="text-2xl font-bold text-foreground">The Complete Guide to Pakistan Railways Online Ticket Booking in 2026</h2>

            <p className="text-base leading-relaxed">
              Purchasing train tickets in Pakistan has undergone a significant digital transformation since the introduction of the <strong className="text-foreground">e-ticketing system</strong> by the Ministry of Railways. What was once a process that required hours of waiting at crowded station counters can now be completed from your smartphone in under five minutes. This guide covers every aspect of the booking experience — from initial registration to boarding your train.
            </p>

            <h3 className="text-lg font-bold text-foreground">Understanding the RABTA Booking System</h3>
            <p className="leading-relaxed">
              <strong className="text-foreground">RABTA</strong> is the officially authorized ticketing platform for Pakistan Railways, replacing the older reservation systems. Developed by Easyway Innovations, the RABTA app is available on both Google Play Store (Android) and Apple App Store (iOS), with over 1 million downloads. The platform handles everything from seat selection and payment processing to cancellation and refund management. The companion website at <strong className="text-foreground">pakrailways.gov.pk/buy</strong> offers the same functionality for desktop users.
            </p>
            <p className="leading-relaxed">
              The system requires a <strong className="text-foreground">valid CNIC (Computerized National Identity Card)</strong> for registration and booking. This is a security measure that ties each ticket to a verified identity, reducing ticket touting and unauthorized resale. Foreign nationals can use their passport number instead. The registration process involves OTP (One-Time Password) verification sent to your mobile number, ensuring account security.
            </p>

            <h3 className="text-lg font-bold text-foreground">Fare Structure & Class Selection</h3>
            <p className="leading-relaxed">
              Pakistan Railways offers six coach classes, each designed for different comfort levels and budgets. <strong className="text-foreground">Economy Class</strong> (Rs. 350–2,400) provides basic cushioned seating with fan cooling — the most affordable option. <strong className="text-foreground">Business Class</strong> (Rs. 800–4,500) offers reclining seats with more legroom. <strong className="text-foreground">AC Standard</strong> (Rs. 1,200–8,000) is the sweet spot — full air conditioning, comfortable seating, and blankets on overnight trains. <strong className="text-foreground">AC Business</strong> (Rs. 1,800–11,500) is the premium tier with wide luxury seats, complimentary meals, and priority boarding. <strong className="text-foreground">AC Sleeper</strong> (Rs. 2,500–9,000) offers individual berths with bedding for overnight journeys. The rare <strong className="text-foreground">Parlor Car</strong> class is available on select trains like the Business Express.
            </p>
            <p className="leading-relaxed">
              Fares are calculated based on three factors: <strong className="text-foreground">distance traveled</strong> (per-kilometer rate), <strong className="text-foreground">train category</strong> (Express trains cost more than Passenger trains for the same route), and <strong className="text-foreground">coach class</strong>. Premium trains like the <Link to="/green-line-express" className="text-primary hover:underline font-semibold">Green Line Express</Link> charge an additional service premium for their superior amenities.
            </p>

            <h3 className="text-lg font-bold text-foreground">Peak Season Booking Strategy</h3>
            <p className="leading-relaxed">
              The biggest mistake first-time train travelers make is booking too late during peak periods. <strong className="text-foreground">Eid-ul-Fitr</strong> and <strong className="text-foreground">Eid-ul-Adha</strong> are the two highest-demand periods — trains on the Karachi–Lahore, Karachi–Rawalpindi, and Lahore–Peshawar corridors sell out <strong className="text-foreground">15–20 days before the holiday</strong>. Summer holidays (June–July) and December holidays also see elevated demand. The solution is simple: book as soon as the 30-day booking window opens. Set a phone alarm for the exact date your travel window opens and book immediately.
            </p>
            <p className="leading-relaxed">
              During fog season (December–February), Punjab-bound trains frequently experience <strong className="text-foreground">3–8 hour delays</strong>. While this doesn't affect your ticket validity, it does mean you should use our <Link to="/check-delays" className="text-primary hover:underline font-semibold">live delay checker</Link> before heading to the station. An afternoon departure is significantly more reliable than a morning one during this period.
            </p>

            <h3 className="text-lg font-bold text-foreground">Common Booking Mistakes to Avoid</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> <span><strong className="text-foreground">Wrong CNIC:</strong> Double-check the 13-digit number. A single wrong digit means the TTE cannot verify your ticket.</span></li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> <span><strong className="text-foreground">Wrong date format:</strong> The RABTA app uses DD/MM/YYYY format. Confusing month and day is a common error.</span></li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> <span><strong className="text-foreground">Not carrying original CNIC:</strong> A photocopy or picture is NOT accepted. You must have the original card.</span></li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> <span><strong className="text-foreground">Booking wrong station:</strong> "Lahore Junction" and "Lahore Cantt" are different stations. Verify which one your train departs from.</span></li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> <span><strong className="text-foreground">Ignoring delays:</strong> Don't assume your train leaves on time. Check <Link to="/train" className="text-primary hover:underline">live status</Link> before traveling to the station.</span></li>
            </ul>

            <h3 className="text-lg font-bold text-foreground">Tracking Your Train After Booking</h3>
            <p className="leading-relaxed">
              Once you've booked your ticket, use <Link to="/" className="text-primary hover:underline font-semibold">Track My Train</Link> to monitor your train in real time. Our platform shows the <strong className="text-foreground">exact GPS position</strong> of every Pakistan Railways train, updated every 5 seconds. Check the estimated arrival time at your station, current speed, and delay status — all without creating an account or paying a fee. On travel day, this tool eliminates the guesswork of "has my train left yet?" and "how late will it be?"
            </p>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">RELATED TOOLS</p>
            <h2 className="text-2xl font-bold">Plan Your Complete Journey</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { to: "/ticket-pricing", icon: CreditCard, title: "Ticket Prices", desc: "Compare fares for all classes & routes", gradient: "gradient-card-emerald" },
              { to: "/planner", icon: MapPin, title: "Journey Planner", desc: "Find trains between any two stations", gradient: "gradient-card-blue" },
              { to: "/train", icon: Globe, title: "Live Train Tracker", desc: "Track your train's GPS position", gradient: "gradient-card-amber" },
              { to: "/check-delays", icon: Clock, title: "Check Delays", desc: "Real-time delay status for all trains", gradient: "gradient-card-purple" },
            ].map((link, i) => (
              <Link key={i} to={link.to}>
                <Card className={`${link.gradient} border hover-lift h-full`}>
                  <CardContent className="p-5 text-center">
                    <link.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold text-sm mb-1">{link.title}</h3>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">GOT QUESTIONS?</p>
            <h2 className="text-2xl font-bold">Frequently Asked Questions About Train Ticket Booking</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Everything you need to know about buying, cancelling, and managing Pakistan Railways tickets.
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {bookingFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-4 bg-card">
                <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:no-underline">
                  {i + 1}. {faq.q}
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
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Book Your Train?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Download the RABTA app, search your route, and have your e-ticket in under 5 minutes. Then use Track My Train to monitor your journey in real time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <a href="https://play.google.com/store/apps/details?id=com.easyway.ticket.app" target="_blank" rel="noopener noreferrer">
                <Smartphone className="w-4 h-4 mr-2" /> Download RABTA App
              </a>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-bold">
              <Link to="/train">
                <Globe className="w-4 h-4 mr-2" /> Track Live Trains
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}