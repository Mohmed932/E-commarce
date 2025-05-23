import { Card, CardContent } from "@/components/ui/card";
import { Truck, RotateCcw, ShieldCheck, Headphones, CheckCircle, Timer } from "lucide-react";

const benefits = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "شحن مجاني",
    description: "استمتع بالشحن المجاني لجميع الطلبات."
  },
  {
    icon: <RotateCcw className="w-6 h-6" />,
    title: "إرجاع سهل",
    description: "إرجاع بدون عناء خلال 30 يومًا."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "دفع آمن",
    description: "تمتع بمعاملات محمية من خلال بوابة الدفع الآمنة."
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "دعم عملاء 24/7",
    description: "فريق الدعم لدينا متاح على مدار الساعة لمساعدتك."
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "منتجات أصلية 100%",
    description: "نضمن لك أصالة جميع منتجاتنا."
  },
  {
    icon: <Timer className="w-6 h-6" />,
    title: "توصيل سريع",
    description: "استلم طلبك بسرعة مع خدمة التوصيل السريع."
  }
];

export default function WhyChooseUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10" dir="rtl">
      <h2 className="text-2xl font-semibold mb-6">لماذا نحن؟</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {benefits.map((benefit, index) => (
          <Card key={index} className="p-4">
            <CardContent className="flex items-start space-x-4">
              {benefit.icon}
              <div>
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-sm text-gray-500">{benefit.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}   