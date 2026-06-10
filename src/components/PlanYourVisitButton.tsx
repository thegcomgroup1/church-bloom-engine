import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "default" | "lg";
  children?: React.ReactNode;
};

export function PlanYourVisitButton({ className, size = "default", children }: Props) {
  return (
    <Link
      to="/plan-a-visit"
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary font-medium text-primary-foreground shadow-sm transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        size === "lg" ? "h-12 px-7 text-base" : "h-10 px-5 text-sm",
        className,
      )}
    >
      {children ?? "Plan Your Visit"}
    </Link>
  );
}
