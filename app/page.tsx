// import DefaultHome from "./default-home";
import Logo from "@/components/logo";
import WaitList from "@/components/waitlist";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center text-center justify-between p-24">
      <div className="grid grid-flow-row grid-rows-3 auto-rows-max text-center items-center justify-center">
        <Logo width={456} height={200} />
        <div className="group text-center justify-between font-mono text-xlg lg:flex text-3xl font-semibold">
          Protect Human Authenticity
        </div>
        <WaitList />
      </div>
    </div>
  );
}
