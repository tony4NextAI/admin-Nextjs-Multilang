import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";

// Define filter options for balance history
export interface BalanceHistoryFilterOptions {
  page?: number;
  limit?: number;
  filterBy?: {
    userId?: string;
    status?: "success" | "failed" | "unknow" | "pending";
    type?: "win" | "play";
    [key: string]: string | number | boolean | undefined;
  };
  sortBy?: {
    amount?: -1 | 1;
    createdAt?: -1 | 1;
    status?: -1 | 1;
    type?: -1 | 1;
    userId?: -1 | 1;
  };
}

export const defaultBalanceHistoryOption: BalanceHistoryFilterOptions = {
  page: 1,
  limit: 10,
  filterBy: {},
  sortBy: {
    createdAt: -1,
  },
};

// Define the API response type for balance history
interface BalanceHistoryApiResponse {
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
      status: "success" | "failed" | "unknow" | "pending";
      type: "win" | "play";
      createdAt: string;
      updatedAt: string;
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

const fetchBalanceHistory = async (_queryParams: BalanceHistoryFilterOptions = defaultBalanceHistoryOption): Promise<BalanceHistoryApiResponse> => {
  const balanceHistory = await apiAuthFetch<BalanceHistoryApiResponse>(ApiPath.balanceHistory, {
    method: "POST",
    body: {
      ..._queryParams,
    },
  });
  return balanceHistory;
};

/**
 * Hook for fetching balance history with filtering capabilities
 * 
 * @example
 * // Basic usage
 * const { data, isLoading, error } = useBalanceHistory();
 * 
 * @example
 * // With filters
 * const { data, isLoading, error } = useBalanceHistory({
 *   filterBy: {
 *     status: "success",
 *     type: "win",
 *     userId: "60f7b3b3b3b3b3b3b3b3b3b3"
 *   },
 *   sortBy: { amount: -1 }
 * });
 */
export const useBalanceHistory = (options: BalanceHistoryFilterOptions = defaultBalanceHistoryOption) => {
  const { status } = useSession();
  
  const queryParams = {
    ...defaultBalanceHistoryOption,
    ...options,
  };
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["balanceHistory", queryParams],
    queryFn: () => fetchBalanceHistory(queryParams),
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