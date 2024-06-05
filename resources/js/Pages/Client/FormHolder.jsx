import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Form from "@/Pages/Client/Form.jsx"
import { useCallback, useEffect, useState } from "react"
import FormSection from "@/Components/FormSection.jsx"
import { clientDataObject, getOrganizationList, pageDataObject } from "@/Pages/Client/methods.js"

export default function FormHolder({ auth, client = null }) {
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
    const pageData = pageDataObject(client)

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const onSubmit = (e) => {
        e.preventDefault()

        post(pageData.actionUrl, {
            preserveScroll: true,
            onSuccess: () => {
                if (!client) {
                    setData(dataObject)
                }
            }
        })
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<HeaderTitle title={pageData.title} />}>
            <Head title={pageData.title} />

            <Main>
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
            </Main>
        </AuthenticatedLayout>
    )
}
