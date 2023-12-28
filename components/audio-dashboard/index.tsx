"use client";
import { useEffect, useState } from "react";

import AudioInput from "./audio-input";
import AudioJobTables from "./audio-job-tables";

import { IAudioJob, Job, Jobs } from "@/types/job";
import { getJobs } from "@/utils/localStorage";

// TODO: Offboard any use of localstorage including its type
// translate localstorage MVP format to new audio dashboard format
const formatJobsToIAudioJob = (lsJobs: Jobs): IAudioJob[] => {
  const jobIds = Object.keys(lsJobs);
  let output: IAudioJob[] = [];

  for (let id of jobIds) {
    const lsJob: Job = lsJobs[id];
    if (!lsJob) continue;
    output.push({
      id,
      fileName: lsJob?.origin || "",
      date: new Date().toDateString(),
      ...(lsJob.output?.scores && {
        score: Math.round(lsJob.output.scores[0] * 10000) / 100,
      }),
      ...(lsJob.output?.segmented && { heatmapData: lsJob.output.segmented }),
    });
  }

  return output;
};

// TODO: Remove setJobState
export function AudioDashboard({
  jobs,
  setJobsState,
}: { jobs: IAudioJob[] } & { setJobsState: any }) {
  return (
    <div className="grid w-full lg:min-h-[calc(100vh-70px)] lg:grid-cols-[300px,1fr] gap-4 p-6">
      <AudioInput setJobsState={setJobsState} />
      <AudioJobTables jobs={jobs} />
    </div>
  );
}

export default function TempAudioDashboard() {
  const [jobs, setJobsState] = useState<Jobs>({});
  useEffect(() => {
    setJobsState(getJobs());
  }, []);

  return (
    <AudioDashboard
      jobs={formatJobsToIAudioJob(jobs)}
      setJobsState={setJobsState}
    />
  );
}
