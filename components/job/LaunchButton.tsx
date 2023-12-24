"use client";
import { useState } from "react";

import { useAuthInfo } from "@propelauth/react";

// ui
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

import { setJob } from "@/utils/localStorage";
import { JobProps, Job, JobOutput, Jobs } from "@/types/job";
import { Loader2 } from "lucide-react";

const LaunchButton = (props: JobProps & { className: string }) => {
  const { className, type, setJobsState, input } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const { accessToken } = useAuthInfo();

  // launch toast
  const { toast } = useToast();

  const launchJob = async () => {
    if (!type) return;
    let launcher = launchJobURL;
    if (type == "file") {
      launcher = launchJobFile;
    }

    setLoading(true);
    const data = await launcher();

    if (data.id) {
      const output: JobOutput = {
        message: data.message,
      };
      const job: Job = {
        type,
        output,
        status: "started",
      };

      // set origin metadata
      if (type == "file" && input instanceof File) {
        job.origin = input.name;
      } else if (type != "file" && typeof input == "string") {
        job.origin = input;
      }

      // set localStorage
      setJob(data.id, job);

      const updatedValue = { [data.id]: job };
      setJobsState((currentJobs: Jobs) => ({
        ...currentJobs,
        ...updatedValue,
      }));

      // dispatch Toast
      toast({
        title: "Job Launched!",
        description: `The deepfake analysis should be done in a few minutes...`,
      });
    } else {
      // TODO: Add setErrMsg here
      console.error("Launch failed");
    }
    setLoading(false);
  };

  const headers = { Authorization: `Bearer ${accessToken}` };
  const launchJobFile = async () => {
    if (!(input instanceof File)) return;
    const body = new FormData();
    body.append("file", input);
    body.append("fileName", input.name);
    // TODO: Add modelType prop
    body.append("modelType", "ss");
    const url = "/edge/job";
    const options = {
      method: "POST",
      headers,
      body,
    };
    const res = await fetch(url, options);
    const data = await res.json();

    return data;
  };

  const launchJobURL = async () => {
    if (input == null) return;
    // TODO: Add non-twitter URLs
    const url = `/edge/job?url=${input}`;
    const response = await fetch(url, { headers });
    const data = await response.json();

    return data;
  };

  return (
    <Button
      className={className}
      onClick={launchJob}
      disabled={!input || loading}
    >
      <div className="flex flex-row gap-2 items-center">
        Launch {loading && <Loader2 className="animate-spin" />}
      </div>
    </Button>
  );
};

export default LaunchButton;
