import { z } from "zod";

export const payrollSchema = z.object({
  employee: z.string().min(2, "İşçi adı ən azı 2 simvol olmalıdır"),
  position: z.string().min(2, "Vəzifə ən azı 2 simvol olmalıdır"),
  base_salary: z.coerce.number().min(0, "Əsas maaş mənfi ola bilməz"),
  bonus: z.coerce.number().min(0, "Bonus mənfi ola bilməz"),
});

export type PayrollInput = z.infer<typeof payrollSchema>;
