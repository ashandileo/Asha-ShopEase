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

const ProductsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Craete Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <Label className="mb-2 block" htmlFor="name">
              Name
            </Label>
            <Input id="name" placeholder="Name" />
          </div>

          <div className="col-span-2">
            <Label className="mb-2 block" htmlFor="color">
              Color
            </Label>
            <Input id="color" placeholder="Color" />
          </div>

          <div className="col-span-2">
            <Label className="mb-2 block" htmlFor="price">
              Price
            </Label>
            <Input id="price" placeholder="Price" />
          </div>

          <div className="col-span-2">
            <Label className="mb-2 block" htmlFor="price">
              Category
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
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

export default ProductsDialog;
