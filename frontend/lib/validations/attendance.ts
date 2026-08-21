import { z } from "zod";

import { AttendanceStatusEnum } from "@/types/attendance.types";

export const attendanceStatuses = [
  AttendanceStatusEnum.PRESENT,
  AttendanceStatusEnum.LATE,
  AttendanceStatusEnum.ABSENT,
  AttendanceStatusEnum.REMOTE,
] as const;

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

export const attendanceSchema = z.object({
  employee: z.string().min(2, "İşçi adı ən azı 2 simvol olmalıdır"),
  department: z.string().min(1, "Departament seçin"),
  check_in: z
    .string()
    .regex(timePattern, "Vaxt formatı HH:MM olmalıdır")
    .optional()
    .or(z.literal("")),
  check_out: z
    .string()
    .regex(timePattern, "Vaxt formatı HH:MM olmalıdır")
    .optional()
    .or(z.literal("")),
  status: z.enum(attendanceStatuses),
});

export type AttendanceInput = z.infer<typeof attendanceSchema>;
