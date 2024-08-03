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

interface IUsersTable {
  setOpenDialog: (openDialog: boolean) => void;
  setDetailData: (detailData: any) => void;
  setIsViewDetail: (isViewDetail: boolean) => void;
}

const UsersTable = ({
  setOpenDialog,
  setDetailData,
  setIsViewDetail,
}: IUsersTable) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 1000);
  const [status, setStatus] = useState("active");

  const params = {
    page: currentPage,
    pageSize: 5,
    search: searchDebounce,
    status,
  };
  const { data, isFetching } = useGetUsers(params);

  const { users, nextPage, prevPage } = data?.data || {};

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
          placeholder="Search User Fullname.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="active" className="w-[400px] mb-[24px]">
        <TabsList>
          <TabsTrigger onClick={() => setStatus("active")} value="active">
            Active
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setStatus("inactive")}
            value="deactivated"
          >
            Deactivated
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching ? (
            <RowsLoader cellCount={6} rowCount={5} />
          ) : (
            users?.map((user: any) => (
              <Row key={user?.id} user={user} onClickDetail={onClickDetail} />
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
  user: any;
  onClickDetail: (user: any, isViewDetail: boolean) => void;
}

const Row = ({ user, onClickDetail }: IRow) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending } = useDeleteUser(user?.id);

  const [showDialogConfirm, setShowDialogConfirm] = useState(false);

  const onClickDelete = () => {
    deleteUser(null, {
      onSuccess: (data: any) => {
        toast({
          description: data?.data?.message,
        });
        queryClient.refetchQueries({ queryKey: ["users"] });
        setShowDialogConfirm(false);
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{user?.fullname}</TableCell>
        <TableCell>{user?.email}</TableCell>
        <TableCell>{user?.role}</TableCell>
        <TableCell>{user?.status}</TableCell>
        <TableCell>{user?.createdAt}</TableCell>
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
              {user?.role !== "admin" && (
                <DropdownMenuItem onClick={() => onClickDetail(user, false)}>
                  Edit
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onClickDetail(user, true)}>
                View Detail
              </DropdownMenuItem>
              {user?.role !== "admin" && (
                <DropdownMenuItem onClick={() => setShowDialogConfirm(true)}>
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              )}
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

export default UsersTable;
