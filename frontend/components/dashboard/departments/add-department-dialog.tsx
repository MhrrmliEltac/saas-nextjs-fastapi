"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
  departmentSchema,
  type DepartmentInput,
} from "@/lib/validations/department";
import { usePostDepartment } from "@/lib/queries/useDepartment";

export function AddDepartmentDialog() {
  const [open, setOpen] = useState(false);
  const mutation = usePostDepartment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
  });

  const onSubmit = async (values: DepartmentInput) => {
    try {
      const res = await mutation.mutateAsync(values);
    } catch (error) {
      console.log(error);
    }

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
            Departament yarat
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni departament yarat</DialogTitle>
          <DialogDescription>
            Departamentin adını və rəhbərini daxil edin.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-1.5">
            <Label htmlFor="name">Departament adı</Label>
            <Input
              id="name"
              placeholder="Mühəndislik"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="head">Rəhbər</Label>
            <Input
              id="head"
              placeholder="Tural Hüseynov"
              aria-invalid={!!errors.head}
              {...register("head")}
            />
            {errors.head && (
              <p className="text-xs text-destructive">{errors.head.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Departament yarat
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
