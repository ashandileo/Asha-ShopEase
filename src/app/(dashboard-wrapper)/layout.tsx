import type { Metadata } from "next";
import { DashboardLayout } from "@/components/sections/dashboard-layout/DashboardLayout";

export const metadata: Metadata = {
  title: "Asha ShopEase",
  description: "Asha ShopEase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
