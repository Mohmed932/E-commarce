"use client";

import React, { useMemo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Heart, ShoppingCart } from "lucide-react";

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

const categories = ['الكل', 'رجالي', 'نسائي', 'أطفال'];
const itemsPerPage = 4;

const Sale = () => {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'الكل') return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="flex items-center justify-center">
      <div className="p-4 sm:p-8  min-h-screen w-2/3 max-lg:w-full my-10" dir="rtl">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold mb-6">تخفيضات</h1>

          <div className="flex gap-4 mb-8">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat}
              </Button>
            ))}
          </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 ">
            {paginatedProducts.map((product, index) => (
              <Card key={index} className="rounded-2xl shadow-md w-full">
                <CardContent className="p-4 relative">
                  {/* الأيقونات في الأعلى */}
                  <div className="absolute top-2 left-2 flex gap-2 z-10">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-rose-100 transition-all duration-200 hover:scale-110 active:scale-95">
                      <Heart className="text-rose-500 w-5 h-5" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition-all duration-200 hover:scale-110 active:scale-95">
                      <ShoppingCart className="text-blue-500 w-5 h-5" />
                    </button>
                  </div>
                  <img src={product.image} alt={product.name} className="rounded-xl mb-3 w-full h-56 object-cover" />
                  <h2 className="text-sm font-medium mb-1">{product.name}</h2>
                  <p className="text-sm text-orange-600">{product.price}</p>
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
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <Button
                key={num}
                variant={currentPage === num ? "default" : "ghost"}
                className="w-8 h-8 text-sm font-medium"
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </Button>
            ))}
            <Button variant="ghost" size="icon" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
