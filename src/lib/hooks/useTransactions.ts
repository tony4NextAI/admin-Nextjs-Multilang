import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";

export const defaultTransactionOption = {
  page: 1,
  limit: 10,
  filterBy: "",
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

const fetchTransactions = async (_queryParams = defaultTransactionOption): Promise<TransactionApiResponse> => {
  const transactions = await apiAuthFetch<TransactionApiResponse>(ApiPath.transactions, {
    method: "POST",
    body: {
      ..._queryParams,
    },
  });
  return transactions;
};

export const useTransactions = () => {
  const { status } = useSession();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(defaultTransactionOption),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  return {
    data,
    isLoading,
    error,
  };
}; 