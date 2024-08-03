import { useMutation } from "@tanstack/react-query";

import axios from "axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: (body: any) => axios.post("/api/auth/login", body),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: (body: any) => axios.delete("/api/auth/logout"),
  });
};
