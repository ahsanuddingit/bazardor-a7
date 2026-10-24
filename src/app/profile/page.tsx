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
      toast.success("নাম সফলভাবে আপডেট হয়েছে");
      router.refresh();
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
          toast.success("সাইন আউট সফল হয়েছে");
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <div className="bg-[#f3f7f3] min-h-screen py-8 sm:py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন এবং পরিচালনা করুন।
          </p>
        </div>

        {/* User Info Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#05893e] text-2xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-gray-900">
                  {user?.name}
                </h2>
                <p className="mt-1 break-all text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:w-auto"
            >
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>

        {/* Update Name Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            নাম পরিবর্তন করুন
          </h2>

          <form onSubmit={handleUpdateName} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="newName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                নতুন নাম
              </label>

              <input
                id="newName"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={user?.name || "আপনার নাম লিখুন"}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20"
                disabled={isUpdating}
                maxLength={100}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating || !newName.trim()}
              className="cursor-pointer rounded-lg bg-[#05893e] hover:bg-[#046f32] px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
            </button>

            {message && (
              <p
                role="status"
                className={`text-sm font-medium ${
                  message.includes("সফলভাবে")
                    ? "text-green-600"
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
  );
};

export default ProfilePage;