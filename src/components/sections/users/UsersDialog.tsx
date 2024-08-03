import React from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

const UsersDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <Label className="mb-2 block" htmlFor="username">
              Username
            </Label>
            <Input id="username" placeholder="Username" />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label className="mb-2 block" htmlFor="fullname">
              Fullname
            </Label>
            <Input id="fullname" placeholder="Fullname" />
          </div>

          <div className="col-span-2">
            <Label className="mb-2 block" htmlFor="email">
              Email
            </Label>
            <Input id="email" placeholder="Email" type="email" />
          </div>

          <div className="col-span-2">
            <Label className="mb-2 block" htmlFor="price">
              Role
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Admin</SelectItem>
                <SelectItem value="dark">Manager</SelectItem>
                <SelectItem value="system">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Label className="mb-2 block" htmlFor="price">
              Status
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Active</SelectItem>
                <SelectItem value="dark">Deactivated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UsersDialog;
