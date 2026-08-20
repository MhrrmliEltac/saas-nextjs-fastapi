import { request } from "@/api/request";
import { Summary } from "@/types/summary.types";

export const summaryService = {
  get: async (): Promise<Summary> => {
    const res = await request.get("/summary/");
    return res.data;
  },
};
