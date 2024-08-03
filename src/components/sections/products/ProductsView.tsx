import React from "react";

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
            <ProductsDialog />
          </div>
        </CardHeader>
        <CardContent>
          <ProductsTable />
        </CardContent>
      </Card>
    </>
  );
};

export default ProductsView;
