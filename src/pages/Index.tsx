import { useState, useEffect } from "react";
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

type Project = {
  name: string;
  link: string; // Storing the link separately
  statuses: Status[];
};

const Index = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedProjectLink, setSelectedProjectLink] = useState<string>(""); // For displaying the link
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isAddingReport, setIsAddingReport] = useState(false);

  // Fetch the JSON data on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("./src/pages/grouped_output.json");
        const data: { [key: string]: { Date: string; "RAG Status": string; "Status Context": string }[] } = await response.json();
        // Convert the JSON to an array of project objects
        const projectsList: Project[] = Object.entries(data).map(([name, statuses]) => {
          const nameParts = name.split(" (");
          const projectName = nameParts[0];
          const projectLink = nameParts[1]?.replace(")", "") || "";

          return {
            name: projectName,
            link: projectLink,
            statuses: statuses.map((status) => ({
              date: status.Date,
              status: status["RAG Status"] as "Green" | "Amber" | "Red",
              reporter: "Someone else", // Assuming reporter is fixed, update as needed
              comment: status["Status Context"],
            })),
          };
        });

        setProjects(projectsList);
        setStatuses(projectsList[0]?.statuses.slice(0, 5) || []);
        setSelectedProject(projectsList[0]?.name || "");
        setSelectedProjectLink(projectsList[0]?.link || "");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error fetching data",
          description: "There was an issue fetching the status data.",
        });
      }
    };

    fetchProjects();
  }, []);

  // Handle project selection change
  const handleProjectSelect = (projectName: string) => {
    const selected = projects.find(project => project.name === projectName);
    if (selected) {
      setStatuses(selected.statuses.slice(0, 5)); // Display the 5 most recent statuses
      setSelectedProject(projectName);
      setSelectedProjectLink(selected.link); // Display the link after selecting the project
    }
  };

  // Handle adding a new status report
  const handleAddReport = ({ status, comment }: { status: "Green" | "Amber" | "Red"; comment: string }) => {
    const newStatus: Status = {
      date: new Date().toISOString(),
      status,
      reporter: "Abdullahi Abdi", // In a real app, this would come from the logged-in user
      comment,
    };

    // Append to the selected project's status list
    const updatedProjects = projects.map((project) =>
      project.name === selectedProject
        ? { ...project, statuses: [newStatus, ...project.statuses] }
        : project
    );

    setProjects(updatedProjects);
    setStatuses(updatedProjects.find(p => p.name === selectedProject)?.statuses.slice(0, 5) || []);
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
            <h1 className="text-3xl font-bold text-gray-900">Status reports for the {selectedProject}</h1>
            <p className="mt-2 text-gray-600">Track and monitor project health over time</p>
          </div>

          <MetricsOverview />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Status History</h2>
                <p className="mt-1 text-sm text-gray-600">View and manage status reports</p>
              </div>
              {/* Project Select Dropdown */}
              <select
                value={selectedProject}
                onChange={(e) => handleProjectSelect(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-4"
              >
                {projects.map((project) => (
                  <option key={project.name} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
              <AddReportButton onClick={() => setIsAddingReport(true)} />
            </div>
            {/* Display the project link after selection */}
            {selectedProjectLink && (
              <p className="text-sm text-gray-600 mt-2 mb-4 flex items-center">
                <span className="mr-2 text-gray-700 font-semibold">Project Link:</span>
                <a
                  href={selectedProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out flex items-center space-x-2"
                >
                  {/* Optional: Add an external link icon next to the URL */}
                  <span>{selectedProjectLink}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-up-right"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.854 4.646a.5.5 0 0 0 0-.708L7.707.707a.5.5 0 1 0-.708.708L9.793 4H2.5a.5.5 0 0 0 0 1h7.293l-2.793 2.793a.5.5 0 1 0 .708.708l3.5-3.5z" />
                  </svg>
                </a>
            </p>
            

            )}
            <StatusTimeline statuses={statuses} />
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
