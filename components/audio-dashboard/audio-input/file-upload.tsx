"use client";
import { useState } from "react";

// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// components
import ErrorAlert from "@/components/ErrorAlert";
import { Loader2 } from "lucide-react";
import { Job, JobOutput, Jobs } from "@/types/job";
import { setJob } from "@/utils/localStorage";
import { useAuthInfo } from "@propelauth/react";

// TODO: Remove props/setJobsState
const FileUploadInput = (props: any) => {
  const [inputValue, setInput] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileInput = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type == "audio/wav") {
        setInput(file);
        setError(null);
      } else if (file.type == "audio/mpeg") {
        // TODO: Set up mp3 support
        // setError(
        //   "Caution: You uploaded an mp3. DeepTrust Speech was trained on wavfiles."
        // );
        setInput(file);
      } else {
        setError("DeepTrust only supports .wav and .mp3 files at the moment.");
        setInput(null);
      }
    }
  };

  return (
    <div>
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="audio-upload">Upload Audio</Label>
        <Input
          aria-label="Upload audio"
          className="border-gray-300 shadow-sm rounded-lg"
          id="audio-upload"
          type="file"
          onChange={handleFileInput}
        />
        {error && <ErrorAlert msg={error} />}
      </div>
      <hr className="my-4" />
      <LaunchJobButton
        inputValue={inputValue}
        setJobsState={props.setJobsState}
      />
    </div>
  );
};

const LaunchJobButton = ({
  inputValue,
  setJobsState,
}: {
  inputValue: File | null;
  setJobsState: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  // launch toast
  const { toast } = useToast();
  const { accessToken } = useAuthInfo();

  const launchJob = async () => {
    if (!(inputValue instanceof File)) return;
    const body = new FormData();
    body.append("file", inputValue);
    body.append("fileName", inputValue.name);
    // TODO: Add modelType prop
    body.append("modelType", "ss");
    const url = "/edge/job";
    const headers = { Authorization: `Bearer ${accessToken}` };
    const options = {
      method: "POST",
      body,
      headers,
    };
    const res = await fetch(url, options);
    const data = await res.json();

    return data;
  };

  const handleClick = async () => {
    if (!inputValue) return;
    setLoading(true);
    const data = await launchJob();

    if (data.id) {
      const output: JobOutput = {
        message: data.message,
      };
      const job: Job = {
        type: "file",
        output,
        status: "started",
      };

      // set origin metadata
      job.origin = inputValue.name;

      // set localStorage
      setJob(data.id, job);

      const updatedValue = { [data.id]: job };
      // TODO: Remind sJS and setup for audio-dashboard
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

  return (
    <Button
      className="w-full"
      disabled={!inputValue || loading}
      onClick={handleClick}
    >
      <div className="flex flex-row gap-2 items-center">
        Detect {loading && <Loader2 className="animate-spin" />}
      </div>
    </Button>
  );
};

export default FileUploadInput;
