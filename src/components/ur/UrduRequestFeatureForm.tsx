import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Lightbulb } from "lucide-react";

const popularIdeas = [
  "نوٹیفکیشن الرٹس — جب میری ٹرین قریب آ رہی ہو",
  "آف لائن شیڈول — بغیر انٹرنیٹ بھی دیکھ سکوں",
  "اسٹیشن نقشے — پلیٹ فارم اور سہولیات کا نقشہ",
  "کرایہ calculator — حسب ضرورت کرایہ نکال سکوں",
  "پسندیدہ ٹرینیں — بار بار استعمال ہونے والی ٹرینوں کو save کروں",
];

export default function UrduRequestFeatureForm() {
  const { toast } = useToast();
  const [suggestion, setSuggestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "تجویز موصول ہوئی!", description: "آپ کی تجویز کا جائزہ لیا جائے گا۔ شکریہ!" });
    setSuggestion("");
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-10 max-w-3xl">
      <Card className="border">
        <CardContent className="p-6 sm:p-8 space-y-5">
          <h2 className="text-2xl font-black">اپنی تجویز بھیجیں</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">آپ کی رائے ہمارے لیے بہت اہم ہے۔ جتنی تفصیل سے بتائیں اتنا بہتر — کیا فیچر چاہیے، کیوں ضروری ہے، اور کیسے کام کرے۔</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea value={suggestion} onChange={(e) => setSuggestion(e.target.value)} required rows={5} placeholder="اپنی تجویز یا آئیڈیا یہاں لکھیں..." className="w-full rounded-xl border bg-background px-4 py-3 text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <Button type="submit" className="w-full rounded-xl font-bold gap-2"><Lightbulb className="w-4 h-4" /> تجویز بھیجیں</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border bg-muted/30">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-2xl font-black mb-5">مقبول آئیڈیاز</h2>
          <div className="space-y-3">
            {popularIdeas.map((idea) => (
              <div key={idea} className="flex items-start gap-3 rounded-xl bg-card border p-4">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{idea}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
