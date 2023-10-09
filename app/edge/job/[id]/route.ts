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
  const url = apiURLPrefix + `job/${id}`;

  const res = await fetch(url);
  if (res.status == 202) {
    const output: JobOutput = {
      message: "Job not finished.",
    };
    return NextResponse.json(output);
  }

  const data = await res.json();
  return NextResponse.json(parseData(data));
}
