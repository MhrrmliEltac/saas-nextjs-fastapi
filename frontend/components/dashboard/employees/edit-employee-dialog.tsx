"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";

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
import { employeeSchema, type EmployeeInput } from "@/lib/validations/employee";
import { useGetDepartment } from "@/lib/queries/useDepartment";
import { useUpdateEmployee } from "@/lib/queries/useEmployee";
import {  type RequestWorker, type Worker } from "@/types/worker.types";
import { PhoneNumberField } from "@/components/dashboard/employees/phone-number-field";
import { statusLabels } from "@/constant/worker";

export function EditEmployeeDialog({ employee }: { employee: Worker }) {
  const [open, setOpen] = useState(false);
  const { data: departments } = useGetDepartment(open);
  const mutation = useUpdateEmployee();

  const defaultValues: EmployeeInput = {
    name: employee.name,
    surname: employee.surname,
    email: employee.email,
    phone_number: employee.phone_number,
    department: employee.department,
    started_work: employee.started_work,
    status: employee.status,
  };

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

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, employee]);

  const onSubmit = async (values: EmployeeInput) => {
    const payload: Partial<RequestWorker> = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      phone_number: values.phone_number,
      department: values.department,
      started_work: new Date(values.started_work),
      status: values.status,
    };

    try {
      await mutation.mutateAsync({ id: employee.id, payload });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon-sm" aria-label="İşçini redaktə et">
            <Pencil className="size-4" />
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>İşçini redaktə et</DialogTitle>
          <DialogDescription>
            İşçinin məlumatlarını yeniləyin.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-name">Ad</Label>
              <Input
                id="edit-name"
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
              <Label htmlFor="edit-surname">Soyad</Label>
              <Input
                id="edit-surname"
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
              <Label htmlFor="edit-email">E-poçt</Label>
              <Input
                id="edit-email"
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
            <PhoneNumberField
              control={control}
              id="edit-phone_number"
              name="phone_number"
              error={errors.phone_number?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-department">Departament</Label>
              <Controller
                control={control}
                name="department"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="edit-department"
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
              <Label htmlFor="edit-started_work">İşə başlama tarixi</Label>
              <Input
                id="edit-started_work"
                type="date"
                aria-invalid={!!errors.started_work}
                {...register("started_work")}
              />
              {errors.started_work && (
                <p className="text-xs text-destructive">
                  {errors.started_work.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-status">Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="edit-status">
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
              Yadda saxla
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
