"use client";

import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { buttonVariants } from "@/components/ui/button";
import { useDebounce } from "use-debounce";
import { useDeleteProduct, useGetProducts } from "@/hooks/api/useProducts";
import { RowsLoader } from "@/components/ui/rows-loader";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface IProductsTable {
  setOpenDialog: (openDialog: boolean) => void;
  setDetailData: (detailData: any) => void;
  setIsViewDetail: (isViewDetail: boolean) => void;
}

const ProductsTable = ({
  setOpenDialog,
  setDetailData,
  setIsViewDetail,
}: IProductsTable) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 1000);

  const params = {
    page: currentPage,
    pageSize: 5,
    search: searchDebounce,
  };
  const { data, isFetching } = useGetProducts(params);

  const { products, nextPage, prevPage } = data?.data || {};

  const onClickDetail = (user: any, isViewDetail: boolean = false) => {
    setOpenDialog(true);
    setDetailData(user);
    setIsViewDetail(isViewDetail);
  };

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2 mb-[24px]">
        <Input
          type="text"
          placeholder="Search Product Name.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product name</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching ? (
            <RowsLoader cellCount={4} rowCount={5} />
          ) : (
            products?.map((product: any) => (
              <Row
                key={product?.id}
                product={product}
                onClickDetail={onClickDetail}
              />
            ))
          )}
        </TableBody>
      </Table>
      <div className="w-full flex justify-end">
        <Pagination className="!block !w-[auto] !mx-[0px]">
          <PaginationContent>
            <PaginationItem
              onClick={() => prevPage && setCurrentPage(prevPage)}
              className={`${
                prevPage ? "cursor-pointer" : "opacity-50 pointer-events-none"
              }`}
            >
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem
              className={
                nextPage ? "cursor-pointer" : "opacity-50 pointer-events-none"
              }
              onClick={() => {
                console.log("ok");
                nextPage && setCurrentPage(nextPage);
              }}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

interface IRow {
  product: any;
  onClickDetail: (user: any, isViewDetail: boolean) => void;
}

const Row = ({ product, onClickDetail }: IRow) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending } = useDeleteProduct(product?.id);

  const [showDialogConfirm, setShowDialogConfirm] = useState(false);

  const onClickDelete = () => {
    deleteProduct(null, {
      onSuccess: (data: any) => {
        toast({
          description: data?.data?.message,
        });
        queryClient.refetchQueries({ queryKey: ["products"] });
        setShowDialogConfirm(false);
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{product?.name}</TableCell>
        <TableCell>{product?.color}</TableCell>
        <TableCell>
          {product?.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className={`!w-[32px] !h-[32px] !p-0 ${buttonVariants({
                  variant: "outline",
                })}`}
              >
                <DotsVerticalIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onClickDetail(product, false)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onClickDetail(product, true)}>
                View Detail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDialogConfirm(true)}>
                <span className="text-red-500">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <AlertDialog open={showDialogConfirm} onOpenChange={setShowDialogConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={onClickDelete} isLoading={isPending}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductsTable;
