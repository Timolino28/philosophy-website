import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { listQuotes } from "@/lib/quotes";

export default async function Home() {
  const quotes = await listQuotes();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {quotes.map((q) => (
        <div key={q.id}>
          <h1 className="text-3xl text-center italic">"{q.text}" </h1>
          <p className="text-xl mt-3">- {q.author}</p>
        </div>
      ))}

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
