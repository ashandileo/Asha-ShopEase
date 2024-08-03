import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "./skeleton";

interface IRowsLoaderProps {
  cellCount: number;
  rowCount: number;
}

export const RowsLoader = ({ cellCount, rowCount }: IRowsLoaderProps) => {
  return (
    <>
      {[...Array(rowCount)].map((_, index) => {
        return (
          <TableRow key={index} className="pointer-events-none">
            {Array.from({ length: cellCount }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="w-full h-[24px]" />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
};
