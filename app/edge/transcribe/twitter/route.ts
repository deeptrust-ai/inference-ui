import apiURLPrefix from "@/utils/url";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30; // maxDuration increased from 10s -> 30s

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const tweetURL = searchParams.get("url");
  console.log(`Transcribing (${tweetURL})...`);

  if (tweetURL == null) {
    console.error("'url' param was not found");
    return NextResponse.error();
  }

  try {
    const reqURL = new URL(apiURLPrefix + "transcribe/twitter");
    reqURL.searchParams.append("url", tweetURL);
    const response = await fetch(reqURL);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error(`Transcription Failed: ${err.message}`);
    return NextResponse.error();
  }
}
