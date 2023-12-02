"use client";
import { useEffect, useState } from "react";

// ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";

// TODO: Add get getInitialProps or getServerSideProps
const Tweet = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [transcription, setTranscription] = useState("");
  const [factCheck, setFactCheck] = useState("");

  const getTweet = async (id: string) => {
    setLoading(true);
    const res = await fetch(`/edge/tweet?id=${id}`);

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    const tweetData = await res.json();
    console.log(tweetData);

    setTranscription(tweetData.transcription);
    setFactCheck(tweetData.fact_check);
    setLoading(false);
  };

  useEffect(() => {
    getTweet(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto whitespace-pre-line space-y-8">
      {loading && <Loader2 className="animate-spin" />}
      {transcription && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Content Transcript</AccordionTrigger>
            <AccordionContent>{transcription}</AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      {factCheck && (
        <span className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border text-black">
          {factCheck}
        </span>
      )}
    </div>
  );
};

export default Tweet;
