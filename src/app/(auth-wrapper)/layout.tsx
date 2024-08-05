import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Asha ShopEase",
  description: "Asha ShopEase",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || null;

  if (token) {
    // Perform token validation if necessary
    // If valid, redirect to another page
    redirect("/dashboard");
  }

  return children;
}
