export interface OpenPosition {
  id: string;
  title: string;
  department: string;
  candidates: number;
  stage: "open" | "interviewing" | "offer";
  postedDate: string;
}

const positions: OpenPosition[] = [
  { id: "1", title: "Frontend developer", department: "Mühəndislik", candidates: 18, stage: "interviewing", postedDate: "2026-07-01" },
  { id: "2", title: "Satış təmsilçisi", department: "Satış", candidates: 7, stage: "open", postedDate: "2026-07-20" },
  { id: "3", title: "Məzmun meneceri", department: "Marketinq", candidates: 12, stage: "offer", postedDate: "2026-06-15" },
  { id: "4", title: "Mühasib köməkçisi", department: "Maliyyə", candidates: 4, stage: "open", postedDate: "2026-08-05" },
];

export const stageLabels: Record<OpenPosition["stage"], string> = {
  open: "Açıq",
  interviewing: "Müsahibə",
  offer: "Təklif",
};

export const stageStyles: Record<OpenPosition["stage"], string> = {
  open: "bg-sky-50 text-sky-600",
  interviewing: "bg-amber-50 text-amber-600",
  offer: "bg-emerald-50 text-emerald-600",
};

export async function fetchOpenPositions(): Promise<OpenPosition[]> {
  return positions;
}
