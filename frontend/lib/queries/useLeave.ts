import { leaveService } from "@/services/leave.service";
import {
  RequestLeave,
  RequestUpdateLeave,
  RequestUpdateStatusLeave,
} from "@/types/leave.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { get_api_error_message } from "@/lib/helper/api_error";

export const useGetLeave = () => {
  return useQuery({
    queryKey: ["leave"],
    queryFn: leaveService.list,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
};

export const useGetLeaveLength = () => {
  return useQuery({
    queryKey: ["leave", "count"],
    queryFn: leaveService.count,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
};

export const useGetPendingLeave = () => {
  return useQuery({
    queryKey: ["leave", "pending"],
    queryFn: leaveService.pending,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useGetByIdLeave = (id: string) => {
  return useQuery({
    queryKey: ["leave", id],
    queryFn: () => leaveService.get_by_id(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });
};

export const usePostLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestLeave) => leaveService.create(payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useUpdateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: RequestUpdateLeave }) =>
      leaveService.update(data.id, data.payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useUpdateStatusLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: RequestUpdateStatusLeave }) =>
      leaveService.updateStatus(data.id, data.payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useDeleteLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => leaveService.delete(id),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};
