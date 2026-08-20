import { z } from "zod";

import { StatusEnum } from "@/types/worker.types";

export const employeeStatuses = [
  StatusEnum.ACTIVE,
  StatusEnum.ON_LEAVE,
  StatusEnum.INACTIVE,
] as const;

export const employeeSchema = z.object({
  name: z.string().min(2, "Ad ən azı 2 simvol olmalıdır"),
  surname: z.string().min(2, "Soyad ən azı 2 simvol olmalıdır"),
  email: z.string().min(1, "E-poçt tələb olunur").email("Düzgün e-poçt daxil edin"),
  phone_number: z
    .string()
    .min(1, "Telefon nömrəsi tələb olunur")
    .regex(/^\d{9}$/, "Telefon nömrəsi 9 rəqəmdən ibarət olmalıdır"),
  department: z.string().min(1, "Departament seçin"),
  started_work: z
    .string()
    .min(1, "İşə başlama tarixi tələb olunur")
    .refine(
      (value) => new Date(value) >= new Date(new Date().toDateString()),
      "İşə başlama tarixi hal-hazırki vaxtdan əvvəl ola bilməz",
    ),
  status: z.enum(employeeStatuses),
});

export type EmployeeInput = z.infer<typeof employeeSchema>;
