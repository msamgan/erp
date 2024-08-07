import Dropdown from "@/Components/Dropdown.jsx"

export default function ProfileNavigation({ user }) {
    return (
        <div className="relative ms-3">
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 text-xl font-medium text-gray-600 bg-white border border-transparent leading-4 transition duration-150 ease-in-out rounded-md hover:text-gray-700 focus:outline-none"
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
                    <Dropdown.Link className={"text-xl"} href={route("logout")} method="post" as="button">
                        Log Out
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    )
}
