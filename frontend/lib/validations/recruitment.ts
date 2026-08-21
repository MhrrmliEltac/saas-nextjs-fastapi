import { z } from "zod";

export const positionSchema = z.object({
  title: z.string().min(2, "Vəzifə adı ən azı 2 simvol olmalıdır"),
  department: z.string().min(1, "Departament seçin"),
  candidates: z.coerce.number().int().min(0, "Namizəd sayı mənfi ola bilməz"),
});

export type PositionInput = z.infer<typeof positionSchema>;
