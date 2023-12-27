import AudioInput from "./audio-input";
import AudioJobTables from "./audio-job-tables";

import { IAudioJob } from "@/types/job";

export function AudioDashboard({ jobs }: { jobs: IAudioJob[] }) {
  return (
    <div className="grid w-full lg:min-h-[calc(100vh-70px)] lg:grid-cols-[300px,1fr] gap-4 p-6">
      <AudioInput />
      <AudioJobTables jobs={jobs} />
    </div>
  );
}
