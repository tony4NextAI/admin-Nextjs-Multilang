import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";
import { useState } from "react";
import { createDefaultPaginationOption, API_CONFIG } from "../config";

export const defaultOption = createDefaultPaginationOption({
  amount: API_CONFIG.sorting.defaultAmountSort,
});

// Define the API response type for users
interface UserApiResponse {
  success: boolean;
  result?: {
    data?: Array<{
      _id: string;
      account: string;
      bank: string;
      amount: number;
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

interface UserQueryParams {
  page?: number;
  limit?: number;
  filterBy?: string;
  sortBy?: {
    amount?: number;
    [key: string]: number | string | undefined;
  };
}

const fetchUsers = async (queryParams: UserQueryParams = defaultOption): Promise<UserApiResponse> => {
  const users = await apiAuthFetch<UserApiResponse>(ApiPath.userList, {
    method: "POST",
    body: {
      ...defaultOption,
      ...queryParams,
    },
  });
  return users;
};

export const useUsers = (initialParams?: UserQueryParams) => {
  const { status } = useSession();
  const [queryParams, setQueryParams] = useState<UserQueryParams>({
    ...defaultOption,
    ...initialParams,
  });
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => fetchUsers(queryParams),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  const updateParams = (newParams: Partial<UserQueryParams>) => {
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
