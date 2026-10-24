import { IMarquee } from "@/types/marquee-links-type";
import HomePageProducts from "./HomePageProducts";

const AllProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data: IMarquee[] = await res.json();

  return (
    <div>
      <HomePageProducts data={data}></HomePageProducts>
    </div>
  );
};

export default AllProducts;
