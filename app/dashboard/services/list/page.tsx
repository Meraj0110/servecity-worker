"use client";

import { useAvailableTasks } from "@/hooks/worker/useAvailableTask";

import { DataTable } from "./table";
import { columns } from "./table-column";

export default function WorkerAvailableServicesPage() {
  const { data: tasks = [], isLoading } = useAvailableTasks();

  if (isLoading)
    return <p className="p-6 text-neutral-500">Loading tasks...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Available Service Tasks</h1>
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
