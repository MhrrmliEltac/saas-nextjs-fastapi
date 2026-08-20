import { employeeService } from "@/services/employee.service";
import { RequestWorker } from "@/types/worker.types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { get_api_error_message } from "@/lib/helper/api_error";

export const useGetEmployee = () => {
  return useQuery({
    queryKey: ["employment"],
    queryFn: employeeService.list,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
};

export const useGetByIdEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employment", id],
    queryFn: () => employeeService.get_by_id(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });
};

export const useGetEmployeeLength = () => {
  return useQuery({
    queryKey: ["employment", "count"],
    queryFn: employeeService.count,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const usePostEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestWorker) => employeeService.create(payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employment"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      toast.success(data.message);
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: Partial<RequestWorker> }) =>
      employeeService.update(data.id, data.payload),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employment"] });
      toast.success(data.message);
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => employeeService.delete(id),
    onError: (error) => {
      toast.error(get_api_error_message(error));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employment"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      toast.success(data.message);
    },
  });
};
