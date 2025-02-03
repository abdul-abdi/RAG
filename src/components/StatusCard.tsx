import { format } from "date-fns";
import { StatusBadge } from "./StatusBadge";
import { AlertCircle, MessageSquare, User } from "lucide-react";

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
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle className="h-4 w-4" />
            {format(new Date(date), "MMM d, yyyy 'at' h:mm a")}
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <p className="font-medium text-gray-900">{reporter}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="flex items-start gap-2 text-gray-700 leading-relaxed">
        <MessageSquare className="h-4 w-4 mt-1 text-gray-500 shrink-0" />
        <p className="whitespace-pre-wrap">{comment}</p>
      </div>
    </div>
  );
};