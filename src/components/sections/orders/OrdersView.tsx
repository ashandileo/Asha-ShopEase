import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrdersDialog from "./OrdersDialog";
import OrdersTable from "./OrdersTable";

const OrdersView = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Asha Orders Management Dashboard
              </CardDescription>
            </div>
            <OrdersDialog />
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable />
        </CardContent>
      </Card>
    </>
  );
};

export default OrdersView;
