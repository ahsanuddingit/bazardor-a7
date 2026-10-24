import { IMarquee } from "@/types/marquee-links-type";
import Link from "next/link";

const ProductCard = ({ upProducts }: { upProducts: IMarquee }) => {
  const unitBn: Record<string, string> = {
    litre: "লিটার",
    piece: "পিস",
    kg: "কেজি",
    dozen: "ডজন",
  };

  const isUp = upProducts.today > upProducts.yesterday;

  return (
    <Link href={`/details/${upProducts.id}`} className="group block">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 group-hover:shadow-md group-hover:border-gray-300">
        {/* Top */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl group-hover:scale-105 transition-transform">
            {upProducts.image}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-gray-900 truncate">{upProducts.nameBn}</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              প্রতি {unitBn[upProducts.unit]}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
          <div>
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="font-bold text-gray-900 text-base">
              {upProducts.today.toLocaleString("bn-BD")} <span className="text-sm font-normal text-gray-600">টাকা</span>
            </p>
          </div>

          <div
            className={`rounded-full px-2.5 py-1 text-xs font-semibold flex items-center gap-1 ${
              isUp ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
            }`}
          >
            <span>{isUp ? "▲" : "▼"}</span>
            <span>
              {(
                ((upProducts.today - upProducts.yesterday) /
                  upProducts.yesterday) *
                100
              ).toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;