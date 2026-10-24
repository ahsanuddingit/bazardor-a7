import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#e1e8e163]">
      <div className="flex min-h-[70vh] flex-col items-center max-w-7xl mx-auto justify-center px-4 text-center">
        <h1 className="text-7xl font-bold text-[#05893e]">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">
          ক্যাটাগরি পাওয়া যায়নি!
        </h2>

        <p className="mt-2 text-gray-600">
          দুঃখিত, আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি।
        </p>

        <Link
          href="/"
          className="mt-6 rounded-lg bg-[#05893e] px-5 py-3 font-medium text-white transition hover:bg-[#046f32]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
