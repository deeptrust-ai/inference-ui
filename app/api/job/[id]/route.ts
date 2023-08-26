import apiURLPrefix from "@/utils/url";
import { NextRequest, NextResponse } from "next/server";

type paramsType = { id: string };
export default async function GET(
  request: NextRequest,
  { params }: { params: paramsType }
) {
  const { id } = params;
  const url = apiURLPrefix + `job/${id}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
