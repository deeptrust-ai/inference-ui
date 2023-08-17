import ModelTester from "./model-tester";

export default function Page() {
  // render
  return (
    <div className="flex flex-col mx-24 gap-4 max-w-screen-md">
      <h1 className="mb-3 text-2xl font-bold">DeepTrust Demo</h1>

      <p>
        DeepTrust&apos;s deep-truth solution will be able to detect deepfake
        speech audio.
      </p>
      <p>
        <b>Disclaimer: </b>This is an alpha version of the model. Please note,
        for performance keep audio files {"<"} 10 seconds. The longer the clip,
        the longer the processing time.
      </p>
      <ModelTester />
    </div>
  );
}
