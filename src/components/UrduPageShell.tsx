import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://traintracking.pk/_next/image?url=%2FTrainTrackingpk-TrackLiveTrains.webp&w=2048&q=75')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-5 py-2 text-sm mb-5">
              <BadgeIcon className="w-4 h-4" />
              <span className="font-semibold">{badge}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
              {titleBefore && <>{titleBefore} </>}
              <span className="text-gradient-gold">{titleHighlight}</span>
              {titleAfter && <> {titleAfter}</>}
            </h1>
            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mt-4 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="container mx-auto px-4 -mt-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s) => (
              <Card key={s.label} className={`${s.gradient} border hover-lift`}>
                <CardContent className="p-4 text-center">
                  <s.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-black">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tool Component */}
      <div>{children}</div>

      {/* Info Cards */}
      {infoCards && infoCards.length > 0 && (
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {infoCards.map((card) => (
              <Card key={card.title} className={`${card.gradient} border hover-lift`}>
                <CardContent className="p-6">
                  <card.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Editorial Content */}
      {editorialTitle && editorialContent && (
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
              {editorialTitle}
            </h2>
            <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground space-y-4">
              {editorialContent.map((p, i) => (
                <p key={i} className="leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
            اکثر پوچھے جانے والے <span className="text-gradient-gold">سوالات</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-4 bg-card">
                <AccordionTrigger className="text-right font-semibold text-sm sm:text-base py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      {ctaTitle && (
        <section className="bg-hero-gradient text-primary-foreground py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">{ctaTitle}</h2>
            {ctaDesc && <p className="opacity-80 mb-6 max-w-xl mx-auto">{ctaDesc}</p>}
            {ctaLink && ctaLabel && (
              <Link to={ctaLink}>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-bold gap-2">
                  {ctaLabel}
                </Button>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Language Switch */}
      <div className="bg-card border-t py-4 text-center">
        <p className="text-sm text-muted-foreground">
          This page is available in English:{" "}
          <Link to={englishPath} className="text-primary font-semibold hover:underline">
            Switch to English →
          </Link>
        </p>
      </div>
    </div>
  );
}
