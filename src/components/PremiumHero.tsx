import { ReactNode } from "react";
import { Link } from "react-router-dom";
import heroTrainBg from "@/assets/hero-train-bg.webp";

interface Breadcrumb {
  label: string;
  to?: string;
}

interface PremiumHeroProps {
  breadcrumbs: Breadcrumb[];
  badge: string;
  badgeIcon?: ReactNode;
  title: ReactNode;
  subtitle?: string;
  subtitleUrdu?: string;
  children?: ReactNode;
  centered?: boolean;
}

export default function PremiumHero({
  breadcrumbs,
  badge,
  badgeIcon,
  title,
  subtitle,
  subtitleUrdu,
  children,
  centered = false,
}: PremiumHeroProps) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground py-12 sm:py-16 md:py-20">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img
          src={heroTrainBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.12]"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--hero-gradient-end)/0.9)]" />
      </div>

      {/* Decorative orbs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[hsl(152_55%_40%/0.07)] blur-3xl" />
      <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-[hsl(43_74%_49%/0.05)] blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[hsl(152_60%_30%/0.06)] blur-3xl" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className={`relative container mx-auto px-4 ${centered ? "text-center" : ""}`}>
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-4">
          {breadcrumbs.map((bc, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="opacity-50">›</span>}
              {bc.to ? (
                <Link to={bc.to} className="opacity-70 hover:opacity-100 transition-opacity">
                  {bc.label}
                </Link>
              ) : (
                <span>{bc.label}</span>
              )}
            </span>
          ))}
        </div>

        <div className={centered ? "max-w-3xl mx-auto" : "max-w-3xl"}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[hsl(152_55%_40%/0.15)] backdrop-blur-sm border border-[hsl(152_55%_40%/0.3)] rounded-full px-5 py-2.5 text-sm mb-6 shadow-lg shadow-[hsl(152_55%_40%/0.1)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(152_55%_45%)] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[hsl(152_55%_45%)]" />
            </span>
            {badgeIcon}
            <span className="font-semibold tracking-wider text-[hsl(152_55%_45%)]">
              {badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-sm">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-base sm:text-lg opacity-90 mb-2 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Urdu subtitle */}
          {subtitleUrdu && (
            <p className="opacity-60 text-sm mt-1">{subtitleUrdu}</p>
          )}

          {/* Slotted children (links, stats, etc.) */}
          {children}
        </div>
      </div>
    </section>
  );
}
