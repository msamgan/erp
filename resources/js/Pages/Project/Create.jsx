import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import { useCallback, useEffect, useState } from "react"
import FormSection from "@/Components/FormSection.jsx"
import Form from "@/Pages/Project/Form.jsx"

export default function Create({ auth }) {
    const [clients, setClients] = useState([])

    const clientList = useCallback(() => {
        axios(route("client.list"))
            .then((response) => {
                setClients(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const refreshClientList = () => {
        clientList()
    }

    useEffect(() => {
        clientList()
    }, [])

    const dataObject = {
        name: "",
        client: "",
        description: "",
        type: "singular",
        document_url: "",
        status: "lead",
        start_date: "",
        end_date: "",
        costing: ""
    }

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

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
                        refreshClientList={refreshClientList}
                    />
                </FormSection>
            </Main>
        </AuthenticatedLayout>
    )
}
