import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Lightbulb, Bug, TrendingUp, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";

type Category = "feature" | "improvement" | "bug" | "other";

export default function RequestFeaturePage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", title: "", description: "", category: "feature" as Category });
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories: { value: Category; label: string; icon: typeof Sparkles; desc: string }[] = [
    { value: "feature", label: "New Feature", icon: Sparkles, desc: "Suggest a new feature you'd like to see" },
    { value: "improvement", label: "Improvement", icon: TrendingUp, desc: "Suggest improvements to existing features" },
    { value: "bug", label: "Bug Report", icon: Bug, desc: "Report a bug or issue you've encountered" },
    { value: "other", label: "Other", icon: Lightbulb, desc: "General feedback or other suggestions" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaAnswer.toLowerCase() !== "islamabad") {
      toast({ title: "Security check failed", description: "Please answer the security question correctly.", variant: "destructive" });
      return;
    }
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Request Submitted!", description: "Thank you for your feedback. We review every submission." });
  };

  if (submitted) {
    return (
      <div>
        <section className="bg-hero-gradient text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
            <h1 className="text-4xl font-bold mb-2">Thank You!</h1>
            <p className="text-lg opacity-80">Your request has been submitted successfully.</p>
          </div>
        </section>
        <div className="container mx-auto px-4 py-12 text-center">
          <Card className="max-w-lg mx-auto">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-2">What happens next?</h2>
              <p className="text-sm text-muted-foreground mb-6">Our team reviews every submission. Popular feature requests get prioritized for development. We'll notify you via email if your suggestion is implemented.</p>
              <Button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", title: "", description: "", category: "feature" }); setCaptchaAnswer(""); }} className="rounded-xl">
                Submit Another Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const categoryGradients = ["gradient-card-emerald", "gradient-card-amber", "gradient-card-blue", "gradient-card-purple"];

  return (
    <div>
      <SEOHead
        title="Request a Feature — Track My Train"
        description="Suggest features, report bugs, or request improvements for Track My Train. Community-driven development for Pakistan's train tracker."
        canonical="/request-feature"
        keywords="track my train feature request, train tracker suggestions, pakistan railways app feedback, report bug train tracker"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Request Feature", url: "/request-feature" },
        ]}
      />
      <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>Request Feature</span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <Sparkles className="w-4 h-4" /> Community Driven Development
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              Request a Feature
            </h1>
            <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto">Help us make TrackMyTrain.pk even better. Tell us what features you'd like to see, report bugs, or share your ideas for improvement.</p>
            <p className="opacity-60 text-sm mt-2">اپنی تجاویز بھیجیں — ہمیں بہتر بنانے میں مدد کریں</p>
          </div>
        </div>
      </section>

      {/* Floating Stats */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "1,252+", label: "Submissions", icon: Sparkles, gradient: "gradient-card-emerald" },
            { value: "89%", label: "Review Rate", icon: CheckCircle, gradient: "gradient-card-amber" },
            { value: "5", label: "In Progress", icon: TrendingUp, gradient: "gradient-card-blue" },
            { value: "24h", label: "Avg Response", icon: Lightbulb, gradient: "gradient-card-purple" },
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

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
        {/* Category Selection - Gradient Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {categories.map((cat, idx) => (
            <button
              key={cat.value}
              onClick={() => setForm({ ...form, category: cat.value })}
              className="text-left"
            >
              <Card className={`${categoryGradients[idx]} border transition-all h-full ${
                form.category === cat.value
                  ? "ring-2 ring-primary/40 shadow-md"
                  : "hover:shadow-sm"
              }`}>
                <CardContent className="p-4">
                  <cat.icon className={`w-5 h-5 mb-2 transition-transform duration-300 ${form.category === cat.value ? "text-primary scale-110" : "text-muted-foreground"}`} />
                  <div className="font-semibold text-sm">{cat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{cat.desc}</div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">
              {form.category === "feature" ? "Describe Your Feature Request" :
               form.category === "improvement" ? "What Should We Improve?" :
               form.category === "bug" ? "Report a Bug" : "Share Your Thoughts"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Your Name *</label>
                  <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Email Address *</label>
                  <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Title *</label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={form.category === "bug" ? "Brief description of the issue" : "Brief title for your request"} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Description *</label>
                <textarea
                  required
                  rows={6}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                  placeholder={form.category === "bug" ? "Steps to reproduce the issue, expected vs actual behavior..." : "Describe in detail what you'd like to see..."}
                />
              </div>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="text-sm font-medium mb-2">Security Check</p>
                  <p className="text-xs text-muted-foreground mb-2">📝 What is the capital of Pakistan?</p>
                  <Input value={captchaAnswer} onChange={(e) => setCaptchaAnswer(e.target.value)} placeholder="Your answer..." />
                </CardContent>
              </Card>
              <Button type="submit" className="w-full rounded-xl gap-2">
                <Sparkles className="w-4 h-4" />
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Popular Requests */}
        <section className="mt-12 mb-8">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">COMMUNITY PICKS</p>
            <h2 className="text-xl sm:text-2xl font-bold">Popular Feature Requests</h2>
            <p className="text-sm text-muted-foreground mt-1">Most requested features by our community</p>
          </div>
          <div className="space-y-3">
            {[
              { title: "Push Notifications for Train Delays", votes: 342, status: "Under Review", gradient: "gradient-card-emerald" },
              { title: "Offline Mode for Low Connectivity Areas", votes: 289, status: "Planned", gradient: "gradient-card-blue" },
              { title: "WhatsApp Train Alerts", votes: 256, status: "Under Review", gradient: "gradient-card-amber" },
              { title: "Station Crowd Level Indicator", votes: 198, status: "Under Review", gradient: "gradient-card-purple" },
              { title: "Train Comparison Tool", votes: 167, status: "Planned", gradient: "gradient-card-rose" },
            ].map((req, i) => (
              <Card key={i} className={`${req.gradient} border hover-lift group`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <span className="text-sm font-bold text-primary">#{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{req.title}</h3>
                    <p className="text-xs text-muted-foreground">{req.votes} votes</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    req.status === "Planned" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent-foreground"
                  }`}>
                    {req.status}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
