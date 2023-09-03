"use client";
import { useEffect, useState } from "react";

// shadcn
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FolderUp, TwitterIcon } from "lucide-react";

// components
import Jobs from "@/components/job/Jobs";
import JobInput from "@/components/job/JobInput";
import { Label } from "@/components/ui/label";

// utils
import { getJobs } from "@/utils/localStorage";

// types
import { JobInputProps, JobOutputs, JobType } from "@/types/job";

export default function Input() {
  const [jobs, setJobsState] = useState<JobOutputs>({});
  const [input, setInput] = useState<JobInputProps["input"]>(null);
  const [type, setType] = useState<JobType>("file");

  useEffect(() => {
    setJobsState(getJobs());
  }, []);

  const props: JobInputProps = {
    type,
    input,
    setInput,
    jobs,
    setJobsState,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Choose Input Type */}
      <Label htmlFor="tabs">Choose Input Type</Label>
      <Tabs
        id="tabs"
        defaultValue={type}
        className="pb-6"
        onValueChange={(val: any) => setType(val)}
      >
        <TabsList className="mb-12">
          <TabsTrigger value="file" className="flex gap-3">
            File <FolderUp />
          </TabsTrigger>
          <TabsTrigger value="tweet" className="flex gap-3">
            Twitter <TwitterIcon />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="file">
          <JobInput {...props} />
        </TabsContent>
        <TabsContent value="tweet">
          <JobInput {...props} />
        </TabsContent>
      </Tabs>
      {/* List of Jobs */}
      <Jobs {...props} />
    </div>
  );
}
