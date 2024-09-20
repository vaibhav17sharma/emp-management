import { Button } from "@/components/ui/button";

export default function Equipments() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Equipments</h1>
      </div>
      <div
        className="flex my-4 flex-1 min-h-80 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Equipments
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start alloting as soon as you add a Equipment.
          </p>
          <Button className="mt-4">Add Equipment</Button>
        </div>
      </div>
    </>
  );
}
