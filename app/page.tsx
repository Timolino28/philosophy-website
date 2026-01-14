import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-3xl text-center italic">
          "What such a man needs is not courage but nerve control, cool
          headedness. This he can get only by practice."{" "}
        </h1>
        <p className="text-xl mt-3">- Theodore Roosevelt</p>
      </div>
      <div className="flex gap-5 mt-10">
        <Button className="cursor-pointer">
          <ArrowLeftIcon />
        </Button>
        <Button className="cursor-pointer">Random</Button>
        <Button className="cursor-pointer">
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
