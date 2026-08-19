"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthMeOptional } from "@/lib/queries/useAuthentication";

export function Navbar() {
  const { data: user, isLoading } = useAuthMeOptional();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Orbit
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="#features" className="transition-colors hover:text-foreground">
            Xüsusiyyətlər
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-foreground">
            Qiymətlər
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <Skeleton className="h-9 w-32 rounded-md" />
          ) : user ? (
            <>
              <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
                {user.name} {user.surname}
              </span>
              <Link href="/dashboard">
                <Button size="sm">Panelə keç</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Daxil ol
              </Link>
              <Link href="/register">
                <Button size="sm">Pulsuz başla</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
