import { z } from "zod";

export const departmentSchema = z.object({
  name: z.string().min(2, "Departament adı ən azı 2 simvol olmalıdır"),
  head: z.string().min(2, "Rəhbərin adı ən azı 2 simvol olmalıdır"),
});

export type DepartmentInput = z.infer<typeof departmentSchema>;
