import { StatusCard } from "./StatusCard";

interface Status {
  date: string;
  status: "Green" | "Amber" | "Red";
  reporter: string;
  comment: string;
}

interface StatusTimelineProps {
  statuses: Status[];
}

export const StatusTimeline = ({ statuses }: StatusTimelineProps) => {
  return (
    <div className="space-y-6">
      {statuses.map((status, index) => (
        <StatusCard key={index} {...status} />
      ))}
    </div>
  );
};