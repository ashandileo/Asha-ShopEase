"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePage } from "@/components/shared/animate-page";

import OrdersDialog from "./OrdersDialog";
import OrdersTable from "./OrdersTable";
import { useTranslation } from "react-i18next";

const OrdersView = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [isViewDetail, setIsViewDetail] = useState(false);

  const { t } = useTranslation();

  return (
    <AnimatePage>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("Orders")}</CardTitle>
              <CardDescription>
                {t("Asha Orders Management Dashboard")}
              </CardDescription>
            </div>
            <OrdersDialog
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              detailData={detailData}
              setDetailData={setDetailData}
              isViewDetail={isViewDetail}
              setIsViewDetail={setIsViewDetail}
            />
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable
            setOpenDialog={setOpenDialog}
            setDetailData={setDetailData}
            setIsViewDetail={setIsViewDetail}
          />
        </CardContent>
      </Card>
    </AnimatePage>
  );
};

export default OrdersView;
