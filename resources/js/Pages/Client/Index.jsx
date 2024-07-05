import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { useCallback, useEffect, useState } from "react"
import EditLink from "@/Components/EditLink.jsx"

export default function Index({ auth }) {
    const [columns, setColumns] = useState(["Name", "Emails", "Phones", "Organization", "Actions"])
    const [listingData, setListingData] = useState([])
    const [openDrawer, setOpenDrawer] = useState(false)
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )
    const [clients, setClients] = useState([])

    const getClients = useCallback(() => {
        axios.get(route('client.list'))
            .then(response => {
                setClients(response.data)
            }).catch(error => {
                console.error(error)
            })
    }, [])

    const createActions = ({ editRoute }) => {
        return (
            <div className="flex space-x-2">
                <EditLink editRoute={editRoute} />
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
                        editRoute: route("client.edit", client.id)
                    })
                }
            })
        )
    }, [clients])

    useEffect(() => {
        getClients()
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Clients" />}
            subMenu={
                <div className="flex space-x-2">
                    <PrimaryLink className={"h-8"} title="Add Client" href={route("client.create")} />
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
            </Main>
        </AuthenticatedLayout>
    )
}
