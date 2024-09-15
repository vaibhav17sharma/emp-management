import type { Metadata } from "next";
import "/style/globals.css";
import { Providers } from "./provider";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
// const myFont = localFont({
//   display: "swap",
//   src: "../public/fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

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
        className={cn(
          "min-h-screen bg-background font-satoshi antialiased",
          // myFont.variable
          inter.className
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
