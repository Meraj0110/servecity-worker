"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useTaskDetails(taskId: string | number) {
  return useQuery({
    queryKey: ["worker-task", taskId],
    queryFn: async () => {
      const res = await api.post(`/workers/tasks/${taskId}`);
      return res.data.task;
    },
    enabled: !!taskId,
  });
}
