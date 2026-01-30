import { getAllQuotes } from "@/lib/quotes"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowLeftIcon } from "lucide-react"

type PageProps = {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined
    }>
}

export default async function AuthorsPage(props: PageProps) {
    const searchParams = await props.searchParams
    const allQuotes = await getAllQuotes()

    const authorCounts = allQuotes.reduce((acc, quote) => {
        acc[quote.author] = (acc[quote.author] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const authors = Object.entries(authorCounts).sort((a, b) => b[1] - a[1])

    const selectedAuthor = typeof searchParams.name === "string" ? searchParams.name : null

    const displayedQuotes = selectedAuthor ? allQuotes.filter((quote) => quote.author === selectedAuthor) : []

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[500px]">
                {/* Sidebar Column */}
                <aside className={cn(
                    "col-span-1 bg-neutral-800 rounded-xl h-fit max-h-[80vh] flex-col overflow-hidden",
                    selectedAuthor ? "hidden md:flex" : "flex"
                )}>
                    <div className="overflow-y-auto custom-scrollbar p-4 w-full">
                        <h2 className="font-bold mb-4 text-lg text-white/90 px-2">Authors</h2>
                        <div className="space-y-1">
                            {authors.map(([authorName, count]) => (
                                <Link
                                    key={authorName}
                                    // Update URL to ?name=AuthorName
                                    href={`/authors?name=${encodeURIComponent(authorName)}`}
                                    className={cn(
                                        "flex justify-between items-center p-2 rounded-lg transition-colors",
                                        selectedAuthor === authorName
                                            ? "bg-amber-200 text-neutral-900 font-medium"
                                            : "hover:bg-neutral-700 text-neutral-400"
                                    )}
                                >
                                    <span>{authorName}</span>
                                    <span className={cn("text-xs border px-2 py-0.5 rounded-full text-neutral-400 inline-flex items-center justify-center h-6 w-6",
                                        selectedAuthor === authorName ? "bg-amber-200 text-neutral-900" : "border-neutral-400")}>
                                        {count}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Content Column */}
                <main className={cn(
                    "col-span-3 min-h-[80vh] max-h-[80vh] rounded-xl flex-col shadow-[0_0_10px_rgba(0,0,0,0.1)]",
                    selectedAuthor ? "flex" : "hidden md:flex"
                )}>
                    <div className="h-full overflow-hidden">
                        {selectedAuthor ? (
                            <div className="p-8 h-full overflow-y-auto custom-scrollbar">
                                <Link
                                    href="/authors"
                                    className="md:hidden flex items-center text-sm text-neutral-400 mb-6 hover:text-white transition-colors group"
                                >
                                    <ArrowLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back
                                </Link>

                                <div className="mb-8 pb-4 border-b border-neutral-800/70">
                                    <h1 className="text-4xl font-decoration font-bold text-neutral-800 tracking-tight">
                                        {selectedAuthor}
                                    </h1>
                                    <p className="text-neutral-500 mt-2 text-sm font-medium uppercase tracking-wider">
                                        Selected Author
                                    </p>
                                </div>

                                <div className="grid gap-6">
                                    {displayedQuotes.map((quote) => (
                                        <blockquote
                                            key={quote.id}
                                            className="relative py-8 bg-neutral-800 rounded-2xl shadow-sm hover:border-purple-100 transition-all duration-300 group"
                                        >
                                            <div className="absolute top-6 left-6 text-neutral-700 select-none pointer-events-none">
                                            </div>
                                            <p className="font-serif text-xl text-center leading-relaxed text-neutral-100 px-5 relative z-10">
                                                {quote.text}
                                            </p>
                                        </blockquote>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-neutral-900 p-8 text-center space-y-4">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center border border-neutral-700">
                                    <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div >
                                    <h3 className="text-lg font-medium text-neutral-800">No Author Selected</h3>
                                    <p className="text-sm text-neutral-600">Select an author from the sidebar to view their collection.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
