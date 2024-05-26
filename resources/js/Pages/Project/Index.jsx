import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { useEffect, useState } from "react"
import EditLink from "@/Components/EditLink.jsx"
import DetailsLink from "@/Components/DetailsLink.jsx"
import {
    createCostingAttribute,
    createDateAttribute,
    createStatusAttribute,
    createTypeAttribute
} from "@/Pages/Project/partials.jsx"

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

    const createFormattedDateAttribute = (startDate, endDate) => {
        return (
            <>
                <div className="flex space-x-1">
                    from: {createDateAttribute(startDate)}
                </div>
                <hr />
                <div className="flex space-x-1">to: {createDateAttribute(endDate)}</div>
            </>
        )
    }

    useEffect(() => {
        setData(
            projects.map((project) => {
                return {
                    Name: createNameAttribute(project.name, project.document_url),
                    Client: project.client.name,
                    Description: project.description,
                    Status: createStatusAttribute(project.status),
                    Dates: createFormattedDateAttribute(project.start_date, project.end_date),
                    Costing: createCostingAttribute(project.costing),
                    Type: createTypeAttribute(project.type),
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
