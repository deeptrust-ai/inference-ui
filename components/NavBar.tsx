"use client";
import * as React from "react";

import Link from "next/link";
import Logo, { DLogo } from "./logo";

// shadcn
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function NavBar() {
  return (
    <div className="p-6">
      <Link href={"/"}>
        <Logo width={100} height={24} />
      </Link>
    </div>
  );
}
