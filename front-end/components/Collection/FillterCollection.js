'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Slider } from "../ui/slider"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { fetchProducts } from "@/redux/slices/product/filter"

const FillterCollection = ({ label ,category}) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.subCategory);
  const data = categories[label];

  const [subCategory, setSubCategory] = useState("")
  const [size, setSize] = useState("")
  const [minDiscount, setMinDiscount] = useState(0)
  const [maxDiscount, setMaxDiscount] = useState(100)
  const [minRate, setMinRate] = useState(1)
  const [maxRate, setMaxRate] = useState(5)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)

  const resetFilters = () => {
    setSubCategory("")
    setSize("")
    setMinDiscount(0)
    setMaxDiscount(100)
    setMinRate(1)
    setMaxRate(5)
    setMinPrice(0)
    setMaxPrice(1000)
    dispatch(fetchProducts()) // إعادة تحميل الكل
  }

  const applyFilters = () => {
    dispatch(fetchProducts({
      ...(subCategory && { subCategory }),
      ...(size && { size }),
      category,
      minDiscount,
      maxDiscount,
      minRate,
      maxRate,
      minPrice,
      maxPrice,
      page: 1,
      limit: 20
    }))
  }

  return (
    <aside className="w-full space-y-6 p-4 md:p-5 rounded-lg lg:shadow-sm lg:sticky bg-white top-36">
      <h2 className="text-xl font-semibold">تصفية المنتجات</h2>

      {/* ✅ الفئة */}
      <div>
        <label className="block mb-2 font-medium">الفئة</label>
        {loading ? (
          <p>جاري التحميل...</p>
        ) : error ? (
          <p className="text-red-500">حدث خطأ أثناء جلب الفئات</p>
        ) : (
          <Select value={subCategory} onValueChange={setSubCategory}>
            <SelectTrigger className="w-full bg-gray-100">
              <SelectValue placeholder="اختر فئة" />
            </SelectTrigger>
            <SelectContent>
              {data?.map((cat, idx) => (
                <SelectItem key={idx} value={cat.name}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* ✅ المقاس */}
      <div>
        <label className="block mb-2 font-medium">المقاس</label>
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger className="w-full bg-gray-100">
            <SelectValue placeholder="اختر المقاس" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="S">صغير (S)</SelectItem>
            <SelectItem value="M">متوسط (M)</SelectItem>
            <SelectItem value="L">كبير (L)</SelectItem>
            <SelectItem value="XL">كبير جدًا (XL)</SelectItem>
            <SelectItem value="XXL">كبير جدًا (XXL)</SelectItem>
            <SelectItem value="XXXL">كبير جدًا (XXXL)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ✅ الخصم */}
      <div>
        <label className="block mb-2 font-medium">الخصم: من {minDiscount}% إلى {maxDiscount}%</label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[minDiscount, maxDiscount]}
          onValueChange={(val) => {
            setMinDiscount(val[0])
            setMaxDiscount(val[1])
          }}
        />
      </div>

      {/* ✅ التقييم */}
      <div>
        <label className="block mb-2 font-medium">التقييم: من {minRate} إلى {maxRate}</label>
        <Slider
          min={1}
          max={5}
          step={1}
          value={[minRate, maxRate]}
          onValueChange={(val) => {
            setMinRate(val[0])
            setMaxRate(val[1])
          }}
        />
      </div>

      {/* ✅ السعر */}
      <div>
        <label className="block mb-2 font-medium">السعر: من {minPrice} إلى {maxPrice} جنيه</label>
        <Slider
          min={0}
          max={2000}
          step={10}
          value={[minPrice, maxPrice]}
          onValueChange={(val) => {
            setMinPrice(val[0])
            setMaxPrice(val[1])
          }}
        />
      </div>

      {/* ✅ الأزرار */}
      <div className="flex flex-col gap-3 mt-4">
        <Button onClick={applyFilters} className="w-full bg-green-600 hover:bg-green-700 text-white">
          تطبيق الفلاتر
        </Button>
        <Button onClick={resetFilters} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
          إعادة تعيين الفلاتر
        </Button>
      </div>
    </aside>
  )
}

export default FillterCollection
