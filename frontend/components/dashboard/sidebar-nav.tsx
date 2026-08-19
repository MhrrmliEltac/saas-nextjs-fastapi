"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  Briefcase,
  Building2,
  CalendarDays,
  Clock,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Ümumi",
    items: [
      { href: "/dashboard", label: "İdarə paneli", icon: LayoutDashboard },
      { href: "/dashboard/employees", label: "İşçilər", icon: Users, badge: "6" },
      { href: "/dashboard/departments", label: "Departamentlər", icon: Building2 },
    ],
  },
  {
    label: "Davamiyyət",
    items: [
      { href: "/dashboard/attendance", label: "Davamiyyət", icon: Clock },
      { href: "/dashboard/leave", label: "Məzuniyyətlər", icon: CalendarDays, badge: "2" },
    ],
  },
  {
    label: "Maliyyə və inkişaf",
    items: [
      { href: "/dashboard/payroll", label: "Maaş", icon: Wallet },
      { href: "/dashboard/performance", label: "Performans", icon: Award },
      { href: "/dashboard/recruitment", label: "İşə qəbul", icon: Briefcase },
    ],
  },
  {
    label: "Dəstək",
    items: [{ href: "/dashboard/settings", label: "Tənzimləmələr", icon: Settings }],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-8 space-y-6">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="px-2.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {group.label}
          </p>
          <div className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon
                    className={cn(
                      "size-4 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
