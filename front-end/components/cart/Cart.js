import { Button } from "@/components/ui/button";

export default function Cart() {
  return (
    <div className="container mx-auto px-4 py-8 my-10 rtl text-right bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">سلة التسوق</h1>

      {/* جدول المنتجات */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 border">المنتج</th>
              <th className="p-4 border">التفاصيل</th>
              <th className="p-4 border">الكمية</th>
              <th className="p-4 border">السعر</th>
              <th className="p-4 border">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4 border flex items-center gap-2 min-w-40">
                <img
                  src="https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg"
                  alt="فستان صيفي"
                  className="w-12 h-12 object-cover rounded"
                />
                <span>فستان صيفي</span>
              </td>
              <td className="p-4 border min-w-40">المقاس: M، اللون: أزرق سماوي</td>
              <td className="p-4 border min-w-40">1</td>
              <td className="p-4 border min-w-40">$49.99</td>
              <td className="p-4 border min-w-40">$49.99</td>
            </tr>
            <tr className="border-t">
              <td className="p-4 border flex items-center gap-2">
                <img
                  src="https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg"
                  alt="قميص كاجوال"
                  className="w-12 h-12 object-cover rounded"
                />
                <span>قميص كاجوال</span>
              </td>
              <td className="p-4 border">المقاس: L، اللون: أبيض</td>
              <td className="p-4 border">2</td>
              <td className="p-4 border">$39.99</td>
              <td className="p-4 border">$79.98</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ملخص الطلب */}
      <div className="mt-6 flex justify-end" dir="rtl">
        <div className="bg-gray-100 p-4 rounded-md max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
          <div className="flex justify-between mb-2">
            <span>المجموع الفرعي</span>
            <span>$129.97</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>الشحن</span>
            <span>مجاني</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>الإجمالي</span>
            <span>$129.97</span>
          </div>
          <Button className="mt-4 w-full bg-[#ff6900] hover:bg-[#ff6a00ae]">
            الدفع
          </Button>
        </div>
      </div>
    </div>
  );
}
