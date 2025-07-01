import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";
import { useState } from "react";
import { createDefaultPaginationOption, API_CONFIG } from "../config";

export const defaultBalanceHistoryOption = createDefaultPaginationOption({
  createdAt: API_CONFIG.sorting.defaultCreatedAtSort,
});

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

interface BalanceHistoryQueryParams {
  page?: number;
  limit?: number;
  filterBy?: string;
  sortBy?: {
    createdAt?: number;
    [key: string]: number | string | undefined;
  };
}

const fetchBalanceHistory = async (queryParams: BalanceHistoryQueryParams = defaultBalanceHistoryOption): Promise<BalanceHistoryApiResponse> => {
  const balanceHistory = await apiAuthFetch<BalanceHistoryApiResponse>(ApiPath.balanceHistory, {
    method: "POST",
    body: {
      ...defaultBalanceHistoryOption,
      ...queryParams,
    },
  });
  return balanceHistory;
};

export const useBalanceHistory = (initialParams?: BalanceHistoryQueryParams) => {
  const { status } = useSession();
  const [queryParams, setQueryParams] = useState<BalanceHistoryQueryParams>({
    ...defaultBalanceHistoryOption,
    ...initialParams,
  });
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["balanceHistory", queryParams],
    queryFn: () => fetchBalanceHistory(queryParams),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  const updateParams = (newParams: Partial<BalanceHistoryQueryParams>) => {
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
  };
}; 