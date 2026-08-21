import { attendanceService } from "@/services/attendance.service";
import {
  RequestAttendance,
  RequestUpdateAttendance,
} from "@/types/attendance.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { get_api_error_message } from "@/lib/helper/api_error";

export const useGetAttendance = () => {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: attendanceService.list,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useGetTodayAttendance = () => {
  return useQuery({
    queryKey: ["attendance", "today"],
    queryFn: attendanceService.today,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const usePostAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestAttendance) => attendanceService.create(payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: RequestUpdateAttendance }) =>
      attendanceService.update(data.id, data.payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useDeleteAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => attendanceService.delete(id),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};
