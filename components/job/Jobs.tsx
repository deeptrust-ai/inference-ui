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
import { Loader2 } from "lucide-react";

export default function Jobs() {
  const [loading, setLoading] = useState<boolean>(false);

  const defaultJobs = getJobsLS();
  const [jobs, setJobs] = useState<JobOutputs>(defaultJobs);
  const jobIds = Object.keys(jobs);

  const onStatusClick = async (jobID: string) => {
    setLoading(true);
    const status = await fetch(`/api/job/${jobID}`);
    const statusData: JobOutput = await status.json();

    setJobLS(jobID, statusData);
    jobs[jobID] = statusData;
    // setJobs(jobs)
    setLoading(false);
  };

  return (
    <div>
      {jobIds.map((jobID, index) => {
        const job: JobOutput = jobs[jobID];
        const genPercentage = job.gen_percentage;
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
          <Card
            key={index}
            className={`flex flex-col justify-center m-12 ${color}`}
          >
            <CardHeader>
              <CardTitle>Speech Analysis Job</CardTitle>
              <CardDescription className="text-slate-200 gap-2 flex flex-row justify-normal">
                <Badge
                  className={`${
                    genPercentage ? "bg-green-200" : "bg-slate-400"
                  }`}
                >
                  {genPercentage ? "Completed" : "Waiting"}{" "}
                </Badge>
                {genPercentage == null && (
                  <p>Click button below to check status of job manually.</p>
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
                <div>
                  <p className="mb-2">
                    It takes a few minutes for a speech analysis job to
                    complete. Click to check if it has finished.
                  </p>
                  <Button onClick={() => onStatusClick(jobID)}>
                    Check Job Status{" "}
                    {loading && <Loader2 className="animate-spin" />}
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="gap-2">
              <Badge variant={"outline"}>DeepTruth Alpha</Badge>
              {/* <Badge>Model: deeptruth-{modelType}</Badge> */}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
