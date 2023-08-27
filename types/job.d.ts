interface JobOutput {
  message: string;
  gen_percentage: number | null;
}

interface JobOutputs {
  [key: string]: JobOutput;
}

type JobInputProps = {
  jobs: JobOutputs;
  setJobsState: Dispatch<SetStateAction<JobOutputs>>;
  file?: File | null;
};

export type { JobOutput, JobOutputs, JobInputProps };
