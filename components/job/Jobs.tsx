"use client";
import { useState } from "react";

// shadcn
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// utils
import { getJobs as getJobsLS, setJob as setJobLS } from "@/utils/localStorage";

// types
import { JobOutput, JobInputProps } from "@/types/job";
import { RotateCw } from "lucide-react";

export default function Jobs(props: JobInputProps) {
  const { jobs } = props;
  const jobIds = Object.keys(jobs);

  return (
    <div className="flex flex-col-reverse">
      {jobIds.map((jobID, index) => (
        <JobCard key={index} index={index} jobID={jobID} job={jobs[jobID]} />
      ))}
    </div>
  );
}

type jobCardType = {
  index: number;
  job: JobOutput;
  jobID: string;
};

const JobCard = (props: jobCardType) => {
  let { index, job: defaultJob, jobID } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [job, setJobState] = useState<JobOutput>(defaultJob);

  const onStatusClick = async () => {
    setLoading(true);
    const status = await fetch(`/api/job/${jobID}`);
    const newJob = await status.json();

    setJobLS(jobID, newJob);
    setJobState(newJob);
    setLoading(false);
  };

  const genPercentage = job.gen_percentage;

  let color = "bg-slate-500";
  let alert = null;
  if (genPercentage) {
    if (genPercentage < 0.5) {
      color = "bg-green-600";
      alert = "No generated speech found!";
    } else if (genPercentage < 0.8) {
      color = "bg-yellow-500";
      alert = "Be Cautious. Very likely generated speech.";
    } else {
      color = "bg-red-400 border-white";
      alert = "Generated speech detected!";
    }
  }

  return (
    <Card key={index} className={`flex flex-col justify-center m-6 ${color}`}>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center pb-2">
          <div className="flex gap-2">
            {" "}
            <Badge>{index}</Badge>
            Speech Analysis Job
          </div>
          {genPercentage == null && (
            <RotateCw
              onClick={onStatusClick}
              className={`${loading && "animate-spin"}`}
            />
          )}
        </CardTitle>
        <CardDescription className="text-slate-200 gap-2 flex flex-row justify-normal">
          <Badge
            className={`${genPercentage ? "bg-green-200" : "bg-slate-400"}`}
          >
            {genPercentage ? "Completed" : "Waiting"}{" "}
          </Badge>
          {genPercentage ? (
            <div>{alert}</div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              Click <RotateCw size={14} /> button to check status of job
              manually.
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {genPercentage ? (
          <p>
            According to deeptruth, this audio has a{" "}
            <b>{genPercentage * 100}%</b> of being being generated.
          </p>
        ) : (
          <p>Waiting for job to complete...</p>
        )}
      </CardContent>
      <CardFooter className="gap-2">
        <Badge variant={"outline"}>DeepTruth Alpha</Badge>
        {/* <Badge>Model: deeptruth-{modelType}</Badge> */}
      </CardFooter>
    </Card>
  );
};
