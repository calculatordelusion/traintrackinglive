import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Clock, AlertTriangle, MessageSquare, MapPin, Globe, Train, Navigation, HelpCircle, Shield, Route, Calendar, Search, CreditCard } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";

const contactFaqs = [
  { q: "How long does it take to get a response from TrackMyTrain.pk?", a: "We typically respond to all inquiries within 2-3 business days. For urgent bug reports that affect live tracking accuracy, we aim to respond within 24 hours. Our team monitors submissions daily during business hours (Monday–Friday, 9 AM – 6 PM PKT)." },
  { q: "Can I report incorrect train schedule data?", a: "Absolutely! If you notice a train's schedule, route, or station information is incorrect on our platform, please use the contact form with the subject 'Train Data Issue'. Include the train name/number and what data appears incorrect. We verify and update our database regularly based on community reports." },
  { q: "How do I suggest a new feature for TrackMyTrain.pk?", a: "We love hearing feature ideas from our community! Use the contact form with the subject 'Feature Request' or visit our dedicated Feature Request page at trackmytrain.pk/request-feature. Popular community-requested features have included the Find My Train GPS detector and the delay prediction system." },
  { q: "Is there a phone number I can call for train-related queries?", a: "TrackMyTrain.pk is a digital-only platform and does not operate a phone helpline. For official Pakistan Railways inquiries like ticket booking, cancellations, or lost property, please call the Pakistan Railways helpline at 117, which is available 24/7." },
  { q: "Can I report a bug or technical issue with the website?", a: "Yes! Please use the contact form with the subject 'Bug Report' and include as much detail as possible: your device type, browser, what page you were on, and what happened. Screenshots are extremely helpful. Technical bugs are prioritized in our development queue." },
  { q: "Does TrackMyTrain.pk have social media accounts?", a: "Currently, TrackMyTrain.pk operates primarily through our website. We focus all our development energy on improving the tracking platform itself. For updates and announcements, check our blog at trackmytrain.pk/blog." },
  { q: "Can I partner with TrackMyTrain.pk or advertise on the platform?", a: "We're open to partnerships that benefit Pakistani railway travelers. For partnership inquiries, please use the contact form with the subject 'Other Inquiry' and describe your proposal. We evaluate all partnership requests based on how they can improve the experience for our users." },
  { q: "I found wrong delay data for a specific train. What should I do?", a: "Delay calculations depend on real-time GPS data, which can occasionally be affected by signal issues, especially in mountainous or tunnel sections. If you consistently notice incorrect delay data for a specific train, please report it via the contact form with the train name, date, and your observed vs. displayed delay." },
  { q: "Can I contribute to TrackMyTrain.pk as a developer?", a: "We appreciate the enthusiasm! If you're a developer interested in contributing to Pakistan's railway technology ecosystem, please reach out via the contact form with the subject 'Other Inquiry'. Describe your skills, experience, and how you'd like to contribute." },
  { q: "Why doesn't TrackMyTrain.pk sell tickets?", a: "TrackMyTrain.pk is an information and tracking platform, not a ticketing service. Ticket sales are managed exclusively by Pakistan Railways through their official channels, the 117 helpline, and authorized booking offices at stations. We focus on what we do best: providing accurate, real-time tracking and schedule information." },
  { q: "How do I get notifications about train delays?", a: "Currently, TrackMyTrain.pk provides real-time delay information that you can check on-demand through our Check Delays tool or individual train detail pages. We're exploring push notification functionality as a future feature based on community demand." },
  { q: "Is my contact form data stored or shared?", a: "We take privacy seriously. Contact form submissions are used solely to respond to your inquiry. We do not store your data beyond what's needed to reply, we do not sell or share your information with third parties, and we do not add you to any mailing lists unless you explicitly request it." },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaAnswer.toLowerCase() !== "islamabad") {
      toast({ title: "Security check failed", description: "Please answer the security question correctly.", variant: "destructive" });
      return;
    }
    toast({ title: "Message Sent!", description: "We'll get back to you within 2-3 business days." });
    setForm({ name: "", email: "", subject: "", message: "" });
    setCaptchaAnswer("");
  };

  return (
    <main>
      <SEOHead
        title="Contact Track My Train — Feedback & Support"
        description="Reach the Track My Train team for bug reports, feature suggestions, or data corrections. We respond within 2-3 business days."
        canonical="/contact"
        keywords="contact trackmytrain.pk, report train bug, suggest feature trackmytrain, pakistan railway feedback, trackmytrain support email, train data correction, contact railway tracker team"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Contact Us", url: "/contact" }]}
        faqSchema={contactFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Track My Train",
          "description": "Get in touch with the Track My Train team for feedback, bug reports, and feature requests.",
          "mainEntity": {
            "@type": "Organization",
            "name": "Track My Train",
            "url": "https://trackmytrain.pk",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Support",
              "email": "info@trackmytrain.pk",
              "availableLanguage": ["English", "Urdu"],
              "areaServed": { "@type": "Country", "name": "Pakistan" }
            }
          }
        }]}
      />
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>Contact Us</span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <MessageSquare className="w-4 h-4" /> We'd Love to Hear From You
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              Get in <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mt-4">
              Have questions, feedback, or suggestions? We're here to help. Fill out the form below and our team will respond within 2-3 business days.
            </p>
            <p className="opacity-60 text-sm mt-2">ہم سے رابطہ کریں — آپ کی رائے ہمارے لیے اہم ہے</p>
          </div>
        </div>
      </section>

      {/* Floating Contact Cards */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Mail, value: "Email Us", label: "info@trackmytrain.pk", gradient: "gradient-card-emerald" },
            { icon: Phone, value: "Helpline", label: "Pakistan Railways: 117", gradient: "gradient-card-amber" },
            { icon: Clock, value: "Response", label: "2-3 Business Days", gradient: "gradient-card-blue" },
            { icon: MapPin, value: "Location", label: "Lahore, Pakistan", gradient: "gradient-card-purple" },
          ].map((s, i) => (
            <Card key={i} className={`${s.gradient} border hover-lift group`}>
              <CardContent className="p-4 text-center">
                <s.icon className="w-5 h-5 text-primary mx-auto mb-1 transition-transform duration-300 group-hover:scale-110" />
                <div className="text-sm font-bold text-primary">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="gradient-card-emerald border">
              <CardContent className="p-5">
                <Globe className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-sm mb-1">About TrackMyTrain.pk</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Pakistan's #1 independent train tracking platform. Real-time GPS tracking for 164+ trains across 342+ stations. 100% free, no signup required. Built by Pakistani developers for Pakistani travelers.</p>
              </CardContent>
            </Card>

            <Card className="gradient-card-amber border">
              <CardContent className="p-5">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-sm mb-1">Office Hours & Response Times</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Monday – Friday: 9:00 AM – 6:00 PM (PKT)<br />Saturday – Sunday: Closed<br />Emails are monitored 24/7<br /><strong className="text-foreground">Bug Reports:</strong> Prioritized within 24 hours<br /><strong className="text-foreground">Feature Requests:</strong> Reviewed weekly<br /><strong className="text-foreground">General Inquiries:</strong> 2-3 business days</p>
              </CardContent>
            </Card>

            <Card className="gradient-card-blue border">
              <CardContent className="p-5">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-sm mb-1">What We Can Help With</h3>
                <ul className="text-xs text-muted-foreground leading-relaxed space-y-1">
                  <li>• <strong className="text-foreground">Bug Reports</strong> — Website errors, tracking glitches, display issues</li>
                  <li>• <strong className="text-foreground">Data Corrections</strong> — Wrong schedule, route, or station data</li>
                  <li>• <strong className="text-foreground">Feature Requests</strong> — New tools, improvements, UI changes</li>
                  <li>• <strong className="text-foreground">General Feedback</strong> — Suggestions, compliments, concerns</li>
                  <li>• <strong className="text-foreground">Partnership Inquiries</strong> — Collaborations and integrations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="gradient-card-rose border">
              <CardContent className="p-5">
                <AlertTriangle className="w-6 h-6 text-destructive mb-3" />
                <h3 className="font-bold text-sm mb-1">Important Notice</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">TrackMyTrain.pk is an independent service and is NOT affiliated with Pakistan Railways or any government body. We cannot help with ticket bookings, cancellations, refunds, or lost luggage. For these official services, call <strong className="text-foreground">117</strong> (Pakistan Railways helpline, available 24/7).</p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="border shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-1">Send us a Message</h2>
                <p className="text-sm text-muted-foreground mb-5">Fill in the form below and we'll get back to you as soon as possible. All fields marked with * are required.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">Your Name *</label>
                      <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" className="rounded-xl" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Email Address *</label>
                      <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your.email@example.com" className="rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Subject *</label>
                    <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select a topic</option>
                      <option>Bug Report</option>
                      <option>Feature Request</option>
                      <option>Train Data Issue</option>
                      <option>General Feedback</option>
                      <option>Partnership Inquiry</option>
                      <option>Other Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Your Message *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm resize-none" placeholder="Describe your message in detail. For bug reports, include your device, browser, and what you were doing when the issue occurred..." />
                  </div>
                  <Card className="bg-muted/50 border">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-2">🔒 Security Check</p>
                      <p className="text-xs text-muted-foreground mb-2">What is the capital of Pakistan?</p>
                      <Input value={captchaAnswer} onChange={(e) => setCaptchaAnswer(e.target.value)} placeholder="Your answer..." className="rounded-xl" />
                    </CardContent>
                  </Card>
                  <Button type="submit" className="w-full rounded-xl gap-2 h-11">
                    <MessageSquare className="w-4 h-4" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Guide Section */}
        <section className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">GUIDE</p>
            <h2 className="text-2xl sm:text-3xl font-bold">How to Get the Best Response From Our Team</h2>
            <p className="text-sm text-muted-foreground mt-2">Follow these tips to help us resolve your query faster and more effectively</p>
          </div>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p className="text-base leading-relaxed">We receive dozens of messages every week from travelers across Pakistan. To help us respond as quickly and accurately as possible, here are some guidelines for submitting different types of inquiries:</p>

            <h3 className="text-foreground font-bold text-base mt-6">Reporting a Bug</h3>
            <p className="text-base leading-relaxed">When reporting a technical issue, please include: <strong className="text-foreground">(1)</strong> your device type (e.g., Samsung A54, iPhone 13, Desktop PC), <strong className="text-foreground">(2)</strong> the browser you're using (Chrome, Safari, Firefox), <strong className="text-foreground">(3)</strong> the specific page where the issue occurred, and <strong className="text-foreground">(4)</strong> a description of what happened vs. what you expected. If possible, include a screenshot — this dramatically speeds up our debugging process.</p>

            <h3 className="text-foreground font-bold text-base mt-6">Reporting Wrong Train Data</h3>
            <p className="text-base leading-relaxed">If you notice a train's schedule, station listing, or route information is incorrect, please include: the <strong className="text-foreground">train name and number</strong> (e.g., "Khyber Mail 1UP"), the <strong className="text-foreground">specific data that's wrong</strong> (e.g., "departure from Lahore shows 15:25 but the actual time is 15:45"), and if possible, a <strong className="text-foreground">source</strong> for the correct information (e.g., station notice board, official PR announcement).</p>

            <h3 className="text-foreground font-bold text-base mt-6">Suggesting a Feature</h3>
            <p className="text-base leading-relaxed">We love hearing ideas from our community! When suggesting a feature, describe: <strong className="text-foreground">what problem it would solve</strong>, <strong className="text-foreground">how you imagine it working</strong>, and <strong className="text-foreground">who would benefit</strong>. Some of our most popular features — like Find My Train and the Delay Checker — came directly from user suggestions. You can also use our dedicated <Link to="/request-feature" className="text-primary hover:underline">Feature Request page</Link> for a more structured submission.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12 sm:mt-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-3">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold">Contact & Support FAQ</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Common questions about reaching our team and what we can help with</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {contactFaqs.map((faq, i) => (
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

        {/* Quick Links */}
        <section className="mt-12 sm:mt-16">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">EXPLORE MORE</p>
            <h2 className="text-xl sm:text-2xl font-bold">Helpful Resources</h2>
            <p className="text-sm text-muted-foreground mt-1">Before reaching out, you might find what you need in these sections</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Train, gradient: "gradient-card-emerald", title: "Live Train Tracker", desc: "Track any train in real-time with GPS positioning, speed, and delay status.", link: "/train" },
              { icon: HelpCircle, gradient: "gradient-card-amber", title: "FAQ", desc: "Comprehensive answers to 20+ common questions about train tracking.", link: "/faq" },
              { icon: Globe, gradient: "gradient-card-blue", title: "About Us", desc: "Learn about our mission, technology, and commitment to Pakistani travelers.", link: "/about" },
              { icon: Search, gradient: "gradient-card-purple", title: "Find My Train", desc: "Auto-detect your train using phone GPS. No searching required.", link: "/find-my-train" },
              { icon: Route, gradient: "gradient-card-rose", title: "Route Maps", desc: "Explore all Pakistan Railways corridors and branch lines.", link: "/routes" },
              { icon: Calendar, gradient: "gradient-card-teal", title: "Train Schedules", desc: "Complete timetables for 164+ trains with arrival/departure times.", link: "/schedule" },
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
    </main>
  );
}