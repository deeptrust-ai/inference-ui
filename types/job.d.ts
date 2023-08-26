interface JobOutput {
  message: string;
  gen_percentage: number | null;
}

interface JobOutputs {
  [key: string]: JobOutput;
}

export { JobOutput, JobOutputs };
