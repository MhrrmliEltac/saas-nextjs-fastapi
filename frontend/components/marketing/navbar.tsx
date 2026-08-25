"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoMark } from "@/components/icons/logo-mark";
import { useAuthMeOptional } from "@/lib/queries/useAuthentication";

export function Navbar() {
  const { data: user, isLoading } = useAuthMeOptional();

  return (
    <header className="sticky top-0 z-40 bg-(--cream)/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-(--ink)">
          <span className="flex size-7 items-center justify-center rounded-lg bg-(--brand) text-(--brand-foreground)">
            <LogoMark className="size-4" />
          </span>
          orbit
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-(--ink-muted) md:flex">
          <Link href="#features" className="transition-colors hover:text-(--ink)">
            Xüsusiyyətlər
          </Link>
          <Link href="#how-it-works" className="transition-colors hover:text-(--ink)">
            Necə işləyir
          </Link>
          <Link href="#integrations" className="transition-colors hover:text-(--ink)">
            İnteqrasiyalar
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-(--ink)">
            Qiymətlər
          </Link>
          <Link href="#faq" className="transition-colors hover:text-(--ink)">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <Skeleton className="h-9 w-32 rounded-full" />
          ) : user ? (
            <>
              <span className="hidden text-sm font-medium text-(--ink-muted) sm:inline">
                {user.name} {user.surname}
              </span>
              <Link href="/dashboard">
                <Button size="sm" className="rounded-full bg-(--ink) px-4 text-(--cream) hover:bg-(--ink)/85">
                  Panelə keç
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-(--hairline) px-4 py-1.5 text-sm font-medium text-(--ink) transition-colors hover:bg-(--cream-soft) sm:inline-block"
              >
                Daxil ol
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-full bg-(--ink) px-4 text-(--cream) hover:bg-(--ink)/85">
                  Başla
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
