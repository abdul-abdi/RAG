import { useState, useEffect } from "react";
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
  onSubmit: (data: {
    author: string;
    time: string;
    status: "Green" | "Amber" | "Red";
    comment: string;
  }) => void;
}

// Utility function to format date as dd/mm/yyyy
const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const AddReportForm = ({
  open,
  onOpenChange,
  onSubmit,
}: AddReportFormProps) => {
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<"Green" | "Amber" | "Red">("Green");
  const [comment, setComment] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // When the dialog opens, update the currentDate
  useEffect(() => {
    if (open) {
      const now = new Date();
      setCurrentDate(formatDate(now));
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const time = new Date().toISOString();
    onSubmit({ author, time, status, comment });
    // Reset form fields after submission
    setAuthor("");
    setStatus("Green");
    setComment("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Status Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Author Input */}
          <div className="space-y-4">
            <Label htmlFor="author">Author</Label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          {/* Display Current Date */}
          <div className="space-y-4">
            <Label htmlFor="date">Date</Label>
            <input
              id="date"
              type="text"
              value={currentDate}
              readOnly
              className="w-full border border-gray-300 rounded p-2 bg-gray-100"
            />
          </div>
          {/* Status Radio Group */}
          <div className="space-y-4">
            <Label>Status</Label>
            <RadioGroup
              value={status}
              onValueChange={(value) =>
                setStatus(value as "Green" | "Amber" | "Red")
              }
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
          {/* Comment Textarea */}
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
          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Submit Report
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
