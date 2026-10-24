"use client";

import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Buttons = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে");
          router.push("/sign-in");
        },
      },
    });
  };

  const initial = user?.name?.trim()
    ? Array.from(user.name.trim())[0].toUpperCase()
    : "U";

  return (
    <div>
      <div className="flex gap-2 items-center">
        {user ? (
          <div ref={menuRef} className="relative">
            <button
  type="button"
  aria-haspopup="menu"
  aria-expanded={isOpen}
  aria-label="Profile menu"
  onClick={() => setIsOpen((prev) => !prev)}
  className="flex cursor-pointer items-center gap-2"
>
  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#05893e] text-[15px] font-bold text-white md:h-10 md:w-10 md:text-[17px]">
    {initial}
  </span>

  <span className="hidden text-sm font-medium text-[#1d271f] md:inline">
    {user.name}
  </span>
</button>

            {isOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
              >
                <Link
                  href="/profile"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  আমার প্রোফাইল
                </Link>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleSignOut}
                  className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  সাইন আউট
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/sign-in">
              <button className="cursor-pointer text-[12px] md:text-[16px] text-[#1d271f]">
                সাইন ইন
              </button>
            </Link>

            <Link href="/sign-up">
              <button className="cursor-pointer text-[12px] md:text-[16px] bg-[#05893e] text-white px-4 py-2 rounded-[10px]">
                সাইন আপ
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Buttons;
