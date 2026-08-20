import { LeaveTypeEnum, LeaveStatusEnum } from "@/types/leave.types";

export const leaveTypeLabels: Record<LeaveTypeEnum, string> = {
  [LeaveTypeEnum.YEAR]: "İllik",
  [LeaveTypeEnum.ILLNESS]: "Xəstəlik",
  [LeaveTypeEnum.FREE]: "Ödənişsiz",
};

export const leaveStatusLabels: Record<LeaveStatusEnum, string> = {
  [LeaveStatusEnum.PENDING]: "Gözləyir",
  [LeaveStatusEnum.SUCCESS]: "Təsdiqləndi",
  [LeaveStatusEnum.REJECT]: "Rədd edildi",
};

export const leaveStatusStyles: Record<LeaveStatusEnum, string> = {
  [LeaveStatusEnum.PENDING]: "bg-amber-50 text-amber-600",
  [LeaveStatusEnum.SUCCESS]: "bg-emerald-50 text-emerald-600",
  [LeaveStatusEnum.REJECT]: "bg-red-50 text-red-600",
};
