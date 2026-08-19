"use client";
import { useAuthLogout, useAuthMe } from "@/lib/queries/useAuthentication";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, LogOut, Plus, Search } from "lucide-react";

export function DashboardHeader() {
  const { data: user, isLoading } = useAuthMe();
  const logout = useAuthLogout();

  return (
    <header className="flex items-center gap-4 border-b border-border/60 bg-background px-6 py-4 sm:px-10">
      <div className="relative max-w-sm flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Axtarış..."
          className="h-9 w-full rounded-lg border border-border bg-muted/40 pl-9 pr-12 text-sm outline-none focus:border-ring focus:bg-background"
        />
        <kbd className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          ⌘F
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="size-4" />
        </button>
        <button
          type="button"
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Plus className="size-4" />
        </button>

        <div className="ml-2 border-l border-border/60 pl-4">
          {isLoading ? (
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <div className="hidden space-y-1.5 leading-tight sm:block">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger className="flex cursor-pointer items-center gap-2.5 rounded-lg outline-none">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {user?.name.split("")[0]}
                  {user?.surname.split("")[0]}
                </span>
                <div className="hidden leading-tight sm:block">
                  <p className="text-sm font-medium">
                    {user?.name} {user?.surname}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.role.name}
                  </p>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <button
                  type="button"
                  disabled={logout.isPending}
                  onClick={() => logout.mutate()}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut className="size-4" />
                  Çıxış et
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
}
