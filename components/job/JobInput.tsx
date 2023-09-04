"use client";
// react
import { useState } from "react";

// shadcn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// components
import LaunchButton from "./LaunchButton";
import OptionsDropDown from "./OptionsDropdown";
import ErrorAlert from "../ErrorAlert";

// types
import { JobInputProps } from "@/types/job";

const JobInput = (props: JobInputProps) => {
  const [error, setError] = useState<string | null>(null);

  const { setInput, type } = props;

  const handleInput = (e: any) => {
    if (type == "file") {
      return handleFileInput(e);
    }

    return handleURLInput(e);
  };

  const handleFileInput = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type == "audio/wav") {
        setInput(file);
        setError(null);
      } else {
        setError("DeepTrust only supports wavfiles at the moment.");
        setInput(null);
      }
    }
  };

  const handleURLInput = (e: any) => setInput(e.target.value);

  const labelOptions = {
    file: "Upload .wav audio file",
    url: "Submit URL for analysis",
    tweet: "Submit Tweet URL for analysis",
  };

  if (!type) return;
  const label = labelOptions[type];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Label htmlFor="audioFile">{label}</Label>
        <div id="audioFile" className="grid grid-cols-10 gap-3 pt-2">
          <div className="col-span-7">
            <Input type={props.type} onChange={handleInput} />
          </div>
          <LaunchButton className="col-span-2" {...props} />
          <OptionsDropDown {...props} />
        </div>
      </div>
      {error && <ErrorAlert msg={error} />}
    </div>
  );
};

export default JobInput;
