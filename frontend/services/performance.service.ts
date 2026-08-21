import { request } from "@/api/request";
import {
  PerformanceReview,
  RequestPerformance,
  RequestUpdatePerformance,
} from "@/types/performance.types";
import { SuccessResponse } from "@/types/success.types";

export const performanceService = {
  list: async (): Promise<PerformanceReview[]> => {
    const res = await request.get("/performance/list");
    return res.data;
  },
  get_by_id: async (id: string): Promise<PerformanceReview> => {
    const res = await request.get(`/performance/${id}`);
    return res.data;
  },
  create: async (payload: RequestPerformance): Promise<SuccessResponse> => {
    const res = await request.post("/performance/create", payload);
    return res.data;
  },
  update: async (
    id: string,
    payload: RequestUpdatePerformance,
  ): Promise<SuccessResponse> => {
    const res = await request.put(`/performance/update/${id}`, payload);
    return res.data;
  },
  delete: async (id: string): Promise<SuccessResponse> => {
    const res = await request.delete(`/performance/delete/${id}`);
    return res.data;
  },
};
