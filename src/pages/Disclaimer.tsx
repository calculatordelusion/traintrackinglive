import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info, Shield, Train, CreditCard, Globe, ExternalLink } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const disclaimerSections = [
  { icon: Info, title: "General Disclaimer", gradient: "gradient-card-emerald", content: "The information provided on Track My Train (trackmytrain.pk) is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of any information, products, services, or related graphics contained on the website." },
  { icon: Train, title: "Train Data Accuracy", gradient: "gradient-card-amber", content: "Train positions, schedules, delays, estimated arrival times, and fare information displayed on our platform are derived from publicly available data sources and algorithmic calculations. This data may not always reflect actual real-time conditions. Factors such as signal outages, unscheduled stops, route diversions, weather events, and technical issues may affect accuracy. Always confirm critical travel plans with Pakistan Railways helpline (117) or at your nearest booking office." },
  { icon: Shield, title: "No Official Affiliation", gradient: "gradient-card-blue", content: "Track My Train is a completely independent, privately-operated platform. We are NOT affiliated with, endorsed by, sponsored by, or connected to Pakistan Railways, the Ministry of Railways, or any other government entity. Our use of train names, station names, and route information is for informational purposes only and does not imply any official relationship." },
  { icon: CreditCard, title: "Fare & Ticket Information", gradient: "gradient-card-purple", content: "Ticket prices and fare information displayed on our platform are approximate estimates based on publicly available data. Actual fares may vary based on season, class availability, promotional offers, and Pakistan Railways policy changes. Track My Train does not sell tickets and cannot guarantee any fare amount. For official ticket pricing and booking, contact Pakistan Railways directly." },
  { icon: Globe, title: "Third-Party Links & Advertisements", gradient: "gradient-card-emerald", content: "Our website may contain links to external websites and display advertisements from third-party advertising networks including Google AdSense. Track My Train has no control over the content, privacy policies, or practices of any third-party sites or advertisers. We do not endorse or assume responsibility for any third-party content, products, or services. Interaction with third-party advertisements is at your own risk." },
  { icon: ExternalLink, title: "External Content", gradient: "gradient-card-amber", content: "Any views or opinions expressed in user-submitted content, blog comments, or third-party materials do not necessarily represent the views of Track My Train. We are not responsible for the accuracy or reliability of any external content referenced on our platform." },
];

export default function DisclaimerPage() {
  return (
    <div>
      <SEOHead
        title="Disclaimer — Track My Train | Important Information"
        description="Read Track My Train's disclaimer. Understand the limitations of our train tracking data, our independence from Pakistan Railways, and how we handle third-party content."
        canonical="/disclaimer"
        keywords="track my train disclaimer, train tracker disclaimer, pakistan railways tracker disclaimer"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Disclaimer", url: "/disclaimer" }]}
      />

      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
              <AlertTriangle className="w-4 h-4" /> Important Notice
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Disclaimer
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Last updated: March 25, 2026. Please read this disclaimer carefully before using Track My Train.
            </p>
          </div>

          <div className="space-y-6">
            {disclaimerSections.map((section, i) => (
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

          <Card className="mt-8 border border-primary/20 bg-primary/5 shadow-sm">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                By using Track My Train, you acknowledge that you have read and understood this disclaimer. 
                For questions or concerns, please visit our{" "}
                <Link to="/contact" className="text-primary underline hover:no-underline">Contact page</Link>.
              </p>
              <p className="text-sm text-muted-foreground">
                See also: <Link to="/privacy" className="text-primary underline hover:no-underline">Privacy Policy</Link> · <Link to="/terms" className="text-primary underline hover:no-underline">Terms of Service</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
