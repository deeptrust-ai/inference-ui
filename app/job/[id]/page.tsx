"use client";
import { JobCard } from "@/components/job/Jobs";
import { useEffect, useState } from "react";
import { getJobs as getJobsLS, setJob as setJobLS } from "@/utils/localStorage";
import { JobOutput, JobInputProps } from "@/types/job";

export default function Page({ params }: { params: { id: string } }) {
  const [job, setJobState] = useState<JobOutput>();
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = params;
  useEffect(() => {
    const pollJob = async () => {
      setLoading(true);
      const pollResult = await fetch(`/api/job/${id}`);
      const newJob = await pollResult.json();
      console.log("newJob", newJob);
      if (newJob.score != null || newJob.scores != null) {
        setJobLS(id, newJob);
        setJobState(newJob);
      }
      setLoading(false);
    };

    pollJob();
  }, []);

  console.log("job", job);

  if (!job) {
    return <div className="flex flex-col mx-24 gap-4">No job found...</div>;
  }

  const jobCardProps = {
    index: 0,
    job,
    jobID: id,
  };

  return (
    <div className="flex flex-col mx-24 gap-4">
      <JobCard {...jobCardProps} />
    </div>
  );
}
