type JobType = "file" | "url" | "tweet";
type JobStatus = "started" | "completed";

interface Job {
  type: JobType;
  status: JobStatus;
  output?: JobOutput;
  origin?: string;
}

interface Jobs {
  [key: string]: Job;
}

interface JobOutput {
  message: string;
  scores?: number[];
  segmented?: number[];
}

interface JobProps {
  jobs: Jobs;
  setJobsState: Dispatch<SetStateAction<Jobs>>;
  type?: JobType;
  input: File | string | null;
  setInput: Dispatch<SetStateAction<JobProps["input"]>>;
}

interface IAudioJob {
  id: string;
  fileName: string; //
  date: string; //
  score?: number;
  heatmapData?: number[];
}

export type { Job, Jobs, JobOutput, JobType, JobProps, IAudioJob };
