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
import {
  performanceSchema,
  type PerformanceInput,
} from "@/lib/validations/performance";
import { usePostPerformance } from "@/lib/queries/usePerformance";
import type { RequestPerformance } from "@/types/performance.types";

export function AddPerformanceDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createPerformance } = usePostPerformance();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PerformanceInput>({
    resolver: zodResolver(performanceSchema),
  });

  const onSubmit = async (values: PerformanceInput) => {
    const payload: RequestPerformance = {
      employee: values.employee,
      period: values.period,
      reviewer: values.reviewer,
    };

    await createPerformance(payload);

    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) reset();
      }}
    >
      <DialogTrigger
        render={
          <Button size="sm">
            <Plus className="size-4" />
            Qiymətləndirmə başlat
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni performans qiymətləndirməsi</DialogTitle>
          <DialogDescription>
            Qiymətləndirmə &quot;davam edir&quot; statusu ilə yaradılacaq.
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
              <Label htmlFor="period">Dövr</Label>
              <Input
                id="period"
                placeholder="2026 Q3"
                aria-invalid={!!errors.period}
                {...register("period")}
              />
              {errors.period && (
                <p className="text-xs text-destructive">
                  {errors.period.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reviewer">Qiymətləndirən</Label>
              <Input
                id="reviewer"
                placeholder="Nərmin Quliyeva"
                aria-invalid={!!errors.reviewer}
                {...register("reviewer")}
              />
              {errors.reviewer && (
                <p className="text-xs text-destructive">
                  {errors.reviewer.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Qiymətləndirməni başlat
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
