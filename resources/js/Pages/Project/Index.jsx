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
import { projectStatuses } from "@/helpers/constants.js"

export default function Index({ auth, projects }) {
    const [columns, setColumns] = useState(["Name", "Client", "Status", "Dates", "Costing", "Type", "Actions"])
    const [data, setData] = useState([])
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )

    const createActions = ({ editRoute, detailsRoute }) => {
        return (
            <div className="flex space-x-2">
                <EditLink editRoute={editRoute} />
                <DetailsLink detailsRoute={detailsRoute} />
            </div>
        )
    }

    const createNameAttribute = (name, docUrl, description) => {
        return (
            <div className="flex flex-col space-y-1">
                {description ? (
                    <div class="has-tooltip">
                        <span class="w-1/3 p-2 -mt-16 text-white bg-black rounded shadow-lg tooltip text-wrap">
                            {description}
                        </span>
                        {name}
                    </div>
                ) : (
                    <div>{name}</div>
                )}

                {docUrl ? (
                    <a href={docUrl} target="_blank" className="text-sm text-blue-500">
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
                <div className="flex space-x-1">from: {createDateAttribute(startDate)}</div>
                <hr />
                <div className="flex space-x-1">to: {createDateAttribute(endDate)}</div>
            </>
        )
    }

    useEffect(() => {
        setData(
            projects.map((project) => {
                return {
                    Name: createNameAttribute(project.name, project.document_url, project.description),
                    Client: project.client.name,
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

    const searchFormExtension = () => {
        return (
            <div className="flex flex-col">
                <select
                    id="status"
                    name={"status"}
                    className="h-10 border border-gray-300 rounded-md"
                    defaultValue={queryParams.status}
                >
                    <option key={"all"} value={"all"}>
                        {"All"}
                    </option>
                    {projectStatuses.map((status, index) => (
                        <option key={index} value={status.key}>
                            {status.value}
                        </option>
                    ))}
                </select>
                <small className="text-gray-500 ml-2 mt-0.5">status</small>
            </div>
        )
    }

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
                <Table
                    columns={columns}
                    data={data}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    searchFormExtension={searchFormExtension}
                />
            </Main>
        </AuthenticatedLayout>
    )
}
