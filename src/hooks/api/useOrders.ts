import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "axios";

import compact from "lodash/compact";

export const useGetOrders = (params?: any) => {
  return useQuery({
    queryKey: compact(["orders", params]),
    queryFn: () => axios.get("/api/v1/orders", { params }),
  });
};

export const usePostOrder = () => {
  return useMutation({
    mutationFn: (body: any) => axios.post("/api/v1/orders", body),
  });
};

export const useEditOrder = (id: number) => {
  return useMutation({
    mutationFn: (body: any) => axios.put(`/api/v1/orders/${id}`, body),
  });
};

export const useDeleteOrder = (id: number) => {
  return useMutation({
    mutationFn: (body: any) => axios.delete(`/api/v1/orders/${id}`, body),
  });
};
