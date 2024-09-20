import { Button } from "@/components/ui/button";

export default function Employees() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Employees</h1>
      </div>
      <div
        className="flex my-4 flex-1 min-h-80 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Employees
          </h3>
          <p className="text-sm text-muted-foreground">
            You can see the listing of the employees here.
          </p>
          <Button className="mt-4">Add Employee</Button>
        </div>
      </div>
    </>
  );
}