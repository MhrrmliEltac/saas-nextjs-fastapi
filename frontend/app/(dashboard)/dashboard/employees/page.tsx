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
import { cn, initials } from "@/lib/utils";
import { useGetEmployee } from "@/lib/queries/useEmployee";
import { type Worker } from "@/types/worker.types";
import { AddEmployeeDialog } from "@/components/dashboard/employees/add-employee-dialog";
import { EditEmployeeDialog } from "@/components/dashboard/employees/edit-employee-dialog";
import { DeleteEmployeeDialog } from "@/components/dashboard/employees/delete-employee-dialog";
import { statusLabels, statusStyles } from "@/constant/worker";

export default function EmployeesPage() {
  const { data: employees, isLoading } = useGetEmployee();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">İşçilər</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Təşkilatınızın bütün işçiləri.
          </p>
        </div>
        <AddEmployeeDialog />
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-border accent-primary"
                  />
                </TableHead>
                <TableHead>Ad</TableHead>
                <TableHead>Departament</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>İşə başlama tarixi</TableHead>
                <TableHead className="text-right">Əməliyyatlar</TableHead>
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
                employees?.map((employee: Worker) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="size-4 rounded border-border accent-primary"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {initials(employee.fullname)}
                        </span>
                        <div>
                          <p className="font-medium">{employee.fullname}</p>
                          <p className="text-xs text-muted-foreground">
                            {employee.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {employee.department}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          statusStyles[employee.status],
                        )}
                      >
                        {statusLabels[employee.status]}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {employee.started_work}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <EditEmployeeDialog employee={employee} />
                        <DeleteEmployeeDialog employee={employee} />
                      </div>
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
