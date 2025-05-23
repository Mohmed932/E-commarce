import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Brand = () => {
  const brand = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    image: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/81/0189031/1.jpg",
  }));

  return (
    <div className="w-full bg-white py-8 mb-10">
      <h2 className="text-center text-2xl font-bold mb-6">تسوق حسب الماركة</h2>
      <Carousel>
        <CarouselContent className="flex gap-4 px-4">
          {brand.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 flex justify-center"
            >
              <Image
                src={item.image}
                alt={`Brand ${item.id}`}
                width={150}
                height={150}
                className="object-contain rounded-xl shadow-sm"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Brand;
