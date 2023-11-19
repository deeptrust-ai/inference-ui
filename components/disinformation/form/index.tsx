"use client";
import React from "react";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";

// ui
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// data
import defaultPrompt from "./default-prompt";
import { Textarea } from "@/components/ui/textarea";

interface IForm {
  preProcess?: (x: string) => string;
}

const genPrompt = (text: string) => `
${defaultPrompt}

${text}
`;

const DisinForm = ({ preProcess }: IForm) => {
  const [textInputValue, setTextInputValue] = useState<string>("");
  const [isPreProcessing, setIsPreProcess] = useState<boolean>(false);

  let type = "transcription";
  if (preProcess) {
    type = "url";
  }

  const { input, setInput, handleSubmit, isLoading, messages } = useChat({
    api: "/edge/chat",
  });

  // update chat input on value changes
  useEffect(() => setInput(genPrompt(textInputValue)), [textInputValue]);

  const onSubmit = (e: any) => {
    if (preProcess) {
      setIsPreProcess(true);
      setTextInputValue(preProcess(textInputValue));
      setIsPreProcess(false);
    }

    handleSubmit(e);
  };

  // process chatGPT response
  const lastMessage = messages[messages.length - 1];
  const generatedMessage =
    lastMessage?.role === "assistant" ? lastMessage.content : null;

  return (
    <div>
      <form className="" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <Label htmlFor="name" className="font-bold  mb-3">
            {type == "url" ? "URL" : "Text"}
          </Label>
          <Textarea
            id="text"
            className="bg-white text-black"
            placeholder={
              type == "URL" ? "Add URL..." : "Add text to factcheck..."
            }
            value={textInputValue}
            onChange={(e) => setTextInputValue(e.target.value)}
          />
        </div>
        <div className="mt-5 flex justify-center md:justify-start">
          <Button disabled={isLoading} type="submit">
            {isLoading ? "Generating..." : "✨ Generate AI Factcheck ✨"}
          </Button>
        </div>
      </form>

      <output className="space-y-10 m-24">
        {generatedMessage && (
          <div className="flex flex-col items-center">
            <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto whitespace-pre-line">
              <span className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border text-black">
                {generatedMessage}
              </span>
            </div>
          </div>
        )}
      </output>

      {/* <div className="pt-12" ref={templateRef}></div> */}
    </div>
  );
};

export default DisinForm;
