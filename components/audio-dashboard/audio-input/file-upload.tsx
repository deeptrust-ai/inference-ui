"use client";
import { useState } from "react";

// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorAlert from "@/components/ErrorAlert";

const FileUploadInput = () => {
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
        setError("DeepTrust only supports wavfiles at the moment.");
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
      <Button className="w-full">Detect</Button>
    </div>
  );
};

export default FileUploadInput;
