import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "E-poçt tələb olunur").email("Düzgün e-poçt daxil edin"),
  password: z.string().min(1, "Şifrə tələb olunur"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Ad ən azı 2 simvol olmalıdır"),
  surname: z.string().min(2, "Ad ən azı 2 simvol olmalıdır"),
  email: z.string().min(1, "E-poçt tələb olunur").email("Düzgün e-poçt daxil edin"),
  password: z.string().min(8, "Şifrə ən azı 8 simvol olmalıdır"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
