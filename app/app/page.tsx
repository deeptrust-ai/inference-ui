import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Section from "@/components/Section";
import Input from "./input";
import { AlertTriangle } from "lucide-react";

export default function Page() {
  return (
    <Section yPadding="py-12">
      <div className="mb-4">
        <h1 className="mb-2 text-2xl font-bold">DeepTrust Speech Detection</h1>
        <div className="text-slate-400">
          Launch deepfake detections jobs using the deeptruth technology.
        </div>
      </div>

      <div className="grid lg:grid-flow-col lg:grid-cols-5 items-center justify-between gap-12 grid-flow-row auto-rows-auto mb-24">
        <div className="lg:col-span-3">
          <Input />
        </div>
        <div className="row-start-1 lg:col-span-2">
          <Disclaimer />
        </div>
      </div>
    </Section>
  );
}

const Disclaimer = () => (
  <Card className="col-span-2">
    <CardHeader>
      <CardTitle className="flex gap-2">
        Disclaimer <AlertTriangle />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>
        Please keep that in mind this current deepfake speech detection model is
        in an early stage.{" "}
      </p>
      <br />
      <p>
        {" "}
        There are still types of voice clones, languages, and other factors that
        this model has not yet trained on.
      </p>
    </CardContent>
  </Card>
);
