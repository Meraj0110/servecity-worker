"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

// TYPE for one row
export type WorkerTaskRow = {
  id: number;
  orderId: number;
  serviceId: number;
  date: string;
  timeSlot: string | null;
  price: number;
  status: string;
  services: {
    title: string;
    image: string;
    description?: string;
  } | null;
  orders: {
    userId: string;
    addressId: number;
  };
};

// TABLE COLUMNS
export const columns: ColumnDef<WorkerTaskRow>[] = [
  {
    accessorKey: "services.image",
    header: "",
    cell: ({ row }) => {
      const img = row.original.services?.image;

      if (!img)
        return (
          <div className="w-14 h-14 bg-neutral-200 rounded-md flex items-center justify-center text-xs text-neutral-500">
            No image
          </div>
        );

      return (
        <Image
          src={img}
          alt="service"
          width={56}
          height={56}
          className="rounded-md"
        />
      );
    },
  },

  {
    accessorKey: "services.title",
    header: "Service",
    cell: ({ row }) => (
      <div className="font-medium text-neutral-900">
        {row.original.services?.title || "Unknown Service"}
      </div>
    ),
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span>{new Date(row.original.date).toLocaleDateString()}</span>
    ),
  },

  {
    accessorKey: "timeSlot",
    header: "Time",
    cell: ({ row }) => row.original.timeSlot || "Anytime",
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>₹{row.original.price}</span>,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="capitalize text-sm text-neutral-600">
        {row.original.status}
      </span>
    ),
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <Button
          size="sm"
          onClick={() => router.push(`/dashboard/services/${row.original.id}`)}
        >
          View <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      );
    },
  },
];
