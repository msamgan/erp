import NavLink from "@/Components/NavLink.jsx"
import Dropdown from "@/Components/Dropdown.jsx"

export default function HeaderNavigation() {
    return (
        <>
            <NavLink className={"white-xl"} href={route("dashboard")} active={route().current("dashboard")}>
                Dashboard
            </NavLink>
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button type="button" className="inline-flex items-center mt-5">
                            <span className="text-white text-xl">CRM</span>
                            <svg
                                className="h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>
                </Dropdown.Trigger>

                <Dropdown.Content width="64">
                    <Dropdown.Link className={"text-xl"} href={route("client")}>
                        Clients
                    </Dropdown.Link>
                    <hr />
                    <Dropdown.Link className={"text-xl"} href={route("organization")}>
                        Organizations
                    </Dropdown.Link>
                    <hr />
                    <Dropdown.Link className={"text-xl"} href={route("project")}>
                        Projects
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button type="button" className="inline-flex items-center mt-5">
                            <span className="text-white text-xl">Blog</span>
                            <svg
                                className="h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>
                </Dropdown.Trigger>

                <Dropdown.Content width="64">
                    <Dropdown.Link className={"text-xl"} href={route("post")}>
                        Posts
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
            <NavLink
                className={"white-xl"}
                href={route("transaction")}
                active={route().current("transaction") || route().current("transaction.create")}
            >
                Transactions
            </NavLink>
            <NavLink
                className={"white-xl"}
                href={route("task")}
                active={route().current("task") || route().current("task.create")}
            >
                Tasks
            </NavLink>
        </>
    )
}
