import { payrollService } from "@/services/payroll.service";
import { RequestPayroll, RequestUpdatePayroll } from "@/types/payroll.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { get_api_error_message } from "@/lib/helper/api_error";

export const useGetPayroll = () => {
  return useQuery({
    queryKey: ["payroll"],
    queryFn: payrollService.list,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const usePostPayroll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestPayroll) => payrollService.create(payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["payroll"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useUpdatePayroll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: RequestUpdatePayroll }) =>
      payrollService.update(data.id, data.payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["payroll"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useMarkPayrollPaid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => payrollService.markPaid(id),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["payroll"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};

export const useDeletePayroll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => payrollService.delete(id),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["payroll"] });
      queryClient.invalidateQueries({ queryKey: ["log"] });
      toast.success(data.message);
    },
  });
};
