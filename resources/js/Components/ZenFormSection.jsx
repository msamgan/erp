import { Link, router } from "@inertiajs/react"

export default function ZenFormSection({ children, backRoute, backText }) {
    return (
        <div className="p-4 shadow sm:rounded-lg">
            <section>
                <header>
                    <div className={"mt-2 flex items-center justify-between"}>
                        <p className="mt-1 text-sm text-gray-600"></p>
                        <Link href={backRoute} className="text-sm text-blue-500 hover:underline">
                            {backText}
                        </Link>
                    </div>
                </header>
                {children}
            </section>
        </div>
    )
}
