"use client";
import { useState } from "react";

import FileUpload from "@/components/job/FileUpload";
import Jobs from "@/components/job/Jobs";
import { getJobs } from "@/utils/localStorage";
import { JobInputProps, JobOutputs } from "@/types/job";

export default function Input() {
  const defaultJobs = getJobs();
  const [jobs, setJobsState] = useState<JobOutputs>(defaultJobs);

  const props: JobInputProps = {
    jobs,
    setJobsState,
  };

  return (
    <div className="flex flex-col gap-4">
      <FileUpload {...props} /> {/* TODO: Add URL input (file vs URL) */}
      <Jobs {...props} />
    </div>
  );
}
