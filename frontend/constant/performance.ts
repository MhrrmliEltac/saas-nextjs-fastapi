import { ReviewStatusEnum } from "@/types/performance.types";

export const performanceStatusLabels: Record<ReviewStatusEnum, string> = {
  [ReviewStatusEnum.COMPLETED]: "Tamamlandı",
  [ReviewStatusEnum.IN_PROGRESS]: "Davam edir",
};

export const performanceStatusStyles: Record<ReviewStatusEnum, string> = {
  [ReviewStatusEnum.COMPLETED]: "bg-emerald-50 text-emerald-600",
  [ReviewStatusEnum.IN_PROGRESS]: "bg-sky-50 text-sky-600",
};
