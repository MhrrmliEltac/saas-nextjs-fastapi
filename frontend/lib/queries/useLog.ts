import { logService } from "@/services/log.service";
import { useQuery } from "@tanstack/react-query";

export const useGetLog = (enabled: boolean) => {
  return useQuery({
    queryKey: ["log"],
    queryFn: logService.list,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
    enabled,
  });
};
