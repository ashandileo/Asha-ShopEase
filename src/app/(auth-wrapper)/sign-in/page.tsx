// src/app/sign-in/page.tsx
import React from "react";
import SignInView from "@/components/sections/sign-in/SignInView";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || null;

  if (token) {
    // Perform token validation if necessary
    // If valid, redirect to another page
    redirect("/dashboard");
  }

  return <SignInView />;
};

export default SignIn;
