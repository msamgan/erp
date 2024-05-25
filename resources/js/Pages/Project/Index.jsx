import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { useEffect, useState } from "react"
import EditLink from "@/Components/EditLink.jsx"
import DetailsLink from "@/Components/DetailsLink.jsx"

export default function Index({ auth, projects }) {
    const [columns, setColumns] = useState([
        "Name",
        "Client",
        "Description",
        "Status",
        "Dates",
        "Costing",
        "Type",
        "Actions"
    ])
    const [data, setData] = useState([])

    const createActions = ({ editRoute, detailsRoute }) => {
        return (
            <div className="flex space-x-2">
                <EditLink editRoute={editRoute} />
                <DetailsLink detailsRoute={detailsRoute} />
            </div>
        )
    }

    const createNameAttribute = (name, docUrl) => {
        return (
            <div className="flex flex-col space-y-1">
                <div>{name}</div>
                {docUrl ? (
                    <a href={docUrl} target="_blank" className="text-blue-500">
                        View Doc
                    </a>
                ) : (
                    ""
                )}
            </div>
        )
    }

    const createStatusAttribute = (status) => {
        return (
            <div className="flex space-x-1">
                {status === "completed" ? (
                    <span className="px-2 py-1 rounded-md text-sm complete-badge-background">
                        Completed
                    </span>
                ) : (
                    ""
                )}
                {status === "active" ? (
                    <span className="px-2 py-1 rounded-md text-sm active-badge-background">Active</span>
                ) : (
                    ""
                )}
                {status === "lead" ? (
                    <span className="px-2 py-1 rounded-md text-sm lead-badges-background">Lead</span>
                ) : (
                    ""
                )}
                {status === "cancelled" ? (
                    <span className="px-2 py-1 rounded-md text-sm cancelled-badge-background">
                        Cancelled
                    </span>
                ) : (
                    ""
                )}
            </div>
        )
    }

    const createDateAttribute = (startDate, endDate) => {
        return (
            <>
                <div className="flex space-x-1">
                    from: {startDate ? new Date(startDate).toDateString() : ""}
                </div>
                <hr />
                <div className="flex space-x-1">to: {endDate ? new Date(endDate).toDateString() : ""}</div>
            </>
        )
    }

    const createCostingAttribute = (costing) => {
        return costing.toLocaleString("en-US", { style: "currency", currency: "USD" })
    }

    useEffect(() => {
        setData(
            projects.map((project) => {
                return {
                    Name: createNameAttribute(project.name, project.document_url),
                    Client: project.client.name,
                    Description: project.description,
                    Status: createStatusAttribute(project.status),
                    Dates: createDateAttribute(project.start_date, project.end_date),
                    Costing: createCostingAttribute(project.costing),
                    Type: project.type,
                    Actions: createActions({
                        editRoute: route("project.edit", project.id),
                        detailsRoute: route("project.show", project.id)
                    })
                }
            })
        )
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Projects" />}
            subMenu={
                <div className="flex space-x-2">
                    <PrimaryLink className={"h-8"} title="Add Project" href={route("project.create")} />
                </div>
            }
        >
            <Head title="Projects" />

            <Main>
                <Table columns={columns} data={data} />
            </Main>
        </AuthenticatedLayout>
    )
}
