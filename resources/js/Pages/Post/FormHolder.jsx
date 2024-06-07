import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Form from "@/Pages/Post/Form.jsx"
import FormSection from "@/Components/FormSection.jsx"
import { pageDataObject, postDataObject } from "@/Pages/Post/methods.js"

export default function FormHolder({ auth, postData = null }) {
    const dataObject = postDataObject(postData)

    const { data, setData, patch, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const pageData = pageDataObject(postData)

    const onSubmit = (e) => {
        e.preventDefault()

        console.log(data);

       /*  post(route("post.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setData(dataObject)
            }
        }) */
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
                    />
                </FormSection>
            </Main>
        </AuthenticatedLayout>
    )
}
