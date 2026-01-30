"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MagicButton } from "@/components/ui/MagicButton";
import { ArrowLeftIcon, ArrowRightIcon, ShuffleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Quote = {
  id: string;
  text: string;
  author: string;
};

export default function QuoteViewer({ quotes }: { quotes: Quote[] }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTransition = (callback: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 300);
  };

  const randomNext = () => {
    if (quotes.length <= 1) return;

    handleTransition(() => {
      let next = current;
      while (next === current) {
        next = Math.floor(Math.random() * quotes.length);
      }
      setCurrent(next);
    });
  };

  const nextQuote = () => {
    handleTransition(() => {
      if (current === quotes.length - 1) { // Fixed: was quotes.length which is out of bounds
        setCurrent(0);
      } else {
        setCurrent((prev) => prev + 1);
      }
    });
  };

  const previousQuote = () => {
    handleTransition(() => {
      if (current === 0) {
        setCurrent(quotes.length - 1); // Wrap around
      } else {
        setCurrent((prev) => prev - 1);
      }
    });
  };

  const cleanQuote = (text: string) => {
    return text.replace(/“|”/g, '');
  }

  const q = quotes[current];

  return (
    <div className="flex flex-col justify-center items-center mx-auto max-w-3xl px-6 min-h-[60vh]">
      <div
        className={cn(
          "text-card-foreground p-12 rounded-xl bg-neutral-800 shadow-lg shadow-neutral-900 w-full text-center transition-opacity duration-300 ease-in-out relative",
          isAnimating ? "opacity-0 translate-y-2 scale-95" : "opacity-100 translate-y-0 scale-100"
        )}
      >
        {q ? (
          <div key={q.id} className="space-y-8">
            {/* Decorative quote mark */}
            <div className="absolute top-6 left-8 text-6xl text-white/50 font-serif leading-none select-none">“</div>

            {/* Quote Text */}
            <h1 className="text-2xl md:text-3xl font-serif leading-relaxed text-white/90">
              {cleanQuote(q.text)}
            </h1>

            {/* Divider */}
            <div className="w-16 h-1 bg-white/50 mx-auto rounded-full"></div>

            {/* Author */}
            <p className="text-sm md:text-base font-decoration font-bold tracking-widest text-white/90">
              — {q.author}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground italic">Keine Zitate vorhanden</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
          <Button
            variant="outline"
            size="icon"
            onClick={previousQuote}
            className="text-white cursor-pointer w-12 h-12 rounded-full bg-transparent inset-shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:inset-shadow-[0_0_20px_rgba(0,0,0,0.5)] shadow-neutral-900 border-neutral-900 hover:bg-neutral-800/5 transition-colors duration-300"
            aria-label="Previous quote"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>

          <MagicButton
            onClick={randomNext}
            className="h-12 shadow-lg hover:shadow-purple-500/20"
          >
            <ShuffleIcon className="w-4 h-4" />
            <span>Inspire Me</span>
          </MagicButton>

          <Button
            variant="outline"
            size="icon"
            onClick={nextQuote}
            className="text-white cursor-pointer w-12 h-12 rounded-full bg-transparent inset-shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:inset-shadow-[0_0_20px_rgba(0,0,0,0.5)] shadow-neutral-900 border-neutral-900 hover:bg-neutral-800/5 transition-colors duration-300"
            aria-label="Next quote"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
