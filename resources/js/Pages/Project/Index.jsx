import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import { useCallback, useEffect, useState } from "react"
import DetailsLink from "@/Components/DetailsLink.jsx"
import {
    createCostingAttribute,
    createStatusAttribute,
    createTypeAttribute
} from "@/Pages/Project/partials.jsx"
import { projectStatuses } from "@/helpers/constants.js"
import { createDateAttribute } from "@/helpers/methods.js"
import { getClientList, pageDataObject, projectDataObject } from "@/Pages/Project/methods.js"
import Drawer from "@/Components/Drawer.jsx"
import FormSection from "@/Components/FormSection.jsx"
import Form from "@/Pages/Project/Form.jsx"
import axios from "axios"
import DrawerButton from "@/Components/DrawerButton.jsx"
import DrawerEditButton from "@/Components/DrawerEditButton.jsx"
import Details from "@/Pages/Project/Details.jsx"

export default function Index({ auth }) {
    const [columns, setColumns] = useState(["Name", "Client", "Status", "Dates", "Costing", "Type", "Actions"])
    const [listingData, setListingData] = useState([])
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState(null)
    const [clients, setClients] = useState([])
    const [openFormDrawer, setOpenFormDrawer] = useState(false)
    const [openDetailsDrawer, setOpenDetailsDrawer] = useState(false)

    const dataObject = projectDataObject(project)

    const [pageData, setPageData] = useState(pageDataObject(project))

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const onSubmit = (e) => {
        e.preventDefault()

        post(pageData.actionUrl, {
            preserveScroll: true,
            onSuccess: () => {
                if (!project) {
                    axios
                        .get(route("project.last_created"))
                        .then((response) => {
                            setProject(response.data)
                            setData(projectDataObject(response.data))
                            setPageData(pageDataObject(response.data))
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }

                getProjects({ queryParams })
            }
        })
    }

    const clientList = useCallback(() => {
        getClientList().then((response) => {
            setClients(response)
        })
    }, [])

    const getProjects = useCallback(({ queryParams }) => {
        axios
            .get(route("project.list", { ...queryParams }))
            .then((response) => {
                setProjects(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const createActions = ({ editRoute, detailsRoute }) => {
        return (
            <div className="flex space-x-2">
                <DrawerEditButton
                    onClick={() => {
                        axios
                            .get(editRoute)
                            .then((response) => {
                                setProject(response.data)
                                setData(projectDataObject(response.data))
                                setPageData(pageDataObject(response.data))
                                setOpenFormDrawer(true)
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }}
                />
                {/*<DetailsLink detailsRoute={detailsRoute} />*/}
                <button
                    className={'h-8'}
                    onClick={() => {
                        axios
                            .get(detailsRoute)
                            .then((response) => {
                                setProject(response.data)
                                setOpenDetailsDrawer(true)
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="blue"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </button>
            </div>
        )
    }

    const createNameAttribute = (name, docUrl, description) => {
        return (
            <div className="flex flex-col space-y-1">
                {description ? (
                    <div className="has-tooltip">
                        <span className="w-1/3 p-2 -mt-16 text-white bg-black rounded shadow-lg tooltip text-wrap">
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
                <div className="flex space-x-1">from: {startDate ? createDateAttribute(startDate) : "--"}</div>
                <hr />
                <div className="flex space-x-1">to: {endDate ? createDateAttribute(endDate) : "--"}</div>
            </>
        )
    }

    useEffect(() => {
        if (!projects) return

        setListingData(
            projects.map((project) => {
                return {
                    Name: createNameAttribute(project.name, project.document_url, project.description),
                    Client: project.client.name,
                    Status: createStatusAttribute(project.status),
                    Dates: createFormattedDateAttribute(project.start_date, project.end_date),
                    Costing: createCostingAttribute(project.costing),
                    Type: createTypeAttribute(project.type),
                    Actions: createActions({
                        editRoute: route("project.show", project.id),
                        detailsRoute: route("project.show", project.id)
                    })
                }
            })
        )
    }, [projects])

    useEffect(() => {
        clientList()
        getProjects({ queryParams })
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
                    <DrawerButton
                        title="Add Project"
                        onClick={() => {
                            setData(projectDataObject(null))
                            setOpenFormDrawer(!openFormDrawer)
                        }}
                    />
                </div>
            }
        >
            <Head title="Projects" />

            <Main>
                <Table
                    columns={columns}
                    data={listingData}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    searchFormExtension={searchFormExtension}
                />

                <Drawer open={openFormDrawer} setOpen={setOpenFormDrawer}>
                    <FormSection headerTitle={pageData.headerTitle} headerDescription={pageData.description}>
                        <Form
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            recentlySuccessful={recentlySuccessful}
                            onSubmit={onSubmit}
                            clients={clients}
                            refreshClientList={clientList}
                        />
                    </FormSection>
                </Drawer>

                <Drawer open={openDetailsDrawer} setOpen={setOpenDetailsDrawer}>
                    {
                        project && <Details project={project} />
                    }
                </Drawer>
            </Main>
        </AuthenticatedLayout>
    )
}
