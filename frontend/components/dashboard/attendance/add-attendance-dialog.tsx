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
import {
  attendanceSchema,
  type AttendanceInput,
} from "@/lib/validations/attendance";
import { useGetDepartment } from "@/lib/queries/useDepartment";
import { usePostAttendance } from "@/lib/queries/useAttendance";
import { AttendanceStatusEnum, type RequestAttendance } from "@/types/attendance.types";
import { attendanceStatusLabels } from "@/constant/attendance";

const defaultValues: Partial<AttendanceInput> = {
  status: AttendanceStatusEnum.PRESENT,
};

export function AddAttendanceDialog() {
  const [open, setOpen] = useState(false);
  const { data: departments } = useGetDepartment(open);
  const { mutateAsync: createAttendance } = usePostAttendance();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AttendanceInput>({
    resolver: zodResolver(attendanceSchema),
    defaultValues,
  });

  const onSubmit = async (values: AttendanceInput) => {
    const payload: RequestAttendance = {
      employee: values.employee,
      department: values.department,
      check_in: values.check_in || null,
      check_out: values.check_out || null,
      status: values.status,
    };

    await createAttendance(payload);

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
            Qeyd əlavə et
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni davamiyyət qeydi</DialogTitle>
          <DialogDescription>
            İşçinin giriş-çıxış məlumatlarını daxil edin.
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

          <div className="space-y-1.5">
            <Label htmlFor="department">Departament</Label>
            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger id="department" aria-invalid={!!errors.department}>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="check_in">Giriş</Label>
              <Input
                id="check_in"
                type="time"
                aria-invalid={!!errors.check_in}
                {...register("check_in")}
              />
              {errors.check_in && (
                <p className="text-xs text-destructive">
                  {errors.check_in.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="check_out">Çıxış</Label>
              <Input
                id="check_out"
                type="time"
                aria-invalid={!!errors.check_out}
                {...register("check_out")}
              />
              {errors.check_out && (
                <p className="text-xs text-destructive">
                  {errors.check_out.message}
                </p>
              )}
            </div>
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
                    {Object.entries(attendanceStatusLabels).map(
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
