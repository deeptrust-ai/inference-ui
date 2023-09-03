import { JobOutput, JobType } from "@/types/job";

const setJob = (id: string, data: JobOutput, type: JobType): void => {
  const jobs = { ...getJobs() };
  jobs[id] = { ...data, type };
  localStorage.setItem("dtJobs", JSON.stringify(jobs));
};

const getJob = (id: string): JobOutput | null => {
  const jobs = getJobs();
  return jobs[id] || null;
};

const getJobs = () => {
  let lsJobs = localStorage.getItem("dtJobs");
  let jobs;
  if (!lsJobs) {
    jobs = {};
  } else {
    jobs = JSON.parse(lsJobs);
  }
  return jobs;
};

const clearJobs = () => localStorage.setItem("dtJobs", JSON.stringify({}));

export { getJob, getJobs, setJob, clearJobs };
