"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
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
    <div className="bg-[#e1e8e163] min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold ">সাইন ইন</h1>
          <p className="text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <fieldset className="fieldset bg-base-100 border border-base-300 rounded-2xl  p-6">
            <label className="label font-medium mt-2">ইমেইল</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full focus:input-primary"
              placeholder="আপনার ইমেইল লিখুন"
            />

            <label className="label font-medium mt-2">পাসওয়ার্ড</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full focus:input-primary"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn bg-[#05893e] text-white w-full mt-5 disabled:opacity-70 disabled:cursor-not-allowed"
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
              <div className="h-px flex-1 bg-base-content/20" />
              <span className="text-sm text-base-content/60">অথবা</span>
              <div className="h-px flex-1 bg-base-content/20" />
            </div>

            <div className="flex flex-col sm:flex-row justify-around gap-3">
              <button
                type="button"
                onClick={handleSignInWithGoogle}
                className="btn w-full sm:flex-1 border border-gray-200 bg-white "
              >
                Google দিয়ে চালিয়ে যান
              </button>

              <button
                type="button"
                onClick={handleSignInWithGithub}
                className="btn w-full sm:flex-1 border border-gray-200 bg-white"
              >
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            <p className="text-center text-sm text-base-content/60 mt-5">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/sign-up"
                className="text-[#05893e] font-medium hover:underline"
              >
                অ্যাকাউন্ট তৈরি করুন
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
