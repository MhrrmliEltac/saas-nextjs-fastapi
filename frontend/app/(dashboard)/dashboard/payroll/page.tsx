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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetPayroll, useMarkPayrollPaid } from "@/lib/queries/usePayroll";
import { payrollStatusLabels, payrollStatusStyles } from "@/constant/payroll";
import { PayrollStatusEnum } from "@/types/payroll.types";
import { useRole } from "@/lib/store/role.store";
import { check_role } from "@/lib/helper/check_role";
import { AddPayrollDialog } from "@/components/dashboard/payroll/add-payroll-dialog";
import { DeletePayrollDialog } from "@/components/dashboard/payroll/delete-payroll-dialog";

function formatMoney(amount: number) {
  return `${amount.toLocaleString("az-AZ")} ₼`;
}

export default function PayrollPage() {
  const roleStore = useRole();
  const checkRole = check_role(roleStore.role);
  const { data: records, isLoading } = useGetPayroll();
  const markPaid = useMarkPayrollPaid();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Maaş</h1>
          <p className="mt-2 text-sm text-muted-foreground">Bu ayın maaş cədvəli.</p>
        </div>
        {checkRole && <AddPayrollDialog />}
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İşçi</TableHead>
                <TableHead>Vəzifə</TableHead>
                <TableHead className="text-right">Əsas maaş</TableHead>
                <TableHead className="text-right">Bonus</TableHead>
                <TableHead className="text-right">Xalis məbləğ</TableHead>
                <TableHead>Status</TableHead>
                {checkRole && <TableHead className="text-right">Əməliyyat</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={checkRole ? 7 : 6} className="py-6 text-center text-muted-foreground">
                    Yüklənir...
                  </TableCell>
                </TableRow>
              ) : records && records.length > 0 ? (
                records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell className="text-muted-foreground">{record.position}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatMoney(record.base_salary)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatMoney(record.bonus)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatMoney(record.base_salary + record.bonus)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          payrollStatusStyles[record.status],
                        )}
                      >
                        {payrollStatusLabels[record.status]}
                      </span>
                    </TableCell>
                    {checkRole && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {record.status === PayrollStatusEnum.PENDING && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={markPaid.isPending}
                              onClick={() => markPaid.mutate(record.id)}
                            >
                              Ödə
                            </Button>
                          )}
                          <DeletePayrollDialog record={record} />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={checkRole ? 7 : 6} className="py-6 text-center text-muted-foreground">
                    Maaş qeydi yoxdur.
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
