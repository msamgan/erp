import Dropdown from "@/Components/Dropdown.jsx"

export default function AddItemNavigation() {
    return (
        <div className="relative ms-3">
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button type="button" className="inline-flex items-center px-3 py-2">
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
                    <Dropdown.Link className={"text-xl"} href={route("organization.create")}>
                        Add Organization
                    </Dropdown.Link>
                    <hr />
                    <Dropdown.Link className={"text-xl"} href={route("project.create")}>
                        Add Project
                    </Dropdown.Link>
                    <hr />
                    <Dropdown.Link className={"text-xl"} href={route("transaction.create")}>
                        Add Transaction
                    </Dropdown.Link>
                    <hr />
                    <Dropdown.Link className={"text-xl"} href={route("post.create")}>
                        Add Post
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    )
}
