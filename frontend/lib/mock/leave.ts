export interface LeaveRequest {
  id: string;
  employee: string;
  type: "İllik" | "Xəstəlik" | "Ödənişsiz";
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
}

const leaveRequests: LeaveRequest[] = [
  { id: "1", employee: "Rəşad Məmmədov", type: "İllik", startDate: "2026-08-20", endDate: "2026-08-27", days: 6, status: "pending" },
  { id: "2", employee: "Leyla Əhmədova", type: "Xəstəlik", startDate: "2026-08-10", endDate: "2026-08-12", days: 3, status: "approved" },
  { id: "3", employee: "Tural Hüseynov", type: "Ödənişsiz", startDate: "2026-09-01", endDate: "2026-09-05", days: 5, status: "pending" },
  { id: "4", employee: "Aysel Cəfərova", type: "İllik", startDate: "2026-07-14", endDate: "2026-07-18", days: 5, status: "rejected" },
];

export const leaveStatusLabels: Record<LeaveRequest["status"], string> = {
  pending: "Gözləyir",
  approved: "Təsdiqləndi",
  rejected: "Rədd edildi",
};

export const leaveStatusStyles: Record<LeaveRequest["status"], string> = {
  pending: "bg-amber-50 text-amber-600",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

export async function fetchLeaveRequests(): Promise<LeaveRequest[]> {
  return leaveRequests;
}
