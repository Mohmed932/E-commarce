// components/MainBanner.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import img from '../../public/mainbanner.png'

export default function MainBanner() {
  return (
    <div className="mt-10">
      <section className="relative w-full max-w-7xl mx-auto aspect-[2/1] sm:aspect-[16/6] md:aspect-[16/5] rounded-lg overflow-hidden px-4 md:px-0">
        {/* الخلفية: صورة تغطي كل المساحة */}
        <Image
          src={img}
          alt="صورة بانر"
          fill
          className="object-cover z-0"
          priority
        />

        {/* طبقة شفافة */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* النص فوق الصورة */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-end text-white text-right p-6 sm:p-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 leading-snug">
            اكتشف تشكيلتنا الجديدة
          </h1>
          <p className="text-sm sm:text-lg md:text-xl mb-5 max-w-md">
            أحدث العروض والمنتجات بتصميم عصري وأسعار منافسة في انتظارك.
          </p>
          <Link href="/products">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-5 rounded-lg text-sm sm:text-base font-semibold transition">
              تسوق الآن
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
