import Image from "next/image";
import { connection } from "next/server";

const Banner = async () => {
  // Next.js-কে বলে দেওয়া যে এটি রিকোয়েস্ট টাইমে রেন্ডার হবে (Static prerender এড়াতে)
  await connection();

  const today = new Date();

  const formattedDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <div className="px-4">
      <div className="bg-white border border-gray-200 rounded-[20px] md:rounded-[25px] mt-6 md:mt-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-15 gap-8">
        <div className="w-full md:w-1/2">
          <span className="inline-block text-[#3ebe76] font-bold text-[13px] md:text-[14px] bg-[#1f8e4f11] rounded-full px-3 py-1">
            {formattedDate}
          </span>
          <div className="space-y-3 mt-3">
            <h1 className="text-[#1d271f] text-[28px] sm:text-[34px] md:text-[40px] font-bold leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-[#878c87] text-[14px] md:text-[15px] leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div className="pt-2">
              <a href="#allProducts">
                <button className="cursor-pointer font-bold bg-[#05893e] hover:bg-[#046e31] transition-colors text-white px-6 py-3.5 rounded-[10px] text-sm md:text-base">
                  সব পণ্য দেখুন
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-center">
          <Image
            src={"/images/bazar-hero.png"}
            alt="bazar hero"
            width={320}
            height={320}
            className="w-64 h-64 md:w-[350px] md:h-[350px] object-contain"
            priority
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Banner;