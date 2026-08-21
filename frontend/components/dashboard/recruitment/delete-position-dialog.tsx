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
import { useDeletePosition } from "@/lib/queries/useRecruitment";
import type { OpenPosition } from "@/types/recruitment.types";

export function DeletePositionDialog({ position }: { position: OpenPosition }) {
  const [open, setOpen] = useState(false);
  const mutation = useDeletePosition();

  const onConfirm = async () => {
    try {
      await mutation.mutateAsync(position.id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="icon-sm" aria-label="Vakansiyanı sil">
            <Trash2 className="size-4" />
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vakansiyanı sil</DialogTitle>
          <DialogDescription>
            &quot;{position.title}&quot; vakansiyasını silmək istədiyinizə
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
