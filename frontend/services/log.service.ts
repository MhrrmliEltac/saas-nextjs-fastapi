import { request } from "@/api/request";
import { Log } from "@/types/log.types";

export const logService = {
  list: async (): Promise<Log[]> => {
    const res = await request.get("/log/list");
    return res.data;
  },
};
