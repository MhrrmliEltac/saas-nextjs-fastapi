import { request } from "@/api/request";
import {
  DepartmentList,
  RequestDepartment,
  RequestUpdateDepartment,
} from "@/types/department.types";
import { SuccessResponse } from "@/types/success.types";

export const departmentService = {
  getDepartment: async (): Promise<DepartmentList[]> => {
    const res = await request.get("/department/list");
    return res.data;
  },
  createDepartment: async (
    payload: RequestDepartment,
  ): Promise<SuccessResponse> => {
    const res = await request.post("/department/create", payload);
    return res.data;
  },
  updateDepartment: async (
    id: string,
    payload: RequestUpdateDepartment,
  ): Promise<SuccessResponse> => {
    const res = await request.put(`/department/update/${id}`, payload);
    return res.data;
  },
  deleteDepartment: async (id: string): Promise<SuccessResponse> => {
    const res = await request.delete(`/department/delete/${id}`);
    return res.data;
  },
};
