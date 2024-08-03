"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import signInSchema from "@/lib/zod/sign-in.schema";

import { z } from "zod";
import { useLogin } from "@/hooks/api/useAuth";
import { useRouter } from "next/navigation";

const SignInView = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser } = useLogin();

  function onSubmit(values: z.infer<typeof signInSchema>) {
    loginUser(values, {
      onSuccess: () => {
        // Redirect to dashboard.
        router.push("/dashboard");
      },
    });
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SignInView;
