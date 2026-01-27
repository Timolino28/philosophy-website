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
                    "col-span-1 bg-neutral-50 border rounded-xl h-fit max-h-[80vh] flex-col overflow-hidden",
                    selectedAuthor ? "hidden md:flex" : "flex"
                )}>
                    <div className="overflow-y-auto p-4 w-full">
                        <h2 className="font-bold mb-4 text-lg px-2">Authors</h2>
                        <div className="space-y-1">
                            {authors.map(([authorName, count]) => (
                                <Link
                                    key={authorName}
                                    // Update URL to ?name=AuthorName
                                    href={`/authors?name=${encodeURIComponent(authorName)}`}
                                    className={cn(
                                        "flex justify-between items-center p-2 rounded-lg transition-colors",
                                        selectedAuthor === authorName
                                            ? "bg-purple-100 text-purple-900 font-medium"
                                            : "hover:bg-neutral-100 text-neutral-600"
                                    )}
                                >
                                    <span>{authorName}</span>
                                    <span className="text-xs bg-white border px-2 py-0.5 rounded-full text-neutral-500">
                                        {count}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Content Column */}
                <main className={cn(
                    "col-span-3 border h-fit min-h-[80vh] rounded-xl flex-col overflow-hidden",
                    selectedAuthor ? "flex" : "hidden md:flex"
                )}>
                    {selectedAuthor ? (
                        <div className="p-6 overflow-y-auto">
                            <Link
                                href="/authors"
                                className="md:hidden flex items-center text-sm text-neutral-500 mb-4 hover:text-neutral-800 transition-colors"
                            >
                                <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to Authors
                            </Link>

                            <h1 className="text-3xl font-bold text-neutral-800 border-b pb-4 mb-4">
                                {selectedAuthor}
                            </h1>

                            <div className="grid gap-4">
                                {displayedQuotes.map((quote) => (
                                    <div key={quote.id} className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        <p className="font-serif text-lg leading-relaxed text-neutral-700">
                                            {quote.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-[80vh] flex items-center justify-center text-neutral-400 ">
                            <p>Select an author to view their quotes</p>
                        </div>
                    )}

                </main>
            </div>
        </div>
    )
}
