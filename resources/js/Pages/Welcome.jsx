import { Head } from "@inertiajs/react"
import ApplicationLogo from "@/Components/ApplicationLogo.jsx"

export default function Welcome({}) {

    return (
        <>
            <Head title="Welcome" />

            <header className="bg-white shadow-md py-6">
                <div className="container mx-auto flex justify-between items-center">
                    {/*<h1 className="text-3xl font-bold text-green-700">msamgan</h1>*/}
                    <a href="/login" className="text-green-700 hover:text-green-800 font-medium">Login</a>
                </div>
            </header>

            <main className="container mx-auto mt-56 px-4">
                <section className="text-center text-green-900">
                    <ApplicationLogo className="w-72 h-auto mx-auto" />
                    <h2 className="text-5xl font-bold mb-6">Welcome Back to ERP, Sir!!</h2>
                    <p className="text-xl mb-8">Manage clients, projects, organizations, and transactions seamlessly.</p>
                </section>

                <section className="mt-18 mb-30 flex flex-col items-center">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                        <ul className="list-inside space-y-4 text-lg">
                            <li>
                                <h4 className="text-2xl font-bold mb-2 text-green-700">Client Management</h4>
                                <p className="text-gray-700">Organize and track client information efficiently.</p>
                            </li>
                            <li>
                                <h4 className="text-2xl font-bold mb-2 text-green-700">Project Tracking</h4>
                                <p className="text-gray-700">Keep your projects on schedule and manage tasks
                                    effortlessly.</p>
                            </li>
                            <li>
                                <h4 className="text-2xl font-bold mb-2 text-green-700">Organization Management</h4>
                                <p className="text-gray-700">Maintain organizational structure and manage teams
                                    effectively.</p>
                            </li>
                            <li>
                                <h4 className="text-2xl font-bold mb-2 text-green-700">Transaction Monitoring</h4>
                                <p className="text-gray-700">Monitor financial transactions with real-time updates and
                                    reports.</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-6 mt-20">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} ERP. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}
