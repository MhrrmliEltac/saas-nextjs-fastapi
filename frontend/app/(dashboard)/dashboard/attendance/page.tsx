"use client";

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
import { useGetTodayAttendance } from "@/lib/queries/useAttendance";
import { attendanceStatusLabels, attendanceStatusStyles } from "@/constant/attendance";
import { useRole } from "@/lib/store/role.store";
import { check_role } from "@/lib/helper/check_role";
import { AddAttendanceDialog } from "@/components/dashboard/attendance/add-attendance-dialog";
import { DeleteAttendanceDialog } from "@/components/dashboard/attendance/delete-attendance-dialog";

export default function AttendancePage() {
  const roleStore = useRole();
  const checkRole = check_role(roleStore.role);
  const { data: records, isLoading } = useGetTodayAttendance();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Davamiyyət</h1>
          <p className="mt-2 text-sm text-muted-foreground">Bugünkü giriş-çıxış qeydləri.</p>
        </div>
        {checkRole && <AddAttendanceDialog />}
      </div>

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
                {checkRole && <TableHead className="text-right">Əməliyyat</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={checkRole ? 6 : 5} className="py-6 text-center text-muted-foreground">
                    Yüklənir...
                  </TableCell>
                </TableRow>
              ) : records && records.length > 0 ? (
                records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell className="text-muted-foreground">{record.department}</TableCell>
                    <TableCell className="text-muted-foreground">{record.check_in ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{record.check_out ?? "—"}</TableCell>
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
                    {checkRole && (
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <DeleteAttendanceDialog record={record} />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={checkRole ? 6 : 5} className="py-6 text-center text-muted-foreground">
                    Bu gün üçün davamiyyət qeydi yoxdur.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
