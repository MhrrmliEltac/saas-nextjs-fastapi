import Link from "next/link";

import { LogoMark } from "@/components/icons/logo-mark";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
        <p className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LogoMark className="size-3" />
          </span>
          &copy; {new Date().getFullYear()} Orbit. Bütün hüquqlar qorunur.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/login" className="transition-colors hover:text-foreground">
            Daxil ol
          </Link>
          <Link href="/register" className="transition-colors hover:text-foreground">
            Qeydiyyat
          </Link>
        </div>
      </div>
    </footer>
  );
}
