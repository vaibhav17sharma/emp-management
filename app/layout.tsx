import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from "next";

import "/style/globals.css";


export const metadata: Metadata = {
  title: "Employee Management",
  description: "Employee Management System by Vaibhav Sharma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen bg-background antialiased", GeistMono.variable, GeistSans.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
