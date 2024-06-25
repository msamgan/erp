import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { useEffect, useState } from "react"
import EditLink from "@/Components/EditLink.jsx"
import Drawer from "@/Components/Drawer.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"

export default function Index({ auth, organizations }) {
    const [columns, setColumns] = useState(["Name", "Location", "Actions"])
    const [openRight, setOpenRight] = useState(false)
    const [data, setData] = useState([])
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )

    const createActions = (editRoute) => {
        return (
            <div className="flex space-x-2">
                <EditLink editRoute={editRoute} />
            </div>
        )
    }

    useEffect(() => {
        setData(
            organizations.map((organization) => {
                return {
                    Name: organization.name,
                    Location: organization.location,
                    Actions: createActions(route("organization.edit", organization.id))
                }
            })
        )
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Organizations" />}
            subMenu={
                <div className="flex space-x-2">
                    {/*<PrimaryLink
                        className={"h-8"}
                        title="Add Organization"
                        href={route("organization.create")}
                    />*/}

                    <PrimaryButton
                        className={"h-8"}
                        title="Add Organization"
                        onClick={() => setOpenRight(!openRight)}
                    >
                        Add Organization
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Organizations" />

            <Main>
                <Table
                    columns={columns}
                    data={data}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                />

                <Drawer open={openRight} side="right" setOpen={setOpenRight}></Drawer>
            </Main>
        </AuthenticatedLayout>
    )
}
