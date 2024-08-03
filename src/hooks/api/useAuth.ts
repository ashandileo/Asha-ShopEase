import { useMutation } from "@tanstack/react-query";

import axios from "axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: (body: any) => axios.post("/api/auth/login", body),
  });
};
