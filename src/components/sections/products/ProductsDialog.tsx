"use client";

import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import productsSchema from "@/lib/zod/products.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEditProduct, usePostProduct } from "@/hooks/api/useProducts";
import { Textarea } from "@/components/ui/textarea";

interface IProductsDialog {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  detailData: any;
  setDetailData: (detailData: any) => void;
  isViewDetail: boolean;
}

const ProductsDialog = ({
  openDialog,
  setOpenDialog,
  detailData,
  setDetailData,
  isViewDetail,
}: IProductsDialog) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof productsSchema>>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: "",
      color: "",
      price: "",
      categoryId: "",
      description: "",
    },
  });

  const { mutate: createProduct } = usePostProduct();
  const { mutate: editProduct } = useEditProduct(detailData?.id);

  function onSubmit(values: z.infer<typeof productsSchema>) {
    const queryFN = detailData ? editProduct : createProduct;

    const formattedValues = {
      ...values,
      price: parseFloat(values.price),
      categoryId: 1,
    };

    queryFN(formattedValues, {
      onSuccess: (data) => {
        toast({
          description: data?.data?.message,
        });
        queryClient.refetchQueries({ queryKey: ["products"] });
        setOpenDialog(false);
      },
      onError: (data: any) => {
        console.log("data", data);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data?.response?.data?.message,
        });
      },
    });
  }

  useEffect(() => {
    if (!detailData) return;
    form.reset({
      name: detailData.name,
      color: detailData.color,
      price: detailData.price,
      categoryId: detailData.categoryId,
      description: detailData.description,
    });
  }, [detailData]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Craete Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-[24px]">
              <DialogTitle>Create Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="name">
                        Name
                      </Label>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Name"
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
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="color">
                        Color
                      </Label>
                      <FormControl>
                        <Input
                          id="color"
                          placeholder="Color"
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
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="price">
                        Price
                      </Label>
                      <FormControl>
                        <Input
                          id="price"
                          placeholder="Price"
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
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="category">
                        Category
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
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="description">
                        Description
                      </Label>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Description"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductsDialog;
