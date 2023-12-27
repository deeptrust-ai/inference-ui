// shadcn
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  TableCaption,
} from "@/components/ui/table";

// types
import { IAudioJob } from "@/types/job";

const RunningJobsTable = ({ runningJobs }: { runningJobs: IAudioJob[] }) => (
  <Table className="border rounded-lg">
    <TableCaption>Running Speech Detection Jobs</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Job ID</TableHead>
        <TableCell>File Name</TableCell>
        <TableCell className="text-right">Date Launched</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {runningJobs.map((job) => (
        <TableRow key={job.id}>
          <TableCell>{job.id}</TableCell>
          <TableCell>{job.fileName}</TableCell>
          <TableCell className="text-right">{job.date}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default RunningJobsTable;
