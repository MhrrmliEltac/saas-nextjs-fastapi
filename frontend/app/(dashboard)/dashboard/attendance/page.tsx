"use client";

import { useQuery } from "@tanstack/react-query";

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
import { attendanceStatusLabels, attendanceStatusStyles, fetchAttendance } from "@/lib/mock/attendance";

export default function AttendancePage() {
  const { data: records, isLoading } = useQuery({
    queryKey: ["attendance"],
    queryFn: fetchAttendance,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Davamiyyət</h1>
      <p className="mt-2 text-sm text-muted-foreground">Bugünkü giriş-çıxış qeydləri.</p>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İşçi</TableHead>
                <TableHead>Departament</TableHead>
                <TableHead>Giriş</TableHead>
                <TableHead>Çıxış</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-6 text-center text-muted-foreground">
                    Yüklənir...
                  </TableCell>
                </TableRow>
              ) : (
                records?.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell className="text-muted-foreground">{record.department}</TableCell>
                    <TableCell className="text-muted-foreground">{record.checkIn ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{record.checkOut ?? "—"}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          attendanceStatusStyles[record.status],
                        )}
                      >
                        {attendanceStatusLabels[record.status]}
                      </span>
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
