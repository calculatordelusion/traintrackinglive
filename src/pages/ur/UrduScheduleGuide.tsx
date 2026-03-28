import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Clock, Train, MapPin, Zap, Navigation, Calendar, CheckCircle2,
  HelpCircle, AlertTriangle, Star, ChevronLeft, Info, Shield, Sun, Moon,
  CloudFog, Snowflake, Sunrise, Timer, Route
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroTrainBg from "@/assets/hero-train-bg.webp";

const majorTrainSchedules = [
  { name: "گرین لائن ایکسپریس", number: "5UP / 6DN", from: "کراچی کینٹ", to: "مارگلہ (اسلام آباد)", type: "اے سی پریمیم", departure: "16:00", arrival: "10:00", duration: "18 گھنٹے", days: "روزانہ", stops: 12, highlight: true },
  { name: "تیزگام", number: "7UP / 8DN", from: "کراچی کینٹ", to: "راولپنڈی", type: "ایکسپریس", departure: "07:00 / 21:00", arrival: "05:50 / 19:50", duration: "22 گھنٹے 50 منٹ", days: "روزانہ", stops: 18, highlight: true },
  { name: "خیبر میل", number: "1UP / 2DN", from: "کراچی کینٹ", to: "پشاور کینٹ", type: "ایکسپریس", departure: "15:25 / 08:00", arrival: "21:55 / 14:30", duration: "30 گھنٹے 30 منٹ", days: "روزانہ", stops: 25, highlight: false },
  { name: "شالیمار ایکسپریس", number: "27UP / 28DN", from: "کراچی کینٹ", to: "لاہور جنکشن", type: "اے سی پریمیم", departure: "15:30", arrival: "11:30", duration: "20 گھنٹے", days: "روزانہ", stops: 14, highlight: true },
  { name: "پاک بزنس ایکسپریس", number: "33UP / 34DN", from: "کراچی کینٹ", to: "لاہور جنکشن", type: "اے سی پریمیم", departure: "19:00 / 17:00", arrival: "14:00 / 12:00", duration: "19 گھنٹے", days: "روزانہ", stops: 10, highlight: true },
  { name: "کراکرم ایکسپریس", number: "41UP / 42DN", from: "کراچی کینٹ", to: "لاہور جنکشن", type: "ایکسپریس", departure: "15:30 / 10:00", arrival: "12:30 / 07:00", duration: "21 گھنٹے", days: "روزانہ", stops: 16, highlight: false },
  { name: "پاکستان ایکسپریس", number: "45UP / 46DN", from: "کراچی کینٹ", to: "راولپنڈی", type: "ایکسپریس", departure: "06:00 / 15:30", arrival: "05:30 / 15:00", duration: "23 گھنٹے 30 منٹ", days: "روزانہ", stops: 20, highlight: false },
  { name: "علامہ اقبال ایکسپریس", number: "9UP / 10DN", from: "کراچی کینٹ", to: "سیالکوٹ جنکشن", type: "ایکسپریس", departure: "08:30 / 17:30", arrival: "10:00 / 19:00", duration: "25 گھنٹے 30 منٹ", days: "روزانہ", stops: 22, highlight: false },
  { name: "ہزارہ ایکسپریس", number: "11UP / 12DN", from: "کراچی سٹی", to: "ہویلیاں", type: "ایکسپریس", departure: "18:00 / 02:00", arrival: "23:00 / 07:00", duration: "29 گھنٹے", days: "روزانہ", stops: 24, highlight: false },
  { name: "عوام ایکسپریس", number: "13UP / 14DN", from: "کراچی کینٹ", to: "پشاور کینٹ", type: "ایکسپریس", departure: "06:00 / 10:00", arrival: "16:00 / 20:00", duration: "34 گھنٹے", days: "روزانہ", stops: 30, highlight: false },
  { name: "ملت ایکسپریس", number: "17UP / 18DN", from: "کراچی کینٹ", to: "لالہ موسیٰ جنکشن", type: "ایکسپریس", departure: "20:00 / 11:00", arrival: "16:00 / 07:00", duration: "20 گھنٹے", days: "روزانہ", stops: 18, highlight: false },
  { name: "فرید ایکسپریس", number: "37UP / 38DN", from: "کراچی سٹی", to: "لاہور جنکشن", type: "ایکسپریس", departure: "22:30 / 22:00", arrival: "19:30 / 19:00", duration: "21 گھنٹے", days: "روزانہ", stops: 16, highlight: false },
];

const shortRouteSchedules = [
  { name: "سبک خرام", number: "103UP / 104DN", route: "لاہور ← راولپنڈی", duration: "4 گھنٹے 30 منٹ", departure: "08:00 / 14:30", days: "روزانہ" },
  { name: "اسلام آباد ایکسپریس", number: "107UP / 108DN", route: "لاہور ← راولپنڈی", duration: "4 گھنٹے 30 منٹ", departure: "22:30 / 23:00", days: "روزانہ" },
  { name: "مہر ایکسپریس", number: "127UP / 128DN", route: "ملتان ← راولپنڈی", duration: "10 گھنٹے 30 منٹ", departure: "20:30 / 19:00", days: "روزانہ" },
  { name: "تھل ایکسپریس", number: "129UP / 130DN", route: "ملتان ← راولپنڈی", duration: "10 گھنٹے", departure: "07:00", days: "روزانہ" },
  { name: "موسیٰ پاک ایکسپریس", number: "115UP", route: "ملتان ← لاہور", duration: "5 گھنٹے 30 منٹ", departure: "06:00", days: "روزانہ" },
  { name: "بہاؤالدین زکریا ایکسپریس", number: "25UP / 26DN", route: "کراچی ← ملتان", duration: "16 گھنٹے", departure: "19:00", days: "روزانہ" },
  { name: "میانوالی ایکسپریس", number: "147UP", route: "ماری اندس ← لاہور", duration: "11 گھنٹے", departure: "05:00", days: "روزانہ" },
  { name: "مہران ایکسپریس", number: "149UP", route: "کراچی ← میرپور خاص", duration: "4 گھنٹے", departure: "07:30", days: "روزانہ" },
];

const seasonalInfo = [
  { season: "بہار (مارچ–مئی)", icon: Sun, conditions: "سفر کے لیے بہترین موسم۔ خوشگوار درجہ حرارت۔ کم سے کم تاخیر۔ شمالی علاقوں کا سیاحتی سیزن۔ ہویلیاں/ہزارہ روٹ کی ٹرینوں کی بکنگ 7-10 دن پہلے کرائیں۔", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { season: "گرمی (جون–اگست)", icon: Sunrise, conditions: "شدید گرمی (سندھ/پنجاب میں 40°C+)۔ اے سی ٹرینوں میں بھاری بکنگ۔ جولائی–اگست میں مانسون بارشوں سے سندھ میں رکاوٹیں ممکن۔ اے سی کلاسز کی بکنگ 15-20 دن پہلے کرائیں۔", color: "text-amber-500", bg: "bg-amber-500/10" },
  { season: "خزاں (ستمبر–نومبر)", icon: Star, conditions: "بہترین سفری موسم۔ معتدل درجہ حرارت۔ سال کی سب سے کم تاخیر۔ عید میلاد النبیؐ کے موقع پر مانگ بڑھ سکتی ہے۔", color: "text-blue-500", bg: "bg-blue-500/10" },
  { season: "سردی (دسمبر–فروری)", icon: CloudFog, conditions: "پنجاب میں شدید دھند سے 2-8 گھنٹے تاخیر، خاص طور پر صبح کی ٹرینوں میں۔ پاکستان ریلوے نظرثانی شدہ 'دھند شیڈول' چلاتا ہے۔ دوپہر کی ٹرینیں زیادہ قابل اعتماد ہیں۔ سفر سے پہلے لائیو ٹریکنگ ضرور دیکھیں۔", color: "text-purple-500", bg: "bg-purple-500/10" },
];

const routeCorridors = [
  { name: "مین لائن 1 (ML-1)", route: "کراچی ← لاہور ← پشاور", distance: "1,726 کلومیٹر", trains: "40+ ٹرینیں", desc: "پاکستان کا ریڑھ کی ہڈی ریل راہداری۔ تمام ریل ٹریفک کا 75% اٹھاتا ہے۔ سندھ، پنجاب اور خیبرپختونخوا کو جوڑتا ہے۔ سی پیک کے تحت اپ گریڈ ہو رہا ہے۔" },
  { name: "کراچی ← لاہور راہداری", route: "بذریعہ حیدرآباد، سکھر، ملتان، ساہیوال", distance: "1,230 کلومیٹر", trains: "15+ روزانہ ٹرینیں", desc: "سب سے مقبول روٹ۔ گرین لائن (18 گھنٹے)، پاک بزنس (19 گھنٹے)، اور شالیمار (20 گھنٹے) سب سے تیز ہیں۔ تیزگام 22 گھنٹے 50 منٹ لیتی ہے۔" },
  { name: "لاہور ← راولپنڈی راہداری", route: "بذریعہ گوجرانوالہ، جہلم، گوجر خان", distance: "288 کلومیٹر", trains: "10+ روزانہ ٹرینیں", desc: "سب سے مصروف مختصر فاصلے کا روٹ۔ سبک خرام (4 گھنٹے 30 منٹ) اور اسلام آباد ایکسپریس بہترین انتخاب ہیں۔ متعدد روزانہ روانگیاں۔" },
  { name: "کراچی ← پشاور مکمل سفر", route: "بذریعہ سکھر، ملتان، لاہور، راولپنڈی", distance: "1,726 کلومیٹر", trains: "خیبر میل، عوام ایکسپریس", desc: "سب سے لمبا روٹ جو 30-34 گھنٹے لیتا ہے۔ خیبر میل تاریخی روزانہ سروس ہے جو برطانوی دور سے چل رہی ہے۔" },
  { name: "ملتان ← راولپنڈی راہداری", route: "بذریعہ لاہور یا بذریعہ سرگودھا", distance: "550-700 کلومیٹر", trains: "مہر، تھل ایکسپریس", desc: "دو روٹ کے اختیارات: بذریعہ لاہور (لمبا، زیادہ آپشنز) یا بذریعہ سرگودھا برانچ (چھوٹا، کم ٹرینیں)۔" },
];

const scheduleFaqs = [
  { q: "پاکستان ریلوے کا 2026 کا تازہ ترین ٹرین شیڈول کیا ہے؟", a: "پاکستان ریلوے 2026 میں 342+ اسٹیشنز پر 164+ ٹرینیں چلاتا ہے۔ مکمل ٹائم ٹیبل میں ایکسپریس، اے سی پریمیم، اور پیسنجر سروسز شامل ہیں۔ اہم روزانہ ٹرینوں میں گرین لائن (کراچی–اسلام آباد، 18 گھنٹے)، تیزگام (کراچی–راولپنڈی، 22 گھنٹے 50 منٹ)، شالیمار ایکسپریس (کراچی–لاہور، 20 گھنٹے)، اور پاک بزنس (کراچی–لاہور، 19 گھنٹے) شامل ہیں۔" },
  { q: "پاکستان ریلوے روزانہ کتنی ٹرینیں چلاتا ہے؟", a: "پاکستان ریلوے ملک بھر میں روزانہ تقریباً 80-90 ٹرینیں چلاتا ہے۔ ان میں 40+ ایکسپریس، 8-10 اے سی پریمیم ٹرینیں (گرین لائن، شالیمار، پاک بزنس)، اور 30+ پیسنجر/شٹل سروسز شامل ہیں۔" },
  { q: "گرین لائن ایکسپریس کراچی سے کتنے بجے روانہ ہوتی ہے؟", a: "گرین لائن ایکسپریس 5UP روزانہ کراچی کینٹ سے 16:00 (شام 4 بجے) روانہ ہوتی ہے اور اگلی صبح 10:00 بجے مارگلہ (اسلام آباد) پہنچتی ہے۔ واپسی کی سروس 6DN مارگلہ سے 15:00 (دوپہر 3 بجے) روانہ ہوتی ہے۔ سفر تقریباً 18 گھنٹے کا ہے۔" },
  { q: "تیزگام ایکسپریس کا شیڈول کیا ہے؟", a: "تیزگام 7UP روزانہ کراچی کینٹ سے 07:00 (صبح 7 بجے) روانہ ہوتی ہے اور اگلے دن 05:50 بجے راولپنڈی پہنچتی ہے۔ تیزگام 8DN راولپنڈی سے 21:00 (رات 9 بجے) روانہ ہوتی ہے۔ سفر 22 گھنٹے 50 منٹ کا ہے اور تقریباً 18 اسٹاپس ہیں۔" },
  { q: "لاہور سے راولپنڈی کون سی ٹرینیں چلتی ہیں؟", a: "اس روٹ پر متعدد روزانہ ٹرینیں چلتی ہیں: سبک خرام 103UP (روانگی 08:00، آمد 12:30، 4 گھنٹے 30 منٹ)، اسلام آباد ایکسپریس 107UP (روانگی 22:30، آمد 03:00)۔ یہ پاکستان کے مصروف ترین ریل راہداریوں میں سے ایک ہے۔" },
  { q: "2026 میں کراچی سے لاہور کی سب سے تیز ٹرین کون سی ہے؟", a: "کراچی سے لاہور کی سب سے تیز ٹرین گرین لائن ایکسپریس ہے جو تقریباً 18 گھنٹے لیتی ہے (اسلام آباد تک جاری رہتی ہے)۔ اگلے تیز ترین آپشنز: پاک بزنس ایکسپریس (19 گھنٹے)، شالیمار ایکسپریس (20 گھنٹے)، ملت ایکسپریس (20 گھنٹے)، کراکرم ایکسپریس (21 گھنٹے)۔" },
  { q: "کیا جمعے اور سرکاری تعطیلات میں ٹرینیں چلتی ہیں؟", a: "زیادہ تر ایکسپریس اور اے سی ٹرینیں جمعے سمیت روزانہ چلتی ہیں۔ عید الفطر اور عید الاضحی کے موقع پر پاکستان ریلوے خصوصی ٹرینیں اور اضافی ڈبے شامل کرتا ہے۔ شیڈول تبدیلیاں بڑی تعطیلات سے 1-2 ہفتے پہلے اعلان کی جاتی ہیں۔" },
  { q: "خیبر میل کا کراچی سے پشاور تک شیڈول کیا ہے؟", a: "خیبر میل 1UP روزانہ کراچی کینٹ سے 15:25 بجے روانہ ہوتی ہے اور اگلے دن 21:55 بجے پشاور کینٹ پہنچتی ہے — 30 گھنٹے 30 منٹ کا سفر جو 1,726 کلومیٹر کا فاصلہ طے کرتا ہے۔ تقریباً 25 اسٹاپس ہیں۔" },
  { q: "دھند کے موسم میں ٹرین شیڈول پر کیا اثر پڑتا ہے؟", a: "دسمبر سے فروری تک پنجاب میں شدید دھند سے نمایاں تاخیر ہوتی ہے — عام طور پر 2-8 گھنٹے۔ صبح کی ٹرینیں (05:00-10:00 روانگی) سب سے زیادہ متاثر ہوتی ہیں۔ دوپہر کی روانگیاں پنجاب کے اسٹیشنز سے زیادہ قابل اعتماد ہیں۔ سفر سے پہلے ہمیشہ لائیو ٹریکنگ چیک کریں۔" },
  { q: "UP اور DN ٹرین نمبروں میں کیا فرق ہے؟", a: "UP ٹرینیں جنوب سے شمال یا مغرب سے مشرق سفر کرتی ہیں (مثلاً کراچی ← پشاور)۔ DN (ڈاؤن) ٹرینیں الٹی سمت میں سفر کرتی ہیں۔ طاق نمبر والی ٹرینیں ہمیشہ UP اور جفت نمبر والی ہمیشہ DN ہوتی ہیں۔" },
  { q: "کیا رات کو سلیپر برتھ والی ٹرینیں دستیاب ہیں؟", a: "جی ہاں، زیادہ تر طویل فاصلے کی ایکسپریس ٹرینیں رات کی سروس کے طور پر چلتی ہیں۔ اے سی سلیپر کلاس گرین لائن، شالیمار، تیزگام اور کراکرم ایکسپریس پر بستر کے ساتھ برتھ فراہم کرتا ہے۔" },
  { q: "پاکستان ریلوے اپنا ٹائم ٹیبل کتنی بار اپڈیٹ کرتا ہے؟", a: "پاکستان ریلوے عام طور پر سال میں 1-2 بار بڑی ٹائم ٹیبل تبدیلیاں جاری کرتا ہے، عام طور پر گرمی اور سردی کے موسم سے پہلے۔ دھند کے موسم کے خصوصی ٹائم ٹیبل دسمبر–فروری میں چلتے ہیں۔ عید کی خصوصی ٹرینیں ہر عید سے 2-3 ہفتے پہلے اعلان کی جاتی ہیں۔" },
  { q: "کراچی سے لاہور کی سب سے سستی ٹرینیں کون سی ہیں؟", a: "عوام ایکسپریس (13UP) سب سے سستا آپشن ہے جس میں صرف اکانومی سیٹنگ ہے تقریباً 800-1,000 روپے۔ فرید ایکسپریس اور کراکرم ایکسپریس اکانومی کلاس 1,100-1,400 روپے میں 21 گھنٹوں میں۔ گرین لائن اکانومی تقریباً 1,500 روپے 18 گھنٹوں میں۔" },
  { q: "کون سی پاکستان ریلوے ٹرینوں میں اے سی ڈبے ہیں؟", a: "اے سی پریمیم ٹرینیں: گرین لائن ایکسپریس (5UP/6DN)، شالیمار ایکسپریس (27UP/28DN)، اور پاک بزنس ایکسپریس (33UP/34DN)۔ متعدد ایکسپریس ٹرینوں میں بھی اے سی سلیپر ڈبے ہیں: تیزگام، خیبر میل، کراکرم ایکسپریس، اور علامہ اقبال ایکسپریس۔" },
  { q: "ملتان سے راولپنڈی کون سی ٹرینیں چلتی ہیں؟", a: "اس روٹ کے لیے دو مخصوص ٹرینیں ہیں: مہر ایکسپریس (127UP، روانگی 20:30، 10 گھنٹے 30 منٹ) اور تھل ایکسپریس (129UP، روانگی 07:00، 10 گھنٹے)۔ مزید برآں، کراچی سے آنے والی بہت سی طویل فاصلے کی ٹرینیں دونوں شہروں سے گزرتی ہیں۔" },
  { q: "کیا آج کی ٹرین کی لائیو حالت دیکھ سکتے ہیں؟", a: "جی ہاں! ٹریک مائی ٹرین پاکستان ریلوے کی تمام چلتی ٹرینوں کی ریئل ٹائم GPS ٹریکنگ فراہم کرتا ہے۔ ٹریک مائی ٹرین پر جائیں اور انٹرایکٹو نقشے پر لائیو پوزیشنز، موجودہ رفتار، تاخیر کی حالت، اور تخمینی آمد کا وقت دیکھیں۔ کسی رجسٹریشن کی ضرورت نہیں۔" },
];

const proTips = [
  { tip: "سردیوں میں دوپہر کی روانگی استعمال کریں", detail: "صبح کی ٹرینیں پنجاب سے (دسمبر–فروری) 3-8 گھنٹے دھند کی تاخیر کا سامنا کرتی ہیں۔ لاہور/راولپنڈی سے 14:00 کے بعد روانہ ہونے والی ٹرینیں نمایاں طور پر زیادہ وقت پر ہوتی ہیں۔" },
  { tip: "گرین لائن کراچی–اسلام آباد کی تیز ترین ہے", detail: "18 گھنٹے میں گرین لائن تیزگام (22 گھنٹے 50 منٹ) اور خیبر میل (30 گھنٹے 30 منٹ) کو پیچھے چھوڑ دیتی ہے۔ یہ اے سی ڈبوں کے ساتھ سب سے جدید ٹرین بھی ہے۔" },
  { tip: "سبک خرام لاہور–راولپنڈی کے لیے بہترین ہے", detail: "صبح 08:00 بجے روانگی اور 12:30 بجے آمد کے ساتھ، یہ اس مصروف راہداری کا سب سے آسان دن کا آپشن ہے۔ 4 گھنٹے 30 منٹ کا سفر۔" },
  { tip: "عید کی ٹرینیں 30 دن پہلے بک کرائیں", detail: "عید الفطر اور عید الاضحی سے ہفتوں پہلے ٹرینیں بھر جاتی ہیں۔ پاکستان ریلوے 30 دن پہلے بکنگ کھولتا ہے — یاد دہانی سیٹ کریں۔" },
  { tip: "اسٹیشن جانے سے پہلے لائیو ٹریکنگ چیک کریں", detail: "ٹریک مائی ٹرین سے ریئل ٹائم تاخیر چیک کریں۔ دھند کے موسم میں پلیٹ فارم پر 4 گھنٹے انتظار کا کوئی فائدہ نہیں۔" },
  { tip: "فرید ایکسپریس رات کی روانگی کے لیے بہترین ہے", detail: "کراچی سے 22:30 بجے روانگی، اگلی شام 19:30 بجے لاہور پہنچتی ہے۔ اگر آپ رات کے سفر میں سونا پسند کرتے ہیں تو بہترین ہے۔" },
  { tip: "جعفر ایکسپریس شمالی سندھ سے KPK کے لیے", detail: "اگر آپ جیکب آباد/سکھر کے علاقے میں ہیں اور پشاور جانا ہے تو جعفر ایکسپریس کراچی واپس جائے بغیر 24 گھنٹے کا براہ راست رابطہ ہے۔" },
  { tip: "اے سی اسٹینڈرڈ گرین لائن پر بہترین ویلیو", detail: "اے سی اسٹینڈرڈ اے سی بزنس کے 80% آرام تقریباً 50% قیمت پر دیتا ہے۔ سب سے بڑا آرام کا فرق اکانومی سے اے سی اسٹینڈرڈ میں ہے۔" },
];

export default function UrduScheduleGuide() {
  return (
    <div>
      <SEOHead
        title="ریلوے شیڈول گائیڈ — سفری مشورے 2026"
        description="پاکستان ریلوے کا مکمل ٹائم ٹیبل 2026۔ 164+ ٹرینوں کی درست روانگی اور آمد کے اوقات۔ گرین لائن، تیزگام، خیبر میل شیڈول۔ روٹ راہداری، موسمی سفری تجاویز، اور لائیو ٹریکنگ۔"
        canonical="/ur/schedule-guide"
        lang="ur"
        alternateEnglish="/schedule-guide"
        keywords="ریلوے شیڈول گائیڈ اردو, ریلوے اوقات کار سمجھیں, موسمی تبدیلیاں ریلوے, عید اسپیشل ٹرینیں, ریلوے شیڈول پڑھنے کا طریقہ, سفری مشورے ریلوے, بہترین سفر وقت"
        breadcrumbs={[{ name: "ہوم", url: "/ur" }, { name: "شیڈول گائیڈ", url: "/ur/schedule-guide" }]}
        faqSchema={scheduleFaqs}
        additionalSchemas={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "پاکستان ریلوے ٹرین شیڈول اور ٹائم ٹیبل 2026 — مکمل گائیڈ",
          "url": "https://trackmytrain.pk/ur/schedule-guide",
          "inLanguage": "ur",
          "description": "پاکستان ریلوے ٹرین شیڈولز، ٹائم ٹیبلز، روٹس، اور موسمی سفری معلومات کی جامع گائیڈ 2026۔",
        }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground py-14 sm:py-20 md:py-24">
        <div className="absolute inset-0">
          <img src={heroTrainBg} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-10" width={1920} height={1080} />
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[hsl(152_55%_40%/0.08)] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[hsl(43_74%_49%/0.06)] blur-3xl" />
        <div className="relative container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/ur" className="opacity-70 hover:opacity-100">ہوم</Link>
            <span className="opacity-50">‹</span>
            <span>شیڈول گائیڈ</span>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2.5 bg-[hsl(152_55%_40%/0.15)] backdrop-blur-sm border border-[hsl(152_55%_40%/0.3)] rounded-full px-5 py-2.5 text-sm mb-6 shadow-lg shadow-[hsl(152_55%_40%/0.1)]">
              <Calendar className="w-4 h-4" /> آفیشل ٹائم ٹیبل • مارچ 2026 اپڈیٹ
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight drop-shadow-sm">
              پاکستان ریلوے <span className="text-gradient-gold">ٹرین شیڈول اور ٹائم ٹیبل</span> 2026
            </h1>
            <p className="text-base sm:text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              تمام 164+ پاکستان ریلوے ٹرینوں کی مکمل گائیڈ — درست روانگی اور آمد کے اوقات، چلنے کے دن، کوچ کلاسز، روٹ راہداری، موسمی رکاوٹیں، اور ماہر سفری تجاویز۔
            </p>
            <p className="opacity-60 text-sm mt-2">Pakistan Railways Train Schedule & Timetable 2026 — Complete Guide</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                <Link to="/ur/schedule">
                  <Train className="w-4 h-4 ml-2" /> مکمل ٹائم ٹیبل دیکھیں
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-bold">
                <Link to="/ur/train">
                  <Navigation className="w-4 h-4 ml-2" /> لائیو ٹرینیں ٹریک کریں
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer Box */}
      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-primary/30 bg-primary/5 max-w-4xl mx-auto">
            <CardContent className="p-5 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">فوری جواب: پاکستان ریلوے شیڈول کا خلاصہ</h2>
                  <p className="text-sm text-muted-foreground mt-1">2026 ٹائم ٹیبل کے اہم حقائق</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">164+ ٹرینیں</strong> <strong className="text-foreground">342+ اسٹیشنز</strong> پر</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">تیز ترین:</strong> گرین لائن ایکسپریس — 18 گھنٹے (کراچی–اسلام آباد)</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">طویل ترین:</strong> عوام ایکسپریس — 34 گھنٹے (کراچی–پشاور)</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">مختصر ترین:</strong> لاہور–راولپنڈی — 4 گھنٹے 30 منٹ (سبک خرام)</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">اے سی ٹرینیں:</strong> گرین لائن، شالیمار، پاک بزنس</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">سب سے مقبول:</strong> تیزگام — روزانہ، کراچی–راولپنڈی</span></div>
              </div>
              <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-xs text-muted-foreground">
                <Link to="/ur/schedule" className="flex items-center gap-1 text-primary font-semibold hover:underline"><Timer className="w-3.5 h-3.5" /> مکمل ٹائم ٹیبل ←</Link>
                <Link to="/ur/train" className="flex items-center gap-1 text-primary font-semibold hover:underline"><Navigation className="w-3.5 h-3.5" /> کوئی بھی ٹرین لائیو ٹریک کریں ←</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "164+", label: "کل ٹرینیں", icon: Train, gradient: "gradient-card-emerald" },
              { value: "342+", label: "اسٹیشنز", icon: MapPin, gradient: "gradient-card-amber" },
              { value: "80+", label: "روٹس", icon: Route, gradient: "gradient-card-blue" },
              { value: "1,726 کلومیٹر", label: "ML-1 طوالت", icon: Navigation, gradient: "gradient-card-purple" },
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
      </section>

      {/* Major Train Schedules Table */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">آفیشل ٹائم ٹیبل</p>
            <h2 className="text-2xl sm:text-3xl font-bold">اہم ایکسپریس اور اے سی ٹرین شیڈول</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              پاکستان کی سب سے مقبول طویل فاصلے کی ٹرینوں کی درست روانگی اور آمد کے اوقات۔ تمام اوقات پاکستان ریلوے کے آفیشل ٹائم ٹیبل سے ہیں۔
            </p>
          </div>
          <div className="max-w-6xl mx-auto overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-right py-3 px-3 font-medium">ٹرین</th>
                  <th className="text-right py-3 px-3 font-medium">نمبر</th>
                  <th className="text-right py-3 px-3 font-medium">روٹ</th>
                  <th className="text-right py-3 px-3 font-medium">روانگی</th>
                  <th className="text-right py-3 px-3 font-medium">آمد</th>
                  <th className="text-right py-3 px-3 font-medium">دورانیہ</th>
                  <th className="text-right py-3 px-3 font-medium">دن</th>
                  <th className="text-right py-3 px-3 font-medium">قسم</th>
                </tr>
              </thead>
              <tbody>
                {majorTrainSchedules.map((t, i) => (
                  <tr key={i} className={`border-b hover:bg-muted/50 transition-colors ${t.highlight ? "bg-primary/5" : ""}`}>
                    <td className="py-3 px-3">
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.stops} اسٹاپس</div>
                    </td>
                    <td className="py-3 px-3 text-xs font-mono text-muted-foreground">{t.number}</td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{t.from} ← {t.to}</td>
                    <td className="py-3 px-3 font-medium text-xs">{t.departure}</td>
                    <td className="py-3 px-3 font-medium text-xs">{t.arrival}</td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{t.duration}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">{t.days}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${t.type === "اے سی پریمیم" ? "bg-accent/15 text-accent-foreground" : "bg-primary/10 text-primary"}`}>
                        {t.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <Link to="/ur/schedule" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              مکمل ٹائم ٹیبل میں تمام 164+ ٹرینیں دیکھیں <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Short-Distance / Regional Trains */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">علاقائی سروسز</p>
            <h2 className="text-2xl sm:text-3xl font-bold">مختصر فاصلے اور علاقائی ٹرین شیڈول</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              مختصر روٹس کے لیے فوری حوالہ ٹائم ٹیبل — لاہور سے راولپنڈی، ملتان سروسز، اور سندھ علاقائی ٹرینیں۔
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {shortRouteSchedules.map((t, i) => (
              <Card key={i} className="border hover-lift">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm">{t.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{t.number}</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5 shrink-0">{t.duration}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.route}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.departure}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.days}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Route Corridors */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">اہم راہداریاں</p>
            <h2 className="text-2xl sm:text-3xl font-bold">پاکستان ریلوے روٹ راہداریاں</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              اہم ریل راہداریوں کو سمجھنا آپ کو صحیح ٹرین چننے میں مدد دیتا ہے۔ پاکستان کا 7,791 کلومیٹر ریل نیٹ ورک اس طرح منظم ہے۔
            </p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {routeCorridors.map((c, i) => (
              <Card key={i} className="border hover-lift">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Route className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className="font-bold text-sm">{c.name}</h3>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-[10px] font-bold bg-primary/10 text-primary rounded-full px-2 py-0.5">{c.distance}</span>
                          <span className="text-[10px] font-bold bg-accent/10 text-accent-foreground rounded-full px-2 py-0.5">{c.trains}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.route}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2">{c.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Travel Guide */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">سفری منصوبہ بندی</p>
            <h2 className="text-2xl sm:text-3xl font-bold">موسمی شیڈول رکاوٹیں اور سفری تجاویز</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              پاکستان ریلوے کے شیڈول موسم اور تعطیلات سے متاثر ہوتے ہیں۔ تاخیر سے بچنے کے لیے اس موسمی گائیڈ سے اپنا سفر پلان کریں۔
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {seasonalInfo.map((s, i) => (
              <Card key={i} className="border hover-lift">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                      <s.icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <h3 className="font-bold text-sm">{s.season}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.conditions}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">دھند کے موسم کا انتباہ (دسمبر–فروری):</strong> لاہور، فیصل آباد، ساہیوال اور ملتان سے صبح کی ٹرینوں میں 2-8 گھنٹے تاخیر ہوتی ہے۔ پاکستان ریلوے نظرثانی شدہ دھند ٹائم ٹیبل پر منتقل ہو جاتا ہے۔{" "}
                <Link to="/ur/check-delays" className="text-primary font-semibold hover:underline">لائیو تاخیر دیکھیں ←</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">ماہرانہ معلومات</p>
            <h2 className="text-2xl sm:text-3xl font-bold">پاکستان ریلوے شیڈول پڑھنے کی 8 ماہر تجاویز</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              باقاعدہ پاکستان ریلوے مسافروں کی عملی مشورے جو ٹائم ٹیبلز سمجھنے، صحیح ٹرین چننے، اور عام غلطیوں سے بچنے میں مدد کریں گے۔
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {proTips.map((t, i) => (
              <Card key={i} className="border hover-lift">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{t.tip}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.detail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Long-Form Content */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-sm max-w-none text-muted-foreground space-y-5">
            <h2 className="text-2xl font-bold text-foreground">2026 میں پاکستان ریلوے ٹرین شیڈول اور ٹائم ٹیبل کو سمجھنا</h2>

            <p className="text-base leading-relaxed">
              پاکستان ریلوے، جو 1861 میں برطانوی نوآبادیاتی دور میں قائم ہوئی، جنوبی ایشیا کے سب سے بڑے ریل نیٹ ورکس میں سے ایک چلاتی ہے۔ <strong className="text-foreground">7,791 کلومیٹر ٹریک</strong> کے ساتھ جو چاروں صوبوں میں پھیلا ہوا ہے اور <strong className="text-foreground">342+ اسٹیشنز</strong> کا احاطہ کرتا ہے، یہ نیٹ ورک سالانہ لاکھوں مسافروں کو 1.5 گھنٹے (وزیرآباد–سیالکوٹ) سے 34 گھنٹے (کراچی–پشاور عوام ایکسپریس پر) تک کے سفر پر لے جاتا ہے۔
            </p>

            <h3 className="text-lg font-bold text-foreground">ٹائم ٹیبل کی ساخت</h3>
            <p className="leading-relaxed">
              پاکستان ریلوے اپنی 164+ ٹرینوں کو تین اہم زمروں میں تقسیم کرتا ہے: <strong className="text-foreground">اے سی پریمیم</strong> (گرین لائن ایکسپریس، شالیمار ایکسپریس، پاک بزنس ایکسپریس)، <strong className="text-foreground">ایکسپریس</strong> (تیزگام، خیبر میل، کراکرم ایکسپریس، پاکستان ایکسپریس، علامہ اقبال ایکسپریس، ہزارہ ایکسپریس)، اور <strong className="text-foreground">پیسنجر/شٹل</strong> (مقامی اور علاقائی سروسز جو ہر اسٹیشن پر رکتی ہیں)۔
            </p>

            <h3 className="text-lg font-bold text-foreground">مین لائن 1 (ML-1) ریڑھ کی ہڈی</h3>
            <p className="leading-relaxed">
              <strong className="text-foreground">مین لائن 1 (ML-1)</strong> پاکستان کی سب سے اہم ریل راہداری ہے جو کراچی سے پشاور تک 1,726 کلومیٹر پھیلی ہوئی ہے بذریعہ حیدرآباد، سکھر، ملتان، لاہور اور راولپنڈی۔ یہ تمام ریل مسافر ٹریفک کا تقریباً 75% اٹھاتی ہے۔ سی پیک کے تحت ML-1 اپ گریڈ کا مقصد موجودہ 65-105 کلومیٹر/گھنٹہ سے رفتار بڑھا کر 160 کلومیٹر/گھنٹہ کرنا ہے۔
            </p>

            <h3 className="text-lg font-bold text-foreground">کراچی سے لاہور: سب سے مقبول روٹ</h3>
            <p className="leading-relaxed">
              کراچی–لاہور راہداری (تقریباً 1,230 کلومیٹر) سب سے زیادہ مانگ دیکھتی ہے۔ 2026 میں روزانہ آپشنز میں <strong className="text-foreground">گرین لائن ایکسپریس</strong> (کراچی 16:00 روانگی)، <strong className="text-foreground">پاک بزنس ایکسپریس 33UP</strong> (19:00 روانگی، 19 گھنٹے)، <strong className="text-foreground">شالیمار ایکسپریس 27UP</strong> (15:30، 20 گھنٹے)، <strong className="text-foreground">کراکرم ایکسپریس 41UP</strong> (15:30، 21 گھنٹے)، اور <strong className="text-foreground">فرید ایکسپریس 37UP</strong> (22:30، 21 گھنٹے) شامل ہیں۔ اکانومی کرایے 1,100 سے 1,500 روپے، جبکہ اے سی بزنس 4,500 سے 8,500 روپے تک ہیں۔
            </p>

            <h3 className="text-lg font-bold text-foreground">دھند کا موسم: دسمبر سے فروری</h3>
            <p className="leading-relaxed">
              ہر سال سب سے نمایاں شیڈول رکاوٹ پنجاب اور بالائی سندھ میں <strong className="text-foreground">دھند کے موسم (دسمبر–فروری)</strong> کے دوران ہوتی ہے۔ شدید دھند دید کو صفر کے قریب کر دیتی ہے، جس سے ٹرینوں کو رفتار 15-30 کلومیٹر/گھنٹہ تک کم کرنا پڑتا ہے۔ لاہور، فیصل آباد، ساہیوال اور ملتان سے صبح کی روانگیاں سب سے زیادہ متاثر ہوتی ہیں، عام تاخیر 3-6 گھنٹے ہوتی ہے۔ مسافروں کو سختی سے مشورہ دیا جاتا ہے کہ سردیوں میں پنجاب کے اسٹیشنز سے دوپہر (14:00 کے بعد) کی روانگی کا انتخاب کریں۔
            </p>

            <h3 className="text-lg font-bold text-foreground">عید کے موسم کے خصوصی شیڈول</h3>
            <p className="leading-relaxed">
              عید الفطر اور عید الاضحی کے دوران پاکستان ریلوے زیادہ مانگ والے روٹس پر <strong className="text-foreground">خصوصی عید ٹرینیں</strong> چلاتا ہے اور باقاعدہ سروسز میں اضافی ڈبے شامل کرتا ہے۔ ایکسپریس ٹرینوں کے ٹکٹ اکثر 15-20 دن پہلے ختم ہو جاتے ہیں۔ مسافروں کو مشورہ دیا جاتا ہے کہ 30 دن کی بکنگ ونڈو کھلتے ہی ربط ایپ کے ذریعے ٹکٹ بک کرائیں۔
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">مزید دریافت کریں</p>
            <h2 className="text-xl sm:text-2xl font-bold">متعلقہ ٹولز اور وسائل</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Navigation, gradient: "gradient-card-emerald", title: "لائیو ٹرین ٹریکر", desc: "کسی بھی ٹرین کی ریئل ٹائم GPS پوزیشن انٹرایکٹو نقشے پر دیکھیں۔", link: "/ur/train" },
              { icon: MapPin, gradient: "gradient-card-amber", title: "جرنی پلانر", desc: "کسی بھی دو اسٹیشنز کے درمیان بہترین ٹرین تلاش کریں۔", link: "/ur/planner" },
              { icon: Clock, gradient: "gradient-card-purple", title: "تاخیر چیک کریں", desc: "تمام چلتی ٹرینوں کی ریئل ٹائم تاخیر کی حالت۔", link: "/ur/check-delays" },
              { icon: Train, gradient: "gradient-card-rose", title: "ایکسپریس ٹرینیں", desc: "تمام ایکسپریس اور اے سی پریمیم ٹرینوں کی مکمل فہرست۔", link: "/ur/express-trains" },
              { icon: Zap, gradient: "gradient-card-teal", title: "گرین لائن ایکسپریس", desc: "پاکستان کی پریمیم اے سی ٹرین — شیڈول، کرایے، کلاسز۔", link: "/ur/green-line-express" },
              { icon: Star, gradient: "gradient-card-blue", title: "ٹکٹ کی قیمتیں", desc: "تمام ٹرینوں اور کلاسز کے لیے کرایوں کی تفصیلات۔", link: "/ur/ticket-pricing" },
            ].map((item, i) => (
              <Card key={i} className={`${item.gradient} border hover-lift group`}>
                <CardContent className="p-5 text-center">
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                  <Link to={item.link} className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
                    دریافت کریں <ChevronLeft className="w-3 h-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary tracking-wider mb-2">اکثر پوچھے جانے والے سوالات</p>
            <h2 className="text-2xl sm:text-3xl font-bold">پاکستان ریلوے شیڈول FAQ — {scheduleFaqs.length} سوالات کے جوابات</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              پاکستان ریلوے ٹرین ٹائمنگ، ٹائم ٹیبل تبدیلیاں، چلنے کے دن، اور شیڈول رکاوٹوں کے بارے میں مسافروں کے تمام سوالات۔
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {scheduleFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-4">
                  <AccordionTrigger className="text-sm font-semibold text-right hover:no-underline gap-3">
                    <span className="flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pr-6">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Cross-Language Link */}
      <div className="bg-card border-t py-4 text-center">
        <p className="text-sm text-muted-foreground">
          View in English: <Link to="/schedule-guide" className="text-primary font-semibold hover:underline">Pakistan Railways Schedule Guide →</Link>
          {" · "}
          <Link to="/ur/schedule" className="text-primary font-semibold hover:underline">← انٹرایکٹو ٹائم ٹیبل</Link>
        </p>
      </div>
    </div>
  );
}
