import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Form from "@/Pages/Project/Form.jsx"
import { useCallback, useEffect, useState } from "react"
import FormSection from "@/Components/FormSection.jsx"
import { getClientList, pageDataObject, projectDataObject } from "@/Pages/Project/methods.js"

export default function FormHolder({ auth, project = null }) {
    const [clients, setClients] = useState([])

    const clientList = useCallback(() => {
        getClientList().then((response) => {
            setClients(response)
        })
    }, [])

    useEffect(() => {
        clientList()
    }, [])

    const dataObject = projectDataObject(project)

    const pageData = pageDataObject(project)

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const onSubmit = (e) => {
        e.preventDefault()

        post(pageData.actionUrl, {
            preserveScroll: true,
            onSuccess: () => {
                if (!project) {
                    setData(projectDataObject())
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
                        clients={clients}
                        refreshClientList={clientList}
                    />
                </FormSection>
            </Main>
        </AuthenticatedLayout>
    )
}
