import Section from "@/components/Section";

import Tweet from "./tweet";

interface IPageProps {
  params: { id: string };
}

export default async function Page({ params }: IPageProps) {
  const { id } = params;

  return (
    <Section yPadding="py-12">
      <h1 className="text-bold text-2xl text-center mb-12">
        ✨AI Fact Check Results✨
      </h1>
      <Tweet id={id} />
    </Section>
  );
}
