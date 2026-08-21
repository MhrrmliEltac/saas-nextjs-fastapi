import { recruitmentService } from "@/services/recruitment.service";
import {
  RequestPosition,
  RequestUpdatePosition,
  RequestUpdateStage,
} from "@/types/recruitment.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { get_api_error_message } from "@/lib/helper/api_error";

export const useGetPositions = () => {
  return useQuery({
    queryKey: ["recruitment"],
    queryFn: recruitmentService.list,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const usePostPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestPosition) => recruitmentService.create(payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recruitment"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useUpdatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: RequestUpdatePosition }) =>
      recruitmentService.update(data.id, data.payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recruitment"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useUpdatePositionStage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: RequestUpdateStage }) =>
      recruitmentService.updateStage(data.id, data.payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recruitment"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recruitmentService.delete(id),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recruitment"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};
