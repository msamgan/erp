import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import { useEffect, useState } from "react"
import Drawer from "@/Components/Drawer.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { organizationDataObject, pageDataObject } from "@/Pages/Organization/methods.js"
import Form from "@/Pages/Organization/Form.jsx"
import FormSection from "@/Components/FormSection.jsx"
import DrawerEditButton from "@/Components/DrawerEditButton.jsx"

export default function Index({ auth }) {
    const [columns, setColumns] = useState(["Name", "Location", "Actions"])
    const [openDrawer, setOpenDrawer] = useState(false)
    const [listingData, setListingData] = useState([])
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )
    const [organization, setOrganization] = useState(null)
    const [pageData, setPageData] = useState(pageDataObject(organization))
    const [organizations, setOrganizations] = useState([])

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(
        organizationDataObject(organization)
    )

    const getOrganizationListing = ({ queryParams }) => {
        axios
            .get(
                route("organization.list", {
                    ...queryParams
                })
            )
            .then((response) => {
                setOrganizations(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        setListingData(
            organizations.map((organization) => {
                return {
                    Name: organization.name,
                    Location: organization.location,
                    Actions: createActions(route("organization.show", organization.id))
                }
            })
        )
    }, [organizations])

    useEffect(() => {
        getOrganizationListing({ queryParams })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        post(pageData.actionUrl, {
            preserveScroll: true,
            onSuccess: () => {
                if (!organization) {
                    axios
                        .get(route("organization.last_created"))
                        .then((response) => {
                            setOrganization(response.data)
                            setData(organizationDataObject(response.data))
                            setPageData(pageDataObject(response.data))
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }

                getOrganizationListing({ queryParams })
            }
        })
    }

    const createActions = (editRoute) => {
        return (
            <div className="flex space-x-2">
                <DrawerEditButton
                    onClick={() => {
                        axios
                            .get(editRoute)
                            .then((response) => {
                                setOrganization(response.data)
                                setData(organizationDataObject(response.data))
                                setPageData(pageDataObject(response.data))
                                setOpenDrawer(true)
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }}
                />
            </div>
        )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Organizations" />}
            subMenu={
                <div className="flex space-x-2">
                    <PrimaryButton
                        className={"h-8"}
                        title="Add Organization"
                        onClick={() => {
                            setData(organizationDataObject(null))
                            setOpenDrawer(!openDrawer)
                        }}
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
                    data={listingData}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                />

                <Drawer open={openDrawer} side="right" setOpen={setOpenDrawer}>
                    <FormSection headerTitle={pageData.headerTitle} headerDescription={pageData.description}>
                        <Form
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            recentlySuccessful={recentlySuccessful}
                            onSubmit={onSubmit}
                        />
                    </FormSection>
                </Drawer>
            </Main>
        </AuthenticatedLayout>
    )
}
