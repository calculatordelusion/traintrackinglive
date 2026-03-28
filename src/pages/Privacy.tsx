import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Cookie, Database, Users, Lock, FileText, Baby, Mail, RefreshCw } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const policySections = [
  { icon: Eye, title: "Information We Collect", gradient: "gradient-card-emerald", items: [
    { label: "No personal accounts", desc: "We don't require registration or login to use any features." },
    { label: "GPS Location (Find My Train)", desc: "Used only in-browser to match with running trains. Never stored or transmitted." },
    { label: "Contact Submissions", desc: "Name, email, and message when you voluntarily contact us or submit feature requests." },
    { label: "Anonymous Analytics", desc: "Basic page view statistics (non-personally identifiable) to help improve the platform." },
    { label: "Notification Preferences", desc: "If you opt-in to push notifications, a subscription token is stored locally." },
    { label: "Device & Browser Info", desc: "We may collect anonymized device type, browser version, screen resolution, and operating system for analytics and improving user experience." },
  ]},
  { icon: Database, title: "How We Use Information", gradient: "gradient-card-amber", items: [
    { label: "Train Tracking", desc: "Provide real-time train tracking services with accurate GPS positions." },
    { label: "Communication", desc: "Respond to your inquiries and feature requests via email." },
    { label: "Platform Improvement", desc: "Improve website performance, user experience, and content quality." },
    { label: "Notifications", desc: "Send train delay notifications only with your explicit opt-in consent." },
    { label: "Security", desc: "Ensure platform stability, prevent abuse, and maintain service quality." },
    { label: "Advertising", desc: "We may display contextual advertisements via Google AdSense. Ad personalization is subject to your cookie consent preferences." },
  ]},
  { icon: Lock, title: "Data Sharing & Security", gradient: "gradient-card-blue", items: [
    { label: "No Data Sales", desc: "We do NOT sell, trade, or share your personal information with any third parties." },
    { label: "Third-Party Advertising", desc: "Google AdSense may use cookies to serve ads based on your prior visits. You can opt out via your cookie consent preferences or at Google's Ads Settings." },
    { label: "No Government Sharing", desc: "No data is shared with Pakistan Railways or any government body." },
    { label: "Encryption", desc: "All data transmissions are encrypted using industry-standard HTTPS/TLS protocols." },
    { label: "Analytics Partners", desc: "Anonymized analytics data may be processed by third-party analytics services to help us understand site usage patterns." },
  ]},
  { icon: Cookie, title: "Cookies & Local Storage", gradient: "gradient-card-purple", items: [
    { label: "Essential Cookies", desc: "Required for basic site functionality: theme preferences, notification dismissal, consent choices. Cannot be disabled." },
    { label: "Analytics Cookies", desc: "Help us understand how visitors use our site. Anonymized, no personally identifiable information. Requires your consent." },
    { label: "Advertising Cookies", desc: "Used by Google AdSense to serve relevant ads. These may track your browsing across sites. Requires your explicit consent." },
    { label: "Cookie Consent Management", desc: "You can manage your cookie preferences at any time using our consent banner. Your choices are saved for 12 months." },
  ]},
  { icon: Users, title: "Your Rights (GDPR & CCPA)", gradient: "gradient-card-emerald", items: [
    { label: "Right to Access", desc: "You may request a copy of any personal data we hold about you." },
    { label: "Right to Deletion", desc: "You may request deletion of your personal data at any time by contacting us." },
    { label: "Right to Opt-Out", desc: "You may opt out of personalized advertising via the cookie consent banner or Google's Ads Settings page." },
    { label: "Right to Withdraw Consent", desc: "You can withdraw your cookie consent at any time by clicking the cookie settings link in our footer." },
    { label: "Data Portability", desc: "You may request your data in a portable, machine-readable format." },
    { label: "Contact for Rights", desc: "For any data rights requests, please contact us at privacy@trackmytrain.pk or via our Contact page." },
  ]},
];

export default function PrivacyPage() {
  return (
    <div>
      <SEOHead
        title="Privacy Policy — Track My Train | Zero Data Collection"
        description="Track My Train collects zero personal data, requires no accounts, and never sells information. GPS stays in your browser. 100% HTTPS."
        canonical="/privacy"
        keywords="track my train privacy policy, train tracker privacy, pakistan railways app privacy, GPS location privacy, data protection train tracking"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy" }]}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy — Track My Train",
          "url": "https://trackmytrain.pk/privacy",
          "description": "How Track My Train handles user privacy and data protection",
          "lastReviewed": "2026-03-01"
        }]}
      />
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>Privacy Policy</span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <Shield className="w-4 h-4" /> Your Privacy Matters
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              Privacy Policy<br />
              <span className="text-gradient-gold">TrackMyTrain.pk</span>
            </h1>
            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mt-4">
              How we handle your data and protect your privacy. We believe in transparency and minimal data collection.
            </p>
            <p className="opacity-60 text-sm mt-2">رازداری کی پالیسی — آپ کا ڈیٹا محفوظ ہے</p>
            <p className="opacity-50 text-xs mt-4">Last updated: March 1, 2026</p>
          </div>
        </div>
      </section>

      {/* Floating Stats */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "Zero", label: "Accounts Required", icon: Users, gradient: "gradient-card-emerald" },
            { value: "Zero", label: "Data Sold", icon: Lock, gradient: "gradient-card-amber" },
            { value: "Zero", label: "Tracking Cookies", icon: Cookie, gradient: "gradient-card-blue" },
            { value: "100%", label: "Encrypted", icon: Shield, gradient: "gradient-card-purple" },
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
        {/* Policy Sections as Gradient Cards */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {policySections.map((section, i) => (
            <Card key={i} className={`${section.gradient} border`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold">{i + 1}. {section.title}</h2>
                </div>
                <div className="space-y-3 ml-13">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 shrink-0">✓</span>
                      <div>
                        <strong className="text-sm text-foreground">{item.label}:</strong>{" "}
                        <span className="text-sm text-muted-foreground">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Additional Sections */}
          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold">5. Third-Party Services</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">We use OpenStreetMap for map display and GPS tracking visualization. These services have their own privacy policies. We do not share personally identifiable information with these services.</p>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold">6. Data Retention</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">Contact form submissions are retained for up to 90 days. Anonymous analytics data is aggregated and cannot be traced to individuals. GPS location data from Find My Train exists only in your browser's memory during the active session and is never stored.</p>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold">7. Your Rights</h2>
              </div>
              <ul className="space-y-2">
                {["Access any personal data we may have (contact form submissions)", "Request deletion of your contact form data", "Opt out of push notifications at any time through browser settings", "Revoke GPS location permission through browser settings"].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✓</span> {r}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Baby className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold">8. Children's Privacy</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">TrackMyTrain.pk does not knowingly collect personal information from children under 13. Our service is designed for general audiences and does not require age verification since no personal data collection occurs during normal use.</p>
            </CardContent>
          </Card>

          <Card className="gradient-card-rose border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold">9. Changes to This Policy</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">We may update this privacy policy from time to time. Significant changes will be communicated through a notice on our website. Your continued use after changes constitutes acceptance. For privacy inquiries, contact us at <a href="mailto:info@trackmytrain.pk" className="text-primary font-medium hover:underline">info@trackmytrain.pk</a>.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
