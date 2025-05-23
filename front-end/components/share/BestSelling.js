import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const BestSelling = () => {
  const bestSelling = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: "ملابس السباحة",
    image: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/81/0189031/1.jpg",
    price: 100,
    priceDiscount: 80,
    discount: 20,
  }));

  return (
    <div className="w-full bg-white py-8">
      <h2 className="text-center text-2xl font-bold mb-6 ml-3">الاكثر مبيعاً</h2>
      <Carousel>
        <CarouselContent>
          {bestSelling.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 px-2" // margin أفقي بين الصور
            >
              <div className="relative w-full h-[200px] rounded overflow-hidden shadow-sm">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="mt-2 text-end text-sm">{item.name}</p>
              <div className="mx-1 flex items-center justify-between px-2 py-1 rounded">
                <p className="text-sm text-gray-500 line-through">{item.price} ج.م</p>
                <p className="text-sm text-red-500 font-semibold">{item.priceDiscount} ج.م</p>
              </div>

            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default BestSelling;
