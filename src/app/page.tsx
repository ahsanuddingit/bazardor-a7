import AllProducts from "@/components/home/AllProducts";
import Banner from "@/components/home/Banner";
import TodayIncreasedPrice from "@/components/home/TodayIncreasedPrice";
import TodayPriceFalling from "@/components/home/TodayPriceFalling";

const HomePage = () => {
  return (
    <div className="bg-[#e1e8e163] ">
      <Banner></Banner>
      <TodayIncreasedPrice></TodayIncreasedPrice>
      <TodayPriceFalling></TodayPriceFalling>
      <AllProducts></AllProducts>
    </div>
  );
};

export default HomePage;
