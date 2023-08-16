"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function WaitList() {
  return (
    <form className="form grid grid-cols-3 gap-4">
      <Input className="col-span-2" type="email" placeholder="Email" />
      <Button type="submit">Join</Button>
    </form>
  );
}
