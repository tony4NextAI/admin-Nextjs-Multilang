import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";
import { useState } from "react";
import { createDefaultPaginationOption, API_CONFIG } from "../config";

export const defaultLiveStreamOption = createDefaultPaginationOption({
  createdAt: API_CONFIG.sorting.defaultCreatedAtSort,
});



// Define the API response type for livestream
interface LiveStreamApiResponse {
  success: boolean;
  result?: {
    data?: Array<{
      _id: string;
      youtubeLink: string;
      streamer: string;
      startTime: string;
      endTime: string;
      users: Array<unknown>;
      totalPlay: number;
      total: number;
      result: number;
      status: string;
      createdAt: string;
      updatedAt: string;
      id: number;
      __v?: number;
    }>;
    total?: number;
    totalPages?: number;
    page?: number;
    limit?: number;
  };
  error?: {
    status: number;
    code: string;
    message: string;
  };
}

interface LiveStreamQueryParams {
  page?: number;
  limit?: number;
  filterBy?: string;
  sortBy?: {
    createdAt?: number;
    [key: string]: number | string | undefined;
  };
}

const fetchLiveStream = async (queryParams: LiveStreamQueryParams = defaultLiveStreamOption): Promise<LiveStreamApiResponse> => {
  const liveStream = await apiAuthFetch<LiveStreamApiResponse>(ApiPath.liveStream, {
    method: "POST",
    body: {
      ...defaultLiveStreamOption,
      ...queryParams,
    },
  });
  return liveStream;
};



export const useLiveStream = (initialParams?: LiveStreamQueryParams) => {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState<LiveStreamQueryParams>({
    ...defaultLiveStreamOption,
    ...initialParams,
  });
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["liveStream", queryParams],
    queryFn: () => fetchLiveStream(queryParams),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 30, // 30 seconds
  });

  const createMutation = useMutation({
    mutationFn: async (formData: {
      youtubeLink: string;
      streamer: string;
      startTime: string;
      endTime: string;
    }) => {
      const response = await apiAuthFetch(ApiPath.createLiveStream, {
        method: "POST",
        body: formData,
      });
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch live stream data
      queryClient.invalidateQueries({ queryKey: ["liveStream"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, result }: { id: number; result: number }) => {
      const response = await apiAuthFetch(`${ApiPath.updateLiveStream}/${id}`, {
        method: "PUT",
        body: { result },
      });
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch live stream data
      queryClient.invalidateQueries({ queryKey: ["liveStream"] });
    },
  });

  const updateParams = (newParams: Partial<LiveStreamQueryParams>) => {
    setQueryParams(prev => ({ ...prev, ...newParams }));
  };

  const changePage = (page: number) => {
    updateParams({ page });
  };

  const changePageSize = (limit: number) => {
    updateParams({ limit, page: 1 }); // Reset to first page when changing page size
  };

  return {
    data,
    isLoading,
    error,
    refetch,
    queryParams,
    updateParams,
    changePage,
    changePageSize,
    createLiveStream: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
    updateLiveStream: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}; 