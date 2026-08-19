import { z } from "zod";

export const employeeStatuses = ["active", "leave", "inactive"] as const;

export const employeeSchema = z.object({
  name: z.string().min(2, "Ad ən azı 2 simvol olmalıdır"),
  surname: z.string().min(2, "Soyad ən azı 2 simvol olmalıdır"),
  email: z.string().min(1, "E-poçt tələb olunur").email("Düzgün e-poçt daxil edin"),
  phone: z.string().optional(),
  department: z.string().min(1, "Departament seçin"),
  position: z.string().min(2, "Vəzifə ən azı 2 simvol olmalıdır"),
  status: z.enum(employeeStatuses),
  hireDate: z.string().min(1, "İşə başlama tarixi tələb olunur"),
});

export type EmployeeInput = z.infer<typeof employeeSchema>;
