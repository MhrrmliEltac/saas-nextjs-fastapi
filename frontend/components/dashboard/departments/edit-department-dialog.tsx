"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  departmentSchema,
  type DepartmentInput,
} from "@/lib/validations/department";
import { useUpdateDepartment } from "@/lib/queries/useDepartment";
import { DepartmentList } from "@/types/department.types";

export function EditDepartmentDialog({
  department,
}: {
  department: DepartmentList;
}) {
  const [open, setOpen] = useState(false);
  const mutation = useUpdateDepartment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: department.name,
      head: department.head,
    },
  });

  useEffect(() => {
    if (open) {
      reset({ name: department.name, head: department.head });
    }
  }, [open, department, reset]);

  const onSubmit = async (values: DepartmentInput) => {
    try {
      await mutation.mutateAsync({ id: department.id, payload: values });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="flex-1">
            <Pencil className="size-4" />
            Redaktə et
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Departamenti redaktə et</DialogTitle>
          <DialogDescription>
            Departamentin adını və rəhbərini yeniləyin.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Departament adı</Label>
            <Input
              id="edit-name"
              placeholder="Mühəndislik"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-head">Rəhbər</Label>
            <Input
              id="edit-head"
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
              Yadda saxla
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
