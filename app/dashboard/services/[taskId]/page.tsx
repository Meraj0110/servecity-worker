"use client";

import { useParams, useRouter } from "next/navigation";
import { useTaskDetails } from "@/hooks/worker/useTaskDetails";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: task, isLoading } = useTaskDetails(taskId);

  const claimMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post(`/workers/tasks/claim/${taskId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["worker-task", taskId]);
      router.push("/dashboard/services/list");
    },
  });

  if (isLoading)
    return (
      <div className="p-10 text-center text-neutral-500">
        Loading task details...
      </div>
    );

  if (!task)
    return <div className="p-10 text-center text-red-500">Task not found.</div>;

  const service = task.service;
  const address = task.address;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          ← Back
        </Button>
        <h1 className="text-2xl font-semibold">Service Details</h1>
      </div>

      {/* SERVICE CARD */}
      <div className="bg-white rounded-xl p-6 shadow border">
        <div className="flex gap-5">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-neutral-100">
            <Image
              src={service?.image ?? "/placeholder.png"}
              alt={service?.title ?? "Service"}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-neutral-900">
              {service?.title}
            </h2>

            <p className="text-sm text-neutral-600 mt-1">
              {service?.description}
            </p>

            <p className="text-neutral-800 font-medium mt-3">
              Duration: {service?.totalDuration}
            </p>
          </div>
        </div>

        {/* Details section */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-neutral-500">Date</p>
            <p className="font-medium">{task.date}</p>
          </div>

          <div>
            <p className="text-neutral-500">Time Slot</p>
            <p className="font-medium">{task.timeSlot || "Anytime"}</p>
          </div>

          <div>
            <p className="text-neutral-500">Price</p>
            <p className="font-medium">₹{task.price}</p>
          </div>

          <div>
            <p className="text-neutral-500">Status</p>
            <p className="font-medium capitalize">{task.status}</p>
          </div>
        </div>
      </div>

      {/* CUSTOMER DETAILS */}
      <div className="bg-white rounded-xl p-6 shadow border">
        <h3 className="text-lg font-semibold mb-4">Customer Details</h3>

        <div className="space-y-2 text-sm">
          <p>
            <span className="text-neutral-500">Name: </span>
            {address?.fullName}
          </p>
          <p>
            <span className="text-neutral-500">Phone: </span>
            {address?.phone}
          </p>

          <p className="text-neutral-500">Address:</p>
          <p className="font-medium">
            {address?.roadStreet}, {address?.city}, {address?.state} –{" "}
            {address?.pinCode}
          </p>
        </div>
      </div>

      {/* CLAIM BUTTON */}
      {task.status === "unassigned" ? (
        <Button
          className="w-full py-4 text-lg"
          onClick={() => claimMutation.mutate()}
          disabled={claimMutation.isPending}
        >
          {claimMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Claiming...
            </>
          ) : (
            "Claim This Task"
          )}
        </Button>
      ) : (
        <p className="text-green-600 text-center font-medium">
          You have already claimed this task.
        </p>
      )}
    </div>
  );
}
