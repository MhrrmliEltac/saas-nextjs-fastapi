import { request } from "@/api/request";
import {
  Payroll,
  RequestPayroll,
  RequestUpdatePayroll,
} from "@/types/payroll.types";
import { SuccessResponse } from "@/types/success.types";

export const payrollService = {
  list: async (): Promise<Payroll[]> => {
    const res = await request.get("/payroll/list");
    return res.data;
  },
  get_by_id: async (id: string): Promise<Payroll> => {
    const res = await request.get(`/payroll/${id}`);
    return res.data;
  },
  create: async (payload: RequestPayroll): Promise<SuccessResponse> => {
    const res = await request.post("/payroll/create", payload);
    return res.data;
  },
  update: async (
    id: string,
    payload: RequestUpdatePayroll,
  ): Promise<SuccessResponse> => {
    const res = await request.put(`/payroll/update/${id}`, payload);
    return res.data;
  },
  markPaid: async (id: string): Promise<SuccessResponse> => {
    const res = await request.patch(`/payroll/update/${id}/pay`);
    return res.data;
  },
  delete: async (id: string): Promise<SuccessResponse> => {
    const res = await request.delete(`/payroll/delete/${id}`);
    return res.data;
  },
};
