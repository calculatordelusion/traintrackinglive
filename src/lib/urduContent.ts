import type { RouteDetail } from "@/data/routeDetails";

const stationReplacements: Array<[RegExp, string]> = [
  [/Karachi Cantt/gi, "کراچی کینٹ"],
  [/Karachi/gi, "کراچی"],
  [/Lahore Junction|Lahore Jn/gi, "لاہور جنکشن"],
  [/Lahore/gi, "لاہور"],
  [/Rawalpindi/gi, "راولپنڈی"],
  [/Islamabad/gi, "اسلام آباد"],
  [/Margala/gi, "مارگلہ"],
  [/Hyderabad Junction|Hyderabad Jn/gi, "حیدرآباد جنکشن"],
  [/Hyderabad/gi, "حیدرآباد"],
  [/Sukkur Junction|Sukkur Jn/gi, "سکھر جنکشن"],
  [/Sukkur/gi, "سکھر"],
  [/Rohri Junction|Rohri Jn/gi, "روہڑی جنکشن"],
  [/Rohri/gi, "روہڑی"],
  [/Multan Cantt/gi, "ملتان کینٹ"],
  [/Multan/gi, "ملتان"],
  [/Sahiwal/gi, "ساہیوال"],
  [/Bahawalpur/gi, "بہاولپور"],
  [/Rahimyar Khan/gi, "رحیم یار خان"],
  [/Khanewal Junction|Khanewal Jn/gi, "خانیوال جنکشن"],
  [/Khanewal/gi, "خانیوال"],
  [/Gujranwala/gi, "گوجرانوالہ"],
  [/Gujrat/gi, "گجرات"],
  [/Jhelum/gi, "جہلم"],
  [/Peshawar Cantt/gi, "پشاور کینٹ"],
  [/Peshawar/gi, "پشاور"],
  [/Quetta/gi, "کوئٹہ"],
  [/Faisalabad/gi, "فیصل آباد"],
  [/Nawabshah/gi, "نواب شاہ"],
  [/Taftan/gi, "تفتان"],
  [/Cantt/gi, "کینٹ"],
  [/Junction/gi, "جنکشن"],
];

const trainNameMap: Record<string, string> = {
  "Green Line Express": "گرین لائن ایکسپریس",
  "Business Express": "بزنس ایکسپریس",
  "Karakoram Express": "قراقرم ایکسپریس",
  "Tezgam Express": "تیزگام ایکسپریس",
  "Shalimar Express": "شالیمار ایکسپریس",
  "Allama Iqbal Express": "علامہ اقبال ایکسپریس",
  "Khyber Mail": "خیبر میل",
  "Awam Express": "عوام ایکسپریس",
  "Bolan Mail": "بولان میل",
  "Jaffar Express": "جعفر ایکسپریس",
  "Pak Business Train": "پاکستان بزنس ٹرین",
};

const trainTypeMap: Record<string, string> = {
  express: "ایکسپریس",
  ac: "AC پریمیم",
  passenger: "پیسنجر",
  "Premium AC": "AC پریمیم",
  Express: "ایکسپریس",
  Passenger: "پیسنجر",
};

export function translateStationName(name: string) {
  return stationReplacements.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), name)
    .replace(/\s+/g, " ")
    .trim();
}

export function translateTrainName(name: string) {
  return trainNameMap[name] || name.replace(/Express/gi, "ایکسپریس").replace(/Mail/gi, "میل");
}

export function translateTrainType(type: string) {
  return trainTypeMap[type] || type;
}

export function formatFareUrdu(value: string) {
  return value.replace(/Rs\.?\s?/gi, "₨");
}

export function getRouteUrduSummary(route: RouteDetail) {
  return `${route.fromUrdu} سے ${route.toUrdu} تک ریلوے سفر تقریباً ${route.distance} پر مشتمل ہے اور یہ راستہ عموماً ${route.fastestDuration} میں مکمل ہوتا ہے۔ اس روٹ پر روزانہ ${route.dailyTrains}+ ٹرینیں دستیاب رہتی ہیں جبکہ ابتدائی کرایہ ${formatFareUrdu(route.fareFrom)} سے شروع ہو کر بہتر کلاسز میں ${formatFareUrdu(route.fareTo)} تک جا سکتا ہے۔`;
}

export function getRouteUrduDetailContent(route: RouteDetail) {
  return [
    `${route.fromUrdu} سے ${route.toUrdu} روٹ پاکستان ریلوے کے اہم اور زیادہ تلاش کیے جانے والے سفری راستوں میں شامل ہے۔ یہ راہداری کاروباری، خاندانی، تعلیمی، اور سیاحتی سفر کے لیے یکساں اہمیت رکھتی ہے کیونکہ اس پر روزانہ متعدد ایکسپریس اور بعض صورتوں میں پیسنجر سروسز بھی دستیاب ہوتی ہیں۔`,
    `اس روٹ پر سب سے تیز سروس ${translateTrainName(route.fastestTrain)} ہے جو مناسب حالات میں تقریباً ${route.fastestDuration} میں سفر مکمل کر سکتی ہے۔ اگر آپ بجٹ، آرام، یا کم اسٹاپس کی بنیاد پر ٹرین منتخب کرنا چاہتے ہیں تو ٹرین کی قسم، دستیاب کلاس، رات یا دن کی روانگی، اور موجودہ تاخیر کی صورتحال ایک ساتھ دیکھنا زیادہ مفید رہتا ہے۔`,
    `ہماری سفارش یہی ہے کہ ${route.fromUrdu} سے ${route.toUrdu} سفر سے پہلے لائیو اسٹیٹس، مکمل شیڈول، اور کرایہ چارٹ ضرور دیکھیں۔ اسی طرح بڑے اسٹاپس ${route.keyStops.slice(0, 4).map(translateStationName).join("، ")} کے وقت بھی چیک کریں تاکہ اسٹیشن پہنچنے، وصولی، یا آگے کے سفر کی منصوبہ بندی زیادہ درست ہو سکے۔`,
  ];
}

export function getRouteUrduTravelTips(route: RouteDetail) {
  return [
    `اگر سفر ${route.fastestDuration} یا اس سے زیادہ دورانیے کا ہے تو بہتر آرام کے لیے AC یا سلیپر کلاس کو ترجیح دیں۔`,
    `${route.fromUrdu} روانگی سے کم از کم 30 سے 45 منٹ پہلے اسٹیشن پہنچیں تاکہ پلیٹ فارم اور کوچ کی تلاش میں جلدی نہ ہو۔`,
    `سردیوں اور رش کے دنوں میں اسی روٹ پر تاخیر بڑھ سکتی ہے، اس لیے لائیو ٹریکر اور تاخیر چیکر پہلے سے دیکھیں۔`,
    `اگر خاندان کے ساتھ سفر کر رہے ہیں تو کم اسٹاپس والی ٹرین، مناسب وقت، اور پہلے سے نشست کا انتخاب زیادہ بہتر تجربہ دیتا ہے۔`,
  ];
}

export function getRouteUrduFaqs(route: RouteDetail) {
  return [
    {
      q: `${route.fromUrdu} سے ${route.toUrdu} سب سے تیز ٹرین کون سی ہے؟`,
      a: `اس روٹ پر سب سے تیز آپشن عموماً ${translateTrainName(route.fastestTrain)} ہے جو مناسب آپریشنل حالات میں تقریباً ${route.fastestDuration} میں سفر مکمل کرتی ہے۔`,
    },
    {
      q: `${route.fromUrdu} سے ${route.toUrdu} ٹکٹ کی قیمت کتنی ہے؟`,
      a: `ابتدائی کرایہ عموماً ${formatFareUrdu(route.fareFrom)} سے شروع ہوتا ہے جبکہ بہتر AC یا پریمیم کلاس میں کرایہ ${formatFareUrdu(route.fareTo)} تک جا سکتا ہے۔ اصل قیمت ٹرین، کلاس، اور سیزن کے حساب سے بدل سکتی ہے۔`,
    },
    {
      q: `${route.fromUrdu} سے ${route.toUrdu} کتنی ٹرینیں چلتی ہیں؟`,
      a: `اس راہداری پر روزانہ تقریباً ${route.dailyTrains}+ سروسز دستیاب ہوتی ہیں جن میں ایکسپریس اور بعض روٹس پر دیگر کنیکٹنگ ٹرینیں بھی شامل ہو سکتی ہیں۔`,
    },
    {
      q: `اس روٹ کے اہم اسٹاپس کون سے ہیں؟`,
      a: `اہم اسٹاپس میں ${route.keyStops.slice(0, 5).map(translateStationName).join("، ")} شامل ہیں۔ مختلف ٹرینوں کے اسٹاپس کی تعداد ایک جیسی نہیں ہوتی۔`,
    },
    {
      q: `کیا ${route.fromUrdu} سے ${route.toUrdu} سفر کی لائیو ٹریکنگ دستیاب ہے؟`,
      a: `جی ہاں، متعلقہ ٹرین کے صفحے پر لائیو GPS پوزیشن، رفتار، تاخیر، اور اگلے اسٹیشن کی ETA دیکھی جا سکتی ہے۔`,
    },
    {
      q: `اس روٹ کے لیے بہترین وقت کب ہے؟`,
      a: `اگر آپ کم تاخیر اور بہتر آپریشن چاہتے ہیں تو صاف موسم اور رش سے ہٹ کر دنوں میں سفر بہتر رہتا ہے، جبکہ تہواروں اور شدید دھند کے موسم میں پہلے سے بکنگ اور اضافی وقت رکھنا چاہیے۔`,
    },
  ];
}
