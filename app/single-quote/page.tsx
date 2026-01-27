import { listQuotes } from "@/lib/quotes";
import QuoteViewer from "@/components/QuoteViewer";

export default async function SingleQuotePage() {
    const quotes = await listQuotes();

    return (
        <div className="overflow-hidden md:mt-30 mt-15 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl px-4">
                <QuoteViewer quotes={quotes} />
            </div>
        </div>
    )
}

