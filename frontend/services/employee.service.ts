import { request } from "@/api/request";
import { SuccessResponse } from "@/types/success.types";
import { RequestWorker, Worker } from "@/types/worker.types";

export const employeeService = {
  list: async (): Promise<Worker[]> => {
    const response = await request.get("/worker/list");
    return response.data;
  },
  get_by_id: async (id: string): Promise<Worker> => {
    const response = await request.get(`/worker/${id}`);
    return response.data;
  },
  count: async () => {
    const response = await request.get("/worker/count");
    return response.data;
  },
  create: async (payload: RequestWorker): Promise<SuccessResponse> => {
    const response = await request.post("/worker/create", payload);
    return response.data;
  },
  update: async (
    id: string,
    payload: Partial<RequestWorker>,
  ): Promise<SuccessResponse> => {
    const response = await request.put(`/worker/update/${id}`, payload);
    return response.data;
  },
  delete: async (id: string): Promise<SuccessResponse> => {
    const response = await request.delete(`/worker/delete/${id}`);
    return response.data;
  },
};
