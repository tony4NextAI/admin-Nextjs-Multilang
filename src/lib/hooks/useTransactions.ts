import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";
import { useState } from "react";
import { createDefaultPaginationOption, API_CONFIG } from "../config";

export const defaultTransactionOption = createDefaultPaginationOption({
  amount: API_CONFIG.sorting.defaultAmountSort,
});

// Define the API response type for transactions
interface TransactionApiResponse {
  success: boolean;
  result?: {
    data?: Array<{
      _id: string;
      amount: number;
      status: string;
      message: string;
      type: string;
      time: string;
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

interface TransactionQueryParams {
  page?: number;
  limit?: number;
  filterBy?: string;
  sortBy?: {
    amount?: number;
    [key: string]: number | string | undefined;
  };
}

const fetchTransactions = async (queryParams: TransactionQueryParams = defaultTransactionOption): Promise<TransactionApiResponse> => {
  const transactions = await apiAuthFetch<TransactionApiResponse>(ApiPath.transactions, {
    method: "POST",
    body: {
      ...defaultTransactionOption,
      ...queryParams,
    },
  });
  return transactions;
};

export const useTransactions = (initialParams?: TransactionQueryParams) => {
  const { status } = useSession();
  const [queryParams, setQueryParams] = useState<TransactionQueryParams>({
    ...defaultTransactionOption,
    ...initialParams,
  });
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions", queryParams],
    queryFn: () => fetchTransactions(queryParams),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  const updateParams = (newParams: Partial<TransactionQueryParams>) => {
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