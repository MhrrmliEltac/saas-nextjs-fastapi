import { z } from "zod";

export const performanceSchema = z.object({
  employee: z.string().min(2, "İşçi adı ən azı 2 simvol olmalıdır"),
  period: z.string().min(1, "Dövr tələb olunur"),
  reviewer: z.string().min(2, "Qiymətləndirənin adı ən azı 2 simvol olmalıdır"),
});

export type PerformanceInput = z.infer<typeof performanceSchema>;

export const completeReviewSchema = z.object({
  score: z.coerce.number().min(0, "Bal 0-dan kiçik ola bilməz").max(5, "Bal 5-dən böyük ola bilməz"),
});

export type CompleteReviewInput = z.infer<typeof completeReviewSchema>;
