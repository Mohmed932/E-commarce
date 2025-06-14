"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function ProductUploadForm() {
  // التصنيفات الرئيسية
  const mainCategories = [
    { id: "68407b787192141aeca28d7e", label: "نساء" },
    { id: "68407b897192141aeca28d81", label: "رجال" },
    { id: "68409d7a7192141aeca28dcd", label: "أطفال ولادي" },
    { id: "68409db77192141aeca28dd0", label: "أطفال بناتي" },
  ];

  // الحالات
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState(10);
  const [category, setCategory] = useState(mainCategories[0].id);
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [brand, setBrand] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [overview, setOverview] = useState([]);
  const [colors, setColors] = useState([]);

  // جلب التصنيفات الفرعية عند تغير التصنيف الرئيسي
  useEffect(() => {
    async function fetchSubCategories() {
      setLoadingSubCategories(true);
      try {
        const res = await fetch(`http://localhost:5000/api/v1/subcategory/${category}`);
        if (!res.ok) throw new Error("فشل تحميل التصنيفات الفرعية");
        const data = await res.json();
        setSubCategories(data);
        console.log(subCategories)
        if (data.length > 0) setSubCategory(data[0].id);
        else setSubCategory("");
      } catch (error) {
        console.error(error);
        setSubCategories([]);
        setSubCategory("");
      }
      setLoadingSubCategories(false);
    }
    fetchSubCategories();
  }, [category]);

  // إضافات
  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };
  const addOverview = () => {
    setOverview([...overview, ""]);
  };
  const addColor = () => {
    setColors([...colors, { colorName: "", images: [], sizesAndPrices: [] }]);
  };

  // الرفع
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const colorsSizePrice = [];
    for (let color of colors) {
      for (let file of color.images) {
        const uniqueName = `${color.colorName}_${file.name}`;
        formData.append("images", file, uniqueName);
      }
      colorsSizePrice.push({
        colorName: color.colorName,
        sizesAndPrices: color.sizesAndPrices,
      });
    }

    formData.append(
      "data",
      JSON.stringify({
        title,
        discount,
        category,
        subCategory,
        brand,
        specifications,
        overview: [{ key: "المميزات", value: overview }],
        colorsSizePrice,
      })
    );

    try {
      const res = await fetch("http://localhost:5000/api/v1/product", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      toast.success("تم رفع المنتج بنجاح");
      console.log("تم رفع المنتج:", data);
    } catch (err) {
      console.error(err);
      toast.error("فشل رفع المنتج");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto bg-white rounded-md shadow-md mt-10" dir="rtl">
      <h2 className="text-2xl font-bold mb-4">رفع منتج جديد</h2>

      <div>
        <Label>اسم المنتج</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <Label>نسبة الخصم</Label>
        <Input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(+e.target.value)}
        />
      </div>

      <div>
        <Label>التصنيف الرئيسي</Label>
        <select
          className="w-full border border-gray-300 rounded-md p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {mainCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>التصنيف الفرعي</Label>
        {loadingSubCategories ? (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            disabled={subCategories.length === 0}
          >
            {subCategories.length === 0 ? (
              <option>لا يوجد تصنيفات فرعية</option>
            ) : (
              subCategories.map((sub) => (
                <option key={`sub-${sub._id}`} value={sub.id}>
                  {sub.name}
                </option>
              ))
            )}
          </select>
        )}
      </div>

      <div>
        <Label>اسم الماركة</Label>
        <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
      </div>

      <Card className="p-4 space-y-2">
        <Label className="text-lg">المواصفات</Label>
        {specifications.map((spec, idx) => (
          <div key={`spec-${idx}`} className="grid grid-cols-2 gap-2">
            <Input
              placeholder="العنوان"
              value={spec.key}
              onChange={(e) => {
                const newSpecs = [...specifications];
                newSpecs[idx].key = e.target.value;
                setSpecifications(newSpecs);
              }}
            />
            <Input
              placeholder="القيمة"
              value={spec.value}
              onChange={(e) => {
                const newSpecs = [...specifications];
                newSpecs[idx].value = e.target.value;
                setSpecifications(newSpecs);
              }}
            />
          </div>
        ))}

        <Button type="button" onClick={addSpecification}>
          + إضافة مواصفة
        </Button>
      </Card>

      <Card className="p-4 space-y-2">
        <Label className="text-lg">نظرة عامة</Label>
        {overview.map((item, idx) => (
          <Input
            key={`overview-${idx}`}
            value={item}
            onChange={(e) => {
              const newOverview = [...overview];
              newOverview[idx] = e.target.value;
              setOverview(newOverview);
            }}
            placeholder="نقطة مميزة"
          />
        ))}
        <Button type="button" onClick={addOverview}>
          + إضافة نقطة مميزة
        </Button>
      </Card>

      <Card className="p-4 space-y-4">
        <Label className="text-lg">ألوان المنتج</Label>
        {colors.map((color, colorIdx) => (
          <div key={`color-${colorIdx}`} className="space-y-2">
            <Input
              placeholder="اسم اللون"
              value={color.colorName}
              onChange={(e) => {
                const newColors = [...colors];
                newColors[colorIdx].colorName = e.target.value;
                setColors(newColors);
              }}
            />
            <Input
              type="file"
              multiple
              onChange={(e) => {
                const newColors = [...colors];
                newColors[colorIdx].images = Array.from(e.target.files);
                setColors(newColors);
              }}
            />
            <div className="space-y-1">
              {color.sizesAndPrices.map((size, sizeIdx) => (
                <div key={sizeIdx} className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="المقاس"
                    value={size.size}
                    onChange={(e) => {
                      const newColors = [...colors];
                      newColors[colorIdx].sizesAndPrices[sizeIdx].size =
                        e.target.value;
                      setColors(newColors);
                    }}
                  />
                  <Input
                    placeholder="السعر"
                    type="number"
                    value={size.price}
                    onChange={(e) => {
                      const newColors = [...colors];
                      newColors[colorIdx].sizesAndPrices[sizeIdx].price =
                        e.target.value;
                      setColors(newColors);
                    }}
                  />
                  <Input
                    placeholder="الكمية"
                    type="number"
                    value={size.quantity}
                    onChange={(e) => {
                      const newColors = [...colors];
                      newColors[colorIdx].sizesAndPrices[sizeIdx].quantity =
                        e.target.value;
                      setColors(newColors);
                    }}
                  />
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newColors = [...colors];
                  newColors[colorIdx].sizesAndPrices.push({
                    size: "",
                    price: "",
                    quantity: "",
                  });
                  setColors(newColors);
                }}
              >
                + إضافة مقاس
              </Button>
              <Separator />
            </div>
          </div>
        ))}
        <Button type="button" onClick={addColor}>
          + إضافة لون
        </Button>
      </Card>

      <Button type="submit">رفع المنتج</Button>
    </form>
  );
}
