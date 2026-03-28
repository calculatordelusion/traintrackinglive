import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ArrowRight, HelpCircle, Calendar, Clock, Tag, Train, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blogPosts";

const blogFaqs = [
  { q: "How often are new travel guides published?", a: "We publish new travel guides, tips, and updates 2-3 times per month. Content is written by experienced Pakistan Railways travelers and railway enthusiasts. Subscribe to notifications to get alerted when new articles are published." },
  { q: "Can I contribute a guest article?", a: "Yes! We welcome contributions from travelers, railway enthusiasts, and transportation experts. Contact us through our Contact page. We review all submissions and publish well-written, informative content." },
  { q: "Are the ticket prices in articles up-to-date?", a: "We strive for accuracy, but Pakistan Railways periodically revises fares. We recommend verifying prices at booking counters or the official website before your journey. We update articles when significant changes occur." },
  { q: "Do you have guides for specific routes?", a: "Yes, we cover all major routes from Karachi-Lahore to Quetta-Rawalpindi. Our guides detail scenery, stops, food availability, coach classes, and tips for each specific journey." },
];

export default function BlogPage() {
  const featured = blogPosts[0];

  return (
    <main>
      <SEOHead
        title="Pakistan Railways Travel Blog 2026 — Expert Guides, Tips & Railway News"
        description="In-depth Pakistan Railways travel guides, booking tips, route reviews, and expert advice. Written by experienced travelers. Train tracking live updates, Eid travel tips, scenic routes, and more."
        canonical="/blog"
        keywords="pakistan railways blog, train travel tips pakistan, how to book train ticket pakistan, scenic train journeys pakistan, pakistan railways news 2026, eid travel tips railway, train tracking live blog"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]}
        faqSchema={blogFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Track My Train Travel Blog",
          "description": "Comprehensive travel guides, booking tips, and expert advice for Pakistan Railways travelers.",
          "url": "https://trackmytrain.pk/blog",
          "publisher": { "@type": "Organization", "name": "Track My Train", "url": "https://trackmytrain.pk" },
          "blogPost": blogPosts.map((p) => ({
            "@type": "BlogPosting",
            "headline": p.title,
            "url": `https://trackmytrain.pk/blog/${p.slug}`,
            "datePublished": p.dateISO,
            "description": p.metaDescription,
          })),
        }]}
      />
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/" className="opacity-70 hover:opacity-100">Home</Link>
            <span className="opacity-50">›</span>
            <span>Blog</span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <BookOpen className="w-4 h-4" /> Travel Guides & Railway Tips
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              Pakistan Railways<br />
              <span className="text-gradient-gold">Travel Guides & Tips</span>
            </h1>
            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mt-4">
              In-depth travel guides, booking strategies, route reviews, and essential knowledge for every Pakistan Railways traveler. Written by experienced travelers who've logged thousands of kilometers on the network.
            </p>
            <p className="opacity-60 text-sm mt-2">پاکستان ریلوے سفری رہنمائی اور مشورے</p>
          </div>
        </div>
      </section>

      {/* Floating Stats */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: `${blogPosts.length}`, label: "Travel Guides", icon: BookOpen, gradient: "gradient-card-emerald" },
            { value: "15+", label: "Topics Covered", icon: Tag, gradient: "gradient-card-amber" },
            { value: "Free", label: "Always Free", icon: Star, gradient: "gradient-card-blue" },
            { value: "3/mo", label: "New Articles", icon: Calendar, gradient: "gradient-card-purple" },
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
        {/* Featured Post */}
        <section className="mb-10">
          <Link to={`/blog/${featured.slug}`}>
            <Card className={`${featured.gradient} border hover-lift group overflow-hidden`}>
              <div className="md:flex">
                <img src={featured.image} alt={featured.imageAlt} width={600} height={336} loading="eager" decoding="async" className="w-full md:w-1/2 h-56 md:h-auto object-cover" />
                <CardContent className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary-foreground bg-primary px-3 py-1 rounded-full">{featured.category}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {featured.date}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">{featured.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{featured.excerpt}</p>
                  <span className="text-primary font-medium inline-flex items-center gap-1 text-sm">Read Full Guide <ArrowRight className="w-4 h-4" /></span>
                </CardContent>
              </div>
            </Card>
          </Link>
        </section>

        {/* All Posts Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All Travel Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                <Card className={`${post.gradient} border h-full hover-lift group overflow-hidden`}>
                  <img src={post.image} alt={post.imageAlt} loading="lazy" width={400} height={224} className="w-full h-44 object-cover" />
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-primary tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">{post.category}</span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h2 className="text-sm font-bold mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">{post.title}</h2>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{post.date}</span>
                      <span className="text-xs text-primary font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Topics */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Browse by Topic</h2>
          <div className="flex flex-wrap gap-2">
            {["Train Tracking", "Delay Management", "Booking Tips", "Route Guides", "Ticket Refunds", "Family Travel", "Budget Travel", "Express Trains", "Coach Classes", "Eid Travel", "First Time Travelers", "Station Guides", "Safety Tips", "Scenic Journeys"].map((topic) => (
              <span key={topic} className="px-4 py-2 rounded-full border text-sm hover:bg-primary/5 hover:border-primary/30 transition-colors cursor-pointer flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-primary" /> {topic}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-3">
              <HelpCircle className="w-4 h-4" /> FAQs
            </div>
            <h2 className="text-2xl font-bold">Blog & Travel Guides FAQs</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {blogFaqs.map((faq, i) => (
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

        {/* SEO Content */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Pakistan Railways Travel Blog — Your Complete Railway Resource</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p className="text-base leading-relaxed">Welcome to the Track My Train travel blog — Pakistan's most comprehensive online resource for railway travel information. Our guides are researched and written by a team of experienced Pakistani travelers who collectively have logged tens of thousands of kilometers across the Pakistan Railways network.</p>
            <p className="text-base leading-relaxed">Whether you're a first-time traveler looking for step-by-step boarding instructions, a parent planning a family trip during Eid, or a seasoned commuter searching for the fastest train on the Karachi–Lahore corridor, our articles deliver practical, actionable information — not generic filler content.</p>
            <p className="text-base leading-relaxed">Every article includes accurate fare details (updated for 2026), specific train recommendations based on real travel experience, detailed FAQs addressing the most commonly searched questions, and internal links to our live tracking tools so you can immediately put the advice into practice.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
