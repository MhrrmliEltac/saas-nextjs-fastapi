import { request } from "@/api/request";
import { PayloadLogin, PayloadRegister, User } from "@/types/auth.types";

export const authService = {
  login: async (payload: PayloadLogin) => {
    const response = await request.post("/auth/login", payload);
    return response.data;
  },
  register: async (payload: PayloadRegister) => {
    const response = await request.post("/auth/register", payload);
    return response.data;
  },
  logout: async () => {
    const response = await request.post("/auth/logout");
    return response.data;
  },
  me: async (): Promise<User> => {
    const response = await request.get("/auth/me");
    return response.data;
  },
  // İctimai səhifələr üçün: 401 alınsa /login-ə yönləndirmədən sakit yoxlama.
  meOptional: async (): Promise<User | null> => {
    try {
      const response = await request.get<User>("/auth/me", {
        skipAuthRedirect: true,
      });
      return response.data;
    } catch {
      return null;
    }
  },
};
