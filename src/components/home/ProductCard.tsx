import { IMarquee } from "@/types/marquee-links-type";
import Link from "next/link";

const ProductCard = ({ upProducts }: { upProducts: IMarquee }) => {
  const unitBn: Record<string, string> = {
    litre: "লিটার",
    piece: "পিস",
    kg: "কেজি",
    dozen: "ডজন",
  };

  return (
    <Link href={`/details/${upProducts.id}`}>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 ">
        {/* Top */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 text-3xl">
            {upProducts.image}
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">{upProducts.nameBn}</h2>

            <p className="text-sm text-gray-500">
              প্রতি {unitBn[upProducts.unit]}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="font-bold text-gray-900">
              {upProducts.today.toLocaleString("bn-BD")} টাকা
            </p>
          </div>

          <div
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              upProducts.today > upProducts.yesterday
                ? "bg-gray-200 text-red-500"
                : "bg-gray-200 text-green-500"
            }`}
          >
            {upProducts.today > upProducts.yesterday ? "▲" : "▼"}{" "}
            {(
              ((upProducts.today - upProducts.yesterday) /
                upProducts.yesterday) *
              100
            ).toLocaleString("bn-BD", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            %
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
