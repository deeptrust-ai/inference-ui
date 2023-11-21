import Section from "@/components/Section";
import DisinForm from "@/components/disinformation/form";

export default function Page() {
  return (
    <Section yPadding="py-12">
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="text-xl">DeepTrust Verity Twitter</h1>
          <div className="text-slate-400">
            Add link to twitter video, and generate an AI fact checking of the
            content of the video.
          </div>
        </div>
        <DisinForm transcibeURL="/twitter" />
      </div>
    </Section>
  );
}
