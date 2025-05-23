"use client";

import Link from "next/link";
import Image from "next/image";
import manImg from '../../public/mancategory.png'
import womenImg from '../../public/women.png'
import kidsImg from '../../public/kids.png'

const categories = [
  {
    name: "رجالي",
    image:manImg, // حط الصورة المناسبة في مجلد public
    href: "/men",
  },
  {
    name: "نسائي",
    image: womenImg,
    href: "/women",
  },
  {
    name: "أطفال",
    image: kidsImg,
    href: "/kids",
  },
];

export default function ShopByCategory() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-right mb-8">
        تسوق حسب الفئة
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative w-full h-60">
              <Image
                src={cat.image}
                alt={cat.name}
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
            {/* <div className="p-4 text-lg font-semibold">{cat.name}</div> */}
          </Link>
        ))}
      </div>
    </section>
  );
}
