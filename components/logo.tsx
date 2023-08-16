"use client";
import Image, { type ImageLoaderProps } from "next/image";

import { useTheme } from "next-themes";

export default function Logo(props: any) {
  // const { resolvedTheme } = useTheme();
  const src = "/full-dark.png";
  // const src = resolvedTheme == "light" ? "/full-light.png" : "/full-dark.png";
  return <Image {...props} src={src} alt="DeepTruth Logo" />;
}

function DLogo(props: any) {
  // const { resolvedTheme } = useTheme();
  const src = "/d-dark.png";
  // const src = resolvedTheme == "light" ? "/d-light" : "/d-dark.png";
  return <Image {...props} src={src} alt="DeepTruth Logo" />;
}

export { DLogo };
