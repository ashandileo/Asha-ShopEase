"use client";

import React from "react";

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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const OrdersDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <Label className="mb-2 block" htmlFor="name">
              Customer Name
            </Label>
            <Input id="name" placeholder="Name" />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label className="mb-2 block" htmlFor="name">
              Order Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    false && "text-muted-foreground"
                  )}
                >
                  {/* {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )} */}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  // selected={field.value}
                  // onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label className="mb-2 block" htmlFor="price">
              Status
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Pending</SelectItem>
                <SelectItem value="dark">Shipped</SelectItem>
                <SelectItem value="system">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label className="mb-2 block" htmlFor="totalAmount">
              Total Amount
            </Label>
            <Input id="totalAmount" placeholder="Total Amount" />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label className="mb-2 block" htmlFor="paymentMethod">
              Payment Method
            </Label>
            <Input id="paymentMethod" placeholder="Payment Method" />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label className="mb-2 block" htmlFor="quantity">
              Quantity
            </Label>
            <Input id="quantity" placeholder="Quantity" type="number" />
          </div>

          <div className="col-span-2">
            <Label className="mb-2 block" htmlFor="shippingAddress">
              Shipping Address
            </Label>
            <Textarea
              id="shippingAddress"
              placeholder="Shipping Address"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersDialog;
