import apiURLPrefix from "@/utils/url";
import { NextRequest, NextResponse } from "next/server";

type paramsType = { id: string };
export async function GET(
  request: NextRequest,
  { params }: { params: paramsType }
) {
  console.log("here");
  const { id } = params;
  const url = apiURLPrefix + `job/${id}`;

  const res = await fetch(url);
  if (res.status == 202) {
    return NextResponse.json({
      message: "Job not finished.",
      gen_percentage: null,
    });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
