"use client";

import Link from "next/link";
import {
  User,
  ListTodo,
  ClipboardCheck,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function BentoCard({
  title,
  description,
  href,
  icon: Icon,
  className,
  gradient,
}: {
  title: string;
  description: string;
  href: string;
  icon: any;
  className?: string;
  gradient: string;
}) {
  return (
    <Link href={href} className="group h-full">
      <div
        className={cn(
          "relative h-full rounded-xl border bg-background p-6",
          "flex flex-col justify-between",
          "transition-all duration-300",
          "hover:shadow-lg hover:-translate-y-1",
          className
        )}
      >
        {/* hover gradient */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition",
            "bg-gradient-to-br",
            gradient
          )}
        />

        <div className="relative flex flex-col justify-between h-full">
          <Icon className="w-9 h-9 stroke-[1.3]" />

          <div className="mt-6 space-y-2">
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {description}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
            <span>Open</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function Feature() {
  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-xl">
            <Badge className="w-fit">Dashboard</Badge>
            <h2 className="text-3xl md:text-5xl tracking-tight font-semibold">
              Your work, at a glance
            </h2>
            <p className="text-muted-foreground text-lg">
              Access your profile, tasks, and work tools from one place.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">
            {/* Large – Profile */}
            <BentoCard
              title="My Profile"
              description="View and update your personal and work details."
              href="/profile"
              icon={User}
              gradient="from-indigo-500/15 to-transparent"
              className="lg:col-span-2"
            />

            {/* Small – Available Tasks */}
            <BentoCard
              title="Available Tasks"
              description="Browse tasks you can accept."
              href="/dashboard/services/list"
              icon={ListTodo}
              gradient="from-emerald-500/15 to-transparent"
            />

            {/* Small – Assigned Tasks */}
            <BentoCard
              title="My Tasks"
              description="Track tasks assigned to you."
              href="/dashboard/orders/all-orders"
              icon={ClipboardCheck}
              gradient="from-amber-500/15 to-transparent"
            />

            {/* Large – Logout */}
            <BentoCard
              title="Logout"
              description="Securely sign out from your account."
              href="/logout"
              icon={LogOut}
              gradient="from-rose-500/15 to-transparent"
              className="lg:col-span-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { Feature };
