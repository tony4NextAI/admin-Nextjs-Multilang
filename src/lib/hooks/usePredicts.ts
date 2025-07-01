import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";
import { useState } from "react";
import { createDefaultPaginationOption, API_CONFIG } from "../config";

export const defaultPredictsOption = createDefaultPaginationOption({
  createdAt: API_CONFIG.sorting.defaultCreatedAtSort,
});

// Define the API response type for predicts
interface PredictsApiResponse {
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

interface PredictsQueryParams {
  page?: number;
  limit?: number;
  filterBy?: string;
  sortBy?: {
    createdAt?: number;
    [key: string]: number | string | undefined;
  };
}

const fetchPredicts = async (queryParams: PredictsQueryParams = defaultPredictsOption): Promise<PredictsApiResponse> => {
  const predicts = await apiAuthFetch<PredictsApiResponse>(ApiPath.predicts, {
    method: "POST",
    body: {
      ...defaultPredictsOption,
      ...queryParams,
    },
  });
  return predicts;
};

export const usePredicts = (initialParams?: PredictsQueryParams) => {
  const { status } = useSession();
  const [queryParams, setQueryParams] = useState<PredictsQueryParams>({
    ...defaultPredictsOption,
    ...initialParams,
  });
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["predicts", queryParams],
    queryFn: () => fetchPredicts(queryParams),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  const updateParams = (newParams: Partial<PredictsQueryParams>) => {
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