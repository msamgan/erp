import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Form from "@/Pages/Organization/Form.jsx"
import FormSection from "@/Components/FormSection.jsx"
import { organizationDataObject } from "@/Pages/Organization/common.js"

export default function Create({ auth }) {
    const dataObject = organizationDataObject()

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const onSubmit = (e) => {
        e.preventDefault()

        post(route("organization.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setData(dataObject)
            }
        })
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<HeaderTitle title="Add Organization" />}>
            <Head title="Add Organization" />

            <Main>
                <FormSection
                    headerTitle="Organization Information"
                    headerDescription="Create a new organization with it's information."
                >
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
