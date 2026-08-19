"use client";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
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
import { fetchLeaveRequests, leaveStatusLabels, leaveStatusStyles } from "@/lib/mock/leave";

export default function LeavePage() {
  const { data: requests, isLoading } = useQuery({
    queryKey: ["leave-requests"],
    queryFn: fetchLeaveRequests,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Məzuniyyət tələbləri</h1>
      <p className="mt-2 text-sm text-muted-foreground">Gözləyən və keçmiş məzuniyyət tələbləri.</p>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İşçi</TableHead>
                <TableHead>Növ</TableHead>
                <TableHead>Tarixlər</TableHead>
                <TableHead>Gün</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Əməliyyat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-6 text-center text-muted-foreground">
                    Yüklənir...
                  </TableCell>
                </TableRow>
              ) : (
                requests?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.employee}</TableCell>
                    <TableCell className="text-muted-foreground">{request.type}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.startDate} — {request.endDate}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{request.days}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          leaveStatusStyles[request.status],
                        )}
                      >
                        {leaveStatusLabels[request.status]}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {request.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            Rədd et
                          </Button>
                          <Button size="sm">Təsdiqlə</Button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
