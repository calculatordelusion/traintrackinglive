import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blogPosts";
import { getUrduBlogPostBySlug, urduBlogPosts } from "@/data/urduBlogPosts";
import { urduBlogEnhancements } from "@/data/urduBlogEnhancements";
import UrduRelatedLinks from "@/components/ur/UrduRelatedLinks";

export default function UrduBlogPost() {
  const { slug } = useParams();
  const urduPost = getUrduBlogPostBySlug(slug || "");
  const englishPost = blogPosts.find((post) => post.slug === slug);
  const relatedPosts = urduBlogPosts.filter((post) => post.slug !== slug).slice(0, 3);
  const enhancement = slug ? urduBlogEnhancements[slug] : undefined;

  if (!urduPost || !englishPost) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-black mb-2">مضمون دستیاب نہیں</h1>
        <p className="text-muted-foreground mb-4">جس اردو مضمون کی آپ تلاش کر رہے ہیں وہ موجود نہیں یا منتقل ہو چکا ہے۔</p>
        <Link to="/ur/blog" className="text-primary font-semibold hover:underline">بلاگ پر واپس جائیں</Link>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: urduPost.title, url: window.location.href });
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div>
      <SEOHead
        title={urduPost.title}
        description={urduPost.metaDescription}
        canonical={`/ur/blog/${urduPost.slug}`}
        lang="ur"
        alternateEnglish={`/blog/${urduPost.slug}`}
        keywords={urduPost.keywords}
        ogType="article"
        breadcrumbs={[
          { name: "ہوم", url: "/ur" },
          { name: "بلاگ", url: "/ur/blog" },
          { name: urduPost.title, url: `/ur/blog/${urduPost.slug}` },
        ]}
        faqSchema={urduPost.faqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: urduPost.title,
          description: urduPost.metaDescription,
          inLanguage: "ur",
          image: `https://trackmytrain.pk${englishPost.image}`,
          datePublished: englishPost.dateISO,
          dateModified: englishPost.dateISO,
          mainEntityOfPage: { "@type": "WebPage", "@id": `https://trackmytrain.pk/ur/blog/${urduPost.slug}` },
        }]}
      />

      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 text-sm opacity-80 mb-5">
            <Link to="/ur">ہوم</Link>
            <span>›</span>
            <Link to="/ur/blog">بلاگ</Link>
            <span>›</span>
            <span className="truncate">{urduPost.category}</span>
          </div>
          <span className="inline-flex items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-bold mb-4">{urduPost.category}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-5">{urduPost.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm opacity-85">
            <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> {englishPost.date}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {englishPost.readTime}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl space-y-8">
        <img src={englishPost.image} alt={urduPost.title} className="w-full rounded-2xl border shadow-lg aspect-[16/9] object-cover" />

        <div className="flex items-center justify-between gap-3 border-b pb-4">
          <div className="text-sm text-muted-foreground">{urduPost.keywords.split(",").slice(0, 3).join(" • ")}</div>
          <Button variant="outline" size="sm" className="rounded-full gap-2" onClick={handleShare}>
            <Share2 className="w-4 h-4" /> شیئر کریں
          </Button>
        </div>

        <article className="space-y-5 text-base text-muted-foreground leading-8">
          <p className="text-lg font-medium text-foreground">{urduPost.excerpt}</p>
          {urduPost.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </article>

        {enhancement && (
          <>
            <section className="grid md:grid-cols-3 gap-5">
              {enhancement.heroCards.map((card) => (
                <Card key={card.title} className={`${card.gradient} border hover-lift`}>
                  <CardContent className="p-5 space-y-2">
                    <div className="text-xs font-bold text-primary">{card.title}</div>
                    <div className="text-2xl font-black">{card.value}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="space-y-6">
              {enhancement.sections.map((section) => (
                <Card key={section.title} className="border">
                  <CardContent className="p-6 sm:p-7 space-y-4">
                    <h2 className="text-2xl font-black">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-muted-foreground leading-8">{paragraph}</p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </section>

            <Card className="border bg-muted/30">
              <CardContent className="p-6 sm:p-7">
                <h2 className="text-2xl font-black mb-4">مختصر چیک لسٹ</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {enhancement.checklist.map((item) => (
                    <div key={item} className="rounded-xl bg-card border p-4 text-sm text-muted-foreground">• {item}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <section>
          <h2 className="text-2xl font-black mb-4">اکثر پوچھے جانے والے سوالات</h2>
          <Accordion type="single" collapsible>
            {urduPost.faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`}>
                <AccordionTrigger className="text-right font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <Card className="gradient-card-emerald border">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-black mb-2">اپنی ٹرین ابھی ٹریک کریں</h3>
            <p className="text-sm text-muted-foreground mb-4">لائیو GPS پوزیشن، رفتار، اور تاخیر اسٹیٹس دیکھیں تاکہ مضمون میں دی گئی معلومات فوراً عملی طور پر استعمال کر سکیں۔</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/ur/train"><Button className="rounded-full gap-2">لائیو ٹریکر کھولیں <ArrowRight className="w-4 h-4" /></Button></Link>
              <Link to="/ur/planner"><Button variant="outline" className="rounded-full">سفر پلان کریں</Button></Link>
            </div>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-black mb-5">متعلقہ مضامین</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {relatedPosts.map((post) => {
              const media = blogPosts.find((item) => item.slug === post.slug);
              if (!media) return null;

              return (
                <Link key={post.slug} to={`/ur/blog/${post.slug}`}>
                  <Card className={`${media.gradient} border h-full overflow-hidden hover-lift`}>
                    <img src={media.image} alt={post.title} className="w-full h-40 object-cover" />
                    <CardContent className="p-4">
                      <div className="text-[10px] font-bold text-primary mb-2">{post.category}</div>
                      <h3 className="font-bold text-sm leading-tight mb-2">{post.title}</h3>
                      <div className="text-xs text-muted-foreground">{media.readTime}</div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <UrduRelatedLinks context="blog" />
      </div>
    </div>
  );
}