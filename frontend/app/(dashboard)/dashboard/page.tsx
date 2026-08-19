"use client";

import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock, TrendingUp, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { fetchRecentActivity } from "@/lib/mock/activity";
import { weeklyActivity } from "@/lib/mock/weekly";

const stats = [
  { label: "Cəmi işçilər", value: "6", delta: "+2 bu ay", trend: "up" as const, icon: Users },
  { label: "Bugünkü davamiyyət", value: "4/5", delta: "+8.3%", trend: "up" as const, icon: Clock },
  { label: "Gözləyən məzuniyyətlər", value: "2", delta: null, trend: null, icon: CalendarDays },
];

const maxWeekly = Math.max(...weeklyActivity.map((point) => point.value));

export default function DashboardPage() {
  const { data: activity, isLoading } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: fetchRecentActivity,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">İdarə paneli</h1>
      <p className="mt-2 text-sm text-muted-foreground">Xoş gəldiniz. Təşkilatınızın icmalı burada.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <stat.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-semibold tracking-tight">{stat.value}</p>
                </div>
              </div>
              {stat.delta && (
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    stat.trend === "up"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600",
                  )}
                >
                  <TrendingUp className="size-3" />
                  {stat.delta}
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardContent className="p-0">
            <div className="px-4 pt-4 pb-2">
              <h2 className="text-sm font-semibold">Son fəaliyyət</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>İstifadəçi</TableHead>
                  <TableHead>Əməliyyat</TableHead>
                  <TableHead>Hədəf</TableHead>
                  <TableHead>Vaxt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-6 text-center text-muted-foreground">
                      Yüklənir...
                    </TableCell>
                  </TableRow>
                ) : (
                  activity?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.actor}</TableCell>
                      <TableCell className="text-muted-foreground">{item.action}</TableCell>
                      <TableCell className="text-muted-foreground">{item.target}</TableCell>
                      <TableCell className="text-muted-foreground">{item.time}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-sm font-semibold">Həftəlik fəaliyyət</h2>
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {weeklyActivity.reduce((sum, point) => sum + point.value, 0)}
            </p>
            <p className="text-xs text-muted-foreground">bu həftə əməliyyat</p>

            <div className="mt-6 flex h-32 items-end gap-2">
              {weeklyActivity.map((point) => {
                const isPeak = point.value === maxWeekly;
                return (
                  <div
                    key={point.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      className={cn(
                        "w-full rounded-md",
                        isPeak ? "bg-primary" : "bg-muted",
                      )}
                      style={{ height: `${(point.value / maxWeekly) * 100}%` }}
                    />
                    <span
                      className={cn(
                        "text-xs",
                        isPeak ? "font-medium text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {point.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
