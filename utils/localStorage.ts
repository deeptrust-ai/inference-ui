import { JobOutput } from "@/types/job";

const setJob = (id: string, data: JobOutput): void => {
  localStorage.setItem(id, JSON.stringify(data));
};

const getJob = (id: string): JobOutput | null => {
  const jsonJobOutput = localStorage.getItem(id);
  if (!jsonJobOutput) return null;
  return JSON.parse(jsonJobOutput);
};

export { setJob, getJob };
