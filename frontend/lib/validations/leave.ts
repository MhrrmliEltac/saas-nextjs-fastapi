import { z } from "zod";

import { LeaveTypeEnum, LeaveStatusEnum } from "@/types/leave.types";

export const leaveTypes = [
  LeaveTypeEnum.YEAR,
  LeaveTypeEnum.ILLNESS,
  LeaveTypeEnum.FREE,
] as const;

export const leaveStatuses = [
  LeaveStatusEnum.PENDING,
  LeaveStatusEnum.SUCCESS,
  LeaveStatusEnum.REJECT,
] as const;

export const leaveSchema = z
  .object({
    employee: z.string().min(2, "İşçi adı ən azı 2 simvol olmalıdır"),
    type: z.enum(leaveTypes),
    start_leave: z.string().min(1, "Başlama tarixi tələb olunur"),
    end_leave: z.string().min(1, "Bitmə tarixi tələb olunur"),
    status: z.enum(leaveStatuses),
  })
  .refine((data) => new Date(data.end_leave) >= new Date(data.start_leave), {
    message: "Məzuniyyətin bitmə tarixi başlama tarixindən kiçik ola bilməz",
    path: ["end_leave"],
  });

export type LeaveInput = z.infer<typeof leaveSchema>;
