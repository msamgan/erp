import { Head, Link } from "@inertiajs/react"
import ApplicationLogo from "@/Components/ApplicationLogo.jsx"

export default function Welcome({}) {
    return (
        <>
            <Head title="Welcome to msamgan ERP" />

            <section className="text-gray-800 bg-gray-100">
                <div className="container flex flex-col items-center px-4 py-16 mx-auto text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                    <ApplicationLogo className="h-auto mt-12 w-72" />
                    <h1 className="text-4xl font-bold leading-none sm:text-5xl">
                        msamgan
                        <span className="ml-3 text-emerald-600">ERP</span>
                    </h1>
                    <p className="px-8 mt-8 mb-12 text-lg">
                        A simple and powerful ERP system for personal and small businesses.
                    </p>
                    <div className="flex flex-wrap justify-center">
                        <Link
                            className="px-8 py-3 m-2 text-lg font-semibold rounded bg-primary text-white"
                            href={route("login")}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="mt-12">
                <div className="container mx-auto text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ERP. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}
