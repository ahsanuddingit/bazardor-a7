"use client";

import { signOut, updateUser, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = newName.trim();

    if (!trimmedName) {
      setMessage("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName === user?.name) {
      setMessage("আপনি নতুন কোনো নাম দেননি।");
      return;
    }

    setIsUpdating(true);
    setMessage("");

    try {
      const { error } = await updateUser({
        name: trimmedName,
      });

      if (error) {
        setMessage(error.message || "নাম পরিবর্তন করা যায়নি।");
        return;
      }

      setNewName("");
      setMessage("আপনার নাম সফলভাবে পরিবর্তন হয়েছে।");
    } catch {
      setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে");
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <div className="bg-[#e1e8e163]">
      <div className="min-h-screen bg-[#e1e8e163] px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              আমার প্রোফাইল
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5  sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#05893e] text-2xl font-semibold text-white sm:h-16 sm:w-16">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold text-gray-900 sm:text-xl">
                    {user?.name}
                  </h2>
                  <p className="mt-1 break-all text-sm text-gray-500 sm:text-base">
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500 px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 sm:w-auto sm:shrink-0"
              >
                <span aria-hidden="true">↩</span>
                সাইন আউট
              </button>
            </div>
          </div>

          {/* Update Name Section */}
          <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              নাম পরিবর্তন করুন
            </h2>

            <form onSubmit={handleUpdateName} className="mt-4">
              <label
                htmlFor="newName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                নাম
              </label>

              <input
                id="newName"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={user?.name || "আপনার নাম লিখুন"}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20 sm:text-base"
                disabled={isUpdating}
                maxLength={100}
                required
              />

              <button
                type="submit"
                disabled={isUpdating || !newName.trim()}
                className="cursor-pointer mt-3 w-full rounded-lg bg-[#05893e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#046f32] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isUpdating ? "সংরক্ষণ হচ্ছে..." : "নাম পরিবর্তন করুন"}
              </button>

              {message && (
                <p
                  role="status"
                  className={`mt-3 text-sm  ${
                    message.includes("সফলভাবে")
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
