"use client";

import { FloatingHeader } from "@/components/ui/floating-header";
import { useAuthStore } from "@/store/auth-store";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated,profile } = useAuthStore();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className={`${isAuthPage ? "absolute" : "relative"} mt-2 w-full px-4`}>
      <FloatingHeader
        profile={profile}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}
