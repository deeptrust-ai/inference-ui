"use client";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import Tweet from "./tweet";

interface IPageProps {
  params: { id: string };
}

export default async function Page({ params }: IPageProps) {
  const { id } = params;

  return <Tweet id={id} />;
}
