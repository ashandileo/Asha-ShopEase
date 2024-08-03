import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "axios";

import compact from "lodash/compact";

export const useGetProducts = (params: any) => {
  return useQuery({
    queryKey: compact(["products", params]),
    queryFn: () => axios.get("/api/v1/products", { params }),
  });
};

export const usePostProduct = () => {
  return useMutation({
    mutationFn: (body: any) => axios.post("/api/v1/products", body),
  });
};

export const useEditProduct = (id: number) => {
  return useMutation({
    mutationFn: (body: any) => axios.put(`/api/v1/products/${id}`, body),
  });
};

export const useDeleteProduct = (id: number) => {
  return useMutation({
    mutationFn: (body: any) => axios.delete(`/api/v1/products/${id}`, body),
  });
};
