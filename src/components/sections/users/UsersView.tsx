"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersDialog from "./UsersDialog";
import UsersTable from "./UsersTable";

const UsersView = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [isViewDetail, setIsViewDetail] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Asha Users Management Dashboard</CardDescription>
            </div>
            <UsersDialog
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              detailData={detailData}
              setDetailData={setDetailData}
              isViewDetail={isViewDetail}
            />
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable
            setOpenDialog={setOpenDialog}
            setDetailData={setDetailData}
            setIsViewDetail={setIsViewDetail}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default UsersView;
