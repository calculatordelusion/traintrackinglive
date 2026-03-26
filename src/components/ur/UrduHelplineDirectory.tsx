import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Phone, Shield } from "lucide-react";

const mainContacts = [
  { label: "مرکزی ہیلپ لائن", value: "117", desc: "ٹول فری، 24/7 دستیاب — ٹرین پوچھ گچھ، بکنگ، شکایات، گم شدہ سامان", gradient: "gradient-card-emerald" },
  { label: "ریلوے پولیس", value: "1316", desc: "سیکیورٹی مسائل، چوری، ہراسانی کی اطلاع — 24/7 تمام صوبے", gradient: "gradient-card-amber" },
  { label: "WhatsApp سپورٹ", value: "0300-8008787", desc: "بکنگ اور شیڈول سوالات — فوری پیغام بھیجیں", gradient: "gradient-card-blue" },
  { label: "ایمرجنسی (ریسکیو)", value: "1122", desc: "طبی ایمرجنسی — ٹرین میں صحت کا مسئلہ ہو تو فوری کال کریں", gradient: "gradient-card-rose" },
];

const divisions = [
  { name: "لاہور ڈویژن", hq: "لاہور", phone: "042-99201773", area: "پنجاب (مرکزی و مشرقی)" },
  { name: "راولپنڈی ڈویژن", hq: "راولپنڈی", phone: "051-9270831", area: "شمالی پنجاب و اسلام آباد" },
  { name: "کراچی ڈویژن", hq: "کراچی", phone: "021-99213012", area: "سندھ (جنوبی)" },
  { name: "سکھر ڈویژن", hq: "سکھر", phone: "071-9310260", area: "سندھ (شمالی)" },
  { name: "ملتان ڈویژن", hq: "ملتان", phone: "061-9200254", area: "جنوبی پنجاب" },
  { name: "کوئٹہ ڈویژن", hq: "کوئٹہ", phone: "081-9201271", area: "بلوچستان" },
  { name: "پشاور ڈویژن", hq: "پشاور", phone: "091-9212039", area: "خیبرپختونخوا" },
];

const majorStations = [
  { name: "لاہور جنکشن", phone: "042-99211080" },
  { name: "کراچی کینٹ", phone: "021-99213081" },
  { name: "راولپنڈی", phone: "051-9270831" },
  { name: "فیصل آباد", phone: "041-9200168" },
  { name: "ملتان کینٹ", phone: "061-9200293" },
  { name: "حیدرآباد", phone: "022-9200150" },
  { name: "پشاور کینٹ", phone: "091-9212039" },
  { name: "کوئٹہ", phone: "081-9201271" },
];

export default function UrduHelplineDirectory() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-10">
      <section className="grid md:grid-cols-2 gap-5">
        {mainContacts.map((contact) => (
          <Card key={contact.label} className={`${contact.gradient} border hover-lift`}>
            <CardContent className="p-6 space-y-3">
              <Phone className="w-6 h-6 text-primary" />
              <div className="text-xs font-bold text-primary">{contact.label}</div>
              <div className="text-3xl font-black">{contact.value}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{contact.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black">ڈویژنل دفاتر</h2>
          <p className="text-sm text-muted-foreground mt-2">پاکستان ریلوے کے 7 ڈویژنل ہیڈکوارٹرز اور رابطہ نمبر</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {divisions.map((div) => (
            <Card key={div.name} className="border hover-lift">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="font-black">{div.name}</h3>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>ہیڈکوارٹر: {div.hq}</div>
                  <div>فون: <span className="font-semibold text-foreground">{div.phone}</span></div>
                  <div>علاقہ: {div.area}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black">بڑے اسٹیشنز کے نمبر</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {majorStations.map((station) => (
            <Card key={station.name} className="border hover-lift">
              <CardContent className="p-5 text-center space-y-2">
                <MapPin className="w-5 h-5 text-primary mx-auto" />
                <div className="font-bold text-sm">{station.name}</div>
                <div className="text-xs text-muted-foreground">{station.phone}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card className="border bg-muted/30">
        <CardContent className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-black">شکایات درج کرانے کا طریقہ</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">ہیلپ لائن 117 پر کال کریں، WhatsApp 0300-8008787 پر پیغام بھیجیں، یا complaints@pakrailways.gov.pk پر ای میل کریں۔ شکایت میں بکنگ ریفرنس، تاریخ، ٹرین نمبر، اور تفصیلات ضرور شامل کریں۔ اسٹیشن پر اسٹیشن ماسٹر یا شکایت رجسٹر بھی دستیاب ہوتا ہے۔</p>
        </CardContent>
      </Card>
    </div>
  );
}
