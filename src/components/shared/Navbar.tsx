import Image from "next/image";
import Buttons from "../user-session/Buttons";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { connection } from "next/server"; // এটি নেক্সট জেএস থেকে ইমপোর্ট করুন

const Navbar = async ({ marquee }: { marquee?: React.ReactNode }) => {
  // ডায়নামিক রেন্ডারিং নিশ্চিত করার জন্য এটি কল করতে হবে
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <div className="sticky top-0 z-40 bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="hidden md:block bg-[#05893e] px-2.5 py-2.5 rounded-2xl">
              <Image
                src={"/images/logo-icon.png"}
                alt="logo"
                width={30}
                height={30}
              />
            </div>
            <div>
              <Link href={"/"}>
                <h1 className="text-[#1d271f] text-[15px] md:text-[20px] font-bold">
                  বাজার দর
                </h1>
                <p className="text-[#1d271f] text-[10px] md:text-[14px]">
                  {date}
                </p>
              </Link>
            </div>
          </div>

          <div>
            <Buttons />
          </div>
        </div>

        <div className="border-t border-gray-200">
          <NavLinks />
        </div>
      </div>

      {marquee}
    </div>
  );
};

export default Navbar;