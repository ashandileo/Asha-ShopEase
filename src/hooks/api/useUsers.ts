import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/v1/users"),
  });
};
