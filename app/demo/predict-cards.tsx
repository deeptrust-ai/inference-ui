import { Loader2 } from "lucide-react";

export interface PredictCard {
  fileName: string;
  modelType: string;
  genPercentage: number;
  key?: number;
}

export default function PredictCards(props: {
  cards: PredictCard[];
  loadingMsg: string | null;
}) {
  const { cards, loadingMsg } = props;
  return (
    <div>
      {loadingMsg && (
        <div>
          <span className="loading loading-infinity loading-lg text-center"></span>
          <Loader2 className="animate-spin" />
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
