"use client";
import * as React from "react";

import Link from "next/link";
import Logo, { DLogo } from "./logo";

export default function NavBar() {
  return (
    <div className="p-6">
      <Link href={"/"}>
        <Logo width={100} height={24} />
      </Link>
    </div>
  );
}
