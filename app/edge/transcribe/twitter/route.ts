import apiURLPrefix from "@/utils/url";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30; // maxDuration increased from 10s -> 30s

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const reqURL = new URL(apiURLPrefix + "transcribe/twitter");

  const tweetURL = searchParams.get("url");
  const tweetID = searchParams.get("tweetID");

  const auth = request.headers.get("Authorization");
  if (!auth) return; // for ts rules

  if (tweetURL) {
    console.log(`Transcribing (${tweetURL})...`);
    reqURL.searchParams.append("url", tweetURL);
  } else if (tweetID) {
    console.log(`Transcribing (${tweetID})...`);
    reqURL.searchParams.append("tweet_ID", tweetID);
  } else {
    console.error("'url' param was not found");
    return NextResponse.error();
  }

  try {
    const response = await fetch(reqURL, { headers: { Authorization: auth } });
    const data = await response.json();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error(`Transcription Failed: ${err.message}`);
    return NextResponse.error();
  }
}
