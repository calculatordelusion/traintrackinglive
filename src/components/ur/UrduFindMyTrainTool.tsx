import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, MapPin, Navigation, Satellite, Shield, TrainFront, Zap } from "lucide-react";
import { fetchLivePositions, findMyTrain, type LiveStats } from "@/lib/trainApi";

export default function UrduFindMyTrainTool() {
  const [status, setStatus] = useState<"idle" | "detecting" | "found" | "not-found" | "error">("idle");
  const [result, setResult] = useState<any>(null);
  const [stats, setStats] = useState<LiveStats>({ moving: 0, atStation: 0, total: 0, liveCount: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { stats: s } = await fetchLivePositions();
        setStats(s);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  const startDetection = () => {
    setStatus("detecting");

    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await findMyTrain(position.coords.latitude, position.coords.longitude);
          setResult(data.data);
          setStatus(data.detected ? "found" : "not-found");
        } catch (error) {
          console.error(error);
          setStatus("error");
        }
      },
      () => setStatus("error"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: stats.running || stats.liveCount || stats.moving || 0, label: "اس وقت چلتی ٹرینیں", icon: TrainFront, gradient: "gradient-card-emerald" },
            { value: stats.atStation || 0, label: "اسٹیشن پر", icon: MapPin, gradient: "gradient-card-amber" },
            { value: stats.total || 0, label: "کل ٹریک ایبل", icon: Navigation, gradient: "gradient-card-blue" },
            { value: "500m", label: "ڈیٹیکشن رینج", icon: Satellite, gradient: "gradient-card-purple" },
          ].map((item) => (
            <Card key={item.label} className={`${item.gradient} border hover-lift`}>
              <CardContent className="p-4 text-center">
                <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-black">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="space-y-2">
                <h2 className="text-2xl font-black">اپنی موجودہ لوکیشن سے ٹرین تلاش کریں</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  لوکیشن صرف آپ کے براؤزر میں استعمال ہوتی ہے۔ ہم اسے محفوظ نہیں کرتے۔ ایک بٹن دبائیں اور قریب ترین چلتی ٹرین فوری معلوم کریں۔
                </p>
              </div>
              <Button onClick={startDetection} disabled={status === "detecting"} size="lg" className="rounded-xl gap-2 w-full md:w-auto">
                {status === "detecting" ? <><Loader2 className="w-4 h-4 animate-spin" /> تلاش ہو رہی ہے...</> : <><Satellite className="w-4 h-4" /> میری ٹرین تلاش کریں</>}
              </Button>
            </div>

            {status === "detecting" && (
              <div className="mt-5 rounded-xl bg-muted p-4 text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                GPS لوکیشن لی جا رہی ہے اور چلتی ٹرینوں کے ساتھ موازنہ ہو رہا ہے...
              </div>
            )}

            {status === "found" && result && (
              <div className="mt-5 rounded-xl border gradient-card-emerald p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-primary">ٹرین مل گئی!</h3>
                    <p className="text-sm mt-1">
                      آپ غالباً <strong>{result.train.name} {result.train.number}</strong> میں ہیں۔ فاصلہ تقریباً <strong>{result.distance} میٹر</strong> ہے۔
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      رفتار: {result.position?.speed ?? 0} کلومیٹر/گھنٹہ • {result.position?.delayMinutes === 0 ? "وقت پر" : `${result.position?.delayMinutes} منٹ تاخیر`}
                    </p>
                  </div>
                  <Link to={`/ur/train/${result.train.id}`}>
                    <Button className="rounded-xl w-full sm:w-auto">لائیو ٹریکنگ دیکھیں</Button>
                  </Link>
                </div>
              </div>
            )}

            {status === "not-found" && result && (
              <div className="mt-5 rounded-xl border gradient-card-amber p-5">
                <h3 className="text-lg font-black">قریب کوئی ٹرین نہیں ملی</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  قریب ترین ٹرین <strong>{result.train.name} {result.train.number}</strong> ہے جو تقریباً {(result.distance / 1000).toFixed(1)} کلومیٹر دور ہے۔
                </p>
                <Link to={`/ur/train/${result.train.id}`}>
                  <Button variant="outline" className="mt-4 rounded-xl">قریب ترین ٹرین دیکھیں</Button>
                </Link>
              </div>
            )}

            {status === "error" && (
              <div className="mt-5 rounded-xl border gradient-card-rose p-5">
                <div className="flex items-center gap-2 text-destructive font-bold">
                  <AlertTriangle className="w-5 h-5" /> لوکیشن دستیاب نہیں
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  براہِ کرم اپنے براؤزر میں لوکیشن اجازت آن کریں اور دوبارہ کوشش کریں۔
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: "لوکیشن محفوظ", desc: "آپ کی GPS لوکیشن مقامی طور پر پراسیس ہوتی ہے اور سرور پر محفوظ نہیں کی جاتی۔", gradient: "gradient-card-emerald" },
            { icon: Zap, title: "فوری نتیجہ", desc: "ٹرین کا نام جانے بغیر صرف چند سیکنڈ میں قریب ترین چلتی ٹرین معلوم کریں۔", gradient: "gradient-card-amber" },
            { icon: Navigation, title: "آگے کی مکمل ٹریکنگ", desc: "ایک بار ٹرین مل جائے تو رفتار، تاخیر، روٹ، اور اگلے اسٹیشنز فوراً دیکھیں۔", gradient: "gradient-card-blue" },
          ].map((item) => (
            <Card key={item.title} className={`${item.gradient} border hover-lift`}>
              <CardContent className="p-5">
                <item.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}