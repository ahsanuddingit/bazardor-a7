import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // আপনার প্রজেক্টের auth কনফিগারেশন অনুযায়ী ইমপোর্ট পাথ ঠিক করে নেবেন

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
  // ১. প্রথমে চেক করা হচ্ছে ব্যবহারকারী সাইন ইন করা আছে কিনা
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // যদি সাইন ইন করা না থাকে, সরাসরি সাইন-ইন পেজে রিডাইরেক্ট করে দেওয়া হবে
  if (!session) {
    redirect("/sign-in");
  }

  const { detailsId } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${detailsId}`
  );

  if (!res.ok) {
    notFound();
  }

  const product = await res.json();

  const prices = product.markets.flatMap(
    (market: { min: number; max: number }) => [market.min, market.max]
  );

  const minimumPrice = Math.min(...prices);
  const maximumPrice = Math.max(...prices);

  const averagePrice =
    prices.reduce((sum: number, price: number) => sum + price, 0) /
    prices.length;

  const isUp = product.today > product.yesterday;

  return (
    <div className="min-h-screen bg-[#f3f7f3] py-6">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-1">
          <Link href={"/"}>
            <button className="cursor-pointer hover:text-gray-900">হোম</button>
          </Link>
          <span>›</span>
          <Link href={`/category/${product.category}`} className="hover:text-gray-900">
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.nameBn}</span>
        </div>

        {/* Main Header Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-3xl">
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
                  {isUp ? "বেড়েছে" : "কমেছে"}{" "}
                  {Math.abs(product.today - product.yesterday).toLocaleString(
                    "bn-BD"
                  )}{" "}
                  টাকা
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto rounded-2xl bg-[#f8faf8] border border-gray-100 px-6 py-4 text-center">
              <p className="text-xs text-gray-500">আজকের দাম</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {product.today.toLocaleString("bn-BD")}
              </p>
              <p className="text-xs text-gray-500">
                টাকা / {unitBn[product.unit]}
              </p>
              <p
                className={`mt-1.5 text-sm font-semibold flex items-center justify-center gap-1 ${
                  isUp ? "text-red-500" : "text-green-600"
                }`}
              >
                <span>{isUp ? "▲" : "▼"}</span>
                <span>{Math.abs(product.change.pct).toLocaleString("bn-BD")}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/50">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-2xl font-bold text-green-600">
                {minimumPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/50">
              <p className="text-sm text-gray-500">সর্বাধিক দাম</p>
              <p className="mt-1 text-2xl font-bold text-red-500">
                {maximumPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/50">
              <p className="text-sm text-gray-500">গড় দাম</p>
              <p className="mt-1 text-2xl font-bold text-[#05893e]">
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

          <h2 className="mt-8 text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="hidden md:grid md:grid-cols-5 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500 border-b border-gray-200">
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
                index: number
              ) => {
                const average = (market.min + market.max) / 2;

                return (
                  <div
                    key={`${market.market}-${index}`}
                    className="border-b border-gray-100 last:border-none px-4 py-3.5 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="hidden md:grid md:grid-cols-5 md:items-center">
                      <span className="font-medium text-gray-900">{market.market}</span>
                      <span className="text-gray-600">{market.division}</span>
                      <span className="text-right">{market.min.toLocaleString("bn-BD")} টাকা</span>
                      <span className="text-right">{market.max.toLocaleString("bn-BD")} টাকা</span>
                      <span className="text-right font-semibold text-gray-900">
                        {average.toLocaleString("bn-BD", {
                          maximumFractionDigits: 1,
                        })}{" "}
                        টাকা
                      </span>
                    </div>

                    <div className="md:hidden space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{market.market}</p>
                          <p className="text-xs text-gray-500">{market.division}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">গড় দাম</p>
                          <p className="font-semibold text-gray-900">
                            {average.toLocaleString("bn-BD", {
                              maximumFractionDigits: 1,
                            })}{" "}
                            টাকা
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>সর্বনিম্ন: <strong className="text-gray-900">{market.min.toLocaleString("bn-BD")} টাকা</strong></span>
                        <span>সর্বাধিক: <strong className="text-gray-900">{market.max.toLocaleString("bn-BD")} টাকা</strong></span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;