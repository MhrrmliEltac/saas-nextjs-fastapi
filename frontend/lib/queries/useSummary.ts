import { summaryService } from "@/services/summary.service";
import { useQuery } from "@tanstack/react-query";

export const useGetSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: summaryService.get,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
