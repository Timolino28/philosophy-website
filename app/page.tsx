import { listQuotes } from "@/lib/quotes";
import QuoteViewer from "./quote-viewer";

export default async function Home() {
  const quotes = await listQuotes();

  return <QuoteViewer quotes={quotes} />;
}
