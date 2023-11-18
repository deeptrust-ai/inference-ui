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

type ItemType = { title: string; link?: string; desc?: string };

const deepfakeList: ItemType[] = [
  {
    title: "Voice Clone Detection",
    link: "/deepfake/speech",
    desc: "Detect voice clones in .wav files or twitter videos.",
  },
  {
    title: "Deepfake Image Detection",
    link: "/deepfake/image",
    desc: "Detect deepfake images.",
  },
  {
    title: "Deepfake Video Detection",
    link: "/deepfake/video",
    desc: "Detect deepfake images.",
  },
];

const disinformationList: ItemType[] = [
  {
    title: "Video Content Misinformation",
    link: "/disinformation/video",
    desc: "Transcribe videos and fact check the content.",
  },
  {
    title: "Audio Content Misinformation",
    link: "/disinformation/audio",
    desc: "Transcribe audio and fact check the content.",
  },
];

const genLink = (title: string, link: string) => (
  <Link href={link} legacyBehavior passHref>
    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
      {title}
    </NavigationMenuLink>
  </Link>
);

export default function NavBar() {
  const genList = (list: ItemType[]) => (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {list.map((item) => (
        <ListItem key={item.title} title={item.title} href={item.link}>
          {item.desc}
        </ListItem>
      ))}
    </ul>
  );

  return (
    <NavigationMenu className="p-6">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href={"/"}>
            <Logo width={100} height={24} />
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-12">
          <NavigationMenuTrigger>Deepfake Detection</NavigationMenuTrigger>
          <NavigationMenuContent>{genList(deepfakeList)}</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Disinformation Detection
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-red">
            {genList(disinformationList)}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
