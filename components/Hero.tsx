import Section from "@/components/Section";
import SquigglyLines from "./SquigglyLines";
import Logo from "./logo";
import WaitList from "./waitlist";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="text-slate-500 antialiased flex flex-col items-center justify-center text-center">
      <Logo className="pt-12" width={456} height={200} />
      <Section yPadding="py-12">
        <header className="text-center">
          <h1 className="whitespace-pre-line text-5xl font-bold leading-hero text-white">
            {"Silencing Deception,\n Protecting Human "}
            <span className="relative whitespace-nowrap text-blue-600">
              <SquigglyLines />
              <span className="relative">Authenticity</span>
            </span>{" "}
          </h1>
          <div className="mb-16 mt-4 text-2xl">
            {"Safeguard your content's integrity with deepfake detection."}
          </div>
        </header>
        <WaitList />
        <TryItOut />
      </Section>
    </div>
  );
}

const TryItOut = () => (
  <Link href="/app" className="p-12">
    <Button className="bg-blue-500 text-lg text-bold text-white p-6 mt-12 hover:text-black">
      Try It Out!
    </Button>
  </Link>
);
