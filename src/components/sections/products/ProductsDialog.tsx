"use client";

import React, { useEffect, useState } from "react";

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
  setIsViewDetail: (isViewDetail: boolean) => void;
}

const ProductsDialog = ({
  openDialog,
  setOpenDialog,
  detailData,
  setDetailData,
  isViewDetail,
  setIsViewDetail,
}: IProductsDialog) => {
  const [isLoading, setIsLoading] = useState(false);

  const isEdit = !!detailData;

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof productsSchema>>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: "",
      color: "",
      price: "",
      description: "",
    },
  });

  const { mutateAsync: createProduct } = usePostProduct();
  const { mutateAsync: editProduct } = useEditProduct(detailData?.id);

  async function onSubmit(values: z.infer<typeof productsSchema>) {
    setIsLoading(true);

    const queryFN = isEdit ? editProduct : createProduct;

    const formattedValues = {
      ...values,
      price: parseFloat(values.price),
    };

    await queryFN(formattedValues, {
      onSuccess: (data) => {
        toast({
          description: data?.data?.message,
        });
        queryClient.refetchQueries({ queryKey: ["products"] });
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
        name: detailData?.name,
        color: detailData?.color,
        price: detailData?.price.toString(),
        description: detailData?.description,
      });
    } else {
      form.reset({
        name: "",
        color: "",
        price: "",
        description: "",
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
          Create Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-[24px]">
              <DialogTitle>{`${
                isViewDetail ? "Detail" : isEdit ? "Edit" : "Create"
              } Product`}</DialogTitle>
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
                  name="description"
                  disabled={isViewDetail}
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

export default ProductsDialog;
