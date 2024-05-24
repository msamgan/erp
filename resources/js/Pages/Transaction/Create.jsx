import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import { useCallback, useEffect, useState } from "react"
import FormSection from "@/Components/FormSection.jsx"
import Form from "@/Pages/Transaction/Form.jsx"

export default function Create({ auth }) {
    const [projects, setProjects] = useState([])

    const projectList = useCallback(() => {
        axios(route("project.list"))
            .then((response) => {
                setProjects(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const refreshProjectList = () => {
        projectList()
    }

    useEffect(() => {
        projectList()
    }, [])

    const dataObject = {
        project: "",
        description: "",
        type: "incoming",
        amount: "",
        date: ""
    }

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const onSubmit = (e) => {
        e.preventDefault()
        let confirm = window.confirm("Are you sure you want to add this transaction?")
        if (confirm) {
            post(route("transaction.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    setData(dataObject)
                }
            })
        }
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<HeaderTitle title="Add Transaction" />}>
            <Head title="Add Transaction" />

            <Main>
                <FormSection
                    headerTitle="Transaction Information"
                    headerDescription="Create a new transaction."
                >
                    <Form
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        recentlySuccessful={recentlySuccessful}
                        onSubmit={onSubmit}
                        projects={projects}
                        refreshProjectList={refreshProjectList}
                    />
                </FormSection>
            </Main>
        </AuthenticatedLayout>
    )
}
