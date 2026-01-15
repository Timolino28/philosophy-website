"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type Quote = {
  id: string;
  text: string;
  author: string;
};

export default function QuoteViewer({ quotes }: { quotes: Quote[] }) {
  const [current, setCurrent] = useState(0);

  const randomNext = () => {
    if (quotes.length <= 1) return;

    let next = current;
    while (next === current) {
      next = Math.floor(Math.random() * quotes.length);
    }
    setCurrent(next);
  };

  const nextQuote = () => {
    if (current === quotes.length) {
      setCurrent(0);
    }
    setCurrent((prev) => prev + 1);
  };

  const previousQuote = () => {
    if (current === 0) {
      return;
    }
    setCurrent((prev) => prev - 1);
  };

  const q = quotes[current];

  return (
    <div className="h-screen max-w-5xl flex flex-col justify-center items-center mx-auto">
      {q ? (
        <div key={q.id}>
          <h1 className="text-3xl italic">"{q.text}" </h1>
          <p className="text-xl mt-3">- {q.author}</p>
        </div>
      ) : (
        <div>
          <p>Keine Zitate vorhanden</p>
        </div>
      )}

      <div className="flex gap-5 mt-10">
        <Button onClick={previousQuote} className="cursor-pointer">
          <ArrowLeftIcon />
        </Button>
        <Button onClick={randomNext} className="cursor-pointer">
          Feeling Lucky?
        </Button>
        <Button onClick={nextQuote} className="cursor-pointer">
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
