"use client";
import { JobCard } from "@/components/job/Jobs";
import { useEffect, useState } from "react";
import { getJobs as getJobsLS, setJob as setJobLS } from "@/utils/localStorage";
import { Job, JobProps } from "@/types/job";
import { Loader2 } from "lucide-react";

export default function Page({ params }: { params: { id: string } }) {
  const [job, setJobState] = useState<Job>();
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = params;
  useEffect(() => {
    const pollJob = async () => {
      setLoading(true);
      const pollResult = await fetch(`/edge/job/${id}`);
      try {
        const newJob = await pollResult.json();
        setJobLS(id, newJob);
        setJobState(newJob);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    pollJob();
  }, []);

  if (loading) {
    <div className="flex flex-col mx-24 gap-4">
      <Loader2 className="animate-spin" />
    </div>;
  }

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
