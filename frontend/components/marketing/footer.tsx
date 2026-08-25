import Link from "next/link";

import { LogoMark } from "@/components/icons/logo-mark";

const columns = [
  {
    title: "Məhsul",
    links: [
      { label: "Necə işləyir", href: "#how-it-works" },
      { label: "Xüsusiyyətlər", href: "#features" },
      { label: "İnteqrasiyalar", href: "#integrations" },
      { label: "Qiymətlər", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Şirkət",
    links: [
      { label: "Haqqımızda", href: "#" },
      { label: "Bloq", href: "#" },
      { label: "Əlaqə", href: "#" },
    ],
  },
  {
    title: "Hüquqi",
    links: [
      { label: "Məxfilik", href: "#" },
      { label: "Şərtlər", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-(--hairline)">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-(--ink)">{column.title}</h3>
              <ul className="mt-5 space-y-3 text-sm text-(--ink-muted)">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-(--ink)">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-(--hairline) pt-8 text-sm text-(--ink-muted) sm:flex-row">
          <p className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-md bg-(--brand) text-(--brand-foreground)">
              <LogoMark className="size-3" />
            </span>
            &copy; {new Date().getFullYear()} Orbit. Bütün hüquqlar qorunur.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="transition-colors hover:text-(--ink)">
              Daxil ol
            </Link>
            <Link href="/register" className="transition-colors hover:text-(--ink)">
              Qeydiyyat
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none -mb-10 select-none text-center text-[22vw] leading-none font-semibold tracking-tighter text-(--ink)/5 sm:text-[16vw]"
      >
        orbit
      </div>
    </footer>
  );
}
