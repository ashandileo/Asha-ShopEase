"use client";

import React from "react";
import Link from "next/link";

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
import { AnimatePage } from "@/components/shared/animate-page";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signInSchema from "@/lib/zod/sign-in.schema";

import { z } from "zod";
import { useLogin } from "@/hooks/api/useAuth";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

const SignInView = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser, isPending } = useLogin();

  function onSubmit(values: z.infer<typeof signInSchema>) {
    loginUser(values, {
      onSuccess: () => {
        // Redirect to dashboard.
        router.push("/dashboard");
      },
      onError: (data: any) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data?.response?.data?.message,
        });
      },
    });
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-primary">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AnimatePage>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Asha ShopEase</CardTitle>
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
                            placeholder="Enter Email Address"
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
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormMessage />
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isPending}
                  >
                    Sign in
                  </Button>

                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-up" className="underline">
                      Sign up
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </AnimatePage>
        </form>
      </Form>
    </div>
  );
};

export default SignInView;
