"use client";
import { useEffect, useState } from "react";

import { useAuthInfo } from "@propelauth/react";

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

// other
import TimeAgo from "react-timeago";

// utils
import { getJobs as getJobsLS, setJob as setJobLS } from "@/utils/localStorage";

// types
import { Job, JobOutput, JobProps } from "@/types/job";
import { RotateCw, Twitter } from "lucide-react";
import Link from "next/link";
import Heatmap from "./Heatmap";

export default function Jobs(props: JobProps) {
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
  job: Job;
  jobID: string;
};

const JobCard = (props: JobCardProps) => {
  let { index, job: defaultJob, jobID } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [job, setJobState] = useState<Job>(defaultJob);
  const [timeAgo, setTimeAgo] = useState<Date>();

  const { accessToken } = useAuthInfo();

  const handleNewJobOutput = (newJobOutput: JobOutput) => {
    if (newJobOutput.scores != null) {
      const newJob: Job = {
        ...job,
        status: "completed",
        output: newJobOutput,
      };
      setJobLS(jobID, newJob);
      setJobState(newJob);
    }
  };

  const poll = async () => {
    setLoading(true);
    const pollResult = await fetch(`/edge/job/${jobID}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const newJobOutput = await pollResult.json();

    handleNewJobOutput(newJobOutput);

    setLoading(false);
  };

  useEffect(() => {
    poll();
  }, [jobID]);

  const onStatusClick = async () => {
    setTimeAgo(new Date());
    poll();
  };

  const { output } = job;

  if (output?.scores && output.scores.length > 1) {
    const { scores } = output;
    const colors: string[] = [];
    const resultMsgs: string[] = [];
    scores.forEach((score) => {
      const [color, resultMsg] = scoreChecker(score);
      colors.push(color);
      resultMsgs.push(resultMsg);
    });

    // TODO: Create one Card component
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
    let score = null;
    if (output?.scores) {
      score = output.scores[0];
    }

    let segmented = output?.segmented;
    // handle non-files with segmented_predictions set up as number[][]
    if (output?.segmented && Array.isArray(output?.segmented[0])) {
      segmented = output?.segmented[0] as unknown as number[];
    }

    let color = "bg-slate-500";
    let resultMsg = null;
    if (score) {
      [color, resultMsg] = scoreChecker(score);
    }

    return (
      <Card
        key={index}
        className={`flex flex-col justify-center m-6 ${color} `}
      >
        <CardHeader>
          <CardTitle className="flex flex-row justify-between items-center pb-2">
            <div className="flex gap-2">
              {" "}
              <Badge className="hidden sm:block">{index}</Badge>
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
            <Badge>
              {job.origin &&
                (job.type == "file" ? (
                  job.origin
                ) : (
                  <Link
                    target="_blank"
                    href={withHttp(job.origin)}
                    rel="noopener noreferrer"
                    passHref
                  >
                    <Twitter />
                  </Link>
                ))}
            </Badge>
            <Badge
              className={`hidden sm:flex sm:align-middle ${
                score ? "bg-green-200" : "bg-slate-400"
              }`}
            >
              {score ? "Completed" : "Waiting"}{" "}
            </Badge>
            {score ? null : timeAgo ? (
              <div>
                Last Refreshed: <TimeAgo date={timeAgo} />
              </div>
            ) : (
              <div className="flex flex-row items-center gap-2">
                Click <RotateCw size={14} /> button to check status of job
                manually.
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {score ? (
            <div>
              <p>{resultMsg}</p>
              <p>
                <b>Average Score Across Heatmap:</b> {score * 100}%
              </p>
            </div>
          ) : (
            <p>Waiting for job to complete...</p>
          )}
          <div className="mt-6">
            <h2>
              <b>Heatmap</b>
            </h2>
            <Heatmap data={segmented} />
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Badge className="hidden sm:block" variant={"outline"}>
            DeepTruth Alpha
          </Badge>
        </CardFooter>
      </Card>
    );
  }
};

const scoreChecker = (score: number): [string, string] => {
  let color;
  let resultMsg;
  if (score < 0.5) {
    color = "bg-green-600";
    resultMsg = "Low probability of generated speech!";
  } else if (score < 0.75) {
    color = "bg-yellow-500";
    resultMsg = "Be Cautious. Catching patterns of generated speech.";
  } else {
    color = "bg-red-400 border-white";
    resultMsg = "High probability of generated speech detected!";
  }

  return [color, resultMsg];
};

const withHttp = (url: string) =>
  !/^https?:\/\//i.test(url) ? `http://${url}` : url;

export { JobCard };
