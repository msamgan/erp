import NavLink from "@/Components/NavLink.jsx"

export default function HeaderNavigation() {
    return (
        <>
            <NavLink className={"white-xl"} href={route("dashboard")} active={route().current("dashboard")}>
                Dashboard
            </NavLink>
            <NavLink
                className={"white-xl"}
                href={route("client")}
                active={
                    route().current("client") ||
                    route().current("client.create") ||
                    route().current("client.edit")
                }
            >
                Clients
            </NavLink>
            <NavLink
                className={"white-xl"}
                href={route("organization")}
                active={
                    route().current("organization") ||
                    route().current("organization.create") ||
                    route().current("organization.edit")
                }
            >
                Organizations
            </NavLink>
            <NavLink
                className={"white-xl"}
                href={route("project")}
                active={
                    route().current("project") ||
                    route().current("project.create") ||
                    route().current("project.edit")
                }
            >
                Projects
            </NavLink>
            <NavLink
                className={"white-xl"}
                href={route("transaction")}
                active={route().current("transaction") || route().current("transaction.create")}
            >
                Transactions
            </NavLink>
        </>
    )
}
