// shadcn
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// components
import CompletedJobsTable from "./completed";
import RunningJobsTable from "./running";

// types
import { IAudioJob } from "@/types/job";

const AudioJobTables = ({ jobs }: { jobs: IAudioJob[] }) => {
  const completedJobs = jobs.filter((e) => e.score && e.heatmapData);
  const runningJobs = jobs.filter((e) => !e.score || !e.heatmapData);

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="font-semibold text-lg md:text-2xl">
        Speech Analysis Jobs
      </h1>
      {/* Completed Jobs */}
      <div className="border shadow-sm rounded-lg bg-gray-600/40 dark:bg-gray-800/40 ">
        <div className="flex flex-col w-full p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Results</h2>
          <CompletedJobsTable completedJobs={completedJobs} />
        </div>
      </div>
      {/* RunningJobs */}
      <div className="border shadow-sm rounded-lg bg-gray-600/40 dark:bg-gray-800/40 ">
        <div className="flex flex-col w-full p-4 rounded-lg shadow">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="running">
              <AccordionTrigger>
                <h2 className="text-lg font-semibold mb-4">Running Jobs</h2>
              </AccordionTrigger>
              <AccordionContent>
                <RunningJobsTable runningJobs={runningJobs} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AudioJobTables;
