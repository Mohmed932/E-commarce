import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

const BestSelling = () => {
  const products = [
    {
      name: "بنطال جينز رجالي ضيق",
      price: "$49.99",
      image: "https://townteam.com/cdn/shop/files/TST25SSPT15004TM1-Beige-2_1880x.jpg",
      category: "رجالي",
      colors: ["#f0e0ee", "#000000"],
    },
    {
      name: "فستان صيفي نسائي",
      price: "$39.99",
      image: "https://townteam.com/cdn/shop/files/TSH25WPRO35002TB1-OFFWHIT-2_1880x.jpg",
      category: "نسائي",
      colors: ["#f0e0ee", "#fff5e5"],
    },
    {
      name: "تيشيرت أطفال بطبعة",
      price: "$19.99",
      image: "https://townteam.com/cdn/shop/files/TST25SSNP15028TB1-Orange-6_1880x.jpg",
      category: "أطفال",
      colors: ["#f0e0ee", "#ff9900"],
    },
    {
      name: "قميص رجالي كاجوال",
      price: "$34.99",
      image: "https://townteam.com/cdn/shop/files/TSH25SPRO20525TM1-Black_1880x.jpg",
      category: "رجالي",
      colors: ["#f0e0ee", "#333333"],
    },
    {
      name: "ليجن يوغا نسائي",
      price: "$29.99",
      image: "https://townteam.com/cdn/shop/files/SSH25SXIR31146TB1-Blue-2_1880x.jpg",
      category: "نسائي",
      colors: ["#f0e0ee", "#3366cc"],
    },
    {
      name: "جاكيت جينز أطفال",
      price: "$39.99",
      image: "https://townteam.com/cdn/shop/files/TSH25SPRS32741TB1-Green-3_1880x.jpg",
      category: "أطفال",
      colors: ["#f0e0ee", "#00cc66"],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-14">
      <div className="w-2/3 m-5 shadow-md max-lg:w-3/4 max-md:w-11/12">
        <div className="w-full bg-white py-8">
          <h2 className="text-center text-2xl font-bold mb-6 ml-3">الاكثر مبيعاً</h2>
          <Carousel>
            <CarouselContent>
              {products.map((item,idx) => (
                <CarouselItem
                  key={idx}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 px-2" // margin أفقي بين الصور
                >
                  <div className="relative w-full h-[200px] rounded overflow-hidden shadow-sm">
                    <div className="absolute top-2 left-2 flex gap-2 z-10">
                      <button className="bg-white p-2 rounded-full shadow hover:bg-rose-100 transition-all duration-200 hover:scale-110 active:scale-95">
                        <Heart className="text-rose-500 w-5 h-5" />
                      </button>
                      <button className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition-all duration-200 hover:scale-110 active:scale-95">
                        <ShoppingCart className="text-blue-500 w-5 h-5" />
                      </button>
                    </div>
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className="mt-2 text-end text-sm">{item.name}</p>
                  <p className="mt-2 text-end text-sm">{item.price}</p>
                  <div className="flex gap-1 justify-end">
                    {item.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></span>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
