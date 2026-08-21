"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { payrollSchema, type PayrollInput } from "@/lib/validations/payroll";
import { usePostPayroll } from "@/lib/queries/usePayroll";
import type { RequestPayroll } from "@/types/payroll.types";

const defaultValues: Partial<PayrollInput> = {
  base_salary: 0,
  bonus: 0,
};

export function AddPayrollDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createPayroll } = usePostPayroll();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PayrollInput>({
    resolver: zodResolver(payrollSchema),
    defaultValues,
  });

  const onSubmit = async (values: PayrollInput) => {
    const payload: RequestPayroll = {
      employee: values.employee,
      position: values.position,
      base_salary: values.base_salary,
      bonus: values.bonus,
    };

    await createPayroll(payload);

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
            Maaş qeydi əlavə et
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni maaş qeydi</DialogTitle>
          <DialogDescription>
            İşçinin əsas maaş və bonus məlumatlarını daxil edin.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="employee">İşçi</Label>
              <Input
                id="employee"
                placeholder="Əli Vəliyev"
                aria-invalid={!!errors.employee}
                {...register("employee")}
              />
              {errors.employee && (
                <p className="text-xs text-destructive">
                  {errors.employee.message}
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
              <Label htmlFor="base_salary">Əsas maaş (₼)</Label>
              <Input
                id="base_salary"
                type="number"
                min={0}
                step="0.01"
                aria-invalid={!!errors.base_salary}
                {...register("base_salary")}
              />
              {errors.base_salary && (
                <p className="text-xs text-destructive">
                  {errors.base_salary.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bonus">Bonus (₼)</Label>
              <Input
                id="bonus"
                type="number"
                min={0}
                step="0.01"
                aria-invalid={!!errors.bonus}
                {...register("bonus")}
              />
              {errors.bonus && (
                <p className="text-xs text-destructive">
                  {errors.bonus.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Qeydi əlavə et
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
