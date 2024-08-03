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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { buttonVariants } from "@/components/ui/button";
import { useGetUsers } from "@/hooks/api/useUsers";

const UsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const params = {
    page: currentPage,
    pageSize: 5,
  };
  const { data } = useGetUsers(params);

  const { users, nextPage, prevPage } = data?.data || {};

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2 mb-[24px]">
        <Input type="text" placeholder="Search..." />
        <Button variant="outline">Search</Button>
      </div>

      <Tabs defaultValue="active" className="w-[400px] mb-[24px]">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="deactivated">Deactivated</TabsTrigger>
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
          {users?.map((user: any) => (
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Detail</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex justify-end">
        <Pagination className="!block !w-[auto] !mx-[0px]">
          <PaginationContent>
            <PaginationItem
              onClick={() => prevPage && setCurrentPage(prevPage)}
              className={`${prevPage ? "" : "opacity-50 pointer-events-none"}`}
            >
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem
              className={nextPage ? "" : "opacity-50 pointer-events-none"}
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
