import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight, Share2, Train, MapPin, Navigation, CreditCard, AlertTriangle, Zap, Search, Route } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
        <p className="text-muted-foreground mb-4">The blog post you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="text-primary hover:underline font-medium">← Back to Blog</Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "image": `https://trackmytrain.pk${post.image}`,
    "datePublished": post.dateISO,
    "dateModified": post.dateISO,
    "author": { "@type": "Organization", "name": "Track My Train", "url": "https://trackmytrain.pk" },
    "publisher": {
      "@type": "Organization",
      "name": "Track My Train",
      "url": "https://trackmytrain.pk",
      "logo": { "@type": "ImageObject", "url": "https://trackmytrain.pk/og-image.png" },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://trackmytrain.pk/blog/${post.slug}` },
    "wordCount": post.content.split(/\s+/).length,
    "inLanguage": "en",
    "about": { "@type": "Thing", "name": "Pakistan Railways" },
  };

  const renderContent = (content: string) => {
    const blocks = content.split("\n\n");
    return blocks.map((block, i) => {
      if (block.startsWith("## ")) {
        return <h2 key={i} className="text-xl sm:text-2xl font-bold mt-10 mb-4 text-foreground">{block.replace("## ", "")}</h2>;
      }
      if (block.startsWith("### ")) {
        return <h3 key={i} className="text-lg font-bold mt-6 mb-3 text-foreground">{block.replace("### ", "")}</h3>;
      }
      if (block.startsWith("| ")) {
        const rows = block.split("\n").filter((r) => r.trim() && !r.match(/^\|\s*[-:]+/));
        if (rows.length < 2) return null;
        const headers = rows[0].split("|").filter(Boolean).map((h) => h.trim());
        const dataRows = rows.slice(1).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));
        return (
          <div key={i} className="overflow-x-auto my-6">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  {headers.map((h, j) => (
                    <th key={j} className="px-4 py-3 text-left font-semibold text-foreground border-b">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, j) => (
                  <tr key={j} className="border-b last:border-0 hover:bg-muted/50">
                    {row.map((cell, k) => (
                      <td key={k} className="px-4 py-3 text-muted-foreground">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">
            {items.map((item, j) => (
              <li key={j} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{
                __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
              }} />
            ))}
          </ul>
        );
      }
      if (block.match(/^\d+\./)) {
        const items = block.split("\n").filter((l) => l.match(/^\d+\./));
        return (
          <ol key={i} className="list-decimal pl-6 space-y-2 mb-6 text-muted-foreground">
            {items.map((item, j) => (
              <li key={j} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{
                __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
              }} />
            ))}
          </ol>
        );
      }
      return (
        <p key={i} className="text-muted-foreground mb-5 text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{
          __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
        }} />
      );
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div>
      <SEOHead
        title={post.title}
        description={post.metaDescription}
        canonical={`/blog/${post.slug}`}
        keywords={post.keywords}
        ogType="article"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
        faqSchema={post.faqs}
        additionalSchemas={[articleSchema]}
      />

      {/* Hero */}
      <section className="relative bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <Link to="/blog" className="opacity-70 hover:opacity-100">Blog</Link>
            <span className="opacity-50">›</span>
            <span className="opacity-90 truncate max-w-[200px]">{post.title.split("—")[0]}</span>
          </div>

          <div className="max-w-4xl">
            <span className="inline-block text-xs font-bold tracking-wider bg-primary-foreground/15 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-5">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime} read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container mx-auto px-4 -mt-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <img
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={672}
            loading="eager"
            decoding="async"
            className="w-full rounded-2xl shadow-xl border object-cover aspect-[16/9]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Share Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{post.keywords.split(",").slice(0, 3).join(" • ")}</span>
            </div>
            <Button variant="outline" size="sm" className="rounded-full gap-2" onClick={handleShare}>
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </div>

          {/* Article Body */}
          <article className="prose-custom">
            {renderContent(post.content)}
          </article>

          {/* Contextual Tool Links */}
          <div className="mt-10 p-6 rounded-2xl border bg-muted/30">
            <h3 className="text-lg font-bold mb-4">🔧 Useful Tools for This Topic</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {post.slug.includes("delay") || post.slug.includes("track") ? (
                <>
                  <Link to="/check-delays" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0"><AlertTriangle className="w-5 h-5 text-destructive" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Check Delays</div><div className="text-xs text-muted-foreground">Live delay monitor for all trains</div></div>
                  </Link>
                  <Link to="/train" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Train className="w-5 h-5 text-primary" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Live Train Tracker</div><div className="text-xs text-muted-foreground">Real-time GPS tracking</div></div>
                  </Link>
                  <Link to="/find-my-train" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Search className="w-5 h-5 text-primary" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Find My Train (GPS)</div><div className="text-xs text-muted-foreground">Auto-detect your train</div></div>
                  </Link>
                </>
              ) : post.slug.includes("ticket") || post.slug.includes("refund") || post.slug.includes("class") ? (
                <>
                  <Link to="/ticket-pricing" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0"><CreditCard className="w-5 h-5 text-secondary-foreground" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Ticket Prices</div><div className="text-xs text-muted-foreground">Compare fares across classes</div></div>
                  </Link>
                  <Link to="/schedule" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Calendar className="w-5 h-5 text-primary" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Train Schedule</div><div className="text-xs text-muted-foreground">Full timetable for all trains</div></div>
                  </Link>
                </>
              ) : post.slug.includes("karachi") || post.slug.includes("lahore") || post.slug.includes("route") || post.slug.includes("scenic") ? (
                <>
                  <Link to="/planner" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0"><Navigation className="w-5 h-5 text-accent-foreground" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Journey Planner</div><div className="text-xs text-muted-foreground">Find trains between any stations</div></div>
                  </Link>
                  <Link to="/routes" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Route className="w-5 h-5 text-primary" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Route Maps</div><div className="text-xs text-muted-foreground">All railway corridors & distances</div></div>
                  </Link>
                  <Link to="/stations" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-secondary-foreground" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Stations Directory</div><div className="text-xs text-muted-foreground">Browse 32+ stations</div></div>
                  </Link>
                </>
              ) : post.slug.includes("express") || post.slug.includes("green") ? (
                <>
                  <Link to="/express-trains" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Zap className="w-5 h-5 text-primary" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Express Trains</div><div className="text-xs text-muted-foreground">All express services</div></div>
                  </Link>
                  <Link to="/green-line-express" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Train className="w-5 h-5 text-primary" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Green Line Express</div><div className="text-xs text-muted-foreground">Premium Karachi-Islamabad service</div></div>
                  </Link>
                  <Link to="/ticket-pricing" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0"><CreditCard className="w-5 h-5 text-secondary-foreground" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Ticket Prices</div><div className="text-xs text-muted-foreground">Fare comparison</div></div>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/train" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Train className="w-5 h-5 text-primary" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Live Trains</div><div className="text-xs text-muted-foreground">Track any train in real-time</div></div>
                  </Link>
                  <Link to="/planner" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0"><Navigation className="w-5 h-5 text-accent-foreground" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Journey Planner</div><div className="text-xs text-muted-foreground">Plan your next trip</div></div>
                  </Link>
                  <Link to="/schedule" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Calendar className="w-5 h-5 text-primary" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Train Schedule</div><div className="text-xs text-muted-foreground">Complete timetables</div></div>
                  </Link>
                  <Link to="/check-delays" className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0"><AlertTriangle className="w-5 h-5 text-destructive" /></div>
                    <div><div className="text-sm font-semibold group-hover:text-primary transition-colors">Check Delays</div><div className="text-xs text-muted-foreground">Live delay status</div></div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          {post.faqs.length > 0 && (
            <section className="mt-12 pt-8 border-t">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible>
                {post.faqs.map((faq, i) => (
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
            </section>
          )}

          {/* CTA */}
          <Card className="gradient-card-emerald border mt-10">
            <CardContent className="p-6 sm:p-8 text-center">
              <h3 className="text-lg font-bold mb-2">Track Your Train Right Now</h3>
              <p className="text-sm text-muted-foreground mb-4">See the live GPS position, speed, and delay status of any Pakistan Railways train — updated every 5 seconds.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/train">
                  <Button className="rounded-full gap-2 w-full sm:w-auto">Open Live Tracker <ArrowRight className="w-4 h-4" /></Button>
                </Link>
                <Link to="/planner">
                  <Button variant="outline" className="rounded-full gap-2 w-full sm:w-auto">Plan a Journey</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} to={`/blog/${rp.slug}`}>
                  <Card className={`${rp.gradient} border h-full hover-lift group overflow-hidden`}>
                    <img src={rp.image} alt={rp.imageAlt} loading="lazy" width={400} height={224} className="w-full h-40 object-cover" />
                    <CardContent className="p-4">
                      <span className="text-[10px] font-bold text-primary tracking-wider">{rp.category}</span>
                      <h3 className="text-sm font-bold mt-1 mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">{rp.title}</h3>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>{rp.readTime}</span>
                        <span className="text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
