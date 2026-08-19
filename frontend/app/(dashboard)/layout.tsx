import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 md:flex">
        <Link href="/" className="flex items-center gap-2 px-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            O
          </span>
          <p className="text-sm font-semibold tracking-tight">Orbit</p>
        </Link>

        <SidebarNav />

        <div className="mt-auto space-y-3">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-border px-2.5 py-2 text-left transition-colors hover:bg-muted"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <ChevronsUpDown className="size-4" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-sm font-medium">Orbit</span>
              <span className="block truncate text-xs text-muted-foreground">Free plan</span>
            </span>
          </button>

          <Link
            href="/#pricing"
            className="flex h-9 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Planı yüksəlt
          </Link>

          <p className="px-2 text-xs text-muted-foreground">© {new Date().getFullYear()} Orbit</p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col bg-muted/60">
        <DashboardHeader />
        <main className="flex-1 px-6 py-8 sm:px-10">{children}</main>
      </div>
    </div>
  );
}
