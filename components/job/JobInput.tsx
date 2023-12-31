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
import { JobProps } from "@/types/job";

const JobInput = (props: JobProps) => {
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
      } else if (file.type == "audio/mpeg") {
        // TODO: Set up mp3 support
        // setError(
        //   "Caution: You uploaded an mp3. DeepTrust Speech was trained on wavfiles."
        // );
        setInput(file);
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
    <div className="flex flex-row lg:flex-col gap-6">
      <div className="flex-grow">
        <Label htmlFor="audioFile">{label}</Label>
        <div
          id="audioFile"
          className="grid grid-flow-row auto-rows-auto  lg:grid-cols-10 gap-3 pt-2"
        >
          <div className="lg:col-span-7">
            <Input
              type={props.type}
              onChange={handleInput}
              placeholder={type == "file" ? undefined : "Submit URL here"}
            />
          </div>
          <LaunchButton className="lg:col-span-2" {...props} />
          <OptionsDropDown {...props} />
        </div>
      </div>
      {error && <ErrorAlert msg={error} />}
    </div>
  );
};

export default JobInput;
