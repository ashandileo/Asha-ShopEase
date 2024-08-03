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

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

import { Button, buttonVariants } from "@/components/ui/button";
import { useDeleteUser, useGetUsers } from "@/hooks/api/useUsers";

import { RowsLoader } from "@/components/ui/rows-loader";

import { useDebounce } from "use-debounce";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useGetProducts } from "@/hooks/api/useProducts";
import { useDeleteOrder, useGetOrders } from "@/hooks/api/useOrders";
import dayjs from "dayjs";

interface IOrdersTable {
  setOpenDialog: (openDialog: boolean) => void;
  setDetailData: (detailData: any) => void;
  setIsViewDetail: (isViewDetail: boolean) => void;
}

const OrdersTable = ({
  setOpenDialog,
  setDetailData,
  setIsViewDetail,
}: IOrdersTable) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 1000);
  const [status, setStatus] = useState("pending");

  const params = {
    page: currentPage,
    pageSize: 5,
    search: searchDebounce,
    status,
  };
  const { data, isFetching } = useGetOrders(params);

  const { orders, nextPage, prevPage } = data?.data || {};

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
          placeholder="Search Shipping Address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="pending" className="w-[400px] mb-[24px]">
        <TabsList>
          <TabsTrigger onClick={() => setStatus("pending")} value="pending">
            Pending
          </TabsTrigger>
          <TabsTrigger onClick={() => setStatus("shipped")} value="shipped">
            Shipped
          </TabsTrigger>
          <TabsTrigger onClick={() => setStatus("delivered")} value="delivered">
            Delivered
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Shipping Address</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching ? (
            <RowsLoader cellCount={6} rowCount={5} />
          ) : (
            orders?.map((order: any) => (
              <Row
                key={order?.order?.id}
                order={order}
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
  order: any;
  onClickDetail: (user: any, isViewDetail: boolean) => void;
}

const Row = ({ order, onClickDetail }: IRow) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteOrder, isPending } = useDeleteOrder(order?.order?.id);

  const [showDialogConfirm, setShowDialogConfirm] = useState(false);

  const onClickDelete = () => {
    deleteOrder(null, {
      onSuccess: (data: any) => {
        toast({
          description: data?.data?.message,
        });
        queryClient.refetchQueries({ queryKey: ["orders"] });
        setShowDialogConfirm(false);
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{`#${order?.order?.id}`}</TableCell>
        <TableCell>{order?.user?.fullname}</TableCell>
        <TableCell>
          {dayjs(order?.order?.orderDate).format("D MMMM YYYY")}
        </TableCell>
        <TableCell>{order?.order?.status}</TableCell>
        <TableCell>
          {order?.order?.totalAmount.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </TableCell>
        <TableCell>{order?.order?.paymentMethod}</TableCell>
        <TableCell>{order?.order?.shippingAddress}</TableCell>
        <TableCell>{order?.order?.quantity}</TableCell>
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
              <DropdownMenuItem onClick={() => onClickDetail(order, false)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onClickDetail(order, true)}>
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

export default OrdersTable;
