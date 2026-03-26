import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Percent, Shield, Smartphone, Users, Wallet } from "lucide-react";

const pricingData = [
  { route: "کراچی ←→ لاہور", economy: "1,800", business: "3,500", ac: "6,500", acBusiness: "9,000", duration: "18-22 گھنٹے" },
  { route: "کراچی ←→ راولپنڈی", economy: "2,200", business: "4,200", ac: "7,500", acBusiness: "10,500", duration: "22-26 گھنٹے" },
  { route: "کراچی ←→ پشاور", economy: "2,400", business: "4,500", ac: "8,000", acBusiness: "11,500", duration: "24-28 گھنٹے" },
  { route: "لاہور ←→ راولپنڈی", economy: "700", business: "1,400", ac: "2,500", acBusiness: "3,500", duration: "4-5 گھنٹے" },
  { route: "لاہور ←→ ملتان", economy: "500", business: "1,000", ac: "1,800", acBusiness: "2,500", duration: "5-6 گھنٹے" },
  { route: "کراچی ←→ کوئٹہ", economy: "1,600", business: "3,000", ac: "5,500", acBusiness: "8,000", duration: "12-14 گھنٹے" },
  { route: "لاہور ←→ پشاور", economy: "900", business: "1,800", ac: "3,200", acBusiness: "4,500", duration: "7-8 گھنٹے" },
  { route: "ملتان ←→ کراچی", economy: "1,500", business: "2,800", ac: "5,200", acBusiness: "7,500", duration: "14-16 گھنٹے" },
];

const coachClasses = [
  { cls: "اکانومی کلاس", fareRange: "₨350 – ₨2,400", gradient: "gradient-card-emerald", desc: "کم بجٹ مسافروں کے لیے موزوں۔ مختصر یا درمیانی دورانیے کے سفر کے لیے اچھا بنیادی آپشن۔", features: ["کم کرایہ", "زیادہ دستیابی", "عام نشستیں"] },
  { cls: "بزنس کلاس", fareRange: "₨800 – ₨4,500", gradient: "gradient-card-amber", desc: "اکانومی سے بہتر نشستیں اور نسبتاً زیادہ آرام۔ کام یا خاندانی سفر کے لیے متوازن انتخاب۔", features: ["زیادہ legroom", "بہتر نشست", "درمیانی قیمت"] },
  { cls: "AC اسٹینڈرڈ", fareRange: "₨1,200 – ₨8,000", gradient: "gradient-card-blue", desc: "گرمیوں اور طویل سفر میں زیادہ آرام دہ ائیرکنڈیشنڈ آپشن جس میں بہتر سفر کا تجربہ ملتا ہے۔", features: ["مکمل AC", "طویل سفر کے لیے بہتر", "نسبتاً آرام دہ"] },
  { cls: "AC بزنس", fareRange: "₨1,800 – ₨11,500", gradient: "gradient-card-purple", desc: "پریمیم مسافروں کے لیے زیادہ آرام، بہتر کوچ معیار، اور بعض ٹرینوں میں کھانے جیسی اضافی سہولتیں۔", features: ["پریمیم آرام", "ترجیحی تجربہ", "بہتر سہولیات"] },
  { cls: "AC سلیپر / پارلر", fareRange: "₨2,500 – ₨12,000", gradient: "gradient-card-rose", desc: "رات بھر یا طویل سفر میں بہترین آرام کے لیے موزوں۔ کچھ سروسز میں یہ سب سے اعلیٰ درجے کا آپشن ہوتا ہے۔", features: ["رات کے سفر کے لیے بہتر", "زیادہ پرائیویسی", "ہائی ویلیو تجربہ"] },
];

const discountCards = [
  { icon: Percent, title: "طلباء رعایت", desc: "معتبر طلباء شناخت کے ساتھ عموماً 25% تک رعایت دستیاب ہو سکتی ہے۔", gradient: "gradient-card-emerald" },
  { icon: Users, title: "بچوں کے قواعد", desc: "3 سال سے کم بچے بغیر الگ نشست کے مفت، 3 سے 12 سال تک اکثر آدھا کرایہ۔", gradient: "gradient-card-amber" },
  { icon: Shield, title: "خصوصی رعایتیں", desc: "بزرگ شہریوں، معذور افراد، یا مخصوص کیٹیگریز کے لیے رعایتی پالیسی لاگو ہو سکتی ہے۔", gradient: "gradient-card-blue" },
];

const bookingSteps = [
  { icon: Smartphone, title: "روٹ اور تاریخ منتخب کریں", desc: "اپنی روانگی، منزل، اور مطلوبہ تاریخ پہلے فائنل کریں تاکہ درست کرایہ سامنے آئے۔" },
  { icon: CreditCard, title: "کلاس compare کریں", desc: "صرف کم قیمت نہ دیکھیں، بلکہ دورانیہ اور comfort کے مطابق class منتخب کریں۔" },
  { icon: Wallet, title: "ادائیگی اور تصدیق", desc: "آن لائن یا کاؤنٹر بکنگ کے بعد ticket details اور CNIC ready رکھیں۔" },
];

export default function UrduTicketPricingTable() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-10">
      <Card className="border bg-accent/5 border-accent/20">
        <CardContent className="p-5 text-sm leading-relaxed text-muted-foreground">
          <span className="font-bold text-foreground">نوٹ:</span> یہ کرایے رہنمائی کے لیے ہیں اور بکنگ کے وقت ٹرین، کلاس، اور سیزن کے حساب سے معمولی فرق آ سکتا ہے۔ درست کرایہ ہمیشہ بکنگ کے وقت دوبارہ چیک کریں۔
        </CardContent>
      </Card>

      <section className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black">اہم روٹس کا کرایہ چارٹ</h2>
          <p className="text-sm text-muted-foreground mt-2">اکانومی سے AC بزنس تک مختلف کلاسز کا واضح موازنہ</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-right p-4 font-bold">روٹ</th>
                <th className="text-right p-4 font-bold">اکانومی</th>
                <th className="text-right p-4 font-bold">بزنس</th>
                <th className="text-right p-4 font-bold">AC اسٹینڈرڈ</th>
                <th className="text-right p-4 font-bold">AC بزنس</th>
                <th className="text-right p-4 font-bold">دورانیہ</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((row) => (
                <tr key={row.route} className="border-b even:bg-muted/20 hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-semibold whitespace-nowrap">{row.route}</td>
                  <td className="p-4 text-right text-primary font-semibold">₨{row.economy}</td>
                  <td className="p-4 text-right">₨{row.business}</td>
                  <td className="p-4 text-right">₨{row.ac}</td>
                  <td className="p-4 text-right font-semibold">₨{row.acBusiness}</td>
                  <td className="p-4 text-right text-muted-foreground">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black">سفری کلاسز کی وضاحت</h2>
          <p className="text-sm text-muted-foreground mt-2">صحیح کلاس کا انتخاب آپ کے بجٹ اور سفر کے دورانیے پر منحصر ہوتا ہے</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {coachClasses.map((item) => (
            <Card key={item.cls} className={`${item.gradient} border hover-lift h-full`}>
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="text-lg font-black">{item.cls}</div>
                  <div className="text-sm font-semibold text-primary">{item.fareRange}</div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature) => (
                    <span key={feature} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">{feature}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-5">
        {discountCards.map((card) => (
          <Card key={card.title} className={`${card.gradient} border hover-lift`}>
            <CardContent className="p-6 space-y-3">
              <card.icon className="w-6 h-6 text-primary" />
              <h3 className="font-black text-lg">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black">بکنگ سے پہلے یہ تین کام کریں</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {bookingSteps.map((step) => (
            <Card key={step.title} className="border hover-lift h-full">
              <CardContent className="p-6 space-y-3">
                <step.icon className="w-6 h-6 text-primary" />
                <h3 className="font-black">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
