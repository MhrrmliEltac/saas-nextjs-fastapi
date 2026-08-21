import { request } from "@/api/request";
import { Log, WeeklyActivity } from "@/types/log.types";

export const logService = {
  list: async (): Promise<Log[]> => {
    const res = await request.get("/log/list");
    return res.data;
  },
  weekly: async (): Promise<WeeklyActivity[]> => {
    const res = await request.get("/log/weekly");
    return res.data;
  },
};
