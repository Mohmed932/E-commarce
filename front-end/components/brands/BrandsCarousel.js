import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

const brands = [
    { name: "Nike", image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Adidas", image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "H&M", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
    { name: "Nike", image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Adidas", image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "H&M", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
    { name: "Nike", image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Adidas", image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "H&M", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
    { name: "Nike", image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Adidas", image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "H&M", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
    { name: "Nike", image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Adidas", image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "H&M", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
    { name: "Nike", image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Adidas", image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "H&M", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
];

export default function BrandsCarousel() {
    return (
        <section className="py-10 bg-[#fdfbf9] my-10">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-right">الماركات المتوفرة</h2>
                <Carousel>
                    <CarouselPrevious />
                    <CarouselContent>
                        {brands.map((brand, index) => (
                            <CarouselItem key={index} className="basis-1/3 md:basis-1/6">
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="rounded-2xl shadow-md overflow-hidden w-[120px] h-[120px] relative">
                                        <Image
                                            src={brand.image}
                                            alt={brand.name}
                                            fill
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                    <p className="text-sm font-medium text-center">{brand.name}</p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
}