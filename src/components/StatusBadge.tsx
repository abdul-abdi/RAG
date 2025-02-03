import { cn } from "@/lib/utils";

type StatusType = "Green" | "Amber" | "Red";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusColors = {
  Green: "bg-rag-green",
  Amber: "bg-rag-amber",
  Red: "bg-rag-red",
} as const;

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium animate-fade-in",
        statusColors[status],
        className
      )}
    >
      {status}
    </div>
  );
};