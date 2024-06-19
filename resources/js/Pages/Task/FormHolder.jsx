import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import { useCallback, useEffect, useState } from "react"
import FormSection from "@/Components/FormSection.jsx"
import Form from "@/Pages/Task/Form.jsx"
import { pageDataObject, taskDataObject } from "@/Pages/Task/methods.js"

export default function FormHolder({ auth, task = null }) {
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

    const dataObject = taskDataObject(task)

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const pageData = pageDataObject(task)

    const onSubmit = (e) => {
        e.preventDefault()
        post(pageData.actionUrl, {
            preserveScroll: true,
            onSuccess: () => {
                if (!task) {
                    setData(dataObject)
                }
            }
        })
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<HeaderTitle title="Add Task" />}>
            <Head title="Add Task" />

            <Main>
                <FormSection headerTitle={pageData.headerTitle} headerDescription={pageData.description}>
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
