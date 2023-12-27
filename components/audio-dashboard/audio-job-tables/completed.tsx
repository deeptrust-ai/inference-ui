// shadcn
import { Badge } from "@/components/ui/badge";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  TableCaption,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// components
import Heatmap from "@/components/job/Heatmap";

// types
import { IAudioJob } from "@/types/job";

const CompletedJobsTable = ({
  completedJobs,
}: {
  completedJobs: IAudioJob[];
}) => (
  <Table className="border rounded-lg">
    <TableCaption>Completed Speech Detection Jobs</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Job ID</TableHead>
        <TableCell>File Name</TableCell>
        <TableCell>Score</TableCell>
        <TableCell>Status</TableCell>
        <TableCell className="text-right">Date Launched</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {completedJobs.map((job) => (
        <CompletedJobRow key={job.id} {...job} />
      ))}
    </TableBody>
  </Table>
);

const CompletedJobRow = ({
  id,
  fileName,
  date,
  score,
  heatmapData,
}: IAudioJob) => {
  if (!score || !heatmapData) return;

  return (
    <>
      <TableRow key={id}>
        <TableCell className="font-medium">{id}</TableCell>
        <TableCell className="text-xs">{fileName}</TableCell>
        <TableCell>{score}%</TableCell>
        <TableCell>
          <HoverBadge score={score} />
        </TableCell>
        <TableCell className="text-right">{date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} className="bg-slate-700">
          <Heatmap data={heatmapData} />
        </TableCell>
      </TableRow>
    </>
  );
};

const HoverBadge = ({ score }: { score: number }) => {
  const [color, message, scoreType] = scoreToMeta(score);

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Badge className={`${color}`} variant="secondary">
          {scoreType}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent>{message}</HoverCardContent>
    </HoverCard>
  );
};

const scoreToMeta = (score: number) => {
  if (score < 50) {
    return ["bg-green-600", "No generated speech detected!", "Real"];
  } else if (score > 80) {
    return ["bg-red-600", "Generated speech detected!", "Fake"];
  } else {
    return [
      "bg-orange-600",
      "Catching patterns of generated speech.",
      "Caution",
    ];
  }
};

export default CompletedJobsTable;
