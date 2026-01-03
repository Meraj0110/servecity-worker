import { Construction, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

function ComingSoon() {
  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <div className="flex flex-col items-center text-center max-w-md gap-4">
        {/* Icon */}
        <div className="rounded-full border bg-background p-4">
          <Construction className="h-6 w-6 text-muted-foreground" />
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold tracking-tight">Coming Soon</h2>
        <p className="text-sm text-muted-foreground">
          This section is under active development and will be available
          shortly.
        </p>

        {/* Optional action */}
        <Button variant="outline" size="sm" disabled>
          In Progress
        </Button>

        {/* Subtle hint */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <Clock className="h-3.5 w-3.5" />
          <span>We’re building something useful here</span>
        </div>
      </div>
    </div>
  );
}

export { ComingSoon };
