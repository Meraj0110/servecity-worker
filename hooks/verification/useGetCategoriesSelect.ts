"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface CategoryOption {
  id: string;
  name: string; // or `title` – match your API shape
}

export const useGetCategoriesSelect = () =>
  useQuery<CategoryOption[]>({
    queryKey: ["categories-select"],
    queryFn: async () => {
      const res = await api.get("/categories/select");
      return res.data?.data; // expecting: [{ id, name }, ...]
    },
  });
