import { listQuotes } from "@/lib/quotes";
import QuoteViewer from "@/components/QuoteViewer";

export default async function SingleQuotePage() {
    const quotes = await listQuotes();

    return (
        <div className="relative isolate overflow-hidden bg-[url('/quote-bg.jpg')] bg-cover bg-center min-h-screen">
            {/* 2) Dark overlay layer (filter) */}
            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            <div className="relative w-full max-w-4xl px-4 md:mt-50 mt-40 mb-10 mx-auto">
                <QuoteViewer quotes={quotes} />
            </div>
            <div className="absolute bottom-0 left-0 w-full" aria-hidden="true">
                <p className="text-white/50 text-center text-xs">
                    Picture by <a href="https://unsplash.com/de/@giamboscaro?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Giammarco Boscaro</a> from <a href="https://unsplash.com/de/fotos/book-lot-on-black-wooden-shelf-zeH-ljawHtg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                </p>
            </div>
        </div>
    )
}

