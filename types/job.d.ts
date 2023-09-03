interface JobOutput {
  message: string;
  score?: number | null;
  scores?: number[] | null;
}

interface JobOutputs {
  [key: string]: JobOutput;
}

type JobType = "file" | "url" | "tweet";

type JobInputProps = {
  jobs: JobOutputs;
  setJobsState: Dispatch<SetStateAction<JobOutputs>>;
  type: JobType;
  input: File | string | null;
  setInput: Dispatch<SetStateAction<JobInputProps["input"]>>;
};

export type { JobOutput, JobType, JobOutputs, JobInputProps };
