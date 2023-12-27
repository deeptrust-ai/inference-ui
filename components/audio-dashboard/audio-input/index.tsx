import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// TODO: Introduce different forms of input, like url
const AudioInput = () => (
  <div className="border-r bg-gray-600/40 dark:bg-gray-800/40 rounded-lg shadow-lg">
    <div className="flex flex-col gap-4 p-4">
      <h1 className="font-semibold text-lg md:text-2xl">Speech Input</h1>
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="audio-upload">Upload Audio</Label>
        <Input
          aria-label="Upload audio"
          className="border-gray-300 shadow-sm rounded-lg"
          id="audio-upload"
          type="file"
        />
      </div>
      <hr className="my-4" />
      <Button className="w-full">Detect</Button>
    </div>
  </div>
);

export default AudioInput;
