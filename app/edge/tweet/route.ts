import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // Check if we have a session
  const { data: tweets } = await supabase.from("tweets").select().eq("id", id);

  if (!tweets || tweets.length == 0) {
    return NextResponse.json({});
  } else {
    return NextResponse.json(tweets[0]);
  }
}
