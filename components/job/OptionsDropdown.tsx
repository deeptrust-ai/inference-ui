"use client";
import { JobProps } from "@/types/job";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { clearJobs } from "@/utils/localStorage";
import { useToast } from "../ui/use-toast";

const OptionsDropDown = (props: JobProps) => {
  const { setJobsState } = props;
  const { toast } = useToast();

  const handleClearJobs = () => {
    clearJobs();
    setJobsState({});

    toast({
      title: "All Jobs Cleared!",
      description:
        "Upload another audio file to commence more speech analysis.",
    });
  };

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      {/* Content */}
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleClearJobs}>
          Clear All Jobs
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsDropDown;
