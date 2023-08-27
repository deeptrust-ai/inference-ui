"use client";
import { setJob } from "@/utils/localStorage";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { JobInputProps, JobOutput, JobOutputs } from "@/types/job";

const LaunchButton = (props: JobInputProps) => {
  const { file, setJobsState, jobs } = props;
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
  };

  return (
    <Button onClick={launchJob} disabled={!file}>
      Launch
    </Button>
  );
};

export default LaunchButton;
