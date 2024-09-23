import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import React from "react";
import { Providers } from "../provider";

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Providers>
        <Sidebar />
        <div className="flex min-h-screen flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <main className="p-3">{props.children}</main>
        </div>
      </Providers>
    </div>
  );
};
