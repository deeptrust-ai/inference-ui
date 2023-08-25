import { Loader2 } from "lucide-react";

// shadcn
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface PredictCard {
  fileName: string;
  modelType: string;
  genPercentage: number;
  key: number;
}

export default function PredictCards(props: {
  cards: PredictCard[];
  loadingMsg: string | null;
}) {
  const { cards, loadingMsg } = props;
  return (
    <div>
      {loadingMsg && (
        <div className="flex gap-2 p-8">
          <Loader2 className="animate-spin" />
          <p>{loadingMsg}</p>
        </div>
      )}
      {cards.map((card, index) => (
        <Card
          key={card.key}
          className={`flex flex-col justify-center m-12 ${
            card.genPercentage < 0.5
              ? "bg-green-500"
              : card.genPercentage < 0.8
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          <CardHeader>
            <CardTitle className="">Speech Predicted</CardTitle>
            <CardDescription className="text-slate-200">
              <Badge variant={"outline"} className="mr-2">
                {card.key}
              </Badge>
              <b>File: </b>
              {card.fileName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              According to deeptruth-{card.modelType}, this audio has a{" "}
              <b>{card.genPercentage * 100}%</b> of being being generated.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Badge>DeepTruth Alpha</Badge>
            <Badge>Model: deeptruth-{card.modelType}</Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
