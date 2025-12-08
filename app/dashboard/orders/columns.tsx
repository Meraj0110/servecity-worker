"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface WorkerTask {
  id: number;
  status: string;
  date: string;
  price: number;
  service: {
    title: string;
    image: string;
  };
  customer?: {
    fullName: string;
    phone: string;
  };
}

export const workerTaskColumns: ColumnDef<WorkerTask>[] = [
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => {
      const service = row.original.services;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={service.image}
            alt={service.title}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <span className="font-medium">{service.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">
        {new Date(row.original.date).toDateString()}
      </span>
    ),
  },
  {
    accessorKey: "customer.fullName",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">
          {row.original?.orders?.addresses?.fullName || "Unknown"}
        </span>
        <span className="text-xs text-gray-500">
          {row.original.customer?.phone}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-800">₹{row.original.price}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const st = row.original.status;

      return (
        <Badge
          variant={
            st === "completed"
              ? "default"
              : st === "in_progress"
              ? "secondary"
              : "outline"
          }
        >
          {st}
        </Badge>
      );
    },
  },
];
