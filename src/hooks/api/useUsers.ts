import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "axios";

import compact from "lodash/compact";

export const useGetUsers = (params: any) => {
  return useQuery({
    queryKey: compact(["users", params]),
    queryFn: () => axios.get("/api/v1/users", { params }),
  });
};

export const usePostUser = () => {
  return useMutation({
    mutationFn: (body: any) => axios.post("/api/v1/users", body),
  });
};

export const useEditUser = (id: number) => {
  return useMutation({
    mutationFn: (body: any) => axios.put(`/api/v1/users/${id}`, body),
  });
};

export const useDeleteUser = (id: number) => {
  return useMutation({
    mutationFn: (body: any) => axios.delete(`/api/v1/users/${id}`, body),
  });
};
