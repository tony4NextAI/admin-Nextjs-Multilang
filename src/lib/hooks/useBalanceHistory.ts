import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";

export const defaultBalanceHistoryOption = {
  page: 1,
  limit: 10,
  filterBy: "",
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
      status: string;
      type: string;
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

const fetchBalanceHistory = async (_queryParams = defaultBalanceHistoryOption): Promise<BalanceHistoryApiResponse> => {
  const balanceHistory = await apiAuthFetch<BalanceHistoryApiResponse>(ApiPath.balanceHistory, {
    method: "POST",
    body: {
      ..._queryParams,
    },
  });
  return balanceHistory;
};

export const useBalanceHistory = () => {
  const { status } = useSession();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["balanceHistory"],
    queryFn: () => fetchBalanceHistory(defaultBalanceHistoryOption),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  return {
    data,
    isLoading,
    error,
  };
}; 