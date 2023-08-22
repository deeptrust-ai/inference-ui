import Section from "@/components/Section";
import SquigglyLines from "./SquigglyLines";
import Logo from "./logo";
import WaitList from "./waitlist";

export default function Hero() {
  return (
    <div className="text-slate-500 antialiased flex flex-col items-center justify-center">
      <Logo className="pt-12" width={456} height={200} />
      <Section yPadding="pt-8 pb-32">
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

          <WaitList />
        </header>
      </Section>
    </div>
  );
}
