"use client";
import { INavLinks } from "@/types/nav-links-type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ data }: { data: INavLinks[] }) => {
  const pathname = usePathname();
  
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth">
        {data.map((link) => {
          const isActive = pathname === `/category/${link.id}`;

          return (
            <div key={link.id} className="shrink-0">
              <Link
                href={`/category/${link.id}`}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-[13px] transition-colors md:text-[14px] ${
                  isActive
                    ? "bg-[#05893e] font-semibold text-white shadow-sm"
                    : "text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-100"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.nameBn}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveLink;