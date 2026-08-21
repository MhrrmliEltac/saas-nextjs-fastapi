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
import { useDeleteAttendance } from "@/lib/queries/useAttendance";
import type { Attendance } from "@/types/attendance.types";

export function DeleteAttendanceDialog({ record }: { record: Attendance }) {
  const [open, setOpen] = useState(false);
  const mutation = useDeleteAttendance();

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
          <DialogTitle>Davamiyyət qeydini sil</DialogTitle>
          <DialogDescription>
            &quot;{record.employee}&quot; üçün bu qeydi silmək istədiyinizə
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
