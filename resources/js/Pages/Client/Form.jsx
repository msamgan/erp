import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import InputError from "@/Components/InputError.jsx"
import { Transition } from "@headlessui/react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { Link } from "@inertiajs/react"

export default function Form({
    data,
    setData,
    errors,
    processing,
    recentlySuccessful,
    onSubmit,
    organizations,
    refreshOrganizationList
}) {
    return (
        <form onSubmit={onSubmit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Name" isRequired={true} />
                <TextInput
                    id="name"
                    className="block w-1/2 mt-1"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    isFocused
                    autoComplete="name"
                />
                <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
                <InputLabel htmlFor="email" value="Emails" />
                <TextInput
                    id="emails"
                    className="block w-1/2 mt-1"
                    value={data.emails}
                    onChange={(e) => setData("emails", e.target.value)}
                    autoComplete="emails"
                />
                <p className="mt-1 text-xs text-gray-400">Use coma to separate multiple emails</p>
                <InputError className="mt-2" message={errors.emails} />
            </div>

            <div>
                <InputLabel htmlFor="phones" value="Phones" />
                <TextInput
                    id="phones"
                    className="block w-1/2 mt-1"
                    value={data.phones}
                    onChange={(e) => setData("phones", e.target.value)}
                    autoComplete="phones"
                />
                <p className="mt-1 text-xs text-gray-400">Use coma to separate multiple phones</p>
                <InputError className="mt-2" message={errors.phones} />
            </div>

            <div>
                <div>
                    <InputLabel htmlFor="Organization" className="block font-medium text-gray-900">
                        {" "}
                        Organization{" "}
                    </InputLabel>

                    <div className="relative mt-1.5">
                        <TextInput
                            type="text"
                            list="OrganizationList"
                            id="Organization"
                            className="block w-1/2 mt-1"
                            placeholder="Please select"
                            value={data.organization}
                            onChange={(e) => setData("organization", e.target.value)}
                        />
                        <p className="mt-2 text-xs text-gray-400">
                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                onClick={(e) => {
                                    e.preventDefault()
                                    window.open(route("organization.create"), "_blank")
                                }}
                            >
                                Add new
                            </Link>{" "}
                            organization if not in the list
                            <span
                                className="w-1/2 mr-16 text-blue-500 cursor-pointer hover:text-blue-700 float-end"
                                onClick={(e) => {
                                    e.target.innerHTML = "Refreshing..."
                                    refreshOrganizationList()
                                    setTimeout(() => {
                                        e.target.innerHTML = "Refresh List"
                                    }, 1000)
                                }}
                            >
                                Refresh List
                            </span>
                        </p>
                    </div>

                    <datalist name="Organization" id="OrganizationList">
                        {organizations.map((organization, index) => (
                            <option key={index}>{organization.name}</option>
                        ))}
                    </datalist>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>
    )
}
