import { createContext, useContext, type ReactNode } from "react";

export type Language = "en" | "ur";

interface LanguageContextType {
  lang: Language;
  isUrdu: boolean;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  getUrduPath: (enPath: string) => string;
  getEnPath: (urPath: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  isUrdu: false,
  dir: "ltr",
  t: (key) => key,
  getUrduPath: (p) => `/ur${p}`,
  getEnPath: (p) => p.replace(/^\/ur/, "") || "/",
});

export const useLanguage = () => useContext(LanguageContext);

// Translations map
const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": { en: "Home", ur: "ہوم" },
  "nav.live_trains": { en: "Live Trains", ur: "لائیو ٹرینیں" },
  "nav.stations": { en: "Stations", ur: "اسٹیشنز" },
  "nav.schedule": { en: "Schedule", ur: "شیڈول" },
  "nav.routes": { en: "Routes", ur: "روٹس" },
  "nav.planner": { en: "Journey Planner", ur: "سفر کا منصوبہ" },
  "nav.find_train": { en: "Find My Train", ur: "میری ٹرین تلاش کریں" },
  "nav.express": { en: "Express Trains", ur: "ایکسپریس ٹرینیں" },
  "nav.tickets": { en: "Ticket Pricing", ur: "ٹکٹ کی قیمتیں" },
  "nav.delays": { en: "Check Delays", ur: "تاخیر چیک کریں" },
  "nav.green_line": { en: "Green Line Express", ur: "گرین لائن ایکسپریس" },
  "nav.faq": { en: "FAQ", ur: "عمومی سوالات" },
  "nav.about": { en: "About", ur: "ہمارے بارے میں" },
  "nav.contact": { en: "Contact", ur: "رابطہ" },
  "nav.blog": { en: "Blog", ur: "بلاگ" },
  "nav.privacy": { en: "Privacy", ur: "رازداری" },

  // Homepage
  "home.title": { en: "Track My Train — Live Pakistan Railway Train Tracking & GPS Status 2026", ur: "ٹریک مائی ٹرین — پاکستان ریلوے لائیو ٹرین ٹریکنگ اور GPS اسٹیٹس 2026" },
  "home.description": { en: "Track any Pakistan Railways train in real-time with GPS accuracy.", ur: "GPS کی درستگی کے ساتھ کسی بھی پاکستان ریلوے ٹرین کو ریئل ٹائم میں ٹریک کریں۔" },
  "home.hero_badge": { en: "LIVE GPS TRACKING • UPDATED EVERY 5 SECONDS", ur: "لائیو GPS ٹریکنگ • ہر 5 سیکنڈ میں اپڈیٹ" },
  "home.hero_title_1": { en: "Track My", ur: "ٹریک مائی" },
  "home.hero_title_2": { en: "Train", ur: "ٹرین" },
  "home.hero_subtitle": { en: "Pakistan's #1 Live Railway GPS Tracker", ur: "پاکستان کا نمبر 1 لائیو ریلوے GPS ٹریکر" },
  "home.hero_desc": { en: "Track 164+ Pakistan Railways trains in real-time. GPS-accurate positions, live speed, delay alerts & ETAs for every station — updated every 5 seconds. Free, no signup required.", ur: "164+ پاکستان ریلوے ٹرینوں کو ریئل ٹائم میں ٹریک کریں۔ GPS درست پوزیشنز، لائیو رفتار، تاخیر الرٹس اور ہر اسٹیشن کے لیے ETAs — ہر 5 سیکنڈ میں اپڈیٹ۔ مفت، سائن اپ کی ضرورت نہیں۔" },
  "home.search_placeholder": { en: "Search trains by name, number, or route...", ur: "نام، نمبر، یا روٹ سے ٹرین تلاش کریں..." },
  "home.search_btn": { en: "Search", ur: "تلاش کریں" },
  "home.popular_example": { en: "Popular:", ur: "مقبول:" },
  "home.live_trains": { en: "Live Trains", ur: "لائیو ٹرینیں" },
  "home.moving": { en: "Moving", ur: "چل رہی ہیں" },
  "home.at_station": { en: "At Station", ur: "اسٹیشن پر" },
  "home.plan_journey": { en: "Plan a Journey", ur: "سفر کا منصوبہ بنائیں" },
  "home.track_now": { en: "Track Now", ur: "ابھی ٹریک کریں" },
  "home.view_all": { en: "View All Trains", ur: "تمام ٹرینیں دیکھیں" },

  // About page
  "about.title": { en: "About Track My Train — Pakistan's #1 Independent Train Tracking Platform", ur: "ٹریک مائی ٹرین کے بارے میں — پاکستان کا نمبر 1 آزاد ٹرین ٹریکنگ پلیٹ فارم" },
  "about.description": { en: "Learn about our mission, team values, and how we provide free real-time GPS tracking.", ur: "ہمارے مشن، ٹیم کی اقدار، اور ہم مفت ریئل ٹائم GPS ٹریکنگ کیسے فراہم کرتے ہیں اس کے بارے میں جانیں۔" },
  "about.hero_title": { en: "About Us", ur: "ہمارے بارے میں" },
  "about.hero_subtitle": { en: "Pakistan's independent, community-driven platform dedicated to simplifying railway travel for millions of passengers.", ur: "پاکستان کا آزاد، کمیونٹی پر مبنی پلیٹ فارم جو لاکھوں مسافروں کے لیے ریلوے سفر کو آسان بنانے کے لیے وقف ہے۔" },

  // Contact page
  "contact.title": { en: "Contact Track My Train — Feedback, Bug Reports & Feature Requests", ur: "ٹریک مائی ٹرین سے رابطہ — فیڈ بیک، بگ رپورٹس اور فیچر ریکوئسٹس" },
  "contact.description": { en: "Get in touch with the Track My Train team.", ur: "ٹریک مائی ٹرین ٹیم سے رابطہ کریں۔" },
  "contact.hero_title": { en: "Contact Us", ur: "ہم سے رابطہ کریں" },
  "contact.form_name": { en: "Your Name", ur: "آپ کا نام" },
  "contact.form_email": { en: "Email Address", ur: "ای میل ایڈریس" },
  "contact.form_subject": { en: "Subject", ur: "موضوع" },
  "contact.form_message": { en: "Your Message", ur: "آپ کا پیغام" },
  "contact.form_submit": { en: "Send Message", ur: "پیغام بھیجیں" },

  // FAQ page
  "faq.title": { en: "FAQ — Pakistan Railways Questions Answered", ur: "عمومی سوالات — پاکستان ریلوے سے متعلق سوالات کے جوابات" },
  "faq.description": { en: "Find answers to frequently asked questions about Pakistan Railways.", ur: "پاکستان ریلوے کے بارے میں اکثر پوچھے جانے والے سوالات کے جوابات تلاش کریں۔" },
  "faq.hero_title": { en: "Frequently Asked Questions", ur: "اکثر پوچھے جانے والے سوالات" },

  // Stations page
  "stations.title": { en: "All Pakistan Railway Stations 2026 — Complete Directory", ur: "تمام پاکستان ریلوے اسٹیشنز 2026 — مکمل ڈائریکٹری" },
  "stations.description": { en: "Browse 342+ Pakistan Railways stations.", ur: "342+ پاکستان ریلوے اسٹیشنز براؤز کریں۔" },
  "stations.hero_title": { en: "Railway Stations", ur: "ریلوے اسٹیشنز" },
  "stations.search_placeholder": { en: "Search stations...", ur: "اسٹیشن تلاش کریں..." },

  // Live Trains page
  "trains.title": { en: "Track Live Trains Pakistan — Real-Time GPS Map", ur: "پاکستان لائیو ٹرینیں ٹریک کریں — ریئل ٹائم GPS نقشہ" },
  "trains.description": { en: "Track 164+ Pakistan Railways trains LIVE right now.", ur: "ابھی 164+ پاکستان ریلوے ٹرینیں لائیو ٹریک کریں۔" },
  "trains.hero_title": { en: "Live Train Tracker", ur: "لائیو ٹرین ٹریکر" },

  // Schedule page
  "schedule.title": { en: "Pakistan Railway Schedule & Timetable 2026", ur: "پاکستان ریلوے شیڈول اور ٹائم ٹیبل 2026" },
  "schedule.description": { en: "Complete Pakistan Railways timetable with all train schedules.", ur: "تمام ٹرین شیڈولز کے ساتھ مکمل پاکستان ریلوے ٹائم ٹیبل۔" },

  // Routes page
  "routes.title": { en: "Pakistan Railway Routes — Complete Network Guide", ur: "پاکستان ریلوے روٹس — مکمل نیٹ ورک گائیڈ" },
  "routes.description": { en: "Explore all Pakistan Railways routes and corridors.", ur: "تمام پاکستان ریلوے روٹس اور کوریڈورز دریافت کریں۔" },

  // Journey Planner
  "planner.title": { en: "Journey Planner — Plan Your Train Journey", ur: "سفر کا منصوبہ — اپنے ٹرین سفر کی منصوبہ بندی کریں" },
  "planner.description": { en: "Plan your Pakistan Railways journey from station to station.", ur: "اسٹیشن سے اسٹیشن تک اپنے پاکستان ریلوے سفر کی منصوبہ بندی کریں۔" },

  // Find My Train
  "findtrain.title": { en: "Find My Train — GPS Auto-Detection", ur: "میری ٹرین تلاش کریں — GPS آٹو ڈیٹیکشن" },
  "findtrain.description": { en: "Automatically detect which train you're on using GPS.", ur: "GPS استعمال کرکے خودکار طور پر پتا لگائیں کہ آپ کس ٹرین میں ہیں۔" },

  // Express Trains
  "express.title": { en: "Express Trains Pakistan — Premium Rail Services", ur: "ایکسپریس ٹرینیں پاکستان — پریمیم ریل سروسز" },
  "express.description": { en: "Complete guide to Pakistan Railways express train services.", ur: "پاکستان ریلوے ایکسپریس ٹرین سروسز کی مکمل گائیڈ۔" },

  // Ticket Pricing
  "tickets.title": { en: "Pakistan Railway Ticket Prices 2026", ur: "پاکستان ریلوے ٹکٹ کی قیمتیں 2026" },
  "tickets.description": { en: "Latest Pakistan Railways fare chart and ticket prices.", ur: "تازہ ترین پاکستان ریلوے کرایہ چارٹ اور ٹکٹ کی قیمتیں۔" },

  // Check Delays
  "delays.title": { en: "Check Train Delays — Pakistan Railway Delay Tracker", ur: "ٹرین تاخیر چیک کریں — پاکستان ریلوے تاخیر ٹریکر" },
  "delays.description": { en: "Check real-time delay status for all Pakistan Railways trains.", ur: "تمام پاکستان ریلوے ٹرینوں کی ریئل ٹائم تاخیر اسٹیٹس چیک کریں۔" },

  // Green Line
  "greenline.title": { en: "Green Line Express — Islamabad to Karachi", ur: "گرین لائن ایکسپریس — اسلام آباد سے کراچی" },
  "greenline.description": { en: "Complete guide to Green Line Express train service.", ur: "گرین لائن ایکسپریس ٹرین سروس کی مکمل گائیڈ۔" },

  // Blog
  "blog.title": { en: "Blog — Pakistan Railway News & Updates", ur: "بلاگ — پاکستان ریلوے خبریں اور اپڈیٹس" },
  "blog.description": { en: "Latest news, updates and guides about Pakistan Railways.", ur: "پاکستان ریلوے کے بارے میں تازہ ترین خبریں، اپڈیٹس اور گائیڈز۔" },

  // Privacy
  "privacy.title": { en: "Privacy Policy — Track My Train", ur: "رازداری کی پالیسی — ٹریک مائی ٹرین" },
  "privacy.description": { en: "Privacy policy for Track My Train platform.", ur: "ٹریک مائی ٹرین پلیٹ فارم کی رازداری کی پالیسی۔" },

  // Common
  "common.track_my": { en: "Track My", ur: "ٹریک مائی" },
  "common.train": { en: "Train", ur: "ٹرین" },
  "common.view_details": { en: "View Details", ur: "تفصیلات دیکھیں" },
  "common.learn_more": { en: "Learn More", ur: "مزید جانیں" },
  "common.from": { en: "From", ur: "سے" },
  "common.to": { en: "To", ur: "تک" },
  "common.speed": { en: "Speed", ur: "رفتار" },
  "common.delay": { en: "Delay", ur: "تاخیر" },
  "common.on_time": { en: "On Time", ur: "وقت پر" },
  "common.late": { en: "Late", ur: "دیر سے" },
  "common.live": { en: "LIVE", ur: "لائیو" },
  "common.loading": { en: "Loading...", ur: "لوڈ ہو رہا ہے..." },
  "common.no_results": { en: "No results found", ur: "کوئی نتائج نہیں ملے" },
  "common.disclaimer": { en: "Disclaimer", ur: "دستبرداری" },
  "common.all_rights": { en: "All rights reserved", ur: "جملہ حقوق محفوظ ہیں" },

  // Footer
  "footer.quick_links": { en: "Quick Links", ur: "فوری لنکس" },
  "footer.travel_guides": { en: "Travel Guides", ur: "سفری رہنمائی" },
  "footer.popular_routes": { en: "Popular Routes", ur: "مقبول روٹس" },
  "footer.helpline": { en: "Pakistan Railways Helpline", ur: "پاکستان ریلوے ہیلپ لائن" },
  "footer.independent": { en: "Independent platform — not affiliated with Pakistan Railways", ur: "آزاد پلیٹ فارم — پاکستان ریلوے سے وابستہ نہیں" },
};

export function LanguageProvider({ lang, children }: { lang: Language; children: ReactNode }) {
  const isUrdu = lang === "ur";
  const dir = isUrdu ? "rtl" : "ltr";

  const t = (key: string): string => {
    return translations[key]?.[lang] || translations[key]?.en || key;
  };

  const getUrduPath = (enPath: string) => `/ur${enPath === "/" ? "" : enPath}`;
  const getEnPath = (urPath: string) => urPath.replace(/^\/ur/, "") || "/";

  return (
    <LanguageContext.Provider value={{ lang, isUrdu, dir, t, getUrduPath, getEnPath }}>
      <div dir={dir} lang={lang} className={isUrdu ? "font-urdu" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
