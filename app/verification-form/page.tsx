"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import VerificationForm from "./VerificationForm"; // ⬅️ your existing form extracted here

export default function VerificationPage() {
  const [status, setStatus] = useState<null | boolean | "pending">(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await api.get("/workers/status");
        setStatus(res.data.status); // true | false | "pending"
      } catch (err) {
        console.error("Status fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="animate-pulse text-lg">Checking verification status...</p>
      </div>
    );

  // ✔ Already verified
  if (status === true) {
    return (
      <div className="max-w-xl mx-auto mt-10 px-4">
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-6 rounded-xl text-center shadow">
          <h2 className="text-xl font-semibold">You are already verified 🎉</h2>
          <p className="text-sm mt-1">
            Your identity has been successfully confirmed.
          </p>
        </div>
      </div>
    );
  }

  // ✔ Pending
  if (status === "pending") {
    return (
      <div className="max-w-xl mx-auto mt-10 px-4">
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-6 rounded-xl text-center shadow">
          <h2 className="text-xl font-semibold">Verification Pending ⏳</h2>
          <p className="text-sm mt-1">
            Your documents have been submitted. Please wait while the admin
            verifies your profile.
          </p>
        </div>
      </div>
    );
  }

  // ✔ Not verified → show form
  return <VerificationForm />;
}
