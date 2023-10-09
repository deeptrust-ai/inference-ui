import { Job, Jobs } from "@/types/job";

const setJob = (id: string, data: Job): void => {
  const jobs = { ...getJobs() };
  const oldData = jobs[id] || {};
  jobs[id] = { ...oldData, ...data };
  localStorage.setItem("dtJobs", JSON.stringify(jobs));
};

const getJob = (id: string): Job | null => {
  const jobs = getJobs();
  return jobs[id] || null;
};

const getJobs = (): Jobs => {
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
