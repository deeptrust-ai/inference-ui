import { NextRequest, NextResponse } from "next/server";

import apiURLPrefix from "@/utils/url";
import axios from "axios";
import FormData from "form-data";

// launch file job
export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;

  const url = apiURLPrefix + "job";

  const reqFormData = new FormData();
  const ab = await file.arrayBuffer();
  const buffer = Buffer.from(ab);
  reqFormData.append("file", buffer, file.name);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: request.headers.get("Authorization"),
    },
  };

  try {
    const response = await axios.post(url, reqFormData, config).then((res) => {
      return {
        jobID: res.data.job_id,
      };
    });
    return NextResponse.json(response);
  } catch (err) {
    console.error("Error while generating embeddings in nextJS backend: ", err);
    return NextResponse.error();
  }
}

// launch URL job
// at the moment, twitter URLs are the only type of URL job
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const audioURL = searchParams.get("url");

  if (audioURL == null) {
    console.error("'url' param was not found");
    return NextResponse.error();
  }

  const url = apiURLPrefix + "twitter/job?url=" + audioURL;
  const response = await fetch(url, { headers: request.headers });
  const data = await response.json();

  return NextResponse.json(data);
}
