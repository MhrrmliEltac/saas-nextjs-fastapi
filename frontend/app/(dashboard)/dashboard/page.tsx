"use client";

import Link from "next/link";
import { Activity, CalendarDays, Clock, TrendingUp, Users } from "lucide-react";

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
import { useGetSummary } from "@/lib/queries/useSummary";
import { useGetLog, useGetWeeklyActivity } from "@/lib/queries/useLog";
import { useGetPendingLeave } from "@/lib/queries/useLeave";
import { useRole } from "@/lib/store/role.store";
import { leaveTypeLabels } from "@/constant/leave";

export default function DashboardPage() {
  const roleStore = useRole();
  const isAdmin = roleStore.role === "ADMIN";

  const { data: activity, isLoading } = useGetLog(isAdmin);
  const { data: summary } = useGetSummary();
  const { data: weeklyActivity, isLoading: isWeeklyLoading } =
    useGetWeeklyActivity();
  const { data: pendingLeave, isLoading: isPendingLeaveLoading } =
    useGetPendingLeave();

  const maxWeekly = Math.max(1, ...(weeklyActivity ?? []).map((point) => point.value));
  const weeklyTotal = (weeklyActivity ?? []).reduce((sum, point) => sum + point.value, 0);
  const peakDay = (weeklyActivity ?? []).reduce<null | { day: string; value: number }>(
    (peak, point) =>
      point.value > 0 && (!peak || point.value > peak.value) ? point : peak,
    null,
  );

  const stats = [
    {
      label: "Cəmi işçilər",
      value: String(summary?.employee_count ?? 0),
      delta: null,
      trend: null,
      icon: Users,
    },
    {
      label: "Bugünkü davamiyyət",
      value: "4/5",
      delta: "+8.3%",
      trend: "up" as const,
      icon: Clock,
    },
    {
      label: "Gözləyən məzuniyyətlər",
      value: String(summary?.leave_pending_count ?? 0),
      delta: null,
      trend: null,
      icon: CalendarDays,
    },
  ];

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

      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold">Gözləyən məzuniyyətlər</h2>
              {!isPendingLeaveLoading && pendingLeave && pendingLeave.length > 0 && (
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">
                  {pendingLeave.length}
                </span>
              )}
            </div>
            <Link
              href="/dashboard/leave"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Hamısına bax
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İşçi</TableHead>
                <TableHead>Növ</TableHead>
                <TableHead>Tarixlər</TableHead>
                <TableHead>Gün</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPendingLeaveLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-6 text-center text-muted-foreground">
                    Yüklənir...
                  </TableCell>
                </TableRow>
              ) : pendingLeave && pendingLeave.length > 0 ? (
                pendingLeave.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.employee}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {leaveTypeLabels[request.type]}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.start_leave} — {request.end_leave}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{request.day}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="py-6 text-center text-muted-foreground">
                    Gözləyən məzuniyyət yoxdur.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                {!isAdmin ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-6 text-center text-muted-foreground">
                      Son fəaliyyəti görmək üçün admin icazəsi tələb olunur.
                    </TableCell>
                  </TableRow>
                ) : isLoading ? (
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Activity className="size-4" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold">Həftəlik fəaliyyət</h2>
                  <p className="text-xs text-muted-foreground">Son 7 gün</p>
                </div>
              </div>
              {peakDay && (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                  Ən aktiv: {peakDay.day}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-end gap-2">
              <p className="text-3xl font-semibold tracking-tight">{weeklyTotal}</p>
              <p className="pb-1 text-xs text-muted-foreground">bu həftə əməliyyat</p>
            </div>

            {isWeeklyLoading ? (
              <div className="mt-6 flex h-40 items-center justify-center text-sm text-muted-foreground">
                Yüklənir...
              </div>
            ) : weeklyTotal === 0 ? (
              <div className="mt-6 flex h-40 items-center justify-center text-sm text-muted-foreground">
                Bu həftə fəaliyyət qeydə alınmayıb.
              </div>
            ) : (
              <div className="mt-6 flex h-40 items-end gap-2 border-b border-border/60">
                {weeklyActivity?.map((point) => {
                  const isPeak = point.value === maxWeekly && point.value > 0;
                  return (
                    <div
                      key={point.day}
                      className="group/bar flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <span
                        className={cn(
                          "text-xs font-medium text-foreground opacity-0 transition-opacity",
                          isPeak ? "opacity-100" : "group-hover/bar:opacity-100",
                        )}
                      >
                        {point.value}
                      </span>
                      <div
                        title={`${point.day}: ${point.value}`}
                        className={cn(
                          "w-full rounded-t-md transition-colors",
                          isPeak
                            ? "bg-primary"
                            : "bg-muted group-hover/bar:bg-primary/40",
                        )}
                        style={{
                          height: `${Math.max((point.value / maxWeekly) * 100, point.value > 0 ? 6 : 2)}%`,
                        }}
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
