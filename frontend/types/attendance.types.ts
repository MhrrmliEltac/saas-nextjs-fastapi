export enum AttendanceStatusEnum {
  PRESENT = "present",
  LATE = "late",
  ABSENT = "absent",
  REMOTE = "remote",
}

export interface Attendance {
  id: string;
  employee: string;
  department: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: AttendanceStatusEnum;
}

export interface RequestAttendance {
  employee: string;
  department: string;
  date?: string;
  check_in?: string | null;
  check_out?: string | null;
  status: AttendanceStatusEnum;
}

export interface RequestUpdateAttendance {
  employee?: string;
  department?: string;
  date?: string;
  check_in?: string | null;
  check_out?: string | null;
  status?: AttendanceStatusEnum;
}
