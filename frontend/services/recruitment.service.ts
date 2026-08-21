import { request } from "@/api/request";
import {
  OpenPosition,
  RequestPosition,
  RequestUpdatePosition,
  RequestUpdateStage,
} from "@/types/recruitment.types";
import { SuccessResponse } from "@/types/success.types";

export const recruitmentService = {
  list: async (): Promise<OpenPosition[]> => {
    const res = await request.get("/recruitment/list");
    return res.data;
  },
  get_by_id: async (id: string): Promise<OpenPosition> => {
    const res = await request.get(`/recruitment/${id}`);
    return res.data;
  },
  create: async (payload: RequestPosition): Promise<SuccessResponse> => {
    const res = await request.post("/recruitment/create", payload);
    return res.data;
  },
  update: async (
    id: string,
    payload: RequestUpdatePosition,
  ): Promise<SuccessResponse> => {
    const res = await request.put(`/recruitment/update/${id}`, payload);
    return res.data;
  },
  updateStage: async (
    id: string,
    payload: RequestUpdateStage,
  ): Promise<SuccessResponse> => {
    const res = await request.patch(`/recruitment/update/${id}/stage`, payload);
    return res.data;
  },
  delete: async (id: string): Promise<SuccessResponse> => {
    const res = await request.delete(`/recruitment/delete/${id}`);
    return res.data;
  },
};
