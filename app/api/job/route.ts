import { NextRequest, NextResponse } from "next/server";

import apiURLPrefix from "@/utils/url";
import axios from "axios";
import FormData from "form-data";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;
  const modelType = data.get("modelType");

  if (modelType != "ss" && modelType != "xgb") {
    console.error("ValueError: modelType needs to be set to 'ss' or 'xgb'");
    return NextResponse.error();
  }

  const url = apiURLPrefix + modelType + "/job";

  const reqFormData = new FormData();
  const ab = await file.arrayBuffer();
  const buffer = Buffer.from(ab);
  reqFormData.append("file", buffer, file.name);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios.post(url, reqFormData, config).then((res) => {
      return res.data;
    });
    return NextResponse.json(response);
  } catch (err) {
    console.error("Error while generating embeddings in nextJS backend: ", err);
    return NextResponse.error();
  }
}
