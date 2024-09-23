"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: string | null;
  phoneNumber: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AttendanceTable = {
  profile: Profile;
  timeIn: Date;
};

export const presentieColumns: ColumnDef<AttendanceTable>[] = [
  {
    header: "Profile ID",
    accessorKey: "profile.id",
  },
  {
    accessorKey: "profile.firstName",
    header: "First Name",
  },
  {
    accessorKey: "profile.lastName",
    header: "Last Name",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0" 
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time In
          <ChevronsUpDown className="ml-2 h-3 w-4" />
        </Button>
      );
    },
    accessorKey: "timeIn",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return `${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }).toLowerCase()}`;
    },
  },
  {
    header: "Role",
    accessorKey: "profile.role",
  },
];

export const absentieColumns: ColumnDef<AttendanceTable>[] = [
  {
    header: "Profile ID",
    accessorKey: "profile.id",
  },
  {
    accessorKey: "profile.firstName",
    header: "First Name",
  },
  {
    accessorKey: "profile.lastName",
    header: "Last Name",
  }
]