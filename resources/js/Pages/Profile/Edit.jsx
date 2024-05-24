import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import DeleteUserForm from "./Partials/DeleteUserForm"
import UpdatePasswordForm from "./Partials/UpdatePasswordForm"
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm"
import { Head } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight white-xl">Profile</h2>}
        >
            <Head title="Profile" />

            <Main>
                <div className="shadow p-4 sm:rounded-lg border-left-primary">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="p-4 mt-8 border-left-primary shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="p-4 mt-8 border-left-primary shadow sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </Main>
        </AuthenticatedLayout>
    )
}
