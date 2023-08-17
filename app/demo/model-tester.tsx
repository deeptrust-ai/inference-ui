"use client";
import { SVGProps, useState } from "react";

// shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// icons
import { ChevronDown } from "lucide-react";

import IconArrowDown from "@/components/icons/icon-arrow-down";
import PredictCards, { type PredictCard } from "./predict-cards";

const MODEL_TYPES = ["ss", "xgb", "cnn"];

export default function ModelTester() {
  const [modelType, setModelType] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>();
  const [cards, setCards] = useState<PredictCard[]>([]);
  const [loadingMsg, setLoadingMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const onPredict = async () => {
    if (!modelType || !file) return;
    if (modelType == "cnn") {
      alert(
        "DeepTruth's Convulution Nueral Network inference is WIP. Will be shipped soon!"
      );
      return;
    }
    setLoadingMsg(
      "Generating Speech Embeddings (can take up to 1 or 2 minutes)..."
    );
    setErrMsg(null);
    const getEmbRes = await getEmbeddings();
    const embeddings = getEmbRes.embeddings;
    const url = `/api/${modelType}/predict`;
    const predictReqData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeddings }),
    };
    setLoadingMsg("Predicting...");
    fetch(url, predictReqData)
      .then((response) => {
        setErrMsg(null);
        return response.json();
      })
      .then((json) => {
        const newCard: PredictCard = {
          fileName: file.name,
          key: cards.length + 1,
          genPercentage: json.gen_percentage,
          modelType,
        };
        setCards([newCard, ...cards]);
        setLoadingMsg(null);
      })
      .catch((error) => {
        console.error(error);
        setLoadingMsg(null);
        setErrMsg("Predict failed.");
      });
  };

  // logic
  const getEmbeddings = async () => {
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("fileName", file.name);

    return await fetch("/api/embeddings", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        setErrMsg(null);
        return res.json();
      })
      .catch((error) => {
        console.error(error);
        setLoadingMsg(null);
        setErrMsg(
          "Embeddings generation failed, likely timeout between client and server."
        );
      });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            {modelType ? `deeptruth-${modelType}` : "Choose DeepTruth Model"}{" "}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>DeepTruth Models</DropdownMenuLabel>

          <DropdownMenuSeparator />
          {MODEL_TYPES.map((type) => (
            <DropdownMenuItem
              disabled={type == "cnn"}
              key={type}
              id={type}
              onClick={(e) => {
                const type = e.currentTarget.id;
                if (type == "cnn") return;
                setModelType(type);
              }}
            >
              deeptruth-{type}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex space-x-3 p-100">
        <input
          type="file"
          placeholder="Upload .wav audio"
          className="file-input	file-input-bordered file-input-md w-full max-w-xs"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
        />
        <button className="btn btn-primary" onClick={onPredict}>
          {" "}
          Predict{" "}
        </button>
      </div>
      {errMsg && (
        <p className="alert alert-error">
          <b>Error: </b>
          {errMsg}
        </p>
      )}

      <PredictCards cards={cards} loadingMsg={loadingMsg} />
    </div>
  );
}
