interface JobOutput {
  message: string;
  score?: number | null;
  scores?: number[] | null;
}

interface JobOutputs {
  [key: string]: JobOutput;
}

type JobInputProps = {
  jobs: JobOutputs;
  setJobsState: Dispatch<SetStateAction<JobOutputs>>;
  type: "file" | "url" | "tweet";
  input: File | string | null;
  setInput: Dispatch<SetStateAction<JobInputProps["input"]>>;
};

export type { JobOutput, JobOutputs, JobInputProps };
