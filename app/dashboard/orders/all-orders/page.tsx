"use client";

import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { DataTable } from "../../services/list/table";
import { useWorkerTasks } from "@/hooks/worker/useWorkerTask";
import { workerTaskColumns } from "../columns";

export default function WorkerAllOrdersPage() {
  const router = useRouter();
  const { data, isLoading } = useWorkerTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  const handleRowClick = (task: any) => {
    router.push(`/dashboard/orders/${task.id}`);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Your Tasks</h1>
      <p className="text-gray-600">
        Track, manage and complete your service tasks.
      </p>

      <div className="rounded-xl border bg-white p-4 shadow">
        <DataTable
          columns={workerTaskColumns}
          data={data || []}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}
