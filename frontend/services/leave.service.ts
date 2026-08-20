import { request } from "@/api/request";
import {
  Leave,
  RequestLeave,
  RequestUpdateLeave,
  RequestUpdateStatusLeave,
} from "@/types/leave.types";
import { SuccessResponse } from "@/types/success.types";

export const leaveService = {
  list: async (): Promise<Leave[]> => {
    const res = await request.get("/leave/list");
    return res.data;
  },
  count: async (): Promise<number> => {
    const res = await request.get("/leave/count");
    return res.data;
  },
  pending: async (): Promise<Leave[]> => {
    const res = await request.get("/leave/pending");
    return res.data;
  },
  get_by_id: async (id: string): Promise<Leave> => {
    const res = await request.get(`/leave/${id}`);
    return res.data;
  },
  create: async (payload: RequestLeave): Promise<SuccessResponse> => {
    const res = await request.post("/leave/create", payload);
    return res.data;
  },
  update: async (
    id: string,
    payload: RequestUpdateLeave,
  ): Promise<SuccessResponse> => {
    const res = await request.put(`/leave/update/${id}`, payload);
    return res.data;
  },
  updateStatus: async (
    id: string,
    payload: RequestUpdateStatusLeave,
  ): Promise<SuccessResponse> => {
    const res = await request.patch(`/leave/update/${id}/status`, payload);
    return res.data;
  },
  delete: async (id: string): Promise<SuccessResponse> => {
    const res = await request.delete(`/leave/delete/${id}`);
    return res.data;
  },
};
