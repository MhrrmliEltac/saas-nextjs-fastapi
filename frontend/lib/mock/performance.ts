export interface PerformanceReview {
  id: string;
  employee: string;
  period: string;
  reviewer: string;
  score: number;
  status: "completed" | "in_progress";
}

const reviews: PerformanceReview[] = [
  { id: "1", employee: "Əli Vəliyev", period: "2026 Q2", reviewer: "İdarə Heyəti", score: 4.8, status: "completed" },
  { id: "2", employee: "Tural Hüseynov", period: "2026 Q2", reviewer: "Nərmin Quliyeva", score: 4.2, status: "completed" },
  { id: "3", employee: "Leyla Əhmədova", period: "2026 Q3", reviewer: "Nərmin Quliyeva", score: 0, status: "in_progress" },
  { id: "4", employee: "Rəşad Məmmədov", period: "2026 Q3", reviewer: "Nərmin Quliyeva", score: 0, status: "in_progress" },
];

export const performanceStatusLabels: Record<PerformanceReview["status"], string> = {
  completed: "Tamamlandı",
  in_progress: "Davam edir",
};

export const performanceStatusStyles: Record<PerformanceReview["status"], string> = {
  completed: "bg-emerald-50 text-emerald-600",
  in_progress: "bg-sky-50 text-sky-600",
};

export async function fetchPerformanceReviews(): Promise<PerformanceReview[]> {
  return reviews;
}
