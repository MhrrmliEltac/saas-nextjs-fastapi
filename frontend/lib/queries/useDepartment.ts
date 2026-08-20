import { departmentService } from "@/services/department.service";
import {
  RequestDepartment,
  RequestUpdateDepartment,
} from "@/types/department.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetDepartment = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["department"],
    queryFn: departmentService.getDepartment,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
    enabled,
  });
};

export const usePostDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestDepartment) =>
      departmentService.createDepartment(payload),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
      console.log(data);
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RequestUpdateDepartment;
    }) => departmentService.updateDepartment(id, payload),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => departmentService.deleteDepartment(id),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
  });
};
