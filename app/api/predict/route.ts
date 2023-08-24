import apiURLPrefix from "@/utils/url";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { modelType, embeddings } = data;

  const url = apiURLPrefix + modelType + "/predict";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ embeddings }),
  };

  const res = await fetch(url, options);
  const resData = await res.json();

  return NextResponse.json(resData);
}
