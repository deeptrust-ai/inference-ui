import { NextRequest, NextResponse } from "next/server";

import { JobOutput } from "@/types/job";
import apiURLPrefix from "@/utils/url";

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
      gen_percentage: null,
    };
    return NextResponse.json(output);
  }

  const data: JobOutput = await res.json();
  return NextResponse.json(data);
}
