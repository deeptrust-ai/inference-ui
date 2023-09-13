import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type HowToContent = {
  title: string;
  content: any;
};

interface HowToContents {
  [key: string]: HowToContent;
}

const CONTENTS: HowToContents = {
  tweet: {
    title: "How To: Submit 𝕏 Video for Speech Analysis",
    content: (
      <div className="grid grid-flow-row gap-2 lg:grid-flow-col lg:grid-cols-3 justify-between text-center">
        <div>
          <p>
            <b>Step 1.</b>
          </p>
          <p>Find a tweet with video with speech you want to analyze.</p>
        </div>
        <div>
          <p>
            <b>Step 2.</b>
          </p>
          <p>Copy URL to the tweet.</p>
        </div>
        <div>
          <p>
            <b>Step 3.</b>
            <p>Submit URL to DeepTrust to launch analysis jobs. ⚡️</p>
          </p>
        </div>
      </div>
    ),
  },
};

const HowTo = ({ type }: { type: string }) => {
  const { title, content } = CONTENTS[type];

  return (
    <Accordion className="mb-12" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HowTo;
