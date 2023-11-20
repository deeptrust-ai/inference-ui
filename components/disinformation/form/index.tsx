"use client";
import React from "react";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";

// ui
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// data
import defaultPrompt from "./default-prompt";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// utils
import transcribe from "./transcribe";

interface IForm {
  transcibeURL?: string;
}

const genPrompt = (text: string) => `
${defaultPrompt}

${text}
`;

const DisinForm = ({ transcibeURL }: IForm) => {
  const [textInputValue, setTextInputValue] = useState<string>("");
  const [transcription, setTranscription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);

  let type = "transcription";
  if (transcibeURL) {
    type = "url";
  }

  const { input, setInput, handleSubmit, isLoading, messages } = useChat({
    api: "/edge/chat",
  });

  // update chat input on value changes
  useEffect(() => setInput(genPrompt(textInputValue)), [textInputValue]);
  useEffect(() => setInput(genPrompt(transcription)), [transcription]);

  const onInputChange = async (e: any) => {
    e.preventDefault();
    const newValue = e.target.value;
    if (newValue == "") return;
    setTextInputValue(newValue);
    if (transcibeURL) {
      setIsTranscribing(true);
      const [output, err] = await transcribe(transcibeURL + `?url=${newValue}`);
      setIsTranscribing(false);

      if (!output) {
        console.error(err);
        setErrorMessage(err);
        return;
      } else {
        setTranscription(output);
      }
    }
  };

  // process chatGPT response
  const lastMessage = messages[messages.length - 1];
  const generatedMessage =
    lastMessage?.role === "assistant" ? lastMessage.content : null;

  // function to handle input component type
  const genInput = () =>
    type != "url" ? (
      <Textarea
        id="text"
        className="bg-white text-black"
        placeholder="Add text to factcheck..."
        value={textInputValue}
        onChange={(e) => setTextInputValue(e.target.value)}
      />
    ) : (
      <Input
        id="text"
        disabled={isTranscribing}
        className="bg-white text-black"
        placeholder="Add URL..."
        value={textInputValue}
        onChange={onInputChange}
      />
    );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Label htmlFor="name" className="font-bold  mb-3">
            {type == "url" ? "URL" : "Text"}
          </Label>
          {genInput()}
        </div>
        <div className="mt-5 flex justify-center md:justify-start">
          <Button disabled={isTranscribing || isLoading} type="submit">
            {isTranscribing
              ? "Transcribing..."
              : isLoading
              ? "Generating..."
              : "✨ Generate AI Factcheck ✨"}
          </Button>
        </div>
      </form>

      {!errorMessage && (
        <Alert className="m-6" variant={"destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

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
