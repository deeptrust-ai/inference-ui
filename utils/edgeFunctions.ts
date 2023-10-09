import { Job, JobOutput } from "@/types/job";

const parseData = (data: any): JobOutput => {
  if (data.score) {
    return {
      ...data,
      scores: [data.score],
    };
  }
  return {
    ...data,
    segmented: data.segmented_predictions,
  };
};

export { parseData };
