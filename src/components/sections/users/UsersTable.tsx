import React from "react";

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

const UsersTable = () => {
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
            <TableHead>Username</TableHead>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">ashandi.leonadi</TableCell>
            <TableCell>Ashandi Leonadi</TableCell>
            <TableCell>ashandileonadi@gmail.com</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>3 Agustus 2024</TableCell>
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
        </TableBody>
      </Table>
      <div className="w-full flex justify-end">
        <Pagination className="!block !w-[auto] !mx-[0px]">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default UsersTable;
