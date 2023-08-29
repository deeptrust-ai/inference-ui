"use client";
// react
import { Dispatch, SetStateAction, useState } from "react";

// shadcn
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AlertCircle } from "lucide-react";

import LaunchButton from "./LaunchButton";
import OptionsDropDown from "./OptionsDropdown";

import { JobInputProps } from "@/types/job";

const FileUpload = (props: JobInputProps) => {
  //   const [modelType, setModelType] = useState<string>("ss");
  const [file, setFile] = useState<File | null>();
  const [error, setError] = useState<string | null>(null);

  const handleInput = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type == "audio/wav") {
        setFile(file);
        setError(null);
      } else {
        setError("DeepTrust only supports wavfiles at the moment.");
        setFile(null);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Label htmlFor="audioFile">Upload .wav audio file</Label>
        <div id="audioFile" className="grid grid-cols-10 gap-3 pt-2">
          <div className="col-span-7">
            <Input type="file" onChange={handleInput} />
          </div>
          <LaunchButton className="col-span-2" file={file} {...props} />
          <OptionsDropDown {...props} />
        </div>
      </div>
      {error && <ErrorAlert msg={error} />}
    </div>
  );
};

const ErrorAlert = ({ msg }: { msg: string }) => {
  console.log("here");
  return (
    <div>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{msg}</AlertDescription>
      </Alert>
    </div>
  );
};

export default FileUpload;
