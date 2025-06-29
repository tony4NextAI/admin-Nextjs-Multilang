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

const fetchUsers = async (_queryParams = defaultOption) => {
  const users = await apiAuthFetch(ApiPath.userList, {
    method: "POST",
    body: {
      ..._queryParams,
    },
  });
  return users;
};

export const useUsers = () => {
  const { status } = useSession();
  
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(defaultOption),
    // Only run the query if we have a valid session
    enabled: status === "authenticated",
  });
};
