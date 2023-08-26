"use client";

import FileUpload from "@/components/job/FileUpload";
import Jobs from "@/components/job/Jobs";

export default function Input() {
  return (
    <div className="flex flex-col gap-4">
      <FileUpload />
      <Jobs />
    </div>
  );
}
