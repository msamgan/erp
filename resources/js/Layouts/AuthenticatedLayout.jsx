import ApplicationLogo from "@/Components/ApplicationLogo"
import { Link } from "@inertiajs/react"
import HeaderNavigation from "@/Components/HeaderNavigation.jsx"
import Footer from "@/Components/Footer.jsx"
import ProfileNavigation from "@/Components/ProfileNavigation.jsx"

export default function AuthenticatedLayout({ user, header, children, subMenu }) {
    return (
        <>
            <div className="min-h-screen">
                <nav className="border-gray-100 bg-primary">
                    <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex items-center shrink-0">
                                    <Link href="/">
                                        <ApplicationLogo className="block w-auto h-16 mt-4 text-gray-800 fill-current invert" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <HeaderNavigation />
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <ProfileNavigation user={user} />
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="shadow bg-secondary">
                        <div className="container flex justify-between px-4 py-6 mx-auto sm:px-6 lg:px-8 h-18">
                            {header}
                            {subMenu && <ul className="items-stretch hidden space-x-3 md:flex">{subMenu}</ul>}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>

            <Footer />
        </>
    )
}
