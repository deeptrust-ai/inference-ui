import { useEffect, useState } from "react";
import { useAuthInfo } from "@propelauth/react";

// shadcn
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  TableCaption,
} from "@/components/ui/table";

// types
import { IAudioJob, Job } from "@/types/job";
import { setJob } from "@/utils/localStorage";

// TODO: Remove setJobState
const RunningJobsTable = ({
  runningJobs,
  setJobState,
}: {
  runningJobs: IAudioJob[];
  setJobState: any;
}) => {
  const { accessToken } = useAuthInfo();

  const poll = async () => {
    runningJobs.forEach(async (job) => {
      const pollResult = await fetch(`/edge/job/${job.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const newJobOutput = await pollResult.json();
      if (newJobOutput.scores != null) {
        const newJob: Job = {
          origin: job.fileName,
          status: "completed",
          output: newJobOutput,
          type: "file",
        };
        setJob(job.id, newJob);
        setJobState(newJob);
      }
    });
  };

  useEffect(() => {
    poll();
  }, [runningJobs]);

  return (
    <Table className="border rounded-lg">
      <TableCaption>Running Speech Detection Jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Job ID</TableHead>
          <TableCell>File Name</TableCell>
          <TableCell className="text-right">Date Launched</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {runningJobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell>{job.id}</TableCell>
            <TableCell>{job.fileName}</TableCell>
            <TableCell className="text-right">{job.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RunningJobsTable;
