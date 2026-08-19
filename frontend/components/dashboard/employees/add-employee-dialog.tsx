"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addEmployee, statusLabels, type Employee } from "@/lib/mock/employees";
import { employeeSchema, type EmployeeInput } from "@/lib/validations/employee";
import { useGetDepartment } from "@/lib/queries/useDepartment";

const defaultValues: Partial<EmployeeInput> = {
  status: "active",
};

export function AddEmployeeDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: departments, isLoading } = useGetDepartment();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeInput>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  const onSubmit = (values: EmployeeInput) => {
    const newEmployee: Employee = {
      id: crypto.randomUUID(),
      name: `${values.name} ${values.surname}`,
      email: values.email,
      phone: values.phone,
      department: values.department,
      position: values.position,
      status: values.status,
      hireDate: values.hireDate,
    };

    addEmployee(newEmployee);
    queryClient.setQueryData<Employee[]>(["employees"], (old) => [
      newEmployee,
      ...(old ?? []),
    ]);

    reset(defaultValues);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) reset(defaultValues);
      }}
    >
      <DialogTrigger
        render={
          <Button size="sm">
            <Plus className="size-4" />
            İşçi əlavə et
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni işçi əlavə et</DialogTitle>
          <DialogDescription>
            İşçinin məlumatlarını daxil edin. Bütün zəruri sahələr işarələnib.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Ad</Label>
              <Input
                id="name"
                placeholder="Əli"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="surname">Soyad</Label>
              <Input
                id="surname"
                placeholder="Vəliyev"
                aria-invalid={!!errors.surname}
                {...register("surname")}
              />
              {errors.surname && (
                <p className="text-xs text-destructive">
                  {errors.surname.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-poçt</Label>
              <Input
                id="email"
                type="email"
                placeholder="eli@orbit.az"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                placeholder="+994 50 123 45 67"
                {...register("phone")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="department">Departament</Label>
              <Controller
                control={control}
                name="department"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="department"
                      aria-invalid={!!errors.department}
                    >
                      <SelectValue placeholder="Departament seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments?.map((department) => (
                        <SelectItem key={department.id} value={department.name}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.department && (
                <p className="text-xs text-destructive">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="position">Vəzifə</Label>
              <Input
                id="position"
                placeholder="Backend developer"
                aria-invalid={!!errors.position}
                {...register("position")}
              />
              {errors.position && (
                <p className="text-xs text-destructive">
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="hireDate">İşə başlama tarixi</Label>
              <Input
                id="hireDate"
                type="date"
                aria-invalid={!!errors.hireDate}
                {...register("hireDate")}
              />
              {errors.hireDate && (
                <p className="text-xs text-destructive">
                  {errors.hireDate.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              İşçini əlavə et
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
