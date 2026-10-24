"use client";

import { useState, useRef, useEffect } from "react";
import { IMarquee } from "@/types/marquee-links-type";
import ProductCard from "../home/ProductCard";

const sortOptions = [
  { value: "default", label: "ডিফল্ট" },
  { value: "low-to-high", label: "দাম: কম থেকে বেশি" },
  { value: "high-to-low", label: "দাম: বেশি থেকে কম" },
];

const ProductSection = ({ data }: { data: IMarquee[] }) => {
  const [sortOrder, setSortOrder] = useState("default");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const currentLabel =
    sortOptions.find((o) => o.value === sortOrder)?.label ?? "ডিফল্ট";

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.today - b.today;
    }

    if (sortOrder === "high-to-low") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <>
      <div className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-[15px] px-3 py-3 mt-5 mb-4">
        <div className="min-w-0">
          <h1 className="font-bold text-[16px] md:text-[18px]">সব পণ্য</h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            {`মোট ${data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-gray-600 shrink-0 hidden sm:inline">সাজান</span>

          <div ref={dropdownRef} className="relative w-full max-w-50">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white text-left"
            >
              <span className="truncate">{currentLabel}</span>
              <svg
                className={`h-4 w-4 shrink-0 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpen && (
              <ul
                role="listbox"
                className="absolute right-0 top-full z-50 mt-1 w-full min-w-max max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
              >
                {sortOptions.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={sortOrder === option.value}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSortOrder(option.value);
                        setIsOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${
                        sortOrder === option.value
                          ? "bg-gray-100 font-medium text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-5">
        {sortedData.map((product) => (
          <ProductCard key={product.id} upProducts={product} />
        ))}
      </div>
    </>
  );
};

export default ProductSection;
