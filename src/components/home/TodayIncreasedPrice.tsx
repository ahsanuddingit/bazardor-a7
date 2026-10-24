import { IMarquee } from "@/types/marquee-links-type";
import ProductCard from "./ProductCard";

const TodayIncreasedPrice = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data: IMarquee[] = await res.json();

  return (
    <div className=" mt-10 max-w-7xl mx-auto px-4 ">
      <h1 className="font-bold text-[18px]">
        <span className="text-red-500 ">▲</span> আজ দাম বেড়েছে
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        {data
          .filter((upProducts) => upProducts.change.dir === "up")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6)
          .map((upProducts) => (
            <ProductCard key={upProducts.id} upProducts={upProducts} />
          ))}
      </div>
    </div>
  );
};

export default TodayIncreasedPrice;
