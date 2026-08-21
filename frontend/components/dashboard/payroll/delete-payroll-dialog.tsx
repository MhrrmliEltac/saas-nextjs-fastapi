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
import { useDeletePayroll } from "@/lib/queries/usePayroll";
import type { Payroll } from "@/types/payroll.types";

export function DeletePayrollDialog({ record }: { record: Payroll }) {
  const [open, setOpen] = useState(false);
  const mutation = useDeletePayroll();

  const onConfirm = async () => {
    try {
      await mutation.mutateAsync(record.id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="icon-sm" aria-label="Qeydi sil">
            <Trash2 className="size-4" />
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Maaş qeydini sil</DialogTitle>
          <DialogDescription>
            &quot;{record.employee}&quot; üçün bu maaş qeydini silmək
            istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz.
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
