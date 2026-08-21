import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/icons/logo-mark";

export default function NotFound() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 flex justify-center blur-3xl"
      >
        <div className="h-72 w-xl rounded-full bg-primary/15" />
      </div>

      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <LogoMark className="size-7" />
      </span>

      <p className="mt-8 text-sm font-semibold tracking-widest text-primary uppercase">
        404 xəta
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
        Axtardığınız səhifə tapılmadı
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground text-balance">
        Bu ünvan silinmiş, adı dəyişdirilmiş və ya heç vaxt mövcud olmayan bir səhifəyə aiddir.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button size="lg">
            <ArrowLeft className="size-4" />
            Ana səhifəyə qayıt
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button size="lg" variant="outline">
            <Compass className="size-4" />
            İdarə panelinə keç
          </Button>
        </Link>
      </div>
    </div>
  );
}
