"use client";
import { useState } from "react";

// ui
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

import { setJob } from "@/utils/localStorage";
import { JobInputProps, JobOutput, JobOutputs } from "@/types/job";
import { Loader2 } from "lucide-react";

const LaunchButton = (props: JobInputProps & { className: string }) => {
  const { className, type, setJobsState, input } = props;
  const [loading, setLoading] = useState<boolean>(false);
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
      const job: JobOutput = {
        message: data.message,
        type,
      };
      // set localStorage
      setJob(data.id, job);

      const updatedValue = { [data.id]: job };
      setJobsState((currentJobs: JobOutputs) => ({
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

  const launchJobFile = async () => {
    if (!(input instanceof File)) return;
    const body = new FormData();
    body.append("file", input);
    body.append("fileName", input.name);
    // TODO: Add modelType prop
    body.append("modelType", "ss");
    const url = "/api/job";
    const options = {
      method: "POST",
      body,
    };
    const res = await fetch(url, options);
    const data = await res.json();

    return data;
  };

  const launchJobURL = async () => {
    // TODO: Add non-twitter URLs
    const url = `/api/job?url=${input}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  };

  return (
    <Button
      className={className}
      onClick={launchJob}
      disabled={!type || loading}
    >
      <div className="flex flex-row gap-2 items-center">
        Launch {loading && <Loader2 className="animate-spin" />}
      </div>
    </Button>
  );
};

export default LaunchButton;
