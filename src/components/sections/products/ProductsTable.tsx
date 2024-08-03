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

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { buttonVariants } from "@/components/ui/button";
import { useDebounce } from "use-debounce";
import { useGetProducts } from "@/hooks/api/useProducts";
import { RowsLoader } from "@/components/ui/rows-loader";

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
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline">Search</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product name</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching ? (
            <RowsLoader cellCount={5} rowCount={5} />
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
  return (
    <TableRow>
      <TableCell className="font-medium">{product?.products?.name}</TableCell>
      <TableCell>{product?.products?.color}</TableCell>
      <TableCell>{product?.categories?.name}</TableCell>
      <TableCell>
        {product?.products?.price.toLocaleString("id-ID", {
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View Detail</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default ProductsTable;
