import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";

export const defaultPredictOption = {
  page: 1,
  limit: 10,
  filterBy: "",
  sortBy: {
    createdAt: -1,
  },
};

// Define the API response type for predicts
interface PredictApiResponse {
  success: boolean;
  result?: {
    data?: Array<{
      _id: string;
      userId: {
        _id: string;
        account: string;
        bank: string;
      };
      amount: number;
      message: string;
      predict: number;
      streamId: number;
      isWin: boolean;
      isPaid: boolean;
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

const fetchPredicts = async (_queryParams = defaultPredictOption): Promise<PredictApiResponse> => {
  const predicts = await apiAuthFetch<PredictApiResponse>(ApiPath.predicts, {
    method: "POST",
    body: {
      ..._queryParams,
    },
  });
  return predicts;
};

export const usePredicts = () => {
  const { status } = useSession();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["predicts"],
    queryFn: () => fetchPredicts(defaultPredictOption),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  return {
    data,
    isLoading,
    error,
  };
}; 