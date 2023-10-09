import { JobOutput } from "@/types/job";

const parseData = (data: any): JobOutput => {
  if (data.score) {
    return {
      message: data.message,
      segmented: data.segmented_prediction,
      scores: [data.score],
    };
  }
  const output: JobOutput = {
    message: data.message,
    segmented: data.segmented_predictions,
    scores: data.scores,
  };
  return output;
};

export { parseData };
