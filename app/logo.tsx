"use client";
import Image, { type ImageLoaderProps } from "next/image";

import { useTheme } from "next-themes";

export default function Logo(props: any) {
  const { theme } = useTheme();
  const src = theme == "light" ? "/full-light.png" : "/full-dark.png";
  return <Image {...props} src={src} alt="DeepTruth Logo" />;
}

function DLogo(props: any) {
  const { theme } = useTheme();
  const src = theme == "light" ? "/d-light" : "/d-dark.png";
  return <Image {...props} src={src} alt="DeepTruth Logo" />;
}

export { DLogo };
