"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

const trendingItems = [
  {
    title: "تيشيرت أبيض كلاسيكي",
    description: "قطعة أساسية لكل خزانة ملابس",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRO20500TM1-OFFWHIT-3_1880x.jpg",
    href: "/products/classic-white-tee",
    colors: ["#ffffff", "#cccccc"], // أبيض + رمادي
  },
  {
    title: "مجموعة فساتين الصيف",
    description: "تصاميم أنيقة ومريحة لأيام الصيف",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRO20445TM1-Green-2_1880x.jpg",
    href: "/products/summer-dresses",
    colors: ["#66cc99", "#ffeecc"], // أخضر فاتح + خوخي
  },
  {
    title: "ملابس مغامرات الأطفال",
    description: "جهّز أطفالك للمتعة والمرح",
    image: "https://townteam.com/cdn/shop/files/POS25SKMR21883TM1-BRCK-OFF-6_1880x.jpg",
    href: "/products/kids-adventure",
    colors: ["#ffcc00", "#ff6666"], // أصفر + وردي
  },
  {
    title: "تيشيرت أبيض كلاسيكي",
    description: "قطعة أساسية لكل خزانة ملابس",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRO20500TM1-OFFWHIT-3_1880x.jpg",
    href: "/products/classic-white-tee",
    colors: ["#ffffff", "#999999"], // أبيض + رمادي غامق
  },
  {
    title: "مجموعة فساتين الصيف",
    description: "تصاميم أنيقة ومريحة لأيام الصيف",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRO20445TM1-Green-2_1880x.jpg",
    href: "/products/summer-dresses",
    colors: ["#99cc66", "#ffeedd"], // أخضر فاتح + عاجي
  },
  {
    title: "ملابس مغامرات الأطفال",
    description: "جهّز أطفالك للمتعة والمرح",
    image: "https://townteam.com/cdn/shop/files/POS25SKMR21883TM1-BRCK-OFF-6_1880x.jpg",
    href: "/products/kids-adventure",
    colors: ["#ff9933", "#3399ff"], // برتقالي + أزرق
  },
];


export default function TrendingNow() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-right mb-8">
        الأكثر رواجًا الآن
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-right">
        {trendingItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative w-full">
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
                src={item.image}
                alt={item.title}
                width={1880}
                height={2507}
                loading="lazy"
                unoptimized
                quality={90}
                className="object-cover p-4"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <div className="flex gap-1 justify-end my-3">
                {item.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
