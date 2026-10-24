const HomeSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse bg-[#e1e8e163]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-6 sm:py-8">
          <div className="flex min-h-56 flex-col justify-center gap-5 rounded-2xl bg-gray-200 p-6 sm:min-h-72 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex flex-1 flex-col items-start gap-4">
              <div className="h-4 w-28 rounded bg-gray-300" />
              <div className="h-8 w-full max-w-sm rounded-lg bg-gray-300 sm:h-10" />
              <div className="h-4 w-full max-w-md rounded bg-gray-300" />
              <div className="h-4 w-3/4 max-w-sm rounded bg-gray-300" />
              <div className="mt-2 h-11 w-36 rounded-lg bg-gray-300" />
            </div>

            <div className="hidden h-40 w-2/5 max-w-sm rounded-xl bg-gray-300 sm:block sm:h-48" />
          </div>
        </section>

        <section className="pb-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="h-7 w-40 rounded-lg bg-gray-300 sm:w-52" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div className="aspect-square w-full bg-gray-200" />

                <div className="space-y-3 p-3 sm:p-4">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-300" />
                  <div className="h-4 w-4/5 rounded bg-gray-200" />

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="h-5 w-16 rounded bg-gray-300" />
                    <div className="h-4 w-10 rounded bg-gray-200" />
                  </div>

                  <div className="h-9 w-full rounded-lg bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeSkeleton;
