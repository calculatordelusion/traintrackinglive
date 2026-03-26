import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Smartphone, ArrowRight } from "lucide-react";

const steps = [
  { step: "1", title: "RABTA ایپ ڈاؤن لوڈ کریں", desc: "Google Play Store یا Apple App Store سے RABTA ایپ ڈاؤن لوڈ کریں۔ یہ پاکستان ریلوے کی مجاز ٹکٹنگ ایپلیکیشن ہے جو Easyway Innovations نے تیار کی ہے۔ اسی طرح pak-railways.gov.pk ویب سائٹ بھی استعمال کی جا سکتی ہے۔" },
  { step: "2", title: "اکاؤنٹ بنائیں", desc: "اپنا شناختی کارڈ (CNIC) نمبر، فون نمبر، اور بنیادی معلومات درج کرکے اکاؤنٹ بنائیں۔ غیر ملکی شہری پاسپورٹ نمبر استعمال کر سکتے ہیں۔ تصدیقی OTP آپ کے فون پر آئے گا۔" },
  { step: "3", title: "ٹرین تلاش کریں", desc: "اپنی روانگی اور منزل کا اسٹیشن منتخب کریں، سفر کی تاریخ چنیں، اور دستیاب ٹرینیں دیکھیں۔ ہر ٹرین کے ساتھ کلاسز، کرایہ، روانگی/آمد کا وقت، اور سیٹ کی دستیابی نظر آئے گی۔" },
  { step: "4", title: "کلاس اور نشست منتخب کریں", desc: "اکانومی، بزنس، AC اسٹینڈرڈ، AC بزنس، AC سلیپر، یا پارلر — اپنے بجٹ اور آرام کی ضرورت کے مطابق کلاس چنیں۔ مخصوص نشست/بیرتھ کا انتخاب بھی ممکن ہے۔" },
  { step: "5", title: "ادائیگی کریں", desc: "JazzCash، Easypaisa، یا ڈیبٹ/کریڈٹ کارڈ (Visa/Mastercard) سے محفوظ ادائیگی کریں۔ موبائل والیٹ PIN سے سیکنڈوں میں ادائیگی مکمل ہو جاتی ہے۔ ای ٹکٹ فوری طور پر آپ کی ایپ اور SMS/ایمیل پر آئے گی۔" },
];

const importantNotes = [
  "تمام ٹکٹ بکنگ کے لیے درست CNIC ضروری ہے",
  "30 دن پہلے تک بکنگ ممکن ہے",
  "ای ٹکٹ فون پر دکھانا کافی ہے، پرنٹ ضروری نہیں",
  "ایک لین دین میں 6 ٹکٹ بک ہو سکتی ہیں",
  "3 سال سے کم بچے مفت (بغیر الگ سیٹ)",
  "طلباء 25%، بزرگ 25%، معذور افراد 50% رعایت",
];

export default function UrduBuyTicketsGuide() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-10">
      <section className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black">بکنگ کے مراحل</h2>
          <p className="text-sm text-muted-foreground mt-2">RABTA ایپ یا ویب سائٹ سے آن لائن ٹکٹ بکنگ کا مرحلہ وار طریقہ</p>
        </div>
        <div className="space-y-5 max-w-3xl mx-auto">
          {steps.map((item) => (
            <Card key={item.step} className="border hover-lift">
              <CardContent className="p-6 flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xl font-black text-primary">{item.step}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card className="border bg-muted/30">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-2xl font-black mb-5">اہم معلومات</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {importantNotes.map((note) => (
              <div key={note} className="flex items-start gap-3 rounded-xl bg-card border p-4">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{note}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="gradient-card-emerald border">
        <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <Smartphone className="w-12 h-12 text-primary shrink-0" />
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-black">RABTA ایپ ڈاؤن لوڈ کریں</h3>
            <p className="text-sm text-muted-foreground">Google Play Store یا Apple App Store سے مفت ڈاؤن لوڈ کریں اور فوری بکنگ شروع کریں۔</p>
          </div>
          <div className="flex gap-3">
            <Link to="/ur/ticket-pricing"><Button variant="outline" className="rounded-xl gap-2"><CreditCard className="w-4 h-4" /> کرایے دیکھیں</Button></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
