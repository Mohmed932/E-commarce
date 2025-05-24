"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

const categories = ["رجالي", "نسائي", "أطفال"];

const products = [
  {
    name: "بنطال جينز رجالي ضيق",
    price: "$49.99",
    image: "https://townteam.com/cdn/shop/files/TST25SSPT15004TM1-Beige-2_1880x.jpg",
    category: "رجالي",
    colors: ["#f0e0ee", "#000000"],
  },
  {
    name: "فستان صيفي نسائي",
    price: "$39.99",
    image: "https://townteam.com/cdn/shop/files/TSH25WPRO35002TB1-OFFWHIT-2_1880x.jpg",
    category: "نسائي",
    colors: ["#f0e0ee", "#fff5e5"],
  },
  {
    name: "تيشيرت أطفال بطبعة",
    price: "$19.99",
    image: "https://townteam.com/cdn/shop/files/TST25SSNP15028TB1-Orange-6_1880x.jpg",
    category: "أطفال",
    colors: ["#f0e0ee", "#ff9900"],
  },
  {
    name: "قميص رجالي كاجوال",
    price: "$34.99",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRO20525TM1-Black_1880x.jpg",
    category: "رجالي",
    colors: ["#f0e0ee", "#333333"],
  },
  {
    name: "ليجن يوغا نسائي",
    price: "$29.99",
    image: "https://townteam.com/cdn/shop/files/SSH25SXIR31146TB1-Blue-2_1880x.jpg",
    category: "نسائي",
    colors: ["#f0e0ee", "#3366cc"],
  },
  {
    name: "جاكيت جينز أطفال",
    price: "$39.99",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRS32741TB1-Green-3_1880x.jpg",
    category: "أطفال",
    colors: ["#f0e0ee", "#00cc66"],
  },
];

export default function NewArrivals() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;


  return (
    <div className="flex items-center justify-center">
      <div className="p-4 sm:p-8 bg-[#f1f1f2] max-h-screen w-2/3 max-lg:w-full" dir="rtl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">وصل حديثًا</h1>

        {/* أزرار الفلترة */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className={`rounded-full border-2 text-sm sm:text-base ${
                selectedCategory === category
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-black border-gray-300"
              }`}
              onClick={() =>
                setSelectedCategory(selectedCategory === category ? null : category)
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* المنتجات */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <div key={index} className="flex flex-col gap-2 text-right">
              <div className="rounded-xl overflow-hidden shadow-md bg-white relative">
                {/* Icons on top */}
                <div className="absolute top-2 left-2 flex gap-2 z-10">
                  <button className="bg-white p-2 rounded-full shadow hover:bg-rose-100 transition-all duration-200 hover:scale-110 active:scale-95">
                    <Heart className="text-rose-500 w-5 h-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition-all duration-200 hover:scale-110 active:scale-95">
                    <ShoppingCart className="text-blue-500 w-5 h-5" />
                  </button>
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px]"
                />
              </div>

              <div className="text-sm font-medium text-black truncate">{product.name}</div>
              <div className="text-sm text-gray-600">{product.price}</div>

              {/* الألوان */}
              <div className="flex gap-1 justify-end">
                {product.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
