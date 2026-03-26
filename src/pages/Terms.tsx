import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, AlertTriangle, Scale, Globe, Ban, RefreshCw, Gavel } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const termsSections = [
  { icon: FileText, title: "Acceptance of Terms", gradient: "gradient-card-emerald", content: "By accessing and using Track My Train (trackmytrain.pk), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website. We reserve the right to update these terms at any time, and your continued use of the site constitutes acceptance of any modifications." },
  { icon: Globe, title: "Description of Service", gradient: "gradient-card-amber", content: "Track My Train provides real-time train tracking, schedule information, journey planning, and related railway information services for Pakistan Railways. Our service is provided on an 'as-is' and 'as-available' basis. We are an independent platform and are NOT affiliated with, endorsed by, or connected to Pakistan Railways or any government agency." },
  { icon: Shield, title: "User Responsibilities", gradient: "gradient-card-blue", content: "You agree to use our service only for lawful purposes. You must not attempt to disrupt, overload, or impair the site's functionality. You must not scrape, crawl, or use automated systems to extract data without permission. You must not attempt to reverse-engineer, copy, or redistribute any part of the platform." },
  { icon: AlertTriangle, title: "Disclaimer of Warranties", gradient: "gradient-card-purple", content: "All information provided on Track My Train, including train positions, schedules, delays, fares, and ETAs, is for informational purposes only. We make no guarantees about the accuracy, completeness, or reliability of any data. Train schedules and positions are sourced from publicly available data and may not reflect real-time conditions. Always verify critical travel information with Pakistan Railways helpline (117)." },
  { icon: Scale, title: "Limitation of Liability", gradient: "gradient-card-emerald", content: "Track My Train and its creators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use our service. This includes but is not limited to: missed trains, incorrect schedule information, inaccurate delay data, or any decisions made based on information provided by our platform." },
  { icon: Ban, title: "Prohibited Activities", gradient: "gradient-card-amber", content: "The following activities are strictly prohibited: using our service for any illegal purpose; attempting to gain unauthorized access to our systems; distributing malware or harmful code through our platform; impersonating Track My Train or its representatives; using our content for commercial purposes without permission; automated data collection (scraping) without written consent." },
  { icon: Gavel, title: "Intellectual Property", gradient: "gradient-card-blue", content: "All content on Track My Train, including text, graphics, logos, icons, images, data compilations, and software, is the property of Track My Train or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without prior written permission." },
  { icon: RefreshCw, title: "Advertising & Third-Party Content", gradient: "gradient-card-purple", content: "Track My Train may display advertisements provided by third-party advertising networks including Google AdSense. We are not responsible for the content, accuracy, or practices of third-party advertisers. Clicking on advertisements may take you to external websites governed by their own terms and privacy policies. The display of advertisements does not constitute endorsement by Track My Train." },
];

export default function TermsPage() {
  return (
    <div>
      <SEOHead
        title="Terms of Service — Track My Train | Usage Agreement"
        description="Read Track My Train's Terms of Service. Understand your rights and responsibilities when using our free Pakistan Railways train tracking platform."
        canonical="/terms"
        keywords="track my train terms of service, train tracker terms, pakistan railways tracker usage agreement"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Terms of Service", url: "/terms" }]}
      />

      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Scale className="w-4 h-4" /> Legal Agreement
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Last updated: March 25, 2026. Please read these terms carefully before using Track My Train.
            </p>
          </div>

          <div className="space-y-6">
            {termsSections.map((section, i) => (
              <Card key={i} className="border border-border/50 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${section.gradient} shrink-0`}>
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground mb-2">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border border-border/50 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-2">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. Any disputes arising from the use of Track My Train shall be subject to the exclusive jurisdiction of the courts of Pakistan.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6 border border-border/50 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-2">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these Terms, please <Link to="/contact" className="text-primary underline hover:no-underline">contact us</Link> or email us at legal@trackmytrain.pk.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
