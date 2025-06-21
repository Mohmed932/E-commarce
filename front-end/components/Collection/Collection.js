"use client";

import { fetchProducts } from '@/redux/slices/product/filter';
import { useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FillterCollection from "./FillterCollection";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { collectSubCategory } from "@/redux/slices/category/subCategory";

const Collection = ({ nameCollection, mainCategories }) => {
  const { items, loading, error } = useSelector((state) => state.filterProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ category: mainCategories.id, limit: 40 }));
    dispatch(collectSubCategory({ id: mainCategories.id, type: mainCategories.label }));
  }, [mainCategories.id]);
  console.log(items)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen px-4 sm:px-6 py-10 gap-10" dir="rtl">
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
              label={mainCategories.label}
              category={mainCategories.id}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block w-full lg:w-1/4 mt-20">
        <FillterCollection
          label={mainCategories.label}
          category={mainCategories.id}
        />
      </div>

      <main className="w-full lg:w-3/4">
        <h1 className="text-3xl font-bold mb-6">{nameCollection}</h1>

        {loading ? (
          // Skeleton أثناء التحميل
          <div className="flex flex-wrap gap-6 justify-center">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Card key={idx} className="w-[250px] rounded-2xl shadow-md overflow-hidden bg-white">
                <CardContent className="p-2">
                  <div className="animate-pulse space-y-2">
                    <div className="w-full h-[150px] bg-gray-200 rounded-lg"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex gap-1 justify-end mt-2">
                      {[1, 2, 3].map((c) => (
                        <span key={c} className="w-4 h-4 rounded-full bg-gray-300"></span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          // عرض الخطأ
          <div className="text-center text-red-500 font-semibold">
            حدث خطأ أثناء تحميل المنتجات، يرجى المحاولة لاحقًا.
          </div>
        ) : items.products?.length === 0 ? (
          // إذا كانت المنتجات غير موجودة
          <div className="text-center text-gray-500 font-semibold">
            لا توجد منتجات في هذه الفئة حالياً.
          </div>
        ) : (
          // عرض المنتجات بعد التحميل بنجاح
          <div className="flex flex-wrap gap-6 justify-center">
            {
              items.products?.map((product, idx) => (
                <Card
                  key={idx}
                  className="w-[250px] rounded-2xl shadow-md overflow-hidden bg-white"
                >
                  <CardContent className="p-2">
                    <div className="relative flex flex-col items-center justify-center">
                      <Image
                        src={product.colorsSizePrice[0].images[0].img}
                        alt={product.title}
                        width={150}
                        height={150}
                        className="object-cover rounded-lg"
                      />
                      <div className="absolute top-1 right-1 flex flex-col gap-1 z-10">
                        <button className="bg-white p-1 rounded-full shadow hover:bg-rose-100 transition-all duration-200 hover:scale-110 active:scale-95">
                          <Heart className="text-rose-500 w-4 h-4" />
                        </button>
                        <button className="bg-white p-1 rounded-full shadow hover:bg-blue-100 transition-all duration-200 hover:scale-110 active:scale-95">
                          <ShoppingCart className="text-blue-500 w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold mt-2 line-clamp-2">{product.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(product?.colorsSizePrice[0]?.sizesAndPrices[0]?.finalPrice)} جنيه مصري
                    </p>
                    <p className="text-xs text-yellow-500">التقييم: {product.rating}★</p>
                    <div className="flex gap-1 justify-end mt-2">
                      {product.colorsSizePrice.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.colorName }}
                        ></span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        )}
      </main>
    </div>
  );
};

export default Collection;
