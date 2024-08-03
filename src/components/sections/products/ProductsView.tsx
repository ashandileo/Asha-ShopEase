"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductsDialog from "./ProductsDialog";
import ProductsTable from "./ProductsTable";

const ProductsView = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [isViewDetail, setIsViewDetail] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Asha Products Management Dashboard
              </CardDescription>
            </div>
            <ProductsDialog
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              detailData={detailData}
              setDetailData={setDetailData}
              isViewDetail={isViewDetail}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ProductsTable
            setOpenDialog={setOpenDialog}
            setDetailData={setDetailData}
            setIsViewDetail={setIsViewDetail}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ProductsView;
