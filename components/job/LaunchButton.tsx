"use client";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

type propsType = {
  file?: File;
};

const LaunchButton = (props: propsType) => {
  const { file } = props;

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

    // launch toast
    const { toast } = useToast();

    toast({
      title: "Job Launched!",
      description: `The deepfake analysis should be done in a few minutes...`,
    });

    return data;
  };

  return (
    <Button onClick={launchJob} disabled={!file}>
      Launch
    </Button>
  );
};
