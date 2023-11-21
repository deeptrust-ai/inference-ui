import Section from "@/components/Section";
import DisinForm from "@/components/disinformation/form";

export default function Page() {
  return (
    <Section yPadding="py-12">
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="text-xl">DeepTrust Text Misinfomation Detection</h1>
          <div className="text-slate-400">
            Fact chect articles, transcripts, or any text body for any general
            of pieces of misinformation.
          </div>
        </div>
        <DisinForm />
      </div>
    </Section>
  );
}
