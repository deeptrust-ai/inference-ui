import { JobOutput } from "@/types/job";

const setJob = (id: string, data: JobOutput): void => {
  const jobs = _getJobs();
  jobs[id] = data;
  localStorage.setItem("dtJobs", JSON.stringify(jobs));
};

const getJob = (id: string): JobOutput | null => {
  const jobs = _getJobs();
  return jobs[id] || null;
};

const _getJobs = () => {
  let lsJobs = localStorage.getItem("dtJobs");
  let jobs;
  if (!lsJobs) {
    jobs = {};
  } else {
    jobs = JSON.parse(lsJobs);
  }
  return jobs;
};

export { setJob, getJob };
