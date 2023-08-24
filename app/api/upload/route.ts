import { NextRequest, NextResponse } from "next/server";

import apiURLPrefix from "@/utils/url";
import axios from "axios";
import FormData from "form-data";

export async function POST(request: NextRequest) {
  const url = apiURLPrefix + "embeddings";

  // convert MDN formData --> form-data
  // 1. get old formData
  const data = await request.formData();
  const file = data.get("file") as File;

  // init new FormData with form-data, append file values
  const reqFormData = new FormData();
  const ab = await file.arrayBuffer();
  const buffer = Buffer.from(ab);
  reqFormData.append("file", buffer, file.name);

  try {
    const embeddings = await axios.post(url, reqFormData).then((res) => {
      return res.data.embeddings;
    });
    return NextResponse.json(embeddings);
  } catch (err) {
    console.log("Error while generating embeddings in nextJS backend: ", err);
    return NextResponse.json({ error: true });
  }
}
