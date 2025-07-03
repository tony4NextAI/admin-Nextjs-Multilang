import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";

export const defaultLiveStreamOption = {
  page: 1,
  limit: 10,
  filterBy: "",
  sortBy: ""
};

// Define the create livestream request type
interface CreateLiveStreamRequest {
  youtubeLink: string;
  streamer: string;
  startTime: string;
  endTime: string;
}

// Define the update livestream request type
interface UpdateLiveStreamRequest {
  id: number;
  result: number;
}

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

const fetchLiveStream = async (_queryParams = defaultLiveStreamOption): Promise<LiveStreamApiResponse> => {
  const liveStream = await apiAuthFetch<LiveStreamApiResponse>(ApiPath.liveStream, {
    method: "POST",
    body: {
      ..._queryParams,
    },
  });
  return liveStream;
};

const createLiveStream = async (data: CreateLiveStreamRequest): Promise<LiveStreamApiResponse> => {
  const response = await apiAuthFetch<LiveStreamApiResponse>(ApiPath.createLiveStream, {
    method: "POST",
    body: data,
  });
  return response;
};

const updateLiveStream = async (data: UpdateLiveStreamRequest): Promise<LiveStreamApiResponse> => {
  const response = await apiAuthFetch<LiveStreamApiResponse>(ApiPath.updateLiveStream, {
    method: "PUT",
    body: data,
  });
  return response;
};

export const useLiveStream = () => {
  const { status } = useSession();
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["liveStream"],
    queryFn: () => fetchLiveStream(defaultLiveStreamOption),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  const createMutation = useMutation({
    mutationFn: createLiveStream,
    onSuccess: () => {
      // Invalidate and refetch livestream data after successful creation
      queryClient.invalidateQueries({ queryKey: ["liveStream"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateLiveStream,
    onSuccess: () => {
      // Invalidate and refetch livestream data after successful update
      queryClient.invalidateQueries({ queryKey: ["liveStream"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createLiveStream: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
    updateLiveStream: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}; 