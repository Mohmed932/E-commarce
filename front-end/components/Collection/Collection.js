"use client";

import { useMemo, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import FillterCollection from "./FillterCollection";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

const products = [
  { name: "تيشيرت كلاسيكي", price: 99, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "s", color: "black", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "بنطال تشينو", price: 66, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "trousers", size: "m", color: "green", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "جاكيت بومبر", price: 80, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "l", color: "brown", rating: 2, colors: ["#f0e0ee", "#ff9900"], },
  { name: "أحذية تشيلسي", price: 104, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "shoes", size: "xl", color: "beige", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "قميص بولو", price: 22, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "s", color: "blue", rating: 3, colors: ["#f0e0ee", "#ff9900"], },
  { name: "بنطال كارغو", price: 95, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "trousers", size: "m", color: "black", rating: 2, colors: ["#f0e0ee", "#ff9900"], },
  { name: "سترة مبطنة", price: 91, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "l", color: "green", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "أحذية لوفر", price: 38, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "shoes", size: "xl", color: "brown", rating: 1, colors: ["#f0e0ee", "#ff9900"], },
  { name: "تيشيرت جرافيك", price: 77, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "s", color: "beige", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "جاكيت جينز", price: 29, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "m", color: "blue", rating: 2, colors: ["#f0e0ee", "#ff9900"], },
  { name: "قميص كتان", price: 83, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "l", color: "black", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "بنطال جينز", price: 79, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "trousers", size: "xl", color: "green", rating: 3, colors: ["#f0e0ee", "#ff9900"], },
  { name: "جاكيت مطري", price: 92, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "s", color: "brown", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "أحذية رياضية", price: 61, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "shoes", size: "m", color: "beige", rating: 2, colors: ["#f0e0ee", "#ff9900"], },
  { name: "قميص رسمي", price: 106, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "l", color: "blue", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "سويت شيرت", price: 63, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "xl", color: "black", rating: 1, colors: ["#f0e0ee", "#ff9900"], },
  { name: "بنطال رياضي", price: 58, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "trousers", size: "s", color: "green", rating: 3, colors: ["#f0e0ee", "#ff9900"], },
  { name: "جاكيت منفوخ", price: 72, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "m", color: "brown", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "أحذية جلدية", price: 44, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "shoes", size: "l", color: "beige", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "قميص نص كم", price: 55, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "xl", color: "blue", rating: 3, colors: ["#f0e0ee", "#ff9900"], },
  { name: "تيشيرت بفتحة", price: 35, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "s", color: "black", rating: 2, colors: ["#f0e0ee", "#ff9900"], },
  { name: "شورت كاجوال", price: 68, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "trousers", size: "m", color: "green", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "معطف صوفي", price: 108, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "l", color: "brown", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "أحذية برقبة", price: 116, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "shoes", size: "xl", color: "beige", rating: 1, colors: ["#f0e0ee", "#ff9900"], },
  { name: "قميص كاجوال", price: 49, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "s", color: "blue", rating: 3, colors: ["#f0e0ee", "#ff9900"], },
  { name: "كنزة صوف", price: 85, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "m", color: "black", rating: 2, colors: ["#f0e0ee", "#ff9900"], },
  { name: "شورت جينز", price: 41, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "trousers", size: "l", color: "green", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "جاكيت رسمي", price: 93, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "xl", color: "brown", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "أحذية سنيكرز", price: 111, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "shoes", size: "s", color: "beige", rating: 3, colors: ["#f0e0ee", "#ff9900"], },
  { name: "قميص مخطط", price: 74, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "m", color: "blue", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "تيشيرت بدون أكمام", price: 36, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "l", color: "black", rating: 1, colors: ["#f0e0ee", "#ff9900"], },
  { name: "بنطال برباط", price: 86, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "trousers", size: "xl", color: "green", rating: 2, colors: ["#f0e0ee", "#ff9900"], },
  { name: "معطف طويل", price: 120, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "s", color: "brown", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "أحذية جلد سويدي", price: 87, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "shoes", size: "m", color: "beige", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "قميص زري", price: 70, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "l", color: "blue", rating: 3, colors: ["#f0e0ee", "#ff9900"], },
  { name: "كنزة برقبة عالية", price: 62, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "xl", color: "black", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "شورت قطني", price: 47, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "trousers", size: "s", color: "green", rating: 2, colors: ["#f0e0ee", "#ff9900"], },
  { name: "جاكيت مبطن", price: 69, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "m", color: "brown", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "أحذية رسمية", price: 101, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "shoes", size: "l", color: "beige", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "قميص مزخرف", price: 73, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "xl", color: "blue", rating: 1, colors: ["#f0e0ee", "#ff9900"], },
  { name: "تيشيرت بطبعة", price: 42, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "s", color: "black", rating: 3, colors: ["#f0e0ee", "#ff9900"], },
  { name: "بنطال رسمي", price: 81, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "trousers", size: "m", color: "green", rating: 2, colors: ["#f0e0ee", "#ff9900"], },
  { name: "جاكيت خفيف", price: 109, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "l", color: "brown", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "أحذية تريل", price: 107, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "shoes", size: "xl", color: "beige", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "قميص بجيوب", price: 90, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "s", color: "blue", rating: 3, colors: ["#f0e0ee", "#ff9900"], },
  { name: "كنزة خفيفة", price: 76, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "m", color: "black", rating: 2, colors: ["#f0e0ee", "#ff9900"], },
  { name: "بنطال بجيوب", price: 31, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "trousers", size: "l", color: "green", rating: 4, colors: ["#f0e0ee", "#ff9900"], },
  { name: "جاكيت بغطاء", price: 94, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "jackets", size: "xl", color: "brown", rating: 5, colors: ["#f0e0ee", "#ff9900"], },
  { name: "أحذية شتوية", price: 53, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "shoes", size: "s", color: "beige", rating: 1, colors: ["#f0e0ee", "#ff9900"], },
  { name: "قميص ملون", price: 60, image: "https://townteam.com/cdn/shop/files/TSH25SXRO20344TM1-Black-2_1880x.jpg", category: "tshirts", size: "m", color: "blue", rating: 4, colors: ["#f0e0ee", "#ff9900"], }
];


export default function Collection({ nameCollection }) {
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [rating, setRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(150);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      return (
        (!category || p.category === category) &&
        (!size || p.size === size) &&
        (!color || p.color === color) &&
        (!rating || p.rating >= parseInt(rating)) &&
        p.price <= maxPrice
      );
    });
  }, [category, size, color, rating, maxPrice]);

  const resetFilters = () => {
    setCategory("");
    setSize("");
    setColor("");
    setRating(0);
    setMaxPrice(150);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen px-4 sm:px-6 py-10 gap-10" dir="rtl">
      {/* الزر يظهر فقط في الشاشات الصغيرة */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-orange-500 backdrop-blur-md shadow-md border"
            >
              فتح الفلاتر
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[100vw] max-w-xs p-4">
            <FillterCollection
              setCategory={setCategory}
              setSize={setSize}
              setColor={setColor}
              setRating={setRating}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              resetFilters={resetFilters}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* الفلاتر تظهر مباشرة فقط في الشاشات الكبيرة */}
      <div className="hidden lg:block w-full lg:w-1/4 mt-20">
        <FillterCollection
          setCategory={setCategory}
          setSize={setSize}
          setColor={setColor}
          setRating={setRating}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          resetFilters={resetFilters}
        />
      </div>

      {/* شبكة المنتجات */}
      <main className="w-full lg:w-3/4">
        <h1 className="text-3xl font-bold mb-6">{nameCollection}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <Card key={product.name} className="rounded-2xl shadow-md relative overflow-hidden">
              <CardContent className="p-4">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />

                  {/* أيقونات ثابتة أعلى الصورة */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-rose-100 transition-all duration-200 hover:scale-110 active:scale-95">
                      <Heart className="text-rose-500 w-5 h-5" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition-all duration-200 hover:scale-110 active:scale-95">
                      <ShoppingCart className="text-blue-500 w-5 h-5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                <p className="text-sm text-muted-foreground">${product.price}</p>
                <p className="text-xs text-yellow-500">التقييم: {product.rating}★</p>
                <div className="flex gap-1 justify-end">
                  {product.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
