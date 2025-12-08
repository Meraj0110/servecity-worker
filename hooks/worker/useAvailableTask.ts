"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAvailableTasks() {
  return useQuery({
    queryKey: ["worker-tasks-available"],
    queryFn: async () => {
      const res = await api.post("/workers/tasks/available");
      return res.data.tasks;
    },
  });
}
