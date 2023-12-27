import { AudioDashboard } from "@/components/audio-dashboard";

import { IAudioJob } from "@/types/job";

const EXAMPLE_DATA = [1, 1, 0.1, 0.2, 0.5, 0.6, 1, 1, 1, 0.8];

const EXAMPLES: IAudioJob[] = [
  {
    id: "job-0",
    fileName: "call-log-4e6c4a59-393a-435e-bc00-8bdc95d48dec.wav",
    date: "December 04, 2023 11:12 PM",
    score: 82,
    heatmapData: EXAMPLE_DATA,
  },
  {
    id: "job-1",
    fileName: "call-log-4e6c4a59-393a-435e-bc00-8bdc95d48dec.wav",
    date: "December 04, 2023 11:12 PM",
    score: 55,
    heatmapData: EXAMPLE_DATA,
  },
  {
    id: "job-3",
    fileName: "call-log-4e6c4a59-393a-435e-bc00-8bdc95d48dec.wav",
    date: "December 04, 2023 11:12 PM",
    score: 11,
    heatmapData: EXAMPLE_DATA,
  },
  {
    id: "job-4",
    fileName: "call-log-4e6c4a59-393a-435e-bc00-8bdc95d48dec.wav",
    date: "December 04, 2023 11:12 PM",
    // score: 11,
    // heatmapData: EXAMPLE_DATA,
  },
  {
    id: "job-5",
    fileName: "call-log-4e6c4a59-393a-435e-bc00-8bdc95d48dec.wav",
    date: "December 04, 2023 11:12 PM",
    // score: 11,
    // heatmapData: EXAMPLE_DATA,
  },
];

export default function Page() {
  return <AudioDashboard jobs={EXAMPLES} />;
}
