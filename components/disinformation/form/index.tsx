"use client";
import React from "react";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";

// ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IForm {
  preProcess?: () => void;
}

const DisinForm = ({ preProcess }: IForm) => {
  const [textInputValue, setTextInputValue] = useState<string>("");

  let type = "transcription";
  if (preProcess) {
    type = "url";
  }

  const { input, setInput, handleSubmit, isLoading, messages } = useChat();

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Label htmlFor="name" className="font-bold  mb-3">
            {type == "url" ? "URL" : "Text"}
          </Label>
          <Input
            id="text"
            placeholder={
              type == "URL" ? "Add URL..." : "Add text to factcheck..."
            }
            value={textInputValue}
            onChange={(e) => setTextInputValue(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div>
            <Button disabled>Generating...</Button>
          </div>
        ) : (
          <div className="mt-5 flex justify-center md:justify-start">
            <Button type="submit">✨ Generate AI Factcheck ✨</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DisinForm;
