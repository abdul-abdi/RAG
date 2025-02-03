import { format } from "date-fns";
import { StatusBadge } from "./StatusBadge";

interface StatusCardProps {
  date: string;
  status: "Green" | "Amber" | "Red";
  reporter: string;
  comment: string;
}

export const StatusCard = ({ date, status, reporter, comment }: StatusCardProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md animate-fade-up">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">
            {format(new Date(date), "MMM d, yyyy")}
          </p>
          <p className="font-medium text-gray-900">{reporter}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <p className="text-gray-700 leading-relaxed">{comment}</p>
    </div>
  );
};