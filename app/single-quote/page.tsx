import { listQuotes } from "@/lib/quotes";
import QuoteViewer from "@/components/QuoteViewer";

export default async function SingleQuotePage() {
    const quotes = await listQuotes();

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
            <div className="relative z-10 w-full max-w-4xl px-4">
                <QuoteViewer quotes={quotes} />
            </div>
        </div>
    )
}

