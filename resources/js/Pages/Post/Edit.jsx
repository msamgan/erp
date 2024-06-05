import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Form from "@/Pages/Post/Form.jsx"
import FormSection from "@/Components/FormSection.jsx"
import { postDataObject, toolbarOptions } from "@/Pages/Post/common.js"

export default function Create({ auth, postData }) {
    const dataObject = postDataObject(postData)

    const { data, setData, patch, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const onSubmit = (e) => {
        e.preventDefault()

        post(route("post.update"), {
            preserveScroll: true,
            onSuccess: () => {
                // setData(dataObject)
            }
        })
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<HeaderTitle title="Edit Post" />}>
            <Head title="Edit Post" />

            <Main>
                <FormSection headerTitle="New Post" headerDescription="Update post with details.">
                    <Form
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        recentlySuccessful={recentlySuccessful}
                        onSubmit={onSubmit}
                        toolbarOptions={toolbarOptions}
                    />
                </FormSection>
            </Main>
        </AuthenticatedLayout>
    )
}
