import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import { useEffect, useState } from "react"
import EditLink from "@/Components/EditLink.jsx"
import Drawer from "@/Components/Drawer.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { organizationDataObject, pageDataObject } from "@/Pages/Organization/methods.js"
import Form from "@/Pages/Organization/Form.jsx"
import FormSection from "@/Components/FormSection.jsx"

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

    const dataObject = organizationDataObject(organization)

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const getOrganizationListing = () => {
        axios
            .get(route("organization.list"))
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
        getOrganizationListing()
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

                getOrganizationListing()
            }
        })
    }

    const createActions = (editRoute) => {
        return (
            <div className="flex space-x-2">
                <button
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
