"use client";
import { INavLinks } from "@/types/nav-links-type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ data }: { data: INavLinks[] }) => {
  const pathname = usePathname();
  return (
    <div className="mx-auto flex max-w-7xl flex-wrap items-center  sm:gap-2 md:gap-3 px-4 py-4 ">
      {data.map((link) => {
        const isActive = pathname === `/category/${link.id}`;

        return (
          <div key={link.id}>
            <Link
              href={`/category/${link.id}`}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[13px] transition-colors md:text-[14px] ${
                isActive
                  ? "bg-[#05893e] font-semibold text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{link.icon}</span>
              <span>{link.nameBn}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveLink;
