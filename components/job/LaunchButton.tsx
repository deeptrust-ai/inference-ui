"use client";
import { useState } from "react";

// ui
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

import { setJob } from "@/utils/localStorage";
import { JobInputProps, JobOutput, JobOutputs } from "@/types/job";
import { Loader2 } from "lucide-react";

const LaunchButton = (props: JobInputProps) => {
  const { file, setJobsState } = props;
  const [loading, setLoading] = useState<boolean>(false);
  // launch toast
  const { toast } = useToast();

  const launchJob = async () => {
    if (!file) return;
    const body = new FormData();
    body.append("file", file);
    body.append("fileName", file.name);
    body.append("modelType", "ss");

    const url = "/api/job";
    const options = {
      method: "POST",
      body,
    };
    setLoading(true);
    const res = await fetch(url, options);
    const data = await res.json();

    if (data.id) {
      const job: JobOutput = {
        message: data.message,
        gen_percentage: null,
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

  return (
    <Button onClick={launchJob} disabled={!file || loading}>
      <div className="flex flex-row gap-2 items-center">
        Launch {loading && <Loader2 className="animate-spin" />}
      </div>
    </Button>
  );
};

export default LaunchButton;
