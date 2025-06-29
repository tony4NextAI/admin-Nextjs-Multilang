import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";

export const defaultLiveStreamOption = {
  page: 1,
  limit: 10,
  filterBy: "",
  sortBy: ""
};

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

export const useLiveStream = () => {
  const { status } = useSession();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["liveStream"],
    queryFn: () => fetchLiveStream(defaultLiveStreamOption),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  return {
    data,
    isLoading,
    error,
  };
}; 