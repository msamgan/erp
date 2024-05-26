import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Form from "@/Pages/Project/Form.jsx"
import { useCallback, useEffect, useState } from "react"
import FormSection from "@/Components/FormSection.jsx"
import { getClientList, projectDataObject } from "@/Pages/Project/common.js"

export default function Create({ auth, project }) {
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

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const onSubmit = (e) => {
        e.preventDefault()

        post(route("project.update", project.id), {
            preserveScroll: true,
            onSuccess: () => {
                //
            }
        })
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<HeaderTitle title="Edit Project" />}>
            <Head title="Edit Project" />

            <Main>
                <FormSection
                    headerTitle="Project Information"
                    headerDescription="Update an existing Project with It's information."
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
