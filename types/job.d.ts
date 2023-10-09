type JobType = "file" | "url" | "tweet";
type JobStatus = "started" | "completed";

interface Job {
  type: JobType;
  status: JobStatus;
  output?: JobOutput;
}

interface Jobs {
  [key: string]: Job;
}

interface JobOutput {
  message: string;
  scores?: number[] | null;
}

type JobProps = {
  jobs: Jobs;
  setJobsState: Dispatch<SetStateAction<Jobs>>;
  type?: JobType;
  input: File | string | null;
  setInput: Dispatch<SetStateAction<JobProps["input"]>>;
};

export type { Job, Jobs, JobOutput, JobType, JobProps };
