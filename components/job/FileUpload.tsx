"use client";
// react
import { Dispatch, SetStateAction, useState } from "react";

// shadcn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LaunchButton from "./LaunchButton";
import { JobInputProps } from "@/types/job";

const FileUpload = (props: JobInputProps) => {
  //   const [modelType, setModelType] = useState<string>("ss");
  const [file, setFile] = useState<File | null>();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Label htmlFor="audioFile">Upload .wav audio file</Label>
        <div id="audioFile" className="grid grid-cols-4 gap-3 pt-2">
          <div className="col-span-3">
            <Input
              type="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </div>
          <LaunchButton file={file} {...props} />
          {/* <ModelDropdown modelType={modelType} setModelType={setModelType} /> */}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
