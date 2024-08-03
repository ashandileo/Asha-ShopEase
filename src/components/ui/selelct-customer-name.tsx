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
import { useGetUsers } from "@/hooks/api/useUsers";

interface ISelectCustomerName {
  field: any;
  isViewDetail: boolean;
}

export const SelectCustomerName = ({
  field,
  isViewDetail,
}: ISelectCustomerName) => {
  const { data } = useGetUsers();
  const users = data?.data?.users || [];

  return (
    <FormItem>
      <Label className="mb-2 block" htmlFor="name">
        Customer Name
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
            {users?.map((user: any) => (
              <SelectItem key={user?.id} value={user?.id?.toString()}>
                {user?.fullname}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
