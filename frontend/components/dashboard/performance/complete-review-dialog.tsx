"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

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
  completeReviewSchema,
  type CompleteReviewInput,
} from "@/lib/validations/performance";
import { useUpdatePerformance } from "@/lib/queries/usePerformance";
import { ReviewStatusEnum, type PerformanceReview } from "@/types/performance.types";

export function CompleteReviewDialog({ review }: { review: PerformanceReview }) {
  const [open, setOpen] = useState(false);
  const mutation = useUpdatePerformance();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompleteReviewInput>({
    resolver: zodResolver(completeReviewSchema),
    defaultValues: { score: 0 },
  });

  const onSubmit = async (values: CompleteReviewInput) => {
    try {
      await mutation.mutateAsync({
        id: review.id,
        payload: { score: values.score, status: ReviewStatusEnum.COMPLETED },
      });
      reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
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
          <Button size="sm" variant="outline">
            <CheckCircle2 className="size-4" />
            Tamamla
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Qiymətləndirməni tamamla</DialogTitle>
          <DialogDescription>
            &quot;{review.employee}&quot; üçün bal daxil edin (0–5).
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-1.5">
            <Label htmlFor="score">Bal</Label>
            <Input
              id="score"
              type="number"
              min={0}
              max={5}
              step="0.1"
              aria-invalid={!!errors.score}
              {...register("score")}
            />
            {errors.score && (
              <p className="text-xs text-destructive">{errors.score.message}</p>
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
