import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";

// Define filter options based on your requirements
export interface PredictFilterOptions {
  page?: number;
  limit?: number;
  filterBy?: {
    userId?: string;
    streamId?: number;
    isWin?: boolean;
    isPaid?: boolean;
    status?: "pending" | "completed";
    [key: string]: string | number | boolean | undefined;
  };
  sortBy?: {
    amount?: -1 | 1;
    createdAt?: -1 | 1;
    userId?: -1 | 1;
    streamId?: -1 | 1;
    isWin?: -1 | 1;
    isPaid?: -1 | 1;
    status?: -1 | 1;
  };
}

export const defaultPredictOption: PredictFilterOptions = {
  page: 1,
  limit: 10,
  filterBy: {},
  sortBy: {
    amount: -1,
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
      status: "pending" | "completed";
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

const fetchPredicts = async (_queryParams: PredictFilterOptions = defaultPredictOption): Promise<PredictApiResponse> => {
  const predicts = await apiAuthFetch<PredictApiResponse>(ApiPath.predicts, {
    method: "POST",
    body: {
      ..._queryParams,
    },
  });
  return predicts;
};

/**
 * Hook for fetching predicts with filtering capabilities
 * 
 * @example
 * // Basic usage
 * const { data, isLoading, error } = usePredicts();
 * 
 * @example
 * // With filters as object
 * const { data, isLoading, error } = usePredicts({
 *   page: 1,
 *   limit: 10,
 *   filterBy: {
 *     status: "pending",
 *     isWin: true,
 *     isPaid: false
 *   },
 *   sortBy: { amount: -1 }
 * });
 * 
 * @example
 * // Filter by specific user or stream
 * const { data, isLoading, error } = usePredicts({
 *   filterBy: {
 *     userId: "60f7b3b3b3b3b3b3b3b3b3b3",
 *     streamId: 123
 *   },
 *   sortBy: { createdAt: -1 }
 * });
 */

export const usePredicts = (options: PredictFilterOptions = defaultPredictOption) => {
  const { status } = useSession();
  
  const queryParams = {
    ...defaultPredictOption,
    ...options,
  };
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["predicts", queryParams],
    queryFn: () => fetchPredicts(queryParams),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}; 