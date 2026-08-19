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
import { cn, initials } from "@/lib/utils";
import { fetchEmployees, statusLabels, statusStyles, type Employee } from "@/lib/mock/employees";
import { AddEmployeeDialog } from "@/components/dashboard/employees/add-employee-dialog";

export default function EmployeesPage() {
  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">İşçilər</h1>
          <p className="mt-2 text-sm text-muted-foreground">Təşkilatınızın bütün işçiləri.</p>
        </div>
        <AddEmployeeDialog />
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <input type="checkbox" className="size-4 rounded border-border accent-primary" />
                </TableHead>
                <TableHead>Ad</TableHead>
                <TableHead>Departament</TableHead>
                <TableHead>Vəzifə</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>İşə başlama tarixi</TableHead>
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
                employees?.map((employee: Employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <input type="checkbox" className="size-4 rounded border-border accent-primary" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {initials(employee.name)}
                        </span>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{employee.department}</TableCell>
                    <TableCell className="text-muted-foreground">{employee.position}</TableCell>
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
                    <TableCell className="text-muted-foreground">{employee.hireDate}</TableCell>
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
