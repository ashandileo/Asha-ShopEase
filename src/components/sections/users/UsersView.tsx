import React from "react";

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
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Asha Users Management Dashboard</CardDescription>
            </div>
            <UsersDialog />
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable />
        </CardContent>
      </Card>
    </>
  );
};

export default UsersView;
