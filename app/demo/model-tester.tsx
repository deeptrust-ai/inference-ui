"use client";
import { Dispatch, SetStateAction, useState } from "react";

// shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// icons
import { ChevronDown, Dot, MoreHorizontal } from "lucide-react";

import PredictCards, { type PredictCard } from "./predict-cards";

const MODEL_TYPES = ["ss", "xgb", "cnn"];

export default function ModelTester() {
  const [modelType, setModelType] = useState<string>("ss");
  const [file, setFile] = useState<File | null>();
  const [cards, setCards] = useState<PredictCard[]>([]);
  const [loadingMsg, setLoadingMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const getEmbeddings = async () => {
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("fileName", file.name);

    // fetch embeddings
    const url = "/api/embeddings";
    const options = {
      method: "POST",
      body: data,
    };

    try {
      const embeddings = await fetch(url, options);
      return await embeddings.json();
    } catch (err) {
      const errMessage = "Client error during getEmbeddings";
      console.log(errMessage, err);
      setErrMsg(errMessage);
      setLoadingMsg(null);
    }
  };

  const getPredict = async (embeddings: number[][]) => {
    const url = "/api/predict";
    const predictReqData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeddings, modelType }),
    };

    try {
      const prediction = await fetch(url, predictReqData).then((response) => {
        setErrMsg(null);
        return response.json();
      });
      return prediction;
    } catch (err) {
      const errMessage = "Client error during getPredict";
      console.log(errMessage, err);
      setErrMsg(errMessage);
      setLoadingMsg(null);
    }
  };

  const handlePredictButton = async () => {
    // no file, no cnn
    if (!modelType || !file) return;
    if (modelType == "cnn") {
      alert(
        "DeepTruth's Convulution Nueral Network inference is WIP. Will be shipped soon!"
      );
      return;
    }

    // get embeddings
    setErrMsg(null);
    setLoadingMsg(
      "Generating Speech Embeddings (can take up to 1 or 2 minutes)..."
    );
    const embeddings = await getEmbeddings();

    // get predictions
    setLoadingMsg("Predicting...");
    const prediction = await getPredict(embeddings);
    const key = cards.length ? cards[0].key + 1 : 0;
    const newCard: PredictCard = {
      fileName: file.name,
      key,
      genPercentage: prediction.gen_percentage,
      modelType,
    };
    setCards([newCard, ...cards].splice(0, 5));
    setLoadingMsg(null);
  };

  return (
    <div className="flex flex-col gap-6 mt-12">
      <div>
        <Label htmlFor="audioFile">Upload .wav audio file</Label>
        <div id="audioFile" className="grid grid-cols-10 gap-3 pt-2">
          <div className="col-span-6">
            <Input
              type="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </div>
          <Button
            className="btn btn-primary col-span-3"
            onClick={handlePredictButton}
          >
            {" "}
            Predict{" "}
          </Button>
          <ModelDropdown modelType={modelType} setModelType={setModelType} />
        </div>
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

function ModelDropdown({
  modelType,
  setModelType,
  dropdown,
}: {
  modelType: string;
  setModelType: Dispatch<SetStateAction<string>>;
  dropdown?: boolean;
}) {
  return (
    <DropdownMenu>
      {dropdown && <Label htmlFor="dropdown">Choose DeepTruth Model</Label>}
      <DropdownMenuTrigger asChild>
        {dropdown ? (
          <Button id="dropdown">
            {modelType ? `deeptruth-${modelType}` : "Choose DeepTruth Model"}{" "}
            <ChevronDown />
          </Button>
        ) : (
          <Button variant={"outline"}>
            <MoreHorizontal />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>DeepTruth Models</DropdownMenuLabel>

        <DropdownMenuSeparator />
        {MODEL_TYPES.map((type) => (
          <DropdownMenuCheckboxItem
            disabled={type == "cnn"}
            checked={modelType == type}
            key={type}
            id={type}
            onClick={(e) => {
              const type = e.currentTarget.id;
              if (type == "cnn") return;
              setModelType(type);
            }}
          >
            deeptruth-{type}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
