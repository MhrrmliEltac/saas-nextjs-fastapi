"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

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
import { useDeleteDepartment } from "@/lib/queries/useDepartment";
import { DepartmentList } from "@/types/department.types";

export function DeleteDepartmentDialog({
  department,
}: {
  department: DepartmentList;
}) {
  const [open, setOpen] = useState(false);
  const mutation = useDeleteDepartment();

  const onConfirm = async () => {
    try {
      await mutation.mutateAsync(department.id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="sm" className="flex-1">
            <Trash2 className="size-4" />
            Sil
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Departamenti sil</DialogTitle>
          <DialogDescription>
            &quot;{department.name}&quot; departamentini silmək istədiyinizə
            əminsiniz? Bu əməliyyat geri qaytarıla bilməz.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            İmtina et
          </Button>
          <Button
            variant="destructive"
            disabled={mutation.isPending}
            onClick={onConfirm}
          >
            Sil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
