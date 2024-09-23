import { ColumnDef } from "@tanstack/react-table";

export const allEmployeeColumns: ColumnDef<any>[] = [
  {
    header: "S No.",
    accessorKey: "id",
    cell: ({row}) => {
      const id = row.index + 1;
      return id
    },
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ getValue, row }) => {
      const firstName = getValue() as string;
      const lastName = row.original.lastName;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "user.role",
    header: "Role",
  },
  {
    accessorKey: "Equipment",
    header: "Equipment",
    cell: ({ getValue }) => {
      const equipment = getValue() as any[];
      if(equipment.length > 0){
        return equipment.map((equipment: any) => equipment.name).join(", ");
      }
      return "-";
    },
  },
  {
    accessorKey: "teams",
    header: "Teams",
    cell: ({ getValue }) => {
      const teams = getValue() as any[];
      if(teams.length > 0){
        return teams.map((team: any) => team.name).join(", ");
      }
      return "-";
    },
  },
];
