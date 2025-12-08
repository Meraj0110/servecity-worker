"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useGetSubCategoriesSelect = (categoryId: string) =>
  useQuery({
    queryKey: ["subcategories-select", categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      const res = await api.get(
        `/subcategories/select?categoryId=${categoryId}`
      );
      return res.data.data;
    },
    enabled: !!categoryId, // only fetch when category selected
  });
