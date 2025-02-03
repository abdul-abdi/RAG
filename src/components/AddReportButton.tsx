import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddReportButtonProps {
  onClick: () => void;
}

export const AddReportButton = ({ onClick }: AddReportButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <Plus className="mr-2 h-4 w-4" /> Add New Report
    </Button>
  );
};