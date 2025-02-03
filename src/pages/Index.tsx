import { useState } from "react";
import { AddReportButton } from "@/components/AddReportButton";
import { StatusTimeline } from "@/components/StatusTimeline";
import { useToast } from "@/components/ui/use-toast";

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
] as const;

const Index = () => {
  const { toast } = useToast();
  const [statuses] = useState(mockStatuses);

  const handleAddReport = () => {
    toast({
      title: "Coming Soon",
      description: "The ability to add new reports will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Status Summary</h1>
              <p className="mt-2 text-gray-600">Track project status and progress over time</p>
            </div>
            <AddReportButton onClick={handleAddReport} />
          </div>
          <StatusTimeline statuses={statuses} />
        </div>
      </div>
    </div>
  );
};

export default Index;