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

  useEffect(() => {
    setJobsState(getJobs());
  }, []);

  const props: JobInputProps = {
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
        defaultValue="tweet"
        className="pb-6"
        onValueChange={() => setInput(null)}
      >
        <TabsList className="mb-12">
          {/* Triggers */}
          <TabsTrigger value="tweet" className="flex gap-3">
            𝕏 / Twitter <TwitterIcon />
          </TabsTrigger>
          <TabsTrigger value="file" className="flex gap-3">
            File <FolderUp />
          </TabsTrigger>
        </TabsList>
        {/* Content */}
        <TabsContent value="tweet">
          <JobInput {...props} type="tweet" />
        </TabsContent>
        <TabsContent value="file">
          <JobInput {...props} type="file" />
        </TabsContent>
      </Tabs>
      {/* List of Jobs */}
      <Jobs {...props} />
    </div>
  );
}
