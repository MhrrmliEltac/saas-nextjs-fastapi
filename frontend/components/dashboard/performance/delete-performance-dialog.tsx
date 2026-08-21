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
import { useDeletePerformance } from "@/lib/queries/usePerformance";
import type { PerformanceReview } from "@/types/performance.types";

export function DeletePerformanceDialog({ review }: { review: PerformanceReview }) {
  const [open, setOpen] = useState(false);
  const mutation = useDeletePerformance();

  const onConfirm = async () => {
    try {
      await mutation.mutateAsync(review.id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="icon-sm" aria-label="Qiymətləndirməni sil">
            <Trash2 className="size-4" />
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Qiymətləndirməni sil</DialogTitle>
          <DialogDescription>
            &quot;{review.employee}&quot; üçün bu qiymətləndirməni silmək
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
