"use client";
import { useEffect, useState } from "react";

// shadcn
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FolderUp, TwitterIcon } from "lucide-react";

import FileUpload from "@/components/job/FileUpload";
import Jobs from "@/components/job/Jobs";
import { getJobs } from "@/utils/localStorage";
import { JobInputProps, JobOutputs } from "@/types/job";
import { Label } from "@/components/ui/label";

export default function Input() {
  const [jobs, setJobsState] = useState<JobOutputs>({});
  const [inputType, setInputType] = useState<string>("file");

  useEffect(() => {
    setJobsState(getJobs());
  }, []);

  const props: JobInputProps = {
    jobs,
    setJobsState,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Choose Input Type */}
      <Label htmlFor="tabs">Choose Input Type</Label>
      <Tabs id="tabs" defaultValue={inputType} className="pb-6">
        <TabsList className="mb-12">
          <TabsTrigger value="file" className="flex gap-3">
            File <FolderUp />
          </TabsTrigger>
          <TabsTrigger value="twitter" className="flex gap-3">
            Twitter <TwitterIcon />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="file">
          <FileUpload {...props} /> {/* TODO: Add URL input (file vs URL) */}
        </TabsContent>
        <TabsContent value="twitter">Change your password here.</TabsContent>
      </Tabs>
      {/* List of Jobs */}
      <Jobs {...props} />
    </div>
  );
}
