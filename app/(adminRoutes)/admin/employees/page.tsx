import TableSection from "@/components/admin/TableSection";
import { getAllEmployeeProfiles } from "@/db/employee";

export default async function Employees() {
  const employeeList = await getAllEmployeeProfiles();

  return (
    <>
      <div className="relative">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Employees</h1>
        </div>
        <TableSection
          label="Employees"
          data={employeeList}
        />
      </div>
    </>
  );
}