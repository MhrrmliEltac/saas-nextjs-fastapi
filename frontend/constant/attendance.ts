import { AttendanceStatusEnum } from "@/types/attendance.types";

export const attendanceStatusLabels: Record<AttendanceStatusEnum, string> = {
  [AttendanceStatusEnum.PRESENT]: "İştirak edir",
  [AttendanceStatusEnum.LATE]: "Gecikmə",
  [AttendanceStatusEnum.ABSENT]: "Yoxdur",
  [AttendanceStatusEnum.REMOTE]: "Uzaqdan",
};

export const attendanceStatusStyles: Record<AttendanceStatusEnum, string> = {
  [AttendanceStatusEnum.PRESENT]: "bg-emerald-50 text-emerald-600",
  [AttendanceStatusEnum.LATE]: "bg-amber-50 text-amber-600",
  [AttendanceStatusEnum.ABSENT]: "bg-red-50 text-red-600",
  [AttendanceStatusEnum.REMOTE]: "bg-sky-50 text-sky-600",
};
