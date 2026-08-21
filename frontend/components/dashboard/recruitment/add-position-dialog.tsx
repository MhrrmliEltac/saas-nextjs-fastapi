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
import { positionSchema, type PositionInput } from "@/lib/validations/recruitment";
import { useGetDepartment } from "@/lib/queries/useDepartment";
import { usePostPosition } from "@/lib/queries/useRecruitment";
import type { RequestPosition } from "@/types/recruitment.types";

const defaultValues: Partial<PositionInput> = {
  candidates: 0,
};

export function AddPositionDialog() {
  const [open, setOpen] = useState(false);
  const { data: departments } = useGetDepartment(open);
  const { mutateAsync: createPosition } = usePostPosition();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PositionInput>({
    resolver: zodResolver(positionSchema),
    defaultValues,
  });

  const onSubmit = async (values: PositionInput) => {
    const payload: RequestPosition = {
      title: values.title,
      department: values.department,
      candidates: values.candidates,
    };

    await createPosition(payload);

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
            Vakansiya əlavə et
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni vakansiya</DialogTitle>
          <DialogDescription>
            Vakansiya &quot;açıq&quot; mərhələsi ilə yaradılacaq.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-1.5">
            <Label htmlFor="title">Vəzifə</Label>
            <Input
              id="title"
              placeholder="Frontend developer"
              aria-invalid={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-1.5">
              <Label htmlFor="candidates">Namizəd sayı</Label>
              <Input
                id="candidates"
                type="number"
                min={0}
                aria-invalid={!!errors.candidates}
                {...register("candidates")}
              />
              {errors.candidates && (
                <p className="text-xs text-destructive">
                  {errors.candidates.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Vakansiyanı əlavə et
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
