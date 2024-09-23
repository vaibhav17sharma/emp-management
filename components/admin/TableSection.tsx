"use client";

import { EmployeeForm } from "@/components/forms/AddEmployee";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useClientMediaQuery } from "@/hooks/useMediaQuery";
import { teamsAtom } from "@/store/atoms/teams";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { allEmployeeColumns } from "../columns/allEmployeeColumns";
export default function TableSection({ data, label }: any) {
  const teams = useRecoilValue(teamsAtom);
  const [open, setOpen] = useState(false);
  const isMobile = useClientMediaQuery("(max-width: 768px)");

//   return <pre>{JSON.stringify(data, null, 2)}</pre>;

  if (!data) {
    return <div>You have no {label ?? "data"}</div>;
  }
  return (
    <>
      {data.length < 1 ? (
        <div
          className="flex my-4 flex-1 min-h-80 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no {label}
            </h3>
            <p className="text-sm text-muted-foreground">
              You can see the listing of the {label} here.
            </p>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4">Add {label}</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[425px] md:max-w-2lg lg:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Add {label}</DialogTitle>
                  <DialogDescription>
                    Add {label} details here. Click Submit when done
                  </DialogDescription>
                </DialogHeader>
                <EmployeeForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute right-0 top-0 flex items-end justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="mt-0">Add {label}</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[425px] md:max-w-2lg lg:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Add {label}</DialogTitle>
                  <DialogDescription>
                    Add {label} details here. Click Submit when done
                  </DialogDescription>
                </DialogHeader>
                <EmployeeForm />
              </DialogContent>
            </Dialog>
          </div>
          <DataTable
            columns={allEmployeeColumns}
            data={data as any}
            filterColumn={"firstName"}
            totalText={"employees"}
          />
        </>
      )}
    </>
  );
}
