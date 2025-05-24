import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Slider } from '../ui/slider'
import { Button } from '../ui/button'

const FillterCollection = ({
    setCategory,
    setSize,
    setColor,
    setRating,
    maxPrice,
    setMaxPrice,
    resetFilters,
}) => {
    return (
        <aside className="w-full space-y-6 p-4 md:p-5 rounded-lg  lg:shadow-sm lg:sticky bg-white top-36">
            <h2 className="text-xl font-semibold">تصفيه المنتجات</h2>

            <div>
                <label className="block mb-2 font-medium">الفئة</label>
                <Select onValueChange={setCategory}>
                    <SelectTrigger className="w-full bg-gray-100">
                        <SelectValue placeholder="اختر فئة" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tshirts">تيشيرتات</SelectItem>
                        <SelectItem value="trousers">بناطيل</SelectItem>
                        <SelectItem value="jackets">جاكيتات</SelectItem>
                        <SelectItem value="shoes">أحذية</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="block mb-2 font-medium">المقاس</label>
                <Select onValueChange={setSize}>
                    <SelectTrigger className="w-full bg-gray-100">
                        <SelectValue placeholder="اختر المقاس" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="s">صغير (S)</SelectItem>
                        <SelectItem value="m">متوسط (M)</SelectItem>
                        <SelectItem value="l">كبير (L)</SelectItem>
                        <SelectItem value="xl">كبير جدًا (XL)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="block mb-2 font-medium">اللون</label>
                <Select onValueChange={setColor}>
                    <SelectTrigger className="w-full bg-gray-100">
                        <SelectValue placeholder="اختر اللون" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="green">أخضر</SelectItem>
                        <SelectItem value="brown">بني</SelectItem>
                        <SelectItem value="black">أسود</SelectItem>
                        <SelectItem value="beige">بيج</SelectItem>
                        <SelectItem value="blue">أزرق</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="block mb-2 font-medium">التقييم</label>
                <Select onValueChange={setRating}>
                    <SelectTrigger className="w-full bg-gray-100">
                        <SelectValue placeholder="اختر التقييم" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">نجمة واحدة أو أكثر</SelectItem>
                        <SelectItem value="2">نجمتان أو أكثر</SelectItem>
                        <SelectItem value="3">3 نجمات أو أكثر</SelectItem>
                        <SelectItem value="4">4 نجمات أو أكثر</SelectItem>
                        <SelectItem value="5">5 نجمات</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    السعر الأقصى: ${maxPrice}
                </label>
                <Slider
                    min={20}
                    max={150}
                    step={1}
                    defaultValue={[150]}
                    value={[maxPrice]}
                    className="bg-amber-500"
                    onValueChange={(value) => setMaxPrice(value[0])}
                />
            </div>

            <Button onClick={resetFilters} className="w-full mt-4 bg-amber-500">
                إعادة تعيين الفلاتر
            </Button>
        </aside>
    )
}

export default FillterCollection
