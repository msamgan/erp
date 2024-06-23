import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import { useCallback, useEffect, useState } from "react"
import FormSection from "@/Components/FormSection.jsx"
import Form from "@/Pages/Transaction/Form.jsx"
import alertify from "alertifyjs"
import "/node_modules/alertifyjs/build/css/alertify.css"
import "/node_modules/alertifyjs/build/css/themes/default.css"

export default function Create({ auth }) {
    const [projects, setProjects] = useState([])
    const [descriptions, setDescriptions] = useState([])

    const projectList = useCallback(() => {
        axios(route("project.list"))
            .then((response) => {
                setProjects(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const descriptionList = useCallback(() => {
        axios(route("transaction.descriptions"))
            .then((response) => {
                setDescriptions(response.data)
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
        descriptionList()
    }, [])

    const dataObject = {
        project: "",
        description: "",
        type: "incoming",
        amount: "",
        date: new Date().toISOString().split("T")[0]
    }

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const onSubmit = (e) => {
        e.preventDefault()
        alertify.confirm(
            "Are you sure?",
            "Are you sure you want to add this transaction? This action cannot be undone.",
            function () {
                post(route("transaction.store"), {
                    preserveScroll: true,
                    onSuccess: () => {
                        setData(dataObject)
                    }
                })
            },
            function () {
                // alertify.error("Cancel")
            }
        )
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
                        descriptions={descriptions}
                    />
                </FormSection>
            </Main>
        </AuthenticatedLayout>
    )
}
