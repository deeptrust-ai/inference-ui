"use client";
// react
import { Dispatch, SetStateAction, useState } from "react";

// shadcn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LaunchButton from "./LaunchButton";

const FileUpload = () => {
  //   const [modelType, setModelType] = useState<string>("ss");
  const [file, setFile] = useState<File | null>();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Label htmlFor="audioFile">Upload .wav audio file</Label>
        <div id="audioFile" className="grid grid-cols-10 gap-3 pt-2">
          <div className="col-span-6">
            <Input
              type="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </div>
          <LaunchButton file={file} />
          {/* <ModelDropdown modelType={modelType} setModelType={setModelType} /> */}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
