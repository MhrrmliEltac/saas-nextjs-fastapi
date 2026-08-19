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
import { fetchPayroll, payrollStatusLabels, payrollStatusStyles } from "@/lib/mock/payroll";

function formatMoney(amount: number) {
  return `${amount.toLocaleString("az-AZ")} ₼`;
}

export default function PayrollPage() {
  const { data: records, isLoading } = useQuery({
    queryKey: ["payroll"],
    queryFn: fetchPayroll,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Maaş</h1>
      <p className="mt-2 text-sm text-muted-foreground">Bu ayın maaş cədvəli.</p>

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
                records?.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell className="text-muted-foreground">{record.position}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatMoney(record.baseSalary)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatMoney(record.bonus)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatMoney(record.baseSalary + record.bonus)}
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
