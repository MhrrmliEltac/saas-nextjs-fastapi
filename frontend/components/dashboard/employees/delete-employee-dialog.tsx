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
import { useDeleteEmployee } from "@/lib/queries/useEmployee";
import type { Worker } from "@/types/worker.types";

export function DeleteEmployeeDialog({ employee }: { employee: Worker }) {
  const [open, setOpen] = useState(false);
  const mutation = useDeleteEmployee();

  const onConfirm = async () => {
    try {
      await mutation.mutateAsync(employee.id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="icon-sm" aria-label="İşçini sil">
            <Trash2 className="size-4" />
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>İşçini sil</DialogTitle>
          <DialogDescription>
            &quot;{employee.fullname}&quot; işçisini silmək istədiyinizə
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
