import Section from "@/components/Section";
import SquigglyLines from "./SquigglyLines";
import Logo from "./logo";
import WaitList from "./waitlist";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="text-slate-500 antialiased flex flex-col items-center justify-center text-center">
      <Section yPadding="py-12 lg:px-48">
        <header className="text-center">
          <h1 className="whitespace-pre-line text-4xl font-bold leading-hero text-white">
            {"Protect Human "}
            <span className="relative whitespace-nowrap text-blue-600">
              <SquigglyLines />
              <span className="relative">Authenticity.</span>
            </span>
            {"\n Safeguard your content with deepfake detection."}
          </h1>
          <div className="mb-16 mt-4 text-2xl">
            {
              "DeepTrust is building a suite of AI-powered tools to detect deepfake content in your audio, images, and text."
            }
          </div>
        </header>
        <WaitList />
      </Section>
    </div>
  );
}
