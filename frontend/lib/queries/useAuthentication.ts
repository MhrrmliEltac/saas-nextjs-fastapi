import { authService } from "@/services/auth.service";
import { PayloadLogin, PayloadRegister } from "@/types/auth.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useAuthLogin = () => {
  return useMutation({
    mutationKey: ["user"],
    mutationFn: (payload: PayloadLogin) => authService.login(payload),
    onError: (error, variables, onMutateResult, context) => {
      // An error happened!
      // console.log(`rolling back optimistic update with id ${error}`);

      if (isAxiosError(error)) {
        console.log(error.response?.data);
        return error.response?.data.detail;
      }
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      console.log(data);
      // Boom baby!
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      // Error or success... doesn't matter!
      console.log(data, "data", error, "error");
    },
  });
};

export const useAuthRegister = () => {
  return useMutation({
    mutationKey: ["user"],
    mutationFn: (payload: PayloadRegister) => authService.register(payload),
    onError: (error, variables, onMutateResult, context) => {
      if (isAxiosError(error)) {
        return error.response?.data.detail;
      }
    },
    onSuccess(data, variables, onMutateResult, context) {
      return data;
    },
  });
};

export const useAuthMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authService.me,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });
};

// İctimai (marketinq) səhifələr üçün: sessiya yoxdursa /login-ə məcburi yönləndirmir, sadəcə null qaytarır.
export const useAuthMeOptional = () => {
  return useQuery({
    queryKey: ["user", "optional"],
    queryFn: authService.meOptional,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
};

export const useAuthLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      router.push("/login");
    },
  });
};
