import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { Star } from "lucide-react";
import customerImg from "../../public/customer.png";

const testimonials = [
    {
        name: "منة شريف",
        text: "بجد اللبس تحفة! الخامة ناعمة والمقاس طالع مظبوط أوي. أكيد هرجع أطلب تاني.",
        image: customerImg,
        rating: 5,
    },
    {
        name: "كريم علي",
        text: "عجبني أوي تنوع اللبس الرجالي، والدليفري جالي بسرعة. تجربة حلوة وهكررها.",
        image: customerImg,
        rating: 4,
    },
    {
        name: "نوران مراد",
        text: "لبس الأطفال جميل ومريح، وابني مبسوط بيه جدًا. بيستحمل الغسيل كمان!",
        image: customerImg,
        rating: 3,
    },
    {
        name: "أحمد سمير",
        text: "خدمة العملاء محترمة جدًا، والاختيارات كتير. لقيت اللي أنا عايزه والسعر حلو كمان.",
        image: customerImg,
        rating: 4,
    },
    {
        name: "دينا خالد",
        text: "الستايل حلو أوي، والخامة نضيفة. حسيت إني واخدة حاجة من بره بجد.",
        image: customerImg,
        rating: 5,
    },
    {
        name: "يوسف ناصر",
        text: "الموقع سهل أوي في الاستخدام، والطلبية وصلت في وقت قصير. حبيته بصراحة.",
        image: customerImg,
        rating: 3,
    },
    {
        name: "فاطمة ربيع",
        text: "اللبس طالع مظبوط وشكله شيك جدًا. حبيته من أول مرة شوفته فيها.",
        image: customerImg,
        rating: 4,
    },
    {
        name: "مروان حسام",
        text: "بصراحة اللبس عامل شغل عالي، وكل اللي شافني فيه سألني جايبه منين.",
        image: customerImg,
        rating: 5,
    },
];

const CustomerRate = () => {
    return (
        <section className="py-12 bg-white mt-10">
            <h2 className="text-3xl font-semibold text-center mb-8">ماذا يقول عملاؤنا</h2>
            <Carousel className="w-full max-w-6xl mx-auto">
                <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index}>
                            <Card className="items-center text-center p-4 shadow-md rounded-2xl min-h-[320px] flex flex-col">
                                <div className="w-24 h-24 mx-auto mb-4 relative">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <CardContent>
                                    <h3 className="font-semibold text-lg mb-2">{testimonial.name}</h3>
                                    <div className="mb-2 flex justify-center">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={`mx-0.5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                                strokeWidth={i < testimonial.rating ? 0 : 1}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600">"{testimonial.text}"</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
};

export default CustomerRate;
