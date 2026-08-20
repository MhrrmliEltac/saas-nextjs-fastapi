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

import { useRole } from "@/lib/store/role.store";
import { AddLeaveDialog } from "@/components/dashboard/leave/add-leave-dialog";
import { check_role } from "@/lib/helper/check_role";
import { useGetLeave, useUpdateStatusLeave } from "@/lib/queries/useLeave";
import { leaveStatusLabels, leaveStatusStyles } from "@/constant/leave";
import { LeaveStatusEnum, RequestLeaveEnum } from "@/types/leave.types";

export default function LeavePage() {
  const roleStore = useRole();
  const { data: requests, isLoading } = useGetLeave();
  const mutation = useUpdateStatusLeave();

  const checkRole = check_role(roleStore.role);

  const handleChangeStatus = async (id: string, type: RequestLeaveEnum) => {
    try {
      await mutation.mutateAsync({ id, payload: { type } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Məzuniyyət tələbləri
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Gözləyən və keçmiş məzuniyyət tələbləri.
          </p>
        </div>
        {checkRole && <AddLeaveDialog />}
      </div>

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
                  <TableCell
                    colSpan={6}
                    className="py-6 text-center text-muted-foreground"
                  >
                    Yüklənir...
                  </TableCell>
                </TableRow>
              ) : (
                requests?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.employee}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.type}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.start_leave} — {request.end_leave}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.day}
                    </TableCell>
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
                    {checkRole && (
                      <TableCell className="text-right">
                        {request.status === LeaveStatusEnum.PENDING ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleChangeStatus(
                                  request.id,
                                  RequestLeaveEnum.REJECT,
                                )
                              }
                            >
                              Rədd et
                            </Button>
                            <Button
                              size="sm"
                              onClick={() =>
                                handleChangeStatus(
                                  request.id,
                                  RequestLeaveEnum.APPROVE,
                                )
                              }
                            >
                              Təsdiqlə
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>
                    )}
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
