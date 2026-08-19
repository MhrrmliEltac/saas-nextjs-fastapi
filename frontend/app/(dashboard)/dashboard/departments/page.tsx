"use client";

import { Building2 } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AddDepartmentDialog } from "@/components/dashboard/departments/add-department-dialog";
import { EditDepartmentDialog } from "@/components/dashboard/departments/edit-department-dialog";
import { DeleteDepartmentDialog } from "@/components/dashboard/departments/delete-department-dialog";
import { useGetDepartment } from "@/lib/queries/useDepartment";

export default function DepartmentsPage() {
  const { data: departments, isLoading } = useGetDepartment();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Departamentlər
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Təşkilat strukturunuz üzrə departamentlər.
          </p>
        </div>
        <AddDepartmentDialog />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="flex items-start gap-4">
                <Skeleton className="size-10 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          departments?.map((department) => (
            <Card key={department.id}>
              <CardContent className="flex items-start gap-4">
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl",
                  )}
                >
                  <Building2 className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-medium">{department.name}</p>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    Rəhbər: {department.head}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {/* {department.employeeCount} işçi */}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <EditDepartmentDialog department={department} />
                <DeleteDepartmentDialog department={department} />
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
