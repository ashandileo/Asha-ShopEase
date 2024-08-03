"use client";

import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { SelectCustomerName } from "@/components/ui/selelct-customer-name";
import { SelectProductName } from "@/components/ui/select-product-name";

import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useEditOrder, usePostOrder } from "@/hooks/api/useOrders";
import { useQueryClient } from "@tanstack/react-query";

import dayjs from "dayjs";
import ordersSchema from "@/lib/zod/orders.schema";

interface IOrdersDialog {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  detailData: any;
  setDetailData: (detailData: any) => void;
  isViewDetail: boolean;
  setIsViewDetail: (isViewDetail: boolean) => void;
}

const OrdersDialog = ({
  openDialog,
  setOpenDialog,
  detailData,
  setDetailData,
  isViewDetail,
  setIsViewDetail,
}: IOrdersDialog) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const isEdit = !!detailData;

  const form = useForm<z.infer<typeof ordersSchema>>({
    resolver: zodResolver(ordersSchema),
    defaultValues: {
      userId: "",
      productId: "",
      orderDate: "",
      status: "pending",
      paymentMethod: "",
      shippingAddress: "",
      quantity: "",
      totalAmount: "",
    },
  });

  const { mutateAsync: createOrder } = usePostOrder();
  const { mutateAsync: editOrder } = useEditOrder(detailData?.order?.id);

  async function onSubmit(values: z.infer<typeof ordersSchema>) {
    setIsLoading(true);
    const queryFN = isEdit ? editOrder : createOrder;

    const formattedValues = {
      ...values,
      orderDate: dayjs(values.orderDate).format("YYYY-MM-DD"),
      totalAmount: parseInt(values.totalAmount),
      quantity: parseInt(values.quantity),
    };

    await queryFN(formattedValues, {
      onSuccess: (data: any) => {
        toast({
          description: data?.data?.message,
        });
        queryClient.refetchQueries({ queryKey: ["orders"] });
        setOpenDialog(false);
      },
      onError: (data: any) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data?.response?.data?.message,
        });
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (isEdit && detailData) {
      form.reset({
        userId: detailData?.user?.id?.toString(),
        productId: detailData?.product?.id?.toString(),
        orderDate: new Date(detailData?.order?.orderDate),
        status: detailData?.order?.status,
        paymentMethod: detailData?.order?.paymentMethod,
        shippingAddress: detailData?.order?.shippingAddress,
        quantity: detailData?.order?.quantity?.toString(),
        totalAmount: detailData?.order?.totalAmount?.toString(),
      });
    } else {
      form.reset({
        userId: "",
        productId: "",
        orderDate: "",
        status: "pending",
        paymentMethod: "",
        shippingAddress: "",
        quantity: "",
        totalAmount: "",
      });
    }
  }, [detailData, isEdit]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setDetailData(null);
            setIsViewDetail(false);
          }}
        >
          Create Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="create-order-form">
            <DialogHeader className="mb-[24px]">
              <DialogTitle>{`${
                isViewDetail ? "Detail" : isEdit ? "Edit" : "Create"
              } Order`}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <SelectCustomerName
                      field={field}
                      isViewDetail={isViewDetail}
                    />
                  )}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <SelectProductName
                      field={field}
                      isViewDetail={isViewDetail}
                    />
                  )}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <FormField
                  control={form.control}
                  name="orderDate"
                  render={({ field }) => (
                    <>
                      <Label className="mb-2 block" htmlFor="name">
                        Order Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            disabled={isViewDetail}
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              false && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              dayjs(field.value).format("DD MMM YYYY")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            // @ts-ignore
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </>
                  )}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="price">
                        Status
                      </Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isViewDetail}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="totalAmount">
                        Total Amount
                      </Label>
                      <FormControl>
                        <Input
                          id="totalAmount"
                          placeholder="Total Amount"
                          disabled={isViewDetail}
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="quantity">
                        Quantity
                      </Label>
                      <FormControl>
                        <Input
                          id="quantity"
                          placeholder="Quantity"
                          disabled={isViewDetail}
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="paymentMethod">
                        Payment Method
                      </Label>
                      <FormControl>
                        <Input
                          id="paymentMethod"
                          placeholder="Payment Method"
                          disabled={isViewDetail}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="shippingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="shippingAddress">
                        Shipping Address
                      </Label>
                      <FormControl>
                        <Textarea
                          id="shippingAddress"
                          placeholder="Shipping Address"
                          rows={4}
                          disabled={isViewDetail}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {!isViewDetail && (
              <DialogFooter>
                <Button type="submit" isLoading={isLoading}>
                  Save changes
                </Button>
              </DialogFooter>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersDialog;
