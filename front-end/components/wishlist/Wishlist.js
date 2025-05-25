'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import whislistImage from '../../public/whislist.png'
import Link from 'next/link'


const initialItems = [
  {
    id: 1,
    name: "بنطال جينز رجالي ضيق",
    price: "$49.99",
    image: "https://townteam.com/cdn/shop/files/TST25SSPT15004TM1-Beige-2_1880x.jpg",
    category: "رجالي",
    colors: ["#f0e0ee", "#000000"],
  },
  {
    id: 2,
    name: "فستان صيفي نسائي",
    price: "$39.99",
    image: "https://townteam.com/cdn/shop/files/TSH25WPRO35002TB1-OFFWHIT-2_1880x.jpg",
    category: "نسائي",
    colors: ["#f0e0ee", "#fff5e5"],
  },
  {
    id: 3,
    name: "تيشيرت أطفال بطبعة",
    price: "$19.99",
    image: "https://townteam.com/cdn/shop/files/TST25SSNP15028TB1-Orange-6_1880x.jpg",
    category: "أطفال",
    colors: ["#f0e0ee", "#ff9900"],
  },
  {
    id: 4,
    name: "قميص رجالي كاجوال",
    price: "$34.99",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRO20525TM1-Black_1880x.jpg",
    category: "رجالي",
    colors: ["#f0e0ee", "#333333"],
  },
  {
    id: 5,
    name: "ليجن يوغا نسائي",
    price: "$29.99",
    image: "https://townteam.com/cdn/shop/files/SSH25SXIR31146TB1-Blue-2_1880x.jpg",
    category: "نسائي",
    colors: ["#f0e0ee", "#3366cc"],
  },
  {
    id: 6,
    name: "جاكيت جينز أطفال",
    price: "$39.99",
    image: "https://townteam.com/cdn/shop/files/TSH25SPRS32741TB1-Green-3_1880x.jpg",
    category: "أطفال",
    colors: ["#f0e0ee", "#00cc66"],
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialItems)
  const [selected, setSelected] = useState([])

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const removeItems = () => {
    setWishlist(wishlist.filter(item => !selected.includes(item.id)))
    setSelected([])
  }

  const moveToCart = () => {
    alert(`تم النقل إلى السلة: ${selected.join(', ')}`)
    setWishlist(wishlist.filter(item => !selected.includes(item.id)))
    setSelected([])
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto" dir='rtl'>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">اللي نفسي أشتريه</h1>

      {wishlist.length === 0 ? (
        <div className="text-center mt-10">
          <Image
            src={whislistImage}
            alt="فارغة"
            width={500}
            height={500}
            className="mx-auto mb-4"
          />
          <p className="text-lg font-medium">قائمة الأمنيات فارغة</p>
          <p className="text-sm text-gray-500 mb-4">
            تصفح مجموعاتنا وأضف المنتجات المفضلة لديك.
          </p>
          <Link href="/">
            <Button>متابعة التسوق</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {wishlist.map((item, idx) => (
              <Card key={idx} className="relative">
                <Checkbox
                  checked={selected.includes(item.id)}
                  onCheckedChange={() => toggleSelect(item.id)}
                  className="absolute top-2 left-2 z-10"
                />
                <CardContent className="pt-6 flex flex-col items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={150}
                    height={200}
                    className="mb-4 object-contain"
                  />
                  <p className="text-sm text-center">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selected.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={moveToCart}>نقل إلى السلة</Button>
              <Button variant="destructive" onClick={removeItems}>
                حذف
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
