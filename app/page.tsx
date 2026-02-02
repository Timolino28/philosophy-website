import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    // 1) Outer wrapper: Background image + positioning
    <div className="relative isolate overlow-hidden bg-[url('/hero-bg.jpg')] bg-cover bg-center min-h-screen">
      {/* 2) Dark overlay layer (filter) */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-35 sm:mt-32 lg:mt-16">
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Your daily dose of <br /> <span className="block md:mt-5 mt-2 text-amber-200 font-decoration">Philosophy</span>
          </h1>
          <p className="md:mt-6 mt-2 md:text-lg md:leading-8 text-white/50 font-sans">
            Explore the vast ocean of philosophical thought. From the stoics to the existentialists, discover quotes that challenge, inspire, and guide your daily life.
          </p>
          <Link href="/single-quote">
            <Button className="bg-white w-full py-6 cursor-pointer mt-5">Inspire Me</Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full" aria-hidden="true">
        <p className="text-white/50 text-center text-xs">
          Picture by <a href="https://unsplash.com/de/@karlcatabas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Karl Raymund Catabas</a> from <a href="https://unsplash.com/de/fotos/ein-stapel-bucher-auf-einem-holztisch-6yFGUCyLgMI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        </p>
      </div>
    </div>
  );
}