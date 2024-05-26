import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Form from "@/Pages/Client/Form.jsx"
import { useCallback, useEffect, useState } from "react"
import FormSection from "@/Components/FormSection.jsx"
import { clientDataObject, getOrganizationList } from "@/Pages/Client/common.js"

export default function Create({ auth, client }) {
    const [organizations, setOrganizations] = useState([])

    const organizationList = useCallback(() => {
        getOrganizationList().then((response) => {
            setOrganizations(response)
        })
    }, [])

    useEffect(() => {
        organizationList()
    }, [])

    const dataObject = clientDataObject(client)

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const onSubmit = (e) => {
        e.preventDefault()

        post(route("client.update", client.id), {
            preserveScroll: true,
            onSuccess: () => {
                //
            }
        })
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<HeaderTitle title="Edit Client" />}>
            <Head title="Edit Client" />

            <Main>
                <FormSection
                    headerTitle="Client Information"
                    headerDescription="Update an existing client with their information."
                >
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
            </Main>
        </AuthenticatedLayout>
    )
}
