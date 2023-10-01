import apiURLPrefix from "@/utils/url";
import { NextResponse } from "next/server";
export async function GET() {
  const res = await fetch(apiURLPrefix);
  const data = await res.json();
  return NextResponse.json(data);
}
