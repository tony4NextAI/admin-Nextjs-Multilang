import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiAuthFetch } from "../api";

export const defaultOption = {
  page: 1,
  limit: 10,
  filterBy: "",
  sortBy: {
    amount: -1,
  },
};

// Define the API response type
interface ApiResponse {
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

const fetchUsers = async (_queryParams = defaultOption): Promise<ApiResponse> => {
  const users = await apiAuthFetch<ApiResponse>(ApiPath.userList, {
    method: "POST",
    body: {
      ..._queryParams,
    },
  });
  return users;
};

export const useUsers = () => {
  const { status } = useSession();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(defaultOption),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });

  return {
    data,
    isLoading,
    error,
  };
};
