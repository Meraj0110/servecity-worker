"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useWorkerTasks() {
  return useQuery({
    queryKey: ["workerTasks"],
    queryFn: async () => {
      const res = await api.get("/workers/tasks/assigned");
      return res.data.tasks; // expected: array of tasks
    },
  });
}
