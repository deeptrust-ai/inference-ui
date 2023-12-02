"use client";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

interface IPageProps {
  params: { id: string };
}

const Tweets = ({ id }: { id: string }) => {
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
    <div>
      <p>Verity page {id}</p>

      {loading && <Loader2 className="animate-spin" />}
      <p>{transcription}</p>
      <p>{factCheck}</p>
    </div>
  );
};

export default async function Page({ params }: IPageProps) {
  const { id } = params;

  return <Tweets id={id} />;
}
