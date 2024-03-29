import { NextRequest, NextResponse } from "next/server";

import { JobOutput } from "@/types/job";
import apiURLPrefix from "@/utils/url";
import { parseData } from "@/utils/edgeFunctions";

type paramsType = { id: string };

export async function GET(
  request: NextRequest,
  { params }: { params: paramsType }
) {
  const { id } = params;
  const url = apiURLPrefix + `job/poll/${id}`;
  const auth = request.headers.get("Authorization");
  if (!auth) return; // for ts rules

  const res = await fetch(url, {
    headers: { Authorization: auth },
  });
  if (res.status == 202) {
    const output: JobOutput = {
      message: "Job not finished.",
    };
    return NextResponse.json(output);
  }

  const data = await res.json();
  return NextResponse.json(parseData(data));
}
