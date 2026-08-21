import { PositionStageEnum } from "@/types/recruitment.types";

export const stageLabels: Record<PositionStageEnum, string> = {
  [PositionStageEnum.OPEN]: "Açıq",
  [PositionStageEnum.INTERVIEWING]: "Müsahibə",
  [PositionStageEnum.OFFER]: "Təklif",
};

export const stageStyles: Record<PositionStageEnum, string> = {
  [PositionStageEnum.OPEN]: "bg-sky-50 text-sky-600",
  [PositionStageEnum.INTERVIEWING]: "bg-amber-50 text-amber-600",
  [PositionStageEnum.OFFER]: "bg-emerald-50 text-emerald-600",
};

export const nextStage: Partial<Record<PositionStageEnum, PositionStageEnum>> = {
  [PositionStageEnum.OPEN]: PositionStageEnum.INTERVIEWING,
  [PositionStageEnum.INTERVIEWING]: PositionStageEnum.OFFER,
};
