import { performanceService } from "@/services/performance.service";
import {
  RequestPerformance,
  RequestUpdatePerformance,
} from "@/types/performance.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { get_api_error_message } from "@/lib/helper/api_error";

export const useGetPerformance = () => {
  return useQuery({
    queryKey: ["performance"],
    queryFn: performanceService.list,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const usePostPerformance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestPerformance) => performanceService.create(payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["performance"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useUpdatePerformance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: RequestUpdatePerformance }) =>
      performanceService.update(data.id, data.payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["performance"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useDeletePerformance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => performanceService.delete(id),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["performance"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};
