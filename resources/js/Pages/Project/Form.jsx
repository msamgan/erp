import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import InputError from "@/Components/InputError.jsx"
import { Transition } from "@headlessui/react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { Link } from "@inertiajs/react"
import { projectStatuses } from "@/helpers/constants.js"

export default function Form({
    data,
    setData,
    errors,
    processing,
    recentlySuccessful,
    onSubmit,
    clients,
    refreshClientList
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
                <InputLabel
                    htmlFor="Client"
                    isRequired={true}
                    className="block text-sm font-medium text-gray-900"
                >
                    {" "}
                    Client{" "}
                </InputLabel>

                <div className="relative mt-1.5">
                    <TextInput
                        type="text"
                        list="ClientList"
                        id="Client"
                        className="block w-1/2 mt-1"
                        placeholder="Please select"
                        value={data.client}
                        onChange={(e) => setData("client", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.client} />
                    <p className="mt-2 text-xs text-gray-400">
                        <Link
                            className="text-blue-500 hover:text-blue-700"
                            onClick={(e) => {
                                e.preventDefault()
                                window.open(route("client.create"), "_blank")
                            }}
                        >
                            Add new
                        </Link>{" "}
                        client if not in the list
                        <span
                            className="w-1/2 mr-16 text-blue-500 cursor-pointer hover:text-blue-700 float-end"
                            onClick={(e) => {
                                e.target.innerHTML = "Refreshing..."
                                refreshClientList()
                                setTimeout(() => {
                                    e.target.innerHTML = "Refresh List"
                                }, 1000)
                            }}
                        >
                            Refresh List
                        </span>
                    </p>
                </div>

                <datalist name="Client" id="ClientList">
                    {clients.map((client, index) => (
                        <option key={index}>{client.name}</option>
                    ))}
                </datalist>
            </div>

            <div className={"flex gap-4 w-1/2"}>
                <div className={"w-1/2"}>
                    <InputLabel htmlFor="costing" value="Costing" isRequired={true} />
                    <TextInput
                        id="costing"
                        className="block w-full mt-1"
                        value={data.costing}
                        onChange={(e) => setData("costing", e.target.value)}
                        type={"number"}
                    />
                    <InputError className="mt-2" message={errors.costing} />
                </div>

                <div className={"w-1/2"}>
                    <InputLabel htmlFor="status" value="Status" isRequired={true} />
                    <select
                        id="status"
                        className="block w-full mt-1 text-lg rounded-md shadow-sm border-primary focus:border-teal-950"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        {projectStatuses.map((status, index) => (
                            <option key={index} value={status.key}>
                                {status.value}
                            </option>
                        ))}
                    </select>
                    <InputError className="mt-2" message={errors.status} />
                </div>
            </div>

            <div className={""}>
                <InputLabel htmlFor="type" value="Type" isRequired={true} />
                <select
                    id="status"
                    className="block w-1/2 mt-1 text-lg rounded-md shadow-sm border-primary focus:border-teal-950"
                    value={data.type}
                    defaultValue={data.type}
                    onChange={(e) => setData("type", e.target.value)}
                >
                    <option value="singular">Singular</option>
                    <option value="recurring">Recurring</option>
                </select>
                <InputError className="mt-2" message={errors.type} />
            </div>

            <div>
                <InputLabel htmlFor="document_url" value="Document URL" />
                <TextInput
                    id="document_url"
                    type={"url"}
                    className="block w-1/2 mt-1"
                    value={data.document_url}
                    onChange={(e) => setData("document_url", e.target.value)}
                />
                <InputError className="mt-2" message={errors.document_url} />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    className="block w-1/2 mt-1 text-lg rounded-md shadow-sm border-primary focus:border-teal-950"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError className="mt-2" message={errors.description} />
            </div>

            <div className="flex w-1/2 gap-4">
                <div className="w-1/2">
                    <InputLabel htmlFor="start_date" value="Start Date" />
                    <TextInput
                        id="start_date"
                        type={"date"}
                        className="block w-full mt-1"
                        value={data.start_date}
                        onChange={(e) => setData("start_date", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.start_date} />
                </div>

                <div className="w-1/2">
                    <InputLabel htmlFor="end_date" value="End Date" />
                    <TextInput
                        id="end_date"
                        type={"date"}
                        className="block w-full mt-1"
                        value={data.end_date}
                        onChange={(e) => setData("end_date", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.end_date} />
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
