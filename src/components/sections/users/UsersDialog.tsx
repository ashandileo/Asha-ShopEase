"use client";

import React, { useState } from "react";

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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usersSchema from "@/lib/zod/users.schema";
import { z } from "zod";
import { usePostUser } from "@/hooks/api/useUsers";
import { useQueryClient } from "@tanstack/react-query";
import { DialogClose } from "@radix-ui/react-dialog";

import { useToast } from "@/components/ui/use-toast";

const UsersDialog = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof usersSchema>>({
    resolver: zodResolver(usersSchema),
    defaultValues: {
      fullname: "",
      email: "",
      role: "admin",
      status: "active",
      password: "",
    },
  });

  const [open, setOpen] = useState(false);

  const { mutate: createUser, isPending } = usePostUser();

  function onSubmit(values: z.infer<typeof usersSchema>) {
    createUser(values, {
      onSuccess: (data) => {
        toast({
          description: data?.data?.message,
        });
        queryClient.refetchQueries({ queryKey: ["users"] });
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create User</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-[24px]">
              <DialogTitle>Create User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="fullname">
                        Fullname
                      </Label>
                      <FormControl>
                        <Input
                          id="fullname"
                          placeholder="Fullname"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="email">
                        Email
                      </Label>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="price">
                        Role
                      </Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="price">
                        Status
                      </Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">
                              Deactivated
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block" htmlFor="password">
                        Password
                      </Label>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose>
                <Button type="submit" isLoading={isPending}>
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UsersDialog;
