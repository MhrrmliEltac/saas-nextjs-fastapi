export interface AttendanceRecord {
  id: string;
  employee: string;
  department: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "present" | "late" | "absent" | "remote";
}

const attendance: AttendanceRecord[] = [
  { id: "1", employee: "Əli Vəliyev", department: "Mühəndislik", checkIn: "09:02", checkOut: "18:05", status: "present" },
  { id: "2", employee: "Nərmin Quliyeva", department: "İnsan Resursları", checkIn: "09:41", checkOut: "18:00", status: "late" },
  { id: "3", employee: "Leyla Əhmədova", department: "Marketinq", checkIn: "08:55", checkOut: null, status: "remote" },
  { id: "4", employee: "Tural Hüseynov", department: "Mühəndislik", checkIn: "09:00", checkOut: "18:10", status: "present" },
  { id: "5", employee: "Rəşad Məmmədov", department: "Satış", checkIn: null, checkOut: null, status: "absent" },
];

export const attendanceStatusLabels: Record<AttendanceRecord["status"], string> = {
  present: "İştirak edir",
  late: "Gecikmə",
  absent: "Yoxdur",
  remote: "Uzaqdan",
};

export const attendanceStatusStyles: Record<AttendanceRecord["status"], string> = {
  present: "bg-emerald-50 text-emerald-600",
  late: "bg-amber-50 text-amber-600",
  absent: "bg-red-50 text-red-600",
  remote: "bg-sky-50 text-sky-600",
};

export async function fetchAttendance(): Promise<AttendanceRecord[]> {
  return attendance;
}
