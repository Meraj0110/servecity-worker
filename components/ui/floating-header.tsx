"use client";

import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { Grid2x2PlusIcon, MenuIcon } from "lucide-react";

import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProfileButton from "@/widgets/ProfileButton";
import { useAuthStore } from "@/store/auth-store";

/* ----------------------------------
   TYPES
----------------------------------- */
type VerificationRule = "any" | "verified" | "unverified";

interface NavLink {
  label: string;
  href: string;
  authRequired: boolean;
  verification: VerificationRule;
}

/* ----------------------------------
   COMPONENT
----------------------------------- */
export function FloatingHeader({
  isAuthenticated,
  profile,
}: {
  isAuthenticated: boolean;
  profile: any;
}) {
  const [open, setOpen] = React.useState(false);
  const logout = useAuthStore((s) => s.logout);

  /* ----------------------------------
     VERIFIED STATE FROM COOKIE
     Cookie value expected: "true" | "false"
  ----------------------------------- */
  const isVerified = Cookies.get("verified") === "true";

  /* ----------------------------------
     NAV LINKS
  ----------------------------------- */
  const links: NavLink[] = [
    {
      label: "Verify Yourself",
      href: "/verification-form",
      authRequired: true,
      verification: "unverified",
    },
    {
      label: "Your Works",
      href: "/dashboard/orders/all-orders",
      authRequired: true,
      verification: "verified",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      authRequired: true,
      verification: "verified",
    },
  ];

  /* ----------------------------------
     ACCESS CONTROL LOGIC
  ----------------------------------- */
  const canShowLink = (link: NavLink) => {
    // Requires login
    if (link.authRequired && !isAuthenticated) return false;

    // Only verified users
    if (link.verification === "verified" && !isVerified) return false;

    // Only unverified users
    if (link.verification === "unverified" && isVerified) return false;

    return true;
  };

  return (
    <header
      className={cn(
        "sticky top-5 z-50",
        "mx-auto w-full max-w-3xl rounded-lg border shadow",
        "bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg"
      )}
    >
      <nav className="flex items-center justify-between p-1.5">
        {/* LEFT LOGO */}
        <Link href="/">
          <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent">
            <Grid2x2PlusIcon className="size-5" />
            <p className="font-mono text-base font-bold">Dashboard</p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(
            (link) =>
              canShowLink(link) && (
                <Link href={link.href} key={link.href}>
                  <span
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    {link.label}
                  </span>
                </Link>
              )
          )}

          {isAuthenticated && (
            <button
              onClick={logout}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Logout
            </button>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          ) : (
            <ProfileButton profileImage={profile?.avatar} />
          )}

          {/* MOBILE MENU */}
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              size="icon"
              variant="outline"
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <MenuIcon className="size-4" />
            </Button>

            <SheetContent
              side="left"
              showClose={false}
              className="bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg"
            >
              <div className="grid gap-y-2 px-4 pt-12 pb-5">
                {links.map(
                  (link) =>
                    canShowLink(link) && (
                      <Link
                        href={link.href}
                        key={link.href}
                        onClick={() => setOpen(false)}
                      >
                        <span
                          className={buttonVariants({
                            variant: "ghost",
                            className: "justify-start",
                          })}
                        >
                          {link.label}
                        </span>
                      </Link>
                    )
                )}

                {!isAuthenticated && (
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <span
                      className={buttonVariants({
                        variant: "ghost",
                        className: "justify-start",
                      })}
                    >
                      Login
                    </span>
                  </Link>
                )}

                {isAuthenticated && (
                  <>
                    <Link href="/profile" onClick={() => setOpen(false)}>
                      <span
                        className={buttonVariants({
                          variant: "ghost",
                          className: "justify-start",
                        })}
                      >
                        Profile
                      </span>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className={buttonVariants({
                        variant: "ghost",
                        className: "justify-start",
                      })}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>

              <SheetFooter className="text-xs text-muted-foreground">
                Serve City
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
