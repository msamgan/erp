import { Head, Link } from "@inertiajs/react"
import ApplicationLogo from "@/Components/ApplicationLogo.jsx"

export default function Welcome({}) {
    return (
        <>
            <Head title="Welcome to msamgan ERP" />

            <section className="bg-gray-100 text-gray-800">
                <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                    <ApplicationLogo className="w-72 h-auto mt-12" />
                    <h1 className="text-4xl font-bold leading-none sm:text-5xl">
                        msamgan
                        <span className="text-emerald-600 ml-3">ERP</span>
                    </h1>
                    <p className="px-8 mt-8 mb-12 text-lg">
                        A simple and powerful ERP system for personal and small businesses.
                    </p>
                    <div className="flex flex-wrap justify-center">
                        <Link
                            className="px-8 py-3 m-2 text-lg font-semibold rounded bg-emerald-600 text-gray-50"
                            href="/login"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="">
                <div className="container mx-auto text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ERP. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}
