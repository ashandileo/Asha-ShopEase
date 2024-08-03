import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetUsers = (params: any) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => axios.get("/api/v1/users", { params }),
  });
};
