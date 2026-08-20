"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { leaveSchema, type LeaveInput } from "@/lib/validations/leave";
import { usePostLeave } from "@/lib/queries/useLeave";
import { LeaveStatusEnum, type RequestLeave } from "@/types/leave.types";
import { leaveTypeLabels, leaveStatusLabels } from "@/constant/leave";

const defaultValues: Partial<LeaveInput> = {
  status: LeaveStatusEnum.PENDING,
};

export function AddLeaveDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createLeave } = usePostLeave();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeaveInput>({
    resolver: zodResolver(leaveSchema),
    defaultValues,
  });

  const onSubmit = async (values: LeaveInput) => {
    const payload: RequestLeave = {
      employee: values.employee,
      type: values.type,
      start_leave: new Date(values.start_leave),
      end_leave: new Date(values.end_leave),
    };

    await createLeave(payload);

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
            Məzuniyyət əlavə et
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni məzuniyyət əlavə et</DialogTitle>
          <DialogDescription>
            Məzuniyyətin məlumatlarını daxil edin. Bütün zəruri sahələr
            işarələnib.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="start_leave">Başlama tarixi</Label>
              <Input
                id="start_leave"
                type="date"
                aria-invalid={!!errors.start_leave}
                {...register("start_leave")}
              />
              {errors.start_leave && (
                <p className="text-xs text-destructive">
                  {errors.start_leave.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="end_leave">Bitmə tarixi</Label>
              <Input
                id="end_leave"
                type="date"
                aria-invalid={!!errors.end_leave}
                {...register("end_leave")}
              />
              {errors.end_leave && (
                <p className="text-xs text-destructive">
                  {errors.end_leave.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="type">Növ</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="type" aria-invalid={!!errors.type}>
                      <SelectValue placeholder="Növ seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(leaveTypeLabels).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <p className="text-xs text-destructive">
                  {errors.type.message}
                </p>
              )}
            </div>
            {/* <div className="space-y-1.5">
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
                      {Object.entries(leaveStatusLabels).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            </div> */}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Məzuniyyəti əlavə et
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
