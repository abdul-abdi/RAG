import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddReportFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { status: "Green" | "Amber" | "Red"; comment: string }) => void;
}

export const AddReportForm = ({ open, onOpenChange, onSubmit }: AddReportFormProps) => {
  const [status, setStatus] = useState<"Green" | "Amber" | "Red">("Green");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ status, comment });
    setComment("");
    setStatus("Green");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Status Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Status</Label>
            <RadioGroup
              value={status}
              onValueChange={(value) => setStatus(value as "Green" | "Amber" | "Red")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Green" id="green" />
                <Label htmlFor="green" className="text-rag-green font-medium">
                  Green
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Amber" id="amber" />
                <Label htmlFor="amber" className="text-rag-amber font-medium">
                  Amber
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Red" id="red" />
                <Label htmlFor="red" className="text-rag-red font-medium">
                  Red
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-4">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Provide context for this status update..."
              className="min-h-[100px]"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Report
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};