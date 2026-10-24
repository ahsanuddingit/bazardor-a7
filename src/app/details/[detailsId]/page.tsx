import Link from "next/link";
import { notFound } from "next/navigation";

interface ParamsProps {
  params: Promise<{
    detailsId: string;
  }>;
}

const unitBn: Record<string, string> = {
  litre: "লিটার",
  piece: "পিস",
  kg: "কেজি",
  dozen: "ডজন",
};

const DetailsPage = async ({ params }: ParamsProps) => {
  const { detailsId } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${detailsId}`,
  );

  if (!res.ok) {
    notFound();
  }

  const product = await res.json();

  const prices = product.markets.flatMap(
    (market: { min: number; max: number }) => [market.min, market.max],
  );

  const minimumPrice = Math.min(...prices);
  const maximumPrice = Math.max(...prices);

  const averagePrice =
    prices.reduce((sum: number, price: number) => sum + price, 0) /
    prices.length;

  return (
    <div className="min-h-screen bg-[#f3f7f3] py-6">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <Link href={"/"}>
            <button className="cursor-pointer">হোম</button>
          </Link>
          <span>›</span>
          <Link href={`/category/${product.category}`}>
            {product.categoryNameBn}
          </Link>

          <span>›</span>
          <span>{product.nameBn}</span>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between gap-5">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f1f6f1] text-4xl">
                {product.image}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {unitBn[product.unit]}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  গতকালের তুলনায় আজকের দাম{" "}
                  {product.today > product.yesterday ? "বেড়েছে" : "কমেছে"}{" "}
                  {Math.abs(product.today - product.yesterday).toLocaleString(
                    "bn-BD",
                  )}{" "}
                  টাকা
                </p>
              </div>
            </div>

            <div className="min-w-31.25 rounded-xl bg-[#f1f6f1] px-5 py-4 text-center">
              <p className="text-xs text-gray-500">আজকের দাম</p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {product.today.toLocaleString("bn-BD")}
              </p>

              <p className="text-xs text-gray-500">
                টাকা / {unitBn[product.unit]}
              </p>

              <p
                className={`mt-1 text-sm font-semibold ${
                  product.change.dir === "up"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {minimumPrice.toLocaleString("bn-BD")} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">সর্বাধিক দাম</p>

              <p className="mt-1 text-2xl font-bold text-red-500">
                {maximumPrice.toLocaleString("bn-BD")} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">গড় দাম</p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {averagePrice.toLocaleString("bn-BD", {
                  maximumFractionDigits: 1,
                })}{" "}
                টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unitBn[product.unit]}-র হিসাব
              </p>
            </div>
          </div>

          <h2 className="mt-7 text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
            <div className="hidden md:grid md:grid-cols-5 bg-[#f8faf8] px-4 py-3 text-sm font-medium text-gray-500">
              <span>বাজার</span>
              <span>বিভাগ</span>
              <span className="text-right">সর্বনিম্ন</span>
              <span className="text-right">সর্বাধিক</span>
              <span className="text-right">গড়</span>
            </div>

            {product.markets.map(
              (
                market: {
                  market: string;
                  division: string;
                  min: number;
                  max: number;
                },
                index: number,
              ) => {
                const average = (market.min + market.max) / 2;

                return (
                  <div
                    key={`${market.market}-${index}`}
                    className="border-t border-gray-200 px-4 py-3 text-sm text-gray-700"
                  >
                    <div className="hidden md:grid md:grid-cols-5 md:items-center">
                      <span>{market.market}</span>

                      <span>{market.division}</span>

                      <span className="text-right">
                        {market.min.toLocaleString("bn-BD")} টাকা
                      </span>

                      <span className="text-right">
                        {market.max.toLocaleString("bn-BD")} টাকা
                      </span>

                      <span className="text-right font-medium">
                        {average.toLocaleString("bn-BD", {
                          maximumFractionDigits: 1,
                        })}{" "}
                        টাকা
                      </span>
                    </div>

                    <div className="md:hidden">
                      <div className="grid grid-cols-3 items-center gap-2">
                        <div>
                          <p className="text-xs text-gray-500">বাজার</p>
                          <p>{market.market}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">বিভাগ</p>
                          <p>{market.division}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-500">সর্বনিম্ন</p>
                          <p>{market.min.toLocaleString("bn-BD")} টাকা</p>
                        </div>
                      </div>

                      <div className="mt-3  pt-3">
                        <div className="grid grid-cols-2 items-center gap-8">
                          <div>
                            <p className="text-xs text-gray-500">সর্বাধিক</p>
                            <p>{market.max.toLocaleString("bn-BD")} টাকা</p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">গড়</p>
                            <p className="font-medium">
                              {average.toLocaleString("bn-BD", {
                                maximumFractionDigits: 1,
                              })}{" "}
                              টাকা
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
