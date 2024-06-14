import { useState } from "react"
import ApplicationLogo from "@/Components/ApplicationLogo"
import Dropdown from "@/Components/Dropdown"
import ResponsiveNavLink from "@/Components/ResponsiveNavLink"
import { Link } from "@inertiajs/react"
import HeaderNavigation from "@/Components/HeaderNavigation.jsx"
import Footer from "@/Components/Footer.jsx"

export default function AuthenticatedLayout({ user, header, children, subMenu }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)

    return (
        <>
            <div className="min-h-screen">
                <nav className="border-gray-100 primary-bg">
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
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6 text-white"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content width="64">
                                            <Dropdown.Link className={"text-xl"} href={route("client.create")}>
                                                Add Client
                                            </Dropdown.Link>
                                            <hr />
                                            <Dropdown.Link
                                                className={"text-xl"}
                                                href={route("organization.create")}
                                            >
                                                Add Organization
                                            </Dropdown.Link>
                                            <hr />
                                            <Dropdown.Link className={"text-xl"} href={route("project.create")}>
                                                Add Project
                                            </Dropdown.Link>
                                            <hr />
                                            <Dropdown.Link
                                                className={"text-xl"}
                                                href={route("transaction.create")}
                                            >
                                                Add Transaction
                                            </Dropdown.Link>
                                            <hr />
                                            <Dropdown.Link className={"text-xl"} href={route("post.create")}>
                                                Add Post
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 text-xl font-medium text-gray-500 bg-white border border-transparent leading-4 transition duration-150 ease-in-out rounded-md hover:text-gray-700 focus:outline-none"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link className={"text-xl"} href={route("profile.edit")}>
                                                Profile
                                            </Dropdown.Link>
                                            <hr />
                                            <Dropdown.Link className={"text-xl"} href={route("media")}>
                                                Media
                                            </Dropdown.Link>
                                            <hr />
                                            <Dropdown.Link
                                                className={"text-xl"}
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="flex items-center -me-2 sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown((previousState) => !previousState)
                                    }
                                    className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? "inline-flex" : "hidden"}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={(showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"}>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route("dashboard")} active={route().current("dashboard")}>
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route("logout")} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="shadow secondary-bg">
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
