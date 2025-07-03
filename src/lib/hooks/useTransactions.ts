import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";

// Define filter options for transactions
export interface TransactionFilterOptions {
  page?: number;
  limit?: number;
  filterBy?: {
    status?: "success" | "failed" | "unknow" | "pending";
    type?: "deposit" | "withdraw";
    [key: string]: string | number | boolean | undefined;
  };
  sortBy?: {
    amount?: -1 | 1;
    createdAt?: -1 | 1;
    status?: -1 | 1;
    type?: -1 | 1;
    time?: -1 | 1;
  };
}

export const defaultTransactionOption: TransactionFilterOptions = {
  page: 1,
  limit: 10,
  filterBy: {},
  sortBy: {
    amount: -1,
  },
};

// Define the API response type for transactions
interface TransactionApiResponse {
  success: boolean;
  result?: {
    data?: Array<{
      _id: string;
      amount: number;
      status: "success" | "failed" | "unknow" | "pending";
      message: string;
      type: "deposit" | "withdraw";
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

const fetchTransactions = async (_queryParams: TransactionFilterOptions = defaultTransactionOption): Promise<TransactionApiResponse> => {
  const transactions = await apiAuthFetch<TransactionApiResponse>(ApiPath.transactions, {
    method: "POST",
    body: {
      ..._queryParams,
    },
  });
  return transactions;
};

/**
 * Hook for fetching transactions with filtering capabilities
 * 
 * @example
 * // Basic usage
 * const { data, isLoading, error } = useTransactions();
 * 
 * @example
 * // With filters
 * const { data, isLoading, error } = useTransactions({
 *   filterBy: {
 *     status: "success",
 *     type: "deposit"
 *   },
 *   sortBy: { amount: -1 }
 * });
 */
export const useTransactions = (options: TransactionFilterOptions = defaultTransactionOption) => {
  const { status } = useSession();
  
  const queryParams = {
    ...defaultTransactionOption,
    ...options,
  };
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions", queryParams],
    queryFn: () => fetchTransactions(queryParams),
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