type JobType = "file" | "url" | "tweet";

interface JobOutput {
  message: string;
  type?: JobType;
  score?: number | null;
  scores?: number[] | null;
}

interface JobOutputs {
  [key: string]: JobOutput;
}

type JobInputProps = {
  jobs: JobOutputs;
  setJobsState: Dispatch<SetStateAction<JobOutputs>>;
  type?: JobType;
  input: File | string | null;
  setInput: Dispatch<SetStateAction<JobInputProps["input"]>>;
};

export type { JobOutput, JobType, JobOutputs, JobInputProps };
