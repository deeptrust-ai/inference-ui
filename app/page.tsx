import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// components
import Section from "@/components/Section";

type ItemType = { title: string; link?: string; desc?: string };

const deepfakeList: ItemType[] = [
  {
    title: "Voice Clone Detection",
    link: "/deepfake/speech",
    desc: "Detect voice clones in .wav files or twitter videos.",
  },
  {
    title: "Deepfake Image Detection",
    desc: "Detect deepfake images.",
  },
  {
    title: "Deepfake Video Detection",
    desc: "Detect deepfake images.",
  },
];

const verityList: ItemType[] = [
  {
    title: "Twitter Content Misinformation",
    link: "/verity/twitter",
    desc: "Transcribe twitter videos and fact check the content.",
  },
  {
    title: "Text Content Misinformation",
    link: "/verity/text",
    desc: "Fact check text-based content (articles, transciptions, etc).",
  },
  {
    title: "Audio Content Misinformation",
    desc: "Transcribe audio and fact check the content.",
  },
];

export default function Page() {
  return (
    <Section>
      <h2 className="">Choose one of the demo options</h2>
      {/* Deepfake Cards */}
      <h3>Deepfake Detection Tools</h3>
      <div className="grid grid-flow-col">
        {deepfakeList.map((item) => (
          <Card key={item.title}>
            <CardTitle>{item.title}</CardTitle>
            <CardContent>
              <p>{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
