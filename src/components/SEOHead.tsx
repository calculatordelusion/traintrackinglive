import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  breadcrumbs?: { name: string; url: string }[];
  faqSchema?: { q: string; a: string }[];
  howToSchema?: { name: string; steps: { name: string; text: string }[] };
  additionalSchemas?: object[];
  noindex?: boolean;
  lang?: "en" | "ur";
  alternateUrdu?: string;
  alternateEnglish?: string;
}

export default function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogImage = "https://trackmytrain.pk/og-image.png",
  ogType = "website",
  breadcrumbs,
  faqSchema,
  howToSchema,
  additionalSchemas,
  noindex = false,
  lang = "en",
  alternateUrdu,
  alternateEnglish,
}: SEOHeadProps) {
  const fullCanonical = canonical.startsWith("http") ? canonical : `https://trackmytrain.pk${canonical}`;

  // Auto-generate hreflang paths if not provided
  const enPath = lang === "ur"
    ? (alternateEnglish || canonical.replace(/^\/ur/, "") || "/")
    : canonical;
  const urPath = lang === "en"
    ? (alternateUrdu || `/ur${canonical === "/" ? "" : canonical}`)
    : canonical;

  const fullEnUrl = enPath.startsWith("http") ? enPath : `https://trackmytrain.pk${enPath}`;
  const fullUrUrl = urPath.startsWith("http") ? urPath : `https://trackmytrain.pk${urPath}`;

  return (
    <Helmet>
      <html lang={lang} dir={lang === "ur" ? "rtl" : "ltr"} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Hreflang tags for bilingual SEO */}
      <link rel="alternate" hrefLang="en" href={fullEnUrl} />
      <link rel="alternate" hrefLang="ur" href={fullUrUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullEnUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Track My Train" />
      <meta property="og:locale" content={lang === "ur" ? "ur_PK" : "en_PK"} />
      <meta property="og:locale:alternate" content={lang === "ur" ? "en_PK" : "ur_PK"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((b, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": b.name,
              "item": b.url.startsWith("http") ? b.url : `https://trackmytrain.pk${b.url}`,
            })),
          })}
        </script>
      )}

      {faqSchema && faqSchema.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqSchema.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a },
            })),
          })}
        </script>
      )}

      {howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": howToSchema.name,
            "step": howToSchema.steps.map((s, i) => ({
              "@type": "HowToStep",
              "position": i + 1,
              "name": s.name,
              "text": s.text,
            })),
          })}
        </script>
      )}

      {additionalSchemas?.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
