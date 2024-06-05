import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Form from "@/Pages/Organization/Form.jsx"
import FormSection from "@/Components/FormSection.jsx"
import { organizationDataObject, pageDataObject } from "@/Pages/Organization/methods.js"

export default function FormHolder({ auth, organization = null }) {
    const dataObject = organizationDataObject(organization)

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const pageData = pageDataObject(organization)

    const onSubmit = (e) => {
        e.preventDefault()

        post(pageData.actionUrl, {
            preserveScroll: true,
            onSuccess: () => {
                if (!organization) {
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
                    />
                </FormSection>
            </Main>
        </AuthenticatedLayout>
    )
}
