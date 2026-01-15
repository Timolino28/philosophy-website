import { listQuotes } from "@/lib/quotes";
import QuoteViewer from "./quote-viewer";
import WobbleDecor from "./wobble-decor";

export default async function Home() {
  const quotes = await listQuotes();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WobbleDecor />
      <div className="relative z-10">
        <QuoteViewer quotes={quotes} />;
      </div>
    </div>
  )

}
