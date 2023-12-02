"use client";

import { useEffect, useState } from "react";

interface IPageProps {
  params: { id: string };
}

const Tweets = ({ id }: { id: string }) => {
  const [transcription, setTranscription] = useState("");
  const [factCheck, setFactCheck] = useState("");

  const getTweet = async (id: string) => {
    const res = await fetch(`/edge/tweet?id=${id}`);

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    const tweetData = await res.json();
    console.log(tweetData);

    setTranscription(tweetData.transcription);
    setFactCheck(tweetData.fact_check);
  };

  useEffect(() => {
    getTweet(id);
  }, []);

  return (
    <div>
      <p>Verity page {id}</p>
      <p>{transcription}</p>
      <p>{factCheck}</p>
    </div>
  );
};

export default async function Page({ params }: IPageProps) {
  const { id } = params;

  return <Tweets id={id} />;
}
