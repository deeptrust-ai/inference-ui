"use client";
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
import Link from "next/link";
import { Label } from "@radix-ui/react-label";

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

const ConditionalWrapper = ({ condition, wrapper, children }: any) =>
  condition ? wrapper(children) : children;

const CardList = ({ id, label, items }: any) => {
  return (
    <div className="pt-12">
      <Label htmlFor={id}>{label}</Label>
      <div id={id} className="grid grid-flow-col grid-cols-3 mt-auto">
        {items.map((item: any) => {
          let className = "m-6 text-black py-3 px-2 h-full";

          if (item.link) {
            className += " bg-slate-200 hover:bg-slate-500 hover:text-white";
          } else {
            className += " bg-slate-700";
          }

          return (
            <ConditionalWrapper
              condition={item.link}
              wrapper={(children: any) => (
                <Link href={item.link || ""}>{children}</Link>
              )}
            >
              <Card className={className} key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  {!item.link && (
                    <CardDescription className="text-black">
                      Coming Soon
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p>{item.desc}</p>
                </CardContent>
              </Card>
            </ConditionalWrapper>
          );
        })}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div className="flex m-12 flex-col gap-2">
      <h2 className="text-xl text-bold">Choose Option Below</h2>
      {/* Deepfake Cards */}
      <CardList
        id="deepfake"
        label="Deepfake Detection Tools"
        items={deepfakeList}
      />
      {/* Misinformation Cards */}
      <CardList
        id="misinfo"
        label="Verity - Disinformation Detection Tools"
        items={verityList}
      />
    </div>
  );
}
