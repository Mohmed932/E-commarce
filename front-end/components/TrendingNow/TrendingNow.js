"use client";

import Image from "next/image";
import Link from "next/link";

const trendingItems = [
  {
    title: "تيشيرت أبيض كلاسيكي",
    description: "قطعة أساسية لكل خزانة ملابس",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRO20500TM1-OFFWHIT-3_1880x.jpg",
    href: "/products/classic-white-tee",
  },
  {
    title: "مجموعة فساتين الصيف",
    description: "تصاميم أنيقة ومريحة لأيام الصيف",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRO20445TM1-Green-2_1880x.jpg",
    href: "/products/summer-dresses",
  },
  {
    title: "ملابس مغامرات الأطفال",
    description: "جهّز أطفالك للمتعة والمرح",
    image: "https://townteam.com/cdn/shop/files/POS25SKMR21883TM1-BRCK-OFF-6_1880x.jpg",
    href: "/products/kids-adventure",
  },
  {
    title: "تيشيرت أبيض كلاسيكي",
    description: "قطعة أساسية لكل خزانة ملابس",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRO20500TM1-OFFWHIT-3_1880x.jpg",
    href: "/products/classic-white-tee",
  },
  {
    title: "مجموعة فساتين الصيف",
    description: "تصاميم أنيقة ومريحة لأيام الصيف",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRO20445TM1-Green-2_1880x.jpg",
    href: "/products/summer-dresses",
  },
  {
    title: "ملابس مغامرات الأطفال",
    description: "جهّز أطفالك للمتعة والمرح",
    image: "https://townteam.com/cdn/shop/files/POS25SKMR21883TM1-BRCK-OFF-6_1880x.jpg",
    href: "/products/kids-adventure",
  },
];

export default function TrendingNow() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-right mb-8">
        الأكثر رواجًا الآن
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-right">
        {trendingItems.map((item,index) => (
          <Link
            href={item.href}
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative w-full h-64">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover p-4"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
