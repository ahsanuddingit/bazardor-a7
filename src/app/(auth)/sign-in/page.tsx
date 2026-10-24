"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    setLoading(true);

    const { data, error } = await signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push("/");
      router.refresh();
    }
    if (error) {
      toast.error(error.message as string);
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  const handleSignInWithGithub = async () => {
    await signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="bg-[#f3f7f3] min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">সাইন ইন</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 md:p-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20"
                placeholder="আপনার ইমেইল লিখুন"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full rounded-lg bg-[#05893e] hover:bg-[#046f32] text-white py-3 text-sm font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  সাইন ইন হচ্ছে...
                </>
              ) : (
                "সাইন ইন"
              )}
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">অথবা</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleSignInWithGoogle}
                className="cursor-pointer flex-1 border border-gray-300 bg-white hover:bg-gray-50 py-2.5 px-4 rounded-lg text-sm font-medium text-gray-700 transition"
              >
                Google দিয়ে চালিয়ে যান
              </button>

              <button
                type="button"
                onClick={handleSignInWithGithub}
                className="cursor-pointer flex-1 border border-gray-300 bg-white hover:bg-gray-50 py-2.5 px-4 rounded-lg text-sm font-medium text-gray-700 transition"
              >
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 pt-2">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/sign-up"
                className="text-[#05893e] font-semibold hover:underline"
              >
                অ্যাকাউন্ট তৈরি করুন
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;