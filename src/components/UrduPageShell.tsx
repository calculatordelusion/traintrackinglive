import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import heroTrainBg from "@/assets/hero-train-bg.webp";

interface FAQ {
  q: string;
  a: string;
}

interface UrduPageShellProps {
  /** Hero badge text */
  badge: string;
  /** Hero badge icon */
  badgeIcon: LucideIcon;
  /** Hero h1 - the gold-highlighted word */
  titleHighlight: string;
  /** Hero h1 - text before/after highlight */
  titleBefore?: string;
  titleAfter?: string;
  /** Hero description paragraph */
  description: string;
  /** Quick stats cards */
  stats?: { value: string; label: string; icon: LucideIcon; gradient: string }[];
  /** The English tool component rendered in the middle */
  children: ReactNode;
  /** Urdu editorial content section */
  editorialTitle?: string;
  editorialContent?: string[];
  /** Additional info cards */
  infoCards?: { icon: LucideIcon; title: string; desc: string; gradient: string }[];
  /** FAQ accordion */
  faqs: FAQ[];
  /** CTA section */
  ctaTitle?: string;
  ctaDesc?: string;
  ctaLink?: string;
  ctaLabel?: string;
  /** Language switch */
  englishPath: string;
}

export default function UrduPageShell({
  badge,
  badgeIcon: BadgeIcon,
  titleHighlight,
  titleBefore = "",
  titleAfter = "",
  description,
  stats,
  children,
  editorialTitle,
  editorialContent,
  infoCards,
  faqs,
  ctaTitle,
  ctaDesc,
  ctaLink,
  ctaLabel,
  englishPath,
}: UrduPageShellProps) {
  return (
    <div>
      {/* Hero Section — Premium gradient with background image */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <div className="absolute inset-0">
          <img src={heroTrainBg} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-15" width={1920} height={1080} />
        </div>
        {/* Decorative gradient orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[hsl(152_55%_40%/0.08)] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[hsl(43_74%_49%/0.06)] blur-3xl" />
        <div className="relative container mx-auto px-4 py-14 sm:py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 bg-[hsl(152_55%_40%/0.15)] backdrop-blur-sm border border-[hsl(152_55%_40%/0.3)] rounded-full px-5 py-2.5 text-sm mb-6 shadow-lg shadow-[hsl(152_55%_40%/0.1)]">
              <BadgeIcon className="w-4 h-4 text-[hsl(152_55%_45%)]" />
              <span className="font-semibold tracking-wide text-[hsl(152_55%_45%)]">{badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight drop-shadow-sm">
              {titleBefore && <>{titleBefore} </>}
              <span className="text-gradient-gold">{titleHighlight}</span>
              {titleAfter && <> {titleAfter}</>}
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-85 max-w-2xl mx-auto mt-5 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats — Floating glass cards */}
      {stats && stats.length > 0 && (
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((s) => (
              <Card key={s.label} className={`${s.gradient} border hover-lift shadow-lg`}>
                <CardContent className="p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight">{s.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tool Component */}
      <div>{children}</div>

      {/* Info Cards — Rich gradient cards with decorative accents */}
      {infoCards && infoCards.length > 0 && (
        <section className="container mx-auto px-4 py-14 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-10">
            <span className="text-gradient-green">اہم</span> معلومات
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {infoCards.map((card, i) => (
              <Card key={card.title} className={`${card.gradient} border hover-lift shadow-md group relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/5 -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-6 sm:p-7 relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Editorial Content — Professional article layout */}
      {editorialTitle && editorialContent && (
        <section className="bg-muted/30 py-14 sm:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 justify-center mb-8">
              <div className="h-px flex-1 max-w-16 bg-primary/30" />
              <h2 className="text-2xl sm:text-3xl font-black text-center">
                {editorialTitle}
              </h2>
              <div className="h-px flex-1 max-w-16 bg-primary/30" />
            </div>
            <Card className="border shadow-sm">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground space-y-5">
                  {editorialContent.map((p, i) => (
                    <p key={i} className="leading-relaxed text-sm sm:text-base">{p}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* FAQs — Enhanced accordion design */}
      <section className="bg-muted/50 py-14 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 justify-center mb-10">
            <div className="h-px flex-1 max-w-16 bg-accent/30" />
            <h2 className="text-2xl sm:text-3xl font-black text-center">
              اکثر پوچھے جانے والے <span className="text-gradient-gold">سوالات</span>
            </h2>
            <div className="h-px flex-1 max-w-16 bg-accent/30" />
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5 bg-card shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-right font-semibold text-sm sm:text-base py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA — Gradient section with decorative elements */}
      {ctaTitle && (
        <section className="relative bg-hero-gradient text-primary-foreground py-14 sm:py-20 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[hsl(152_55%_40%/0.08)] blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[hsl(43_74%_49%/0.06)] blur-3xl" />
          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">{ctaTitle}</h2>
            {ctaDesc && <p className="opacity-85 mb-8 max-w-xl mx-auto text-base sm:text-lg">{ctaDesc}</p>}
            {ctaLink && ctaLabel && (
              <Link to={ctaLink}>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-bold gap-2 shadow-lg shadow-accent/20 px-8">
                  {ctaLabel}
                </Button>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Language Switch — Enhanced design */}
      <div className="bg-card border-t py-5 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground flex-wrap px-4">
          <Globe className="w-4 h-4" />
          <span>یہ صفحہ انگریزی میں بھی دستیاب ہے:</span>
          <Link to={englishPath} className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
            English version →
          </Link>
        </div>
      </div>
    </div>
  );
}
