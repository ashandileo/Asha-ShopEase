"use client";

import React, { useEffect, useState } from "react";

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
import { useEditUser, usePostUser } from "@/hooks/api/useUsers";
import { useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

interface IUsersDialog {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  detailData: any;
  setDetailData: (detailData: any) => void;
  isViewDetail: boolean;
  setIsViewDetail: (isViewDetail: boolean) => void;
}

const UsersDialog = ({
  openDialog,
  setOpenDialog,
  detailData,
  setDetailData,
  isViewDetail,
  setIsViewDetail,
}: IUsersDialog) => {
  const isEdit = !!detailData;

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

  const { mutateAsync: createUser } = usePostUser();
  const { mutateAsync: editUser } = useEditUser(detailData?.id);

  async function onSubmit(values: z.infer<typeof usersSchema>) {
    setIsLoading(true);
    const queryFN = isEdit ? editUser : createUser;

    await queryFN(values, {
      onSuccess: (data) => {
        toast({
          description: data?.data?.message,
        });
        queryClient.refetchQueries({ queryKey: ["users"] });
        setOpenDialog(false);
      },
      onError: (data: any) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data?.response?.data?.message,
        });
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (isEdit && detailData) {
      form.reset({
        fullname: detailData.fullname,
        email: detailData.email,
        role: detailData.role,
        status: detailData.status,
        password: "",
      });
    } else {
      form.reset({
        fullname: "",
        email: "",
        role: "admin",
        status: "active",
        password: "",
      });
    }
  }, [detailData, isEdit]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setDetailData(null);
            setIsViewDetail(false);
          }}
        >
          Create User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="users-form">
            <DialogHeader className="mb-[24px]">
              <DialogTitle>{`${
                isViewDetail ? "Detail" : isEdit ? "Edit" : "Create"
              } User`}</DialogTitle>
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
                          disabled={isViewDetail}
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
                          disabled={isViewDetail}
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
                          disabled={isViewDetail}
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
                          disabled={isViewDetail}
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
                          disabled={isViewDetail}
                          {...field}
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {!isViewDetail && (
              <DialogFooter>
                <Button type="submit" isLoading={isLoading}>
                  Save changes
                </Button>
              </DialogFooter>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UsersDialog;
