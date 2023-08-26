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
import { JobOutput, JobOutputs } from "@/types/job";
import { Button } from "../ui/button";
import { Loader2, RotateCw } from "lucide-react";

export default function Jobs() {
  const jobs = getJobsLS();
  const jobIds = Object.keys(jobs);
  console.log(jobIds);

  return (
    <div className="flex flex-col-reverse">
      {jobIds.map((jobID, index) => (
        <JobCard index={index} jobID={jobID} job={jobs[jobID]} />
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
  let { index, job, jobID } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const onStatusClick = async () => {
    setLoading(true);
    const status = await fetch(`/api/job/${jobID}`);
    job = await status.json();

    setJobLS(jobID, job);
    setLoading(false);
  };

  const genPercentage = job.gen_percentage;
  console.log("job", index);
  let color = "bg-slate-500";
  if (genPercentage) {
    color =
      genPercentage < 0.5
        ? "bg-green-600"
        : genPercentage < 0.8
        ? "bg-yellow-500"
        : "bg-red-500";
  }

  return (
    <Card key={index} className={`flex flex-col justify-center m-12 ${color}`}>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
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
          {genPercentage == null && (
            <p className="flex flex-row items-center gap-2">
              Click <RotateCw size={14} /> button to check status of job
              manually.
            </p>
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
