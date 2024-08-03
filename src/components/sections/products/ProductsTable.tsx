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

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const ProductsTable = () => {
  return (
    <>
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
          <TableRow>
            <TableCell className="font-medium">
              Apple MacBook Pro 17 inch
            </TableCell>
            <TableCell>Silver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="outline"
                    className="!w-[32px] !h-[32px] !p-0"
                  >
                    <DotsVerticalIcon />
                  </Button>
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

export default ProductsTable;
