"use client";
import Link from "next/link";
import { DLogo } from "./logo";

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

// TODO: Add trigger logic for any trigger navbar menu items
const navBarContent: { title: string; link?: string; trigger?: boolean }[] = [
  { title: "Home", link: "/" },
  { title: "Demo", link: "/demo" },
];

const genLink = (title: string, link: string) => (
  <Link href={link} legacyBehavior passHref>
    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
      {title}
    </NavigationMenuLink>
  </Link>
);

export default function NavBar() {
  return (
    <NavigationMenu className="p-6">
      <NavigationMenuList>
        <NavigationMenuItem>
          <DLogo width={100} height={24} />
        </NavigationMenuItem>
        {navBarContent.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.link && genLink(item.title, item.link)}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
