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

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

import { buttonVariants } from "@/components/ui/button";
import { useGetUsers } from "@/hooks/api/useUsers";

import { RowsLoader } from "@/components/ui/rows-loader";

import { useDebounce } from "use-debounce";

interface IUsersTable {
  setOpenDialog: (openDialog: boolean) => void;
  setDetailData: (detailData: any) => void;
}

const UsersTable = ({ setOpenDialog, setDetailData }: IUsersTable) => {
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

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2 mb-[24px]">
        <Input
          type="text"
          placeholder="Search..."
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
              <TableRow key={user.id}>
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
                      <DropdownMenuItem
                        onClick={() => {
                          setOpenDialog(true);
                          setDetailData(user);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Detail</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
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

export default UsersTable;
