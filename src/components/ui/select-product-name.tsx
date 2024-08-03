import React from "react";

import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useGetProducts } from "@/hooks/api/useProducts";

interface ISelectProductName {
  field: any;
  isViewDetail: boolean;
}

export const SelectProductName = ({
  field,
  isViewDetail,
}: ISelectProductName) => {
  const { data } = useGetProducts();
  const products = data?.data?.products || [];

  return (
    <FormItem>
      <Label className="mb-2 block" htmlFor="name">
        Product Name
      </Label>
      <FormControl>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          disabled={isViewDetail}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {products?.map((product: any) => (
              <SelectItem key={product?.id} value={product?.id?.toString()}>
                {product?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
