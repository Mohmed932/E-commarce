"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"

const Categories = () => {
  const categories = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: "ملابس السباحة",
    image: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/81/0189031/1.jpg",
  }));

  return (
    <div className="flex flex-col items-center justify-center my-14">
      <div className="w-2/3 m-5 shadow-md max-lg:w-3/4 max-md:w-11/12">
        <div className="bg-white py-8 text-center" dir="rtl">
          <h2 className="text-2xl font-bold mb-6">تسوق حسب الفئة</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((item) => (
              <Card
                key={item.id}
                className="w-full max-w-[210px] h-[200px] relative overflow-hidden rounded-md hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-2">
                  <p className="text-white text-center text-sm font-semibold">
                    {item.name}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
