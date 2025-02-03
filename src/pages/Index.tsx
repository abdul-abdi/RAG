import { useState } from "react";
import { AddReportButton } from "@/components/AddReportButton";
import { StatusTimeline } from "@/components/StatusTimeline";
import { useToast } from "@/components/ui/use-toast";
import { MetricsOverview } from "@/components/MetricsOverview";
import { AddReportForm } from "@/components/AddReportForm";

type Status = {
  date: string;
  status: "Green" | "Amber" | "Red";
  reporter: string;
  comment: string;
};

const mockStatuses = [
  {
    date: "2025-01-27",
    status: "Green",
    reporter: "Abdullahi Abdi",
    comment: "Had a lot of improvements done including redesign of project page, MongoDB up and running as well as skill generation for Yokai and workflow execution and design merged into main",
  },
  {
    date: "2025-01-17",
    status: "Green",
    reporter: "Abdullahi Abdi",
    comment: "• Yokai hiring and persona generation\n• The front end is up and running on the dev environment.\n• The Yokai waitlist was published to gather use cases and identify early adopters.",
  },
  {
    date: "2025-01-13",
    status: "Green",
    reporter: "Abdullahi Abdi",
    comment: "- Renewed focus on the Yokai Platform is in full motion with a POC demo created to showcase agents creation.\n- A new structure of weekly meetings has been established moving away from the daily stand ups.",
  },
  {
    date: "2025-01-03",
    status: "Amber",
    reporter: "Abdullahi Abdi",
    comment: "Yokai team is undergoing restructuring as well as exploration, team members being reassigned to other project as the project is being reevaluated throughout January",
  },
] as Status[];

const Index = () => {
  const { toast } = useToast();
  const [statuses, setStatuses] = useState<Status[]>(mockStatuses);
  const [isAddingReport, setIsAddingReport] = useState(false);

  const handleAddReport = ({ status, comment }: { status: "Green" | "Amber" | "Red"; comment: string }) => {
    const newStatus: Status = {
      date: new Date().toISOString(),
      status,
      reporter: "Abdullahi Abdi", // In a real app, this would come from the logged-in user
      comment,
    };

    setStatuses([newStatus, ...statuses]);
    toast({
      title: "Report Added",
      description: "Your status report has been successfully added.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-[1800px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Status Dashboard</h1>
            <p className="mt-2 text-gray-600">Track and monitor project health over time</p>
          </div>
          
          <MetricsOverview />
          
          <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Status History</h2>
                  <p className="mt-1 text-sm text-gray-600">View and manage status reports</p>
                </div>
                <AddReportButton onClick={() => setIsAddingReport(true)} />
              </div>
              <StatusTimeline statuses={statuses} />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
                <p className="mt-1 text-sm text-gray-600">Additional project information</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">This section can be used for project details, team members, or other relevant information.</p>
              </div>
            </div>
          </div>
          
          <AddReportForm
            open={isAddingReport}
            onOpenChange={setIsAddingReport}
            onSubmit={handleAddReport}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;