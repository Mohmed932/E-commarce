"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectSubCategory } from "@/redux/slices/category/subCategory";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CATEGORY_IDS = {
  woman: "68407b787192141aeca28d7e",
  man: "68407b897192141aeca28d81",
  boys: "68409d7a7192141aeca28dcd",
  girls: "68409db77192141aeca28dd0",
};

const Categories = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("woman");
  const { categories, loading, error } = useSelector((state) => state.subCategory);

  useEffect(() => {
    dispatch(collectSubCategory({ id: CATEGORY_IDS["woman"], type: "woman" }));
  }, [dispatch]);

  const handleCategoryClick = (type) => {
    setSelectedCategory(type);
    dispatch(collectSubCategory({ id: CATEGORY_IDS[type], type }));
  };

  const items = selectedCategory ? categories?.[selectedCategory] : [];

  return (
    <div className="flex flex-col items-center justify-center my-14 px-4" dir="rtl">
      <div className="w-full max-w-7xl bg-white py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">تسوق حسب الفئة</h1>

        {/* الأزرار */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {Object.keys(CATEGORY_IDS).map((type) => (
            <Button
              key={type}
              variant={selectedCategory === type ? "default" : "outline"}
              onClick={() => handleCategoryClick(type)}
            >
              {getArabicLabel(type)}
            </Button>
          ))}
        </div>

        {/* تحميل أو خطأ */}
        {loading && <p className="text-gray-500 text-center">جاري التحميل...</p>}
        {error?.[selectedCategory] && (
          <p className="text-red-500 text-center">
            خطأ في تحميل فئة {getArabicLabel(selectedCategory)}:{" "}
            {error[selectedCategory]?.message || "حدث خطأ"}
          </p>
        )}

        {/* عرض العناصر */}
        {!loading && items?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, idx) => (
              <Card
                key={idx}
                className="w-full h-[300px] relative overflow-hidden rounded-xl shadow-md hover:scale-[1.02] transition-transform"
              >
                <Image
                  src={item.image?.img || "/placeholder.png"}
                  alt={item.name || "صورة المنتج"}
                  fill
                  className="object-cover"
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;

function getArabicLabel(type) {
  switch (type) {
    case "woman":
      return "نساء";
    case "man":
      return "رجال";
    case "boys":
      return "أولاد";
    case "girls":
      return "بنات";
    default:
      return type;
  }
}
