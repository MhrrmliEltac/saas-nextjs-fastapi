export enum ReviewStatusEnum {
  COMPLETED = "completed",
  IN_PROGRESS = "in_progress",
}

export interface PerformanceReview {
  id: string;
  employee: string;
  period: string;
  reviewer: string;
  score: number;
  status: ReviewStatusEnum;
}

export interface RequestPerformance {
  employee: string;
  period: string;
  reviewer: string;
}

export interface RequestUpdatePerformance {
  employee?: string;
  period?: string;
  reviewer?: string;
  score?: number;
  status?: ReviewStatusEnum;
}
