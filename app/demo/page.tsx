"use client";
import { SVGProps, useState } from "react";

const MODEL_TYPES = ["ss", "xgb", "cnn"];

export default function Page() {
  const [modelType, setModelType] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>();
  const [cards, setCards] = useState<Card[]>([]);
  const [loadingMsg, setLoadingMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

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
        const newCard: Card = {
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

  // render
  return (
    <div className="flex flex-col mx-24">
      <h1 className="mb-3 text-2xl font-bold">DeepTrust Demo</h1>

      <p>
        DeepTrust's deep-truth solution will be able to detect deepfake speech
        audio.
      </p>

      <div className="dropdown items-center text-center">
        <label tabIndex={0} className="btn btn-default m-1">
          {modelType ? `deeptruth-${modelType}` : "Choose DeepTruth Model"}{" "}
          <IconArrowDown />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content bg-neutral z-[1] menu p-2 shadow rounded-box w-52"
        >
          {MODEL_TYPES.map((type) => (
            <li
              className={`${type == "cnn" ? "disabled" : ""}`}
              key={type}
              id={type}
              onClick={(e) => {
                const type = e.currentTarget.id;
                if (type == "cnn") return;
                setModelType(type);
              }}
            >
              <a>deeptruth-{type}</a>
            </li>
          ))}
        </ul>
      </div>
      <p>
        <b>Disclaimer: </b>This is an alpha version of the model. Please note,
        for performance keep audio files {"<"} 10 seconds. The longer the clip,
        the longer the processing time.
      </p>

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

function IconArrowDown(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M18.707 12.707l-1.414-1.414L13 15.586V6h-2v9.586l-4.293-4.293-1.414 1.414L12 19.414z" />
    </svg>
  );
}

interface Card {
  fileName: string;
  modelType: string;
  genPercentage: number;
  key?: number;
}

function PredictCards(props: { cards: Card[]; loadingMsg: string | null }) {
  const { cards, loadingMsg } = props;
  return (
    <div>
      {loadingMsg && (
        <div>
          <span className="loading loading-infinity loading-lg text-center"></span>
          <p>{loadingMsg}</p>
        </div>
      )}
      {cards.map((card, index) => (
        <div
          key={`card-${index}`}
          className={`card m-10 w-96 text-primary-content ${
            card.genPercentage > 0.5 ? "bg-warning" : "bg-success"
          }`}
        >
          <div className="card-body space-y-4">
            <h2 className="card-title">
              <div className="badge badge-accent">{card.key}</div>Speech
              Predicted <span className="badge">{card.fileName}</span>
            </h2>

            <p>
              According to deeptruth-{card.modelType}, this audio has a{" "}
              {card.genPercentage * 100}% of being being generated.
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-info hover:badge">
                DeepTruth Alpha
              </div>
              <div className="badge badge-outline hover:badge">
                Model: deeptruth-{card.modelType}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
