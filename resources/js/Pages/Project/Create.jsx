import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import { useCallback, useEffect, useState } from "react"
import FormSection from "@/Components/FormSection.jsx"
import Form from "@/Pages/Project/Form.jsx"
import { getClientList, projectDataObject } from "@/Pages/Project/common.js"

export default function Create({ auth }) {
    const [clients, setClients] = useState([])

    const clientList = useCallback(() => {
        getClientList().then((response) => {
            setClients(response)
        })
    }, [])

    useEffect(() => {
        clientList()
    }, [])

    const dataObject = projectDataObject()

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(projectDataObject())

    const onSubmit = (e) => {
        e.preventDefault()

        post(route("project.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setData(dataObject)
            }
        })
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<HeaderTitle title="Add Project" />}>
            <Head title="Add Project" />

            <Main>
                <FormSection
                    headerTitle="Project Information"
                    headerDescription="Create a new project with it's information."
                >
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
