import { fetchUsers } from "@/lib/services/api/users_service";
import { useCallback } from "react";

export default function useGetUsers() {
  const getUsers = useCallback(fetchUsers, []);

  return { getUsers };
}
