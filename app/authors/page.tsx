
export default function AuthorsPage() {
    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[500px]">
                {/* Sidebar Column (1 part) */}
                <aside className="col-span-1 bg-rose-100 border-2 border-rose-300 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-rose-800 mb-4">Sidebar</h2>
                    <p className="text-rose-700">
                        This sidebar takes up 1 column.
                    </p>
                </aside>

                {/* Content Column (2 parts - twice as big) */}
                <main className="col-span-3 bg-sky-100 border-2 border-sky-300 rounded-xl p-6">
                    <h1 className="text-2xl font-bold text-sky-800 mb-4">Main Content</h1>
                    <p className="text-sky-700">
                        This content area takes up 2 columns, making it twice as wide as the sidebar.
                    </p>
                </main>
            </div>
        </div>
    )
}
