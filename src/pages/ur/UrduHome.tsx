import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Train, MapPin, Clock, ArrowRight, Wifi, Navigation, Shield, Search, Zap, Users,
  Radio, BarChart3, Route, Eye, Landmark, TrendingUp, Bell, Map, Gauge, Globe,
  CheckCircle2, Info, AlertTriangle, CreditCard, Leaf, Ticket, CalendarDays,
  Timer, FileText, BookOpen, Newspaper
} from "lucide-react";
import { trains, searchTrains } from "@/data/trains";
import { stations } from "@/data/stations";
import { popularRoutes } from "@/data/routes";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import { fetchLivePositions, type LiveStats } from "@/lib/trainApi";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroTrainBg from "@/assets/hero-train-bg.webp";

// Train images
import greenLineTrainImg from "@/assets/trains/green-line-train.webp";
import tezgamExpressImg from "@/assets/trains/tezgam-express.webp";
import karakoramExpressImg from "@/assets/trains/karakoram-express.webp";
import khyberMailImg from "@/assets/trains/khyber-mail.webp";
import businessExpressImg from "@/assets/trains/business-express.webp";
import jaffarExpressImg from "@/assets/trains/jaffar-express.webp";

// Station images
import lahoreStationImg from "@/assets/stations/lahore-station.webp";
import karachiStationImg from "@/assets/stations/karachi-station.webp";
import rawalpindiStationImg from "@/assets/stations/rawalpindi-station.webp";
import multanStationImg from "@/assets/stations/multan-station.webp";
import peshawarStationImg from "@/assets/stations/peshawar-station.webp";
import quettaStationImg from "@/assets/stations/quetta-station.webp";

const faqs = [
  { q: "میں پاکستان میں اپنی ٹرین کو ریئل ٹائم میں کیسے ٹریک کر سکتا ہوں؟", a: "ٹریک مائی ٹرین کھولیں، سرچ بار میں اپنی ٹرین کا نام یا نمبر ٹائپ کریں، اور نتیجے پر ٹیپ کریں۔ آپ کو فوری طور پر ٹرین کی لائیو GPS پوزیشن نقشے پر، اس کی موجودہ رفتار، کتنی منٹ تاخیر ہے، اور ہر آنے والے اسٹیشن کے لیے اپڈیٹ شدہ آمد کا تخمینہ نظر آئے گا۔ صفحہ ہر 5 سیکنڈ میں خود بخود ریفریش ہوتا ہے۔" },
  { q: "ٹرین ٹریک کرتے وقت کیا تفصیلات دکھائی جاتی ہیں؟", a: "ہر ٹرین کا لائیو صفحہ دکھاتا ہے: انٹرایکٹو نقشے پر GPS کوآرڈینیٹس، ریئل ٹائم رفتار کلومیٹر فی گھنٹہ میں، جمع شدہ تاخیر منٹوں میں، پروگریس بار، اور اگلے اسٹیشن اور تمام باقی اسٹاپس پر پہنچنے کا تخمینی وقت۔ ہم آفیشل شیڈول بھی دکھاتے ہیں تاکہ آپ متوقع اور اصل اوقات کا موازنہ کر سکیں۔" },
  { q: "کیا ٹریک مائی ٹرین مفت ہے؟", a: "جی ہاں! ہمارا پلیٹ فارم 100% مفت ہے بغیر کسی پوشیدہ لاگت، سبسکرپشنز، یا اشتہارات کے۔ ہم یقین رکھتے ہیں کہ ہر پاکستانی مسافر کو قابل اعتماد ٹرین ٹریکنگ معلومات تک بغیر کسی رکاوٹ کے رسائی حاصل ہونی چاہیے۔" },
  { q: "GPS ٹریکنگ کتنی درست ہے؟", a: "ہماری GPS پر مبنی ٹریکنگ عام طور پر 100-500 میٹر کی حد تک درست ہوتی ہے۔ ٹرین کی پوزیشنز ہر 5 سیکنڈ میں اپڈیٹ ہوتی ہیں، اور تاخیر کے حسابات زیادہ تر سفروں کے لیے ±3-5 منٹ تک درست ہیں۔ ETAs متحرک طور پر ایڈجسٹ ہوتی ہیں جیسے ٹرین تیز یا سست ہوتی ہے۔" },
  { q: "کیا مجھے اکاؤنٹ بنانا ضروری ہے؟", a: "نہیں! کسی اکاؤنٹ یا رجسٹریشن کی ضرورت نہیں ہے۔ بس ہماری ویب سائٹ کھولیں اور فوری طور پر ٹرینیں ٹریک کرنا شروع کریں۔ ہم ذاتی ڈیٹا جمع نہیں کرتے۔ ویب سائٹ ہلکی ہے اور 2G/3G موبائل ڈیٹا پر بھی تیزی سے لوڈ ہوتی ہے۔" },
  { q: "ٹریک مائی ٹرین کتنی ٹرینیں ٹریک کرتا ہے؟", a: "ہم 164+ پاکستان ریلوے ٹرینیں ٹریک کرتے ہیں جن میں خیبر میل، تیزگام، گرین لائن ایکسپریس، علامہ اقبال ایکسپریس، قراقرم ایکسپریس، بزنس ایکسپریس، اور شالیمار ایکسپریس جیسی بڑی ایکسپریس سروسز شامل ہیں۔ ایکسپریس، میل، پیسنجر، اور پریمیم AC سروسز سب شامل ہیں۔" },
  { q: "'میری ٹرین تلاش کریں' فیچر کیا ہے؟", a: "میری ٹرین تلاش کریں آپ کے فون کا GPS استعمال کرکے خودکار طور پر پتا لگاتا ہے کہ آپ اس وقت کس ٹرین میں ہیں۔ یہ تمام فعال ٹرینوں سے آپ کی قربت کا حساب لگاتا ہے اور 2 کلومیٹر کے اندر قریب ترین میچ کی شناخت کرتا ہے۔ خاص طور پر مفید ہے جب آپ خاندان کو اپنی لائیو لوکیشن شیئر کرنا چاہیں۔" },
  { q: "پاکستان ریلوے کا ہیلپ لائن نمبر کیا ہے؟", a: "پاکستان ریلوے کا مرکزی ہیلپ لائن نمبر 117 ہے جو 24/7 دستیاب ہے۔ آپ علاقائی دفاتر سے بھی رابطہ کر سکتے ہیں: کراچی (021-99213012)، لاہور (042-99211080)، راولپنڈی (051-9270831)۔ ریلوے پولیس: 1166۔" },
  { q: "کراچی سے لاہور تک سب سے تیز ٹرین کون سی ہے؟", a: "گرین لائن ایکسپریس کراچی-لاہور روٹ پر سب سے تیز ترین ٹرین ہے جو تقریباً 18 گھنٹوں میں سفر مکمل کرتی ہے۔ اس میں AC بزنس، AC سٹینڈرڈ، اور اکانومی کلاس کی سیٹیں دستیاب ہیں۔ دیگر مقبول آپشنز میں تیزگام (22 گھنٹے)، قراقرم ایکسپریس (22 گھنٹے)، اور بزنس ایکسپریس (20 گھنٹے) شامل ہیں۔" },
  { q: "پاکستان ریلوے ٹکٹ کی قیمتیں آن لائن کیسے چیک کریں؟", a: "ہمارے ٹکٹ پرائسنگ صفحے پر تمام بڑے روٹس کے کرائے دیکھیں۔ اکانومی کلاس مختصر روٹس کے لیے 300 روپے سے شروع ہوتی ہے، جبکہ پریمیم ایکسپریس ٹرینوں کی AC بزنس کلاس کراچی سے پشاور جیسے لمبے سفروں کے لیے 5,000-9,000 روپے تک ہو سکتی ہے۔" },
  { q: "کیا تہواروں اور چھٹیوں میں ٹریک مائی ٹرین کام کرتا ہے؟", a: "جی ہاں! عید، قومی تعطیلات، اور گرمیوں کے رش کے دوران جب تاخیر زیادہ عام ہوتی ہے، ہمارا لائیو GPS ڈیٹا بالکل وہی دکھاتا ہے جو زمینی حقیقت ہے — چاہے ٹرین کسی کراسنگ پر رکی ہو، جنکشن پر تاخیر ہو، یا شیڈول کے مطابق چل رہی ہو۔" },
  { q: "دھند کے موسم میں ٹرین کی تاخیر کیسے چیک کریں؟", a: "دھند کا موسم (دسمبر-فروری) وہ وقت ہے جب ہمارا پلیٹ فارم سب سے زیادہ مفید ہے۔ پاکستان ریلوے ٹرینوں کو پنجاب اور بالائی سندھ میں شدید دھند کے دوران 2-8 گھنٹے تاخیر ہوتی ہے۔ ہماری لائیو GPS ٹریکنگ آپ کو ہر ٹرین کی اصل پوزیشن اور جمع شدہ تاخیر دکھاتی ہے۔ سردیوں میں اپنی شیڈولڈ روانگی سے 1-2 گھنٹے پہلے تاخیر چیک کریں۔" },
  { q: "کراچی سے لاہور تک سب سے سستی ٹرین کون سی ہے؟", a: "سب سے سستی آپشنز تیزگام ایکسپریس اور قراقرم ایکسپریس ہیں، دونوں میں اکانومی کلاس سیٹیں تقریباً 1,500 روپے میں دستیاب ہیں۔ سفر 20-22 گھنٹے لیتا ہے۔ تھوڑے اور آرام کے لیے، ان ٹرینوں کی AC سٹینڈرڈ کلاس 3,000-3,500 روپے ہے۔" },
  { q: "طالب علموں کو پاکستان ریلوے پر رعایت کیسے ملے؟", a: "تسلیم شدہ پاکستانی اداروں میں داخلہ لینے والے طلبہ کو تمام ٹکٹ کلاسز پر 25% رعایت ملتی ہے۔ بکنگ کاؤنٹر پر اپنا طالب علم شناختی کارڈ اور CNIC ساتھ لے جائیں۔ یہ رعایت ایکسپریس اور AC سروسز سمیت تمام ٹرین اقسام پر لاگو ہوتی ہے۔" },
  { q: "کیا پاکستان ریلوے ٹرینوں میں کھانا دستیاب ہے؟", a: "جی ہاں۔ پریمیم ٹرینوں جیسے گرین لائن ایکسپریس اور بزنس ایکسپریس میں آن بورڈ کیٹرنگ ہوتی ہے۔ دیگر ٹرینوں میں بڑے اسٹیشنوں پر دکاندار چائے، ناشتہ، بریانی، اور کولڈ ڈرنکس بیچتے ہیں۔ لمبے سفروں کے لیے اپنا پانی اور ناشتہ ساتھ رکھیں۔" },
  { q: "ٹرین منسوخ ہونے پر کیا ہوتا ہے؟", a: "مسافروں کو مکمل ریفنڈ یا اسی روٹ پر اگلی دستیاب ٹرین میں ٹکٹ ٹرانسفر کا حق ہے۔ منسوخی عام طور پر انتہائی موسم یا بنیادی ڈھانچے کی ایمرجنسی کی وجہ سے ہوتی ہے۔ منسوخی کے 72 گھنٹوں کے اندر اپنے ٹکٹ اور CNIC کے ساتھ کسی بھی بڑے اسٹیشن کے بکنگ کاؤنٹر پر جائیں۔" },
];

const topTrains = [
  { name: "گرین لائن ایکسپریس", nameEn: "Green Line Express", number: "101UP/102DN", route: "اسلام آباد → کراچی", duration: "18 گھنٹے", type: "پریمیم AC", gradient: "gradient-card-emerald", icon: Leaf, badge: "پریمیم", desc: "پاکستان کی تیز ترین اور سب سے مقبول پریمیم ٹرین سروس۔ AC بزنس، AC سٹینڈرڈ اور اکانومی کلاسز جدید سہولیات، آن بورڈ کیٹرنگ اور پاور آؤٹلیٹس کے ساتھ۔ لاہور، ملتان، سکھر اور حیدرآباد پر رکتی ہے۔", link: "/ur/green-line-express", image: greenLineTrainImg },
  { name: "تیزگام ایکسپریس", nameEn: "Tezgam Express", number: "7UP/8DN", route: "کراچی → راولپنڈی", duration: "22 گھنٹے", type: "ایکسپریس", gradient: "gradient-card-amber", icon: Zap, badge: "تاریخی", desc: "پاکستان کی سب سے پرانی اور مشہور ایکسپریس ٹرینوں میں سے ایک جو 1973 سے چل رہی ہے۔ اپنی قابل اعتمادی اور سستی اکانومی کلاس کے لیے جانی جاتی ہے۔ حیدرآباد، سکھر، ملتان اور لاہور پر رکتی ہے۔", link: "/ur/train", image: tezgamExpressImg },
  { name: "قراقرم ایکسپریس", nameEn: "Karakoram Express", number: "11UP/12DN", route: "کراچی → لاہور", duration: "22 گھنٹے", type: "ایکسپریس", gradient: "gradient-card-blue", icon: Train, badge: "مقبول", desc: "قراقرم پہاڑی سلسلے کے نام پر، یہ مقبول ایکسپریس ٹرین پاکستان کے دو بڑے شہروں کو جوڑتی ہے۔ سلیپر، AC سٹینڈرڈ اور اکانومی کلاسز دستیاب ہیں۔ کاروباری مسافروں میں خاص طور پر مقبول ہے۔", link: "/ur/train", image: karakoramExpressImg },
  { name: "خیبر میل", nameEn: "Khyber Mail", number: "1UP/2DN", route: "کراچی → پشاور", duration: "30 گھنٹے 30 منٹ", type: "ایکسپریس", gradient: "gradient-card-purple", icon: Route, badge: "سب سے لمبی", desc: "پاکستان کی سب سے لمبی روزانہ سروس جو مین لائن 1 کی 1,680 کلومیٹر کی پوری لمبائی کا احاطہ کرتی ہے — کراچی کینٹ سے پشاور کینٹ تک چاروں صوبوں سے گزرتی ہے۔", link: "/ur/train", image: khyberMailImg },
  { name: "بزنس ایکسپریس", nameEn: "Business Express", number: "5UP/6DN", route: "کراچی → لاہور", duration: "20 گھنٹے", type: "ایکسپریس", gradient: "gradient-card-rose", icon: TrendingUp, badge: "بزنس", desc: "کاروباری مسافروں کے لیے تیار کردہ جنہیں رفتار اور آرام دونوں چاہیے۔ AC سلیپر، AC پارلر، اور AC بزنس کلاس آرام دہ سیٹنگ اور آن بورڈ ریفریشمنٹس کے ساتھ دستیاب ہے۔", link: "/ur/train", image: businessExpressImg },
  { name: "جعفر ایکسپریس", nameEn: "Jaffar Express", number: "39UP/40DN", route: "کوئٹہ → پشاور", duration: "24 گھنٹے", type: "ایکسپریس", gradient: "gradient-card-teal", icon: Map, badge: "خوبصورت منظر", desc: "بلوچستان کو خیبر پختونخوا سے پنجاب کے ذریعے جوڑتی ہے۔ ڈرامائی بولان پاس کے مناظر سے گزرتی ہے — پاکستان کا سب سے خوبصورت ٹرین سفر۔ مغربی پاکستان کی اہم ترین ٹرانسپورٹ شریان۔", link: "/ur/train", image: jaffarExpressImg },
];

const majorStations = [
  { name: "لاہور جنکشن", slug: "lahore-junction", trains: 25, province: "پنجاب", gradient: "gradient-card-emerald", desc: "پاکستان کا مصروف ترین ریلوے اسٹیشن اور نیٹ ورک کا تاج۔ 25+ روزانہ ٹرینوں کے ساتھ۔ گرین لائن ایکسپریس، تیزگام، اور تمام بڑی شمالی-جنوبی سروسز کا مرکز۔", facilities: ["VIP لاؤنج", "وائی فائی", "فوڈ کورٹ", "ATM", "طبی امداد"], image: lahoreStationImg },
  { name: "کراچی کینٹ", slug: "karachi-cantt", trains: 22, province: "سندھ", gradient: "gradient-card-amber", desc: "مین لائن 1 کا جنوبی ٹرمینس اور زیادہ تر لمبی دوری کی ٹرینوں کا نقطہ آغاز۔ 22+ روزانہ روانگیوں کے ساتھ سندھ کو پنجاب، خیبر پختونخوا اور بلوچستان سے جوڑتا ہے۔", facilities: ["ویٹنگ روم", "فوڈ کورٹ", "ATM", "پارکنگ"], image: karachiStationImg },
  { name: "راولپنڈی", slug: "rawalpindi", trains: 16, province: "پنجاب", gradient: "gradient-card-blue", desc: "اسلام آباد اور وفاقی دارالحکومت کا گیٹ وے۔ جڑواں شہروں جانے والے مسافروں کی خدمت کرتا ہے۔ خیبر میل اور عوام ایکسپریس سمیت تمام پشاور جانے والی ایکسپریس ٹرینوں کا اہم اسٹاپ۔", facilities: ["ویٹنگ روم", "فوڈ کورٹ", "ATM", "پارکنگ"], image: rawalpindiStationImg },
  { name: "ملتان کینٹ", slug: "multan-cantt", trains: 12, province: "پنجاب", gradient: "gradient-card-purple", desc: "جنوبی پنجاب میں ایک اہم جنکشن جو زرعی علاقے کی خدمت کرتا ہے۔ مسافروں کو کپاس کی پٹی سے کراچی اور لاہور دونوں سے جوڑتا ہے۔", facilities: ["ویٹنگ روم", "فوڈ کورٹ", "ATM", "وائی فائی"], image: multanStationImg },
  { name: "پشاور کینٹ", slug: "peshawar-cantt", trains: 8, province: "خیبر پختونخوا", gradient: "gradient-card-rose", desc: "پاکستان ریلوے کا شمالی ترین بڑا ٹرمینس۔ خیبر میل، عوام ایکسپریس اور تیزگام جیسی مشہور سروسز کا آخری اسٹاپ۔ خیبر پاس کا گیٹ وے۔", facilities: ["ویٹنگ روم", "فوڈ اسٹالز", "ATM"], image: peshawarStationImg },
  { name: "کوئٹہ", slug: "quetta", trains: 4, province: "بلوچستان", gradient: "gradient-card-teal", desc: "صوبہ بلوچستان کا دارالحکومت اور پاکستان کے ریل نیٹ ورک کا مغربی ستون۔ بولان پاس کے خوبصورت مناظر کے قریب واقع۔ جعفر ایکسپریس اور بولان میل چلتی ہیں۔", facilities: ["ویٹنگ روم", "فوڈ اسٹالز"], image: quettaStationImg },
];

export default function UrduHomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof trains>([]);
  const [showResults, setShowResults] = useState(false);
  const [stats, setStats] = useState<LiveStats>({ moving: 0, atStation: 0, total: 0, liveCount: 0 });
  const { stats: netStats } = useNetworkStats();

  useEffect(() => {
    const loadLive = async () => {
      try {
        const { stats: s } = await fetchLivePositions();
        setStats(s);
      } catch (e) { console.error(e); }
    };
    loadLive();
    const interval = setInterval(loadLive, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeTrains = useMemo(() => trains.filter(t => t.status === "active").slice(0, 6), []);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.length > 1) {
      setSearchResults(searchTrains(q).slice(0, 8));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <div>
      <SEOHead
        title="ٹریک مائی ٹرین — پاکستان ریلوے لائیو ٹرین ٹریکنگ اور GPS اسٹیٹس 2026"
        description="GPS کی درستگی کے ساتھ کسی بھی پاکستان ریلوے ٹرین کو ریئل ٹائم میں ٹریک کریں۔ 164+ ٹرینوں کی لائیو لوکیشن، رفتار، تاخیر الرٹس اور ETAs فوری طور پر چیک کریں۔ گرین لائن، تیزگام، قراقرم، خیبر میل — سب شامل ہیں۔ مفت، سائن اپ کی ضرورت نہیں۔"
        canonical="/ur"
        lang="ur"
        alternateEnglish="/"
        keywords="ٹرین ٹریکنگ پاکستان, پاکستان ریلوے لائیو ٹریکنگ, ٹرین کی لائیو لوکیشن, ریئل ٹائم ٹرین اسٹیٹس, پاکستان ریلوے GPS, ٹرین تلاش کریں, کراچی لاہور ٹرین, گرین لائن ایکسپریس, تیزگام ایکسپریس, ریلوے ٹائم ٹیبل 2026"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }]}
        faqSchema={faqs}
        additionalSchemas={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "ٹریک مائی ٹرین",
            "alternateName": "Track My Train",
            "url": "https://trackmytrain.pk/ur",
            "inLanguage": "ur",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
            "featureList": [
              "ہر 5 سیکنڈ میں ریئل ٹائم GPS ٹرین ٹریکنگ",
              "164+ ٹرینوں کے لیے لائیو تاخیر الرٹس اور ETAs",
              "342+ اسٹیشنز کا سفری منصوبہ ساز",
              "پاکستان ریلوے شیڈولز اور ٹائم ٹیبل 2026",
              "انگریزی اور اردو دونوں زبانوں میں دستیاب",
              "میری ٹرین تلاش کریں GPS آٹو ڈیٹیکشن فیچر",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ٹریک مائی ٹرین",
            "url": "https://trackmytrain.pk/ur",
            "inLanguage": "ur",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://trackmytrain.pk/ur/train?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <div className="absolute inset-0">
          <img src={heroTrainBg} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-[0.12]" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--hero-gradient-end)/0.9)]" />
        </div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[hsl(152_55%_40%/0.07)] blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-[hsl(43_74%_49%/0.05)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[hsl(152_60%_30%/0.06)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative container mx-auto px-4 py-14 sm:py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 bg-[hsl(152_55%_40%/0.15)] backdrop-blur-sm border border-[hsl(152_55%_40%/0.3)] rounded-full px-5 py-2.5 text-sm mb-7 shadow-lg shadow-[hsl(152_55%_40%/0.1)]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(152_55%_45%)] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[hsl(152_55%_45%)]" />
              </span>
              <span className="font-semibold tracking-wider text-[hsl(152_55%_45%)]">لائیو GPS ٹریکنگ • ہر 5 سیکنڈ میں اپڈیٹ</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 leading-[1.08] drop-shadow-sm">
              ٹریک مائی <span className="text-gradient-gold">ٹرین</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-medium opacity-90 mb-4">
              پاکستان کا نمبر 1 لائیو ریلوے GPS ٹریکر
            </p>
            <p className="text-sm sm:text-base md:text-lg opacity-80 max-w-2xl mx-auto mb-8 leading-relaxed">
              {netStats.totalTrains || "164"}+ پاکستان ریلوے ٹرینوں کو ریئل ٹائم میں ٹریک کریں۔ GPS درست پوزیشنز، لائیو رفتار، تاخیر الرٹس اور ہر اسٹیشن کے لیے ETAs — ہر 5 سیکنڈ میں اپڈیٹ۔ مفت، سائن اپ کی ضرورت نہیں۔
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <Link to="/ur/train">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 rounded-xl font-bold shadow-lg shadow-accent/25 px-7 text-base">
                  <Train className="w-5 h-5" /> لائیو ٹریکر کھولیں <ArrowRight className="w-4 h-4 rotate-180" />
                </Button>
              </Link>
              <Link to="/ur/find-my-train">
                <Button size="lg" variant="outline" className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 gap-2 rounded-xl font-semibold px-6">
                  <Navigation className="w-4 h-4" /> میری ٹرین تلاش کریں (GPS)
                </Button>
              </Link>
              <Link to="/ur/schedule">
                <Button size="lg" variant="outline" className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 gap-2 rounded-xl font-semibold px-6">
                  <Clock className="w-4 h-4" /> شیڈول دیکھیں
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center text-xs sm:text-sm opacity-75 mb-10">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[hsl(152_55%_50%)]" /> 100% مفت ہمیشہ</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[hsl(152_55%_50%)]" /> اکاؤنٹ کی ضرورت نہیں</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[hsl(152_55%_50%)]" /> 2G/3G پر کام کرتا ہے</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[hsl(152_55%_50%)]" /> انگریزی اور اردو</span>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              {[
                { value: stats.liveCount || stats.moving, label: "چل رہی ہیں", color: "text-emerald-400" },
                { value: stats.atStation, label: "اسٹیشن پر", color: "text-amber-400" },
                { value: stats.total, label: "کل ٹرینیں", color: "text-blue-400" },
              ].map((stat, i) => (
                <div key={i} className="bg-primary-foreground/8 backdrop-blur-sm rounded-xl p-3.5 text-center border border-primary-foreground/10 shadow-lg">
                  <div className={`text-2xl font-black stat-counter ${stat.color} tracking-tight`}>{stat.value || "—"}</div>
                  <div className="text-xs opacity-70 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEARCH SECTION ===== */}
      <section className="container mx-auto px-4 -mt-6 sm:-mt-8 relative z-10">
        <Card className="shadow-xl border-primary/10">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-1">کوئی بھی ٹرین تلاش کریں</h2>
            <p className="text-sm text-muted-foreground mb-4">نام، نمبر، یا روٹ درج کریں اور فوری طور پر ٹریکنگ شروع کریں</p>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="ٹرین کا نام یا نمبر تلاش کریں (مثلاً تیزگام، 7UP)..."
                className="pr-10 h-12 text-base text-right"
                onFocus={() => searchQuery.length > 1 && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-xl shadow-lg z-50 max-h-80 overflow-auto">
                  {searchResults.map((train) => (
                    <Link key={train.id} to={`/ur/train/${train.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-b last:border-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">#{train.id}</div>
                      <div className="min-w-0 flex-1 text-right">
                        <div className="font-medium text-sm truncate">{train.nameUrdu || train.name} {train.number}</div>
                        <div className="text-xs text-muted-foreground">{train.from} ← {train.to}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ===== GRADIENT FEATURE CARDS ===== */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            { gradient: "gradient-card-emerald", icon: Radio, badge: "لائیو", title: "لائیو ٹرین ٹریکر", desc: "پاکستان بھر کی تمام فعال ٹرینوں کو ریئل ٹائم GPS پوزیشنز، رفتار اور تاخیر کی معلومات کے ساتھ دیکھیں۔ نقشے پر 5 سیکنڈ اپڈیٹس کے ساتھ ٹرینوں کو حرکت کرتے دیکھیں۔", link: "/ur/train" },
            { gradient: "gradient-card-amber", icon: Clock, badge: "شیڈول", title: "ٹرین شیڈول اور ٹائم ٹیبل", desc: `تمام ${netStats.totalStations || 342}+ اسٹیشنز کے مکمل پاکستان ریلوے ٹائم ٹیبلز روانگی اور آمد کے اوقات کے ساتھ۔ تازہ ترین شیڈول تبدیلیوں کے ساتھ روزانہ اپڈیٹ۔`, link: "/ur/schedule" },
            { gradient: "gradient-card-blue", icon: Navigation, badge: "GPS", title: "میری ٹرین تلاش کریں (GPS)", desc: "پہلے سے ٹرین میں ہیں؟ اپنے فون کا GPS استعمال کریں تاکہ خود بخود پتا چل جائے کہ آپ کس ٹرین میں ہیں۔ اسٹیشن پر انتظار کرنے والے خاندان کے ساتھ اپنی لائیو لوکیشن شیئر کریں۔", link: "/ur/find-my-train" },
            { gradient: "gradient-card-purple", icon: Route, badge: "روٹس", title: "سفری منصوبہ ساز", desc: "کسی بھی دو اسٹیشنوں کے درمیان روٹس، اسٹاپس، سفر کے اوقات اور کرائے کی کلاسز کا موازنہ کریں۔ اپنے شیڈول اور بجٹ کے مطابق بہترین ٹرین تلاش کریں۔", link: "/ur/planner" },
            { gradient: "gradient-card-rose", icon: Bell, badge: "تاخیر", title: "ٹرین تاخیر چیک کریں", desc: "ہر پاکستان ریلوے ٹرین کی ریئل ٹائم تاخیر مانیٹرنگ۔ جمع شدہ تاخیر منٹوں میں دیکھیں، ایڈجسٹ شدہ ETAs حاصل کریں، اور اسٹیشن جانے سے پہلے معلومات حاصل کریں۔", link: "/ur/check-delays" },
            { gradient: "gradient-card-teal", icon: Map, badge: "اسٹیشنز", title: "اسٹیشنز ڈائریکٹری", desc: `${netStats.totalStations || 342}+ پاکستان ریلوے اسٹیشنز کی تلاش کریں۔ اردو نام، GPS کوآرڈینیٹس، منسلک ٹرینیں اور پلیٹ فارم سہولیات کے ساتھ مکمل اسٹیشن گائیڈ۔`, link: "/ur/stations" },
          ].map((card, i) => (
            <Link key={i} to={card.link}>
              <Card className={`${card.gradient} border hover-lift group h-full cursor-pointer`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <card.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">{card.badge}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 rotate-180" /> کھولیں
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== TOP EXPRESS TRAINS ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">مقبول ترین ایکسپریس ٹرینیں</p>
            <h2 className="text-2xl sm:text-3xl font-black">
              پاکستان کی <span className="text-gradient-gold">مشہور ایکسپریس ٹرینیں</span> — لائیو ٹریک کریں
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-3xl mx-auto leading-relaxed">
              تاریخی تیزگام سے لے کر پریمیم گرین لائن ایکسپریس تک، یہ پاکستان ریلوے نیٹ ورک کی سب سے زیادہ تلاش کی جانے والی اور سب سے زیادہ سواری کی جانے والی ایکسپریس ٹرینیں ہیں۔
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topTrains.map((train, i) => (
              <Link key={i} to={train.link}>
                <Card className={`${train.gradient} border hover-lift group h-full cursor-pointer overflow-hidden`}>
                  <img src={train.image} alt={train.nameEn} width={640} height={512} loading="lazy" decoding="async" className="w-full h-40 object-cover" />
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <train.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{train.badge}</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">{train.number}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{train.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span>{train.route}</span>
                      <span className="text-border">•</span>
                      <span>{train.duration}</span>
                      <span className="text-border">•</span>
                      <span>{train.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{train.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-4 h-4 rotate-180" /> لائیو ٹریک کریں
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/ur/express-trains"><Button variant="outline" className="rounded-xl gap-2"><Zap className="w-4 h-4" /> تمام ایکسپریس ٹرینیں دیکھیں</Button></Link>
          </div>
        </div>
      </section>

      {/* ===== LIVE TRAINS NOW ===== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <p className="text-xs font-bold text-primary tracking-wider mb-1">ریئل ٹائم ڈیٹا</p>
              <h2 className="text-xl sm:text-2xl font-black"><span className="text-gradient-green">فعال</span> ٹرینیں ابھی</h2>
              <p className="text-sm text-muted-foreground">ہر 5 سیکنڈ میں اپڈیٹ — ابھی پاکستان بھر میں چلنے والی ٹرینیں</p>
            </div>
            <Link to="/ur/train" className="text-sm text-primary font-medium hover:underline flex items-center gap-1 shrink-0">
              <ArrowRight className="w-4 h-4 rotate-180" /> تمام دیکھیں
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {activeTrains.map((train) => (
              <Link key={train.id} to={`/ur/train/${train.id}`}>
                <Card className="hover:shadow-lg hover:border-primary/30 transition-all group h-full hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary live-pulse" /> لائیو
                      </span>
                      <span className="text-xs text-muted-foreground">#{train.id}</span>
                    </div>
                    <h3 className="font-bold group-hover:text-primary transition-colors">{train.nameUrdu || train.name} {train.number}</h3>
                    <p className="text-sm text-muted-foreground">{train.from} ← {train.to}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {train.departureTime}</span>
                      <span>• {train.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/ur/train"><Button variant="outline" className="rounded-xl">تمام لائیو ٹرینیں دیکھیں</Button></Link>
          </div>
        </div>
      </section>

      {/* ===== MAJOR RAILWAY STATIONS ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">بڑے ریلوے اسٹیشنز</p>
            <h2 className="text-2xl sm:text-3xl font-black">
              پاکستان کے <span className="text-gradient-gold">مصروف ترین ریلوے اسٹیشنز</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-3xl mx-auto leading-relaxed">
              پاکستان کے اہم ترین ریلوے اسٹیشنز دریافت کریں۔ ہر اسٹیشن کا صفحہ لائیو ٹرین آمد، روانگی شیڈول، پلیٹ فارم سہولیات، GPS کوآرڈینیٹس، اور قریبی سہولیات دکھاتا ہے۔
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {majorStations.map((station, i) => (
              <Link key={i} to={`/ur/stations/${station.slug}`}>
                <Card className={`${station.gradient} border hover-lift group h-full cursor-pointer overflow-hidden`}>
                  <img src={station.image} alt={station.name} width={640} height={512} loading="lazy" decoding="async" className="w-full h-36 object-cover" />
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <Landmark className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{station.trains}+ ٹرینیں</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{station.province}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{station.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{station.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {station.facilities.slice(0, 4).map((f) => (
                        <span key={f} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{f}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/ur/stations"><Button variant="outline" className="rounded-xl gap-2"><Landmark className="w-4 h-4" /> تمام {netStats.totalStations || 342}+ اسٹیشنز دیکھیں</Button></Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-bold text-primary tracking-wider mb-2">ہم کیوں بہتر ہیں</p>
          <h2 className="text-2xl sm:text-3xl font-black">
            ٹریک مائی ٹرین کو <span className="text-gradient-gold">مختلف</span> کیا بناتا ہے
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">ہم نے ٹریک مائی ٹرین کو شروع سے پاکستانی مسافروں کے لیے بنایا — ہر فیچر اس ایک سوال کا جواب دینے کے لیے ڈیزائن کیا گیا ہے: "میری ٹرین ابھی کہاں ہے؟"</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: Wifi, gradient: "gradient-card-emerald", title: "GPS تصدیق شدہ پوزیشنز", desc: "ہمارے نقشے پر ہر نقطہ تصدیق شدہ GPS کوآرڈینیٹ سے آتا ہے — اندازہ یا تخمینہ نہیں۔ ہم روٹ جیومیٹری کے خلاف پوزیشنز کراس چیک کرتے ہیں اور غلط ڈیٹا کو ہٹا دیتے ہیں۔" },
            { icon: Gauge, gradient: "gradient-card-amber", title: "ذہین تاخیر انجن", desc: "ہمارا تاخیر انجن ٹرین کی موجودہ رفتار، آنے والے شیڈولڈ اسٹاپس، اور تاریخی سست زونز کو مدنظر رکھتا ہے تاکہ ETAs عام طور پر ±3-5 منٹ تک درست ہوں۔" },
            { icon: Globe, gradient: "gradient-card-blue", title: "مکمل نیٹ ورک کوریج", desc: "مین لائن 1 (کراچی-پشاور) سے لے کر بولان میل کوریڈور اور پنجاب و سندھ کی برانچ لائنز تک — اگر پاکستان ریلوے چلاتا ہے تو ہم ٹریک کرتے ہیں۔" },
            { icon: Shield, gradient: "gradient-card-purple", title: "صفر ڈیٹا جمع کرنا", desc: "ہم آپ کا ای میل، فون نمبر، یا لوکیشن ہسٹری نہیں مانگتے۔ کوئی پریمیم ٹیئر نہیں، کوئی پے وال نہیں۔ سائٹ کھولیں، ٹرین ٹریک کریں، ٹیب بند کریں — بس۔" },
            { icon: Navigation, gradient: "gradient-card-rose", title: "آٹو ڈیٹیکٹ میری ٹرین", desc: "پہلے سے ٹرین میں ہیں لیکن ٹرین نمبر معلوم نہیں؟ لوکیشن ایکسیس دیں اور 'میری ٹرین تلاش کریں' آپ کے GPS کو قریب ترین فعال روٹ سے میچ کرے گا۔" },
            { icon: Globe, gradient: "gradient-card-teal", title: "انگریزی اور اردو انٹرفیس", desc: "اسٹیشن کے نام، ٹرین کے نام، اور سرچ انگریزی اور اردو دونوں میں کام کرتے ہیں۔ چاہے آپ 'Lahore' ٹائپ کریں یا 'لاہور'، آپ کو جو تلاش ہے وہ مل جائے گا۔" },
          ].map((feature, i) => (
            <Card key={i} className={`${feature.gradient} border hover-lift group`}>
              <CardContent className="p-5 sm:p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">یہ کیسے کام کرتا ہے</p>
            <h2 className="text-2xl sm:text-3xl font-black">کوئی بھی ٹرین <span className="text-gradient-gold">تین آسان مراحل</span> میں ٹریک کریں</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: "1", gradient: "gradient-card-emerald", title: "تلاش یا براؤز کریں", desc: "سرچ بار میں ٹرین کا نام، نمبر، یا روٹ ٹائپ کریں — یا مکمل لائیو ٹرینز لسٹ براؤز کریں۔ نتائج فوری طور پر لائیو/آف لائن بیجز کے ساتھ ظاہر ہوتے ہیں۔" },
              { step: "2", gradient: "gradient-card-amber", title: "لائیو پوزیشن اور تاخیر دیکھیں", desc: "کسی بھی ٹرین پر ٹیپ کریں اور اس کی GPS پوزیشن انٹرایکٹو نقشے پر دیکھیں۔ موجودہ رفتار، تاخیر منٹوں میں، اور روٹ کے ساتھ پروگریس بار ہر 5 سیکنڈ میں ریفریش ہوتا ہے۔" },
              { step: "3", gradient: "gradient-card-blue", title: "ETAs چیک کریں اور شیئر کریں", desc: "ہر آنے والے اسٹاپ کے لیے اپڈیٹ شدہ ETAs دیکھیں۔ اسٹیشن پر انتظار کرنے والے خاندان کے ساتھ لنک شیئر کریں تاکہ وہ بھی لائیو ٹریکنگ دیکھ سکیں۔" },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group text-center`}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground mx-auto mb-4 flex items-center justify-center text-2xl font-bold transition-transform duration-300 group-hover:scale-110">{item.step}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KEY STATS BANNER ===== */}
      <section className="bg-hero-gradient text-primary-foreground py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { value: `${netStats.totalTrains || 164}+`, label: "روزانہ ٹرینیں ٹریک", desc: "ایکسپریس، میل، پیسنجر اور AC" },
              { value: "100K+", label: "ماہانہ فعال صارفین", desc: "ہزاروں مسافروں کا اعتماد" },
              { value: `${netStats.totalStations || 342}+`, label: "اسٹیشنز کوریج", desc: "ملک بھر مکمل کوریج" },
              { value: "24/7", label: "لائیو GPS اپڈیٹس", desc: "ہر 5 سیکنڈ میں ریئل ٹائم" },
            ].map((s, i) => (
              <div key={i} className="hover-lift cursor-default">
                <div className="text-3xl sm:text-4xl font-black text-gradient-gold">{s.value}</div>
                <div className="text-sm font-semibold mt-1">{s.label}</div>
                <div className="text-xs opacity-70 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRAVEL ESSENTIALS ===== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">مسافروں کے لیے ضروری معلومات</p>
            <h2 className="text-2xl sm:text-3xl font-black">پاکستان میں ٹرین سے سفر کرنے سے <span className="text-gradient-gold">پہلے</span> جان لیں</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: FileText, gradient: "gradient-card-emerald", title: "ضروری دستاویزات", items: ["بالغوں کے لیے CNIC (کمپیوٹرائزڈ شناختی کارڈ)", "18 سال سے کم بچوں کے لیے B-فارم یا والدین کا CNIC", "غیر ملکی شہریوں کے لیے پاسپورٹ", "پرنٹ شدہ یا ڈیجیٹل ای ٹکٹ", "25% رعایت کے لیے طالب علم شناختی کارڈ", "50% رعایت کے لیے معذوری سرٹیفکیٹ"] },
              { icon: Clock, gradient: "gradient-card-amber", title: "آمد اور ٹائمنگ گائیڈ", items: ["ایکسپریس ٹرینوں کے لیے 30-45 منٹ پہلے پہنچیں", "عید اور تعطیلات میں 1 گھنٹہ پہلے", "مقامی پیسنجر سروسز کے لیے 15-20 منٹ", "گھر سے نکلنے سے پہلے لائیو تاخیر چیک کریں", "پلیٹ فارم نمبر اسٹیشن بورڈز پر دکھایا جاتا ہے", "رات کی ٹرینیں: حفاظت کے لیے اضافی وقت رکھیں"] },
              { icon: Shield, gradient: "gradient-card-blue", title: "حفاظت اور آرام کے ٹپس", items: ["قیمتی چیزیں محفوظ رکھیں، سامان پر تالے لگائیں", "لمبے سفروں کے لیے پانی اور ناشتہ ساتھ رکھیں", "AC کوچز ٹھنڈے ہو سکتے ہیں — ہلکی شال ساتھ رکھیں", "بورڈنگ سے پہلے ڈیوائسز چارج کریں", "خاندان کو لوکیشن شیئر کرنے کے لیے ٹریک مائی ٹرین استعمال کریں", "ایمرجنسی ہیلپ لائن: 117 (24/7 دستیاب)"] },
              { icon: CreditCard, gradient: "gradient-card-purple", title: "کرایہ اور رعایت گائیڈ", items: ["اکانومی: 300-1,500 روپے (مختصر سے لمبی دوری)", "AC سٹینڈرڈ: 1,000-5,000 روپے", "AC بزنس: 3,000-9,000 روپے (پریمیم ٹرینیں)", "طلبہ: کالج ID کے ساتھ 25% رعایت", "بزرگ شہری (60+): CNIC کے ساتھ 25% رعایت", "3 سال سے کم بچے: مفت سفر (بغیر سیٹ)"] },
              { icon: MapPin, gradient: "gradient-card-rose", title: "اسٹیشن سہولیات", items: ["بڑے اسٹیشنز: AC ویٹنگ روم، فوڈ کورٹ، ATM", "درمیانے اسٹیشنز: بنیادی ویٹنگ ایریا، ٹکٹ کاؤنٹر", "چھوٹے اسٹاپس: پلیٹ فارم شیلٹر اور پانی کا نل", "لاہور جنکشن: VIP لاؤنج، وائی فائی، طبی امداد", "زیادہ تر اسٹیشنز پر خواتین کے لیے الگ ویٹنگ", "تمام بڑے اسٹیشنز پر پارکنگ دستیاب"] },
              { icon: Gauge, gradient: "gradient-card-teal", title: "ٹرین کی اقسام", items: ["ایکسپریس: تیز ترین، کم اسٹاپس، AC + اکانومی", "میل: ایکسپریس جیسی، روایتی نام", "پیسنجر: ہر اسٹاپ پر رکنے والی مقامی سروس", "AC صرف: پریمیم گرین لائن، بزنس ایکسپریس", "فریٹ: صرف کارگو، ہمارے پلیٹ فارم پر ٹریک نہیں ہوتی", "خصوصی: عید/تعطیلات کی اضافی ٹرینیں (موسمی)"] },
            ].map((card, i) => (
              <Card key={i} className={`${card.gradient} border hover-lift group`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <card.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm">{card.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR ROUTES ===== */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">مقبول کوریڈورز</p>
            <h2 className="text-2xl sm:text-3xl font-black">پاکستان میں سب سے زیادہ <span className="text-gradient-gold">تلاش کیے جانے والے</span> ٹرین روٹس</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">یہ وہ روٹس ہیں جو مسافر سب سے زیادہ تلاش کرتے ہیں۔ ہر کوریڈور پر اکانومی، AC سٹینڈرڈ، AC بزنس، اور سلیپر کلاسز کے ساتھ متعدد روزانہ ٹرینیں چلتی ہیں۔</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {popularRoutes.map((route, i) => (
              <Card key={i} className="hover-lift group border overflow-hidden">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-primary">{route.from}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground rotate-180" />
                    <span className="font-bold text-primary">{route.to}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">مدت: {route.duration}</p>
                  <p className="text-sm text-muted-foreground mb-3">کرایہ: {route.fare}</p>
                  <div className="flex flex-wrap gap-1">
                    {route.trains.map((t) => (
                      <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/ur/routes"><Button variant="outline" className="rounded-xl">تمام روٹس دیکھیں</Button></Link>
          </div>
        </div>
      </section>

      {/* ===== NETWORK OVERVIEW ===== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">نیٹ ورک کا جائزہ</p>
            <h2 className="text-2xl sm:text-3xl font-black">
              پاکستان ریلوے نیٹ ورک — <span className="text-gradient-gold">اہم حقائق اور اعداد</span> 2026
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-3xl mx-auto leading-relaxed">
              پاکستان ریلوے جنوبی ایشیا کے سب سے بڑے ریل نیٹ ورکس میں سے ایک چلاتا ہے، جو کراچی سے پشاور اور کوئٹہ سے سیالکوٹ تک بڑے شہروں کو جوڑتا ہے۔
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { value: "7,791 کلومیٹر", label: "کل ٹریک کی لمبائی", desc: "چاروں صوبوں اور آزاد کشمیر میں پھیلا ہوا", icon: Route, gradient: "gradient-card-emerald" },
              { value: "1,228 کلومیٹر", label: "سب سے لمبا کوریڈور", desc: "مین لائن 1: کراچی کینٹ سے پشاور کینٹ", icon: Train, gradient: "gradient-card-amber" },
              { value: "70M+", label: "سالانہ مسافر", desc: "ہر سال 70 ملین سے زیادہ مسافر سفر", icon: Users, gradient: "gradient-card-blue" },
              { value: "1855", label: "قائم ہونے کا سال", desc: "سندھ ریلوے نے پاکستان کی پہلی لائن 1855 میں کھولی", icon: Landmark, gradient: "gradient-card-purple" },
            ].map((stat, i) => (
              <Card key={i} className={`${stat.gradient} border hover-lift`}>
                <CardContent className="p-4 sm:p-5">
                  <stat.icon className="w-7 h-7 text-primary mb-2" />
                  <div className="text-xl sm:text-2xl font-black">{stat.value}</div>
                  <div className="text-sm font-semibold mt-1">{stat.label}</div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{stat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Railway Divisions */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-4 text-center">پاکستان ریلوے آپریشنل ڈویژنز</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: "لاہور ڈویژن", hq: "لاہور", stations: "150+", coverage: "وسطی اور شمالی پنجاب", gradient: "gradient-card-emerald" },
                { name: "کراچی ڈویژن", hq: "کراچی", stations: "120+", coverage: "سندھ ساحلی اور جنوبی", gradient: "gradient-card-amber" },
                { name: "راولپنڈی ڈویژن", hq: "راولپنڈی", stations: "80+", coverage: "اسلام آباد دارالحکومت اور شمالی", gradient: "gradient-card-blue" },
                { name: "ملتان ڈویژن", hq: "ملتان", stations: "95+", coverage: "جنوبی پنجاب اور ڈی جی خان", gradient: "gradient-card-purple" },
                { name: "سکھر ڈویژن", hq: "سکھر", stations: "85+", coverage: "بالائی سندھ اور جیکب آباد", gradient: "gradient-card-rose" },
                { name: "کوئٹہ ڈویژن", hq: "کوئٹہ", stations: "55+", coverage: "بلوچستان اور بولان کوریڈور", gradient: "gradient-card-teal" },
              ].map((div, i) => (
                <Card key={i} className={`${div.gradient} border`}>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-sm">{div.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">ہیڈ کوارٹرز: {div.hq} • {div.stations} اسٹیشنز</p>
                    <p className="text-xs text-muted-foreground">{div.coverage}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQs ===== */}
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
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5 shadow-sm hover:shadow-md transition-shadow">
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

      {/* ===== CTA ===== */}
      <section className="relative bg-hero-gradient text-primary-foreground py-14 sm:py-20 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[hsl(152_55%_40%/0.08)] blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[hsl(43_74%_49%/0.06)] blur-3xl" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">ابھی اپنی ٹرین ٹریک کریں</h2>
          <p className="opacity-85 mb-8 max-w-xl mx-auto text-base sm:text-lg">
            {netStats.totalTrains || "164"}+ پاکستان ریلوے ٹرینوں کو مفت میں ریئل ٹائم GPS کے ساتھ ٹریک کریں۔ کوئی سائن اپ نہیں، کوئی ایپ ڈاؤنلوڈ نہیں۔
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/ur/train">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-bold gap-2 shadow-lg shadow-accent/20 px-8">
                <Navigation className="w-5 h-5" /> لائیو ٹرینیں دیکھیں
              </Button>
            </Link>
            <Link to="/ur/planner">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl font-bold gap-2 px-8">
                <Route className="w-5 h-5" /> سفر کا منصوبہ بنائیں
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Language switch */}
      <div className="bg-card border-t py-5 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Globe className="w-4 h-4" />
          <span>This page is available in English:</span>
          <Link to="/" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
            Switch to English →
          </Link>
        </div>
      </div>
    </div>
  );
}
