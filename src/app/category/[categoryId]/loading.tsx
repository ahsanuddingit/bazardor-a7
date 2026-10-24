"use client";
const loading = () => {
  return (
    <div className="bg-[#e1e8e163] animate-pulse">
      <div className="min-h-screen max-w-7xl mx-auto px-4 mt-10">
        {/* Category Header Skeleton */}
        <div className="flex items-center gap-4 rounded-[15px] border border-gray-200 bg-white px-3 py-3">
          <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-200" />

          <div className="flex-1 space-y-2">
            <div className="h-5 w-36 rounded bg-gray-200" />
            <div className="h-4 w-56 max-w-full rounded bg-gray-200" />
          </div>
        </div>

        {/* Product Section Skeleton */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              {/* Product Name */}
              <div className="mb-4 h-5 w-3/4 rounded bg-gray-200" />

              {/* Product Details */}
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-5/6 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
              </div>

              {/* Price */}
              <div className="mt-5 flex items-center justify-between">
                <div className="h-6 w-24 rounded bg-gray-200" />
                <div className="h-6 w-16 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
