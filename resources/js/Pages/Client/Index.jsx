import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { useCallback, useEffect, useState } from "react"
import EditLink from "@/Components/EditLink.jsx"
import { clientDataObject, getOrganizationList, pageDataObject } from "@/Pages/Client/methods.js"
import Drawer from "@/Components/Drawer.jsx"
import FormSection from "@/Components/FormSection.jsx"
import Form from "@/Pages/Client/Form.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"

export default function Index({ auth }) {
    const [columns, setColumns] = useState(["Name", "Emails", "Phones", "Organization", "Actions"])
    const [listingData, setListingData] = useState([])
    const [openDrawer, setOpenDrawer] = useState(false)
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )
    const [clients, setClients] = useState([])
    const [client, setClient] = useState(null)
    const [organizations, setOrganizations] = useState([])

    const organizationList = useCallback(() => {
        getOrganizationList().then((response) => {
            setOrganizations(response)
        })
    }, [])

    const getClients = useCallback(({ queryParams }) => {
        axios
            .get(
                route("client.list", {
                    ...queryParams
                })
            )
            .then((response) => {
                setClients(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const createActions = ({ editRoute }) => {
        return (
            <div className="flex space-x-2">
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            axios
                                .get(editRoute)
                                .then((response) => {
                                    setClient(response.data)
                                    setData(clientDataObject(response.data))
                                    setPageData(pageDataObject(response.data))
                                    setOpenDrawer(true)
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
                            stroke="#006769"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (!clients) return

        setListingData(
            clients.map((client) => {
                return {
                    Name: client.name,
                    Emails: client.emails.map((email) => email.email).join(", "),
                    Phones: client.phones.map((phone) => phone.phone).join(", "),
                    Organization: client.organization ? client.organization.name : "",
                    Actions: createActions({
                        editRoute: route("client.show", client.id)
                    })
                }
            })
        )
    }, [clients])

    useEffect(() => {
        getClients({ queryParams })
        organizationList()
    }, [])

    const dataObject = clientDataObject(client)
    const [pageData, setPageData] = useState(pageDataObject(client))

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const onSubmit = (e) => {
        e.preventDefault()

        post(pageData.actionUrl, {
            preserveScroll: true,
            onSuccess: () => {
                if (!client) {
                    axios
                        .get(route("client.last_created"))
                        .then((response) => {
                            setClient(response.data)
                            setData(clientDataObject(response.data))
                            setPageData(pageDataObject(response.data))
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }

                getClients({ queryParams })
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Clients" />}
            subMenu={
                <div className="flex space-x-2">
                    {/*<PrimaryLink className={"h-8"} title="Add Client" href={route("client.create")} />*/}
                    <PrimaryButton
                        className={"h-8"}
                        title="Add Client"
                        onClick={() => {
                            setData(clientDataObject(null))
                            setOpenDrawer(!openDrawer)
                        }}
                    >
                        Add Client
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Clients" />

            <Main>
                <Table
                    columns={columns}
                    data={listingData}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                />

                <Drawer open={openDrawer} setOpen={setOpenDrawer}>
                    <FormSection headerTitle={pageData.headerTitle} headerDescription={pageData.description}>
                        <Form
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            recentlySuccessful={recentlySuccessful}
                            onSubmit={onSubmit}
                            organizations={organizations}
                            refreshOrganizationList={organizationList}
                        />
                    </FormSection>
                </Drawer>
            </Main>
        </AuthenticatedLayout>
    )
}
