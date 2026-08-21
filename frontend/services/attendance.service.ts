import { request } from "@/api/request";
import {
  Attendance,
  RequestAttendance,
  RequestUpdateAttendance,
} from "@/types/attendance.types";
import { SuccessResponse } from "@/types/success.types";

export const attendanceService = {
  list: async (): Promise<Attendance[]> => {
    const res = await request.get("/attendance/list");
    return res.data;
  },
  today: async (): Promise<Attendance[]> => {
    const res = await request.get("/attendance/today");
    return res.data;
  },
  get_by_id: async (id: string): Promise<Attendance> => {
    const res = await request.get(`/attendance/${id}`);
    return res.data;
  },
  create: async (payload: RequestAttendance): Promise<SuccessResponse> => {
    const res = await request.post("/attendance/create", payload);
    return res.data;
  },
  update: async (
    id: string,
    payload: RequestUpdateAttendance,
  ): Promise<SuccessResponse> => {
    const res = await request.put(`/attendance/update/${id}`, payload);
    return res.data;
  },
  delete: async (id: string): Promise<SuccessResponse> => {
    const res = await request.delete(`/attendance/delete/${id}`);
    return res.data;
  },
};
