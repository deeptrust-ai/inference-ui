"use client";
import { useEffect, useState } from "react";

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

type JobCardProps = {
  index: number;
  job: JobOutput;
  jobID: string;
};

const JobCard = (props: JobCardProps) => {
  let { index, job: defaultJob, jobID } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [job, setJobState] = useState<JobOutput>(defaultJob);

  useEffect(() => {
    const pollJob = async () => {
      setLoading(true);
      const pollResult = await fetch(`/api/job/${jobID}`);
      const newJob = await pollResult.json();
      if (newJob.gen_percentage != null) {
        setJobLS(jobID, newJob);
        setJobState(newJob);
      }
      setLoading(false);
    };

    pollJob();
  }, [jobID]);

  const onStatusClick = async () => {
    setLoading(true);
    const status = await fetch(`/api/job/${jobID}`);
    const newJob = await status.json();

    setJobLS(jobID, newJob);
    setJobState(newJob);
    setLoading(false);
  };

  if (job.scores && job.scores.length > 1) {
    const { scores } = job;
    const colors: string[] = [];
    const resultMsgs: string[] = [];
    scores.forEach((score) => {
      const [color, resultMsg] = scoreChecker(score);
      colors.push(color);
      resultMsgs.push(resultMsg);
    });

    return (
      <Card
        key={index}
        className={`flex flex-col justify-center m-6 bg-slate-500`}
      >
        <CardHeader>
          <CardTitle className="flex flex-row justify-between items-center pb-2">
            <div className="flex gap-2">
              {" "}
              <Badge>{index}</Badge>
              Speech Analysis Job
            </div>
          </CardTitle>
          <CardDescription className="text-slate-200 gap-2 flex flex-row justify-normal">
            <Badge className="bg-green-200">Completed</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This job had a total of {scores.length} videos to analyze. According
            to deeptruth, this was the outcome.
          </p>
          <div className="flex">
            {scores.map((score, i) => (
              <Badge key={i} className={colors[i]}>
                {resultMsgs[i]}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Badge variant={"outline"}>DeepTruth Alpha</Badge>
        </CardFooter>
      </Card>
    );
  } else {
    // single score
    let { score } = job;
    if (score == null && job.scores) {
      score = job.scores[0];
    }

    let color = "bg-slate-500";
    let resultMsg = null;
    if (score) {
      [color, resultMsg] = scoreChecker(score);
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
            {score == null && (
              <RotateCw
                onClick={onStatusClick}
                className={`${loading && "animate-spin"}`}
              />
            )}
          </CardTitle>
          <CardDescription className="text-slate-200 gap-2 flex flex-row justify-normal">
            <Badge className={`${score ? "bg-green-200" : "bg-slate-400"}`}>
              {score ? "Completed" : "Waiting"}{" "}
            </Badge>
            {score ? null : (
              <div className="flex flex-row items-center gap-2">
                Click <RotateCw size={14} /> button to check status of job
                manually.
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {score ? <p>{resultMsg}</p> : <p>Waiting for job to complete...</p>}
        </CardContent>
        <CardFooter className="gap-2">
          <Badge variant={"outline"}>DeepTruth Alpha</Badge>
        </CardFooter>
      </Card>
    );
  }
};

const scoreChecker = (score: number): [string, string] => {
  let color;
  let resultMsg;
  if (score < 0.6) {
    color = "bg-green-600";
    resultMsg = "No generated speech found!";
  } else if (score < 0.8) {
    color = "bg-yellow-500";
    resultMsg = "Be Cautious. Catching patterns of generated speech.";
  } else {
    color = "bg-red-400 border-white";
    resultMsg = "Generated speech detected!";
  }

  return [color, resultMsg];
};
