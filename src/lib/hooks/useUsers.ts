import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiPath, apiFetch } from "../api";

export const defaultOption = {
  page: 1,
  limit: 10,
  filterBy: "",
  sortBy: {
    amount: -1,
  },
};

const fetchUsers = async (_queryParams = defaultOption, token?: string) => {
  if (!token) {
    throw new Error("Authentication token is required");
  }
  
  const users = await apiFetch(ApiPath.userList, {
    method: "POST",
    body: {
      ..._queryParams,
    },
    token, // Pass the authentication token
  });
  return users;
};

export const useUsers = () => {
  const { data: session, status } = useSession();
  
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(defaultOption, session?.accessToken),
    // Only run the query if we have a session with an access token
    enabled: status === "authenticated" && !!session?.accessToken,
  });
};
