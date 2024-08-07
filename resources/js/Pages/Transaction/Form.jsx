import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import InputError from "@/Components/InputError.jsx"
import { Transition } from "@headlessui/react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { Link } from "@inertiajs/react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useState } from "react"

export default function Form({
    data,
    setData,
    errors,
    processing,
    recentlySuccessful,
    onSubmit,
    projects,
    refreshProjectList,
    descriptions
}) {
    const [startDate, setStartDate] = useState(new Date())

    useEffect(() => {
        setData("date", startDate)
    }, [startDate])

    return (
        <form onSubmit={onSubmit} className="mt-6 space-y-6">
            <div className="flex w-1/2 gap-4">
                <div className="w-1/2">
                    <InputLabel htmlFor="type" value="Type" isRequired={true} />
                    <select
                        id="type"
                        className="block w-full mt-1 border-primary focus:border-teal-950 rounded-md shadow-sm"
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                    >
                        <option value="incoming">Incoming</option>
                        <option value="outgoing">Outgoing</option>
                    </select>
                    <InputError className="mt-2" message={errors.type} />
                </div>

                <div className="w-1/2">
                    <InputLabel htmlFor="amount" value="Amount" isRequired={true} />
                    <TextInput
                        id="amount"
                        className="block w-full mt-1"
                        value={data.amount}
                        onChange={(e) => setData("amount", e.target.value)}
                        type={"number"}
                    />
                    <InputError className="mt-2" message={errors.amount} />
                </div>
            </div>

            <div>
                <InputLabel
                    htmlFor="Project"
                    isRequired={false}
                    className="block text-sm font-medium text-gray-900"
                >
                    {" "}
                    Project{" "}
                </InputLabel>

                <div className="relative mt-1.5">
                    <TextInput
                        type="text"
                        list="ProjectList"
                        id="Project"
                        className="block w-1/2 mt-1"
                        placeholder="Please select"
                        value={data.project}
                        onChange={(e) => setData("project", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.project} />
                    <p className="mt-2 text-xs text-gray-400">
                        <Link
                            className="text-blue-500 hover:text-blue-700"
                            onClick={(e) => {
                                e.preventDefault()
                                window.open(route("project.create"), "_blank")
                            }}
                        >
                            Add new
                        </Link>{" "}
                        project if not in the list
                        <span
                            className="w-1/2 mr-16 text-blue-500 cursor-pointer hover:text-blue-700 float-end"
                            onClick={(e) => {
                                e.target.innerHTML = "Refreshing..."
                                refreshProjectList()
                                setTimeout(() => {
                                    e.target.innerHTML = "Refresh List"
                                }, 1000)
                            }}
                        >
                            Refresh List
                        </span>
                    </p>
                </div>

                <datalist name="Project" id="ProjectList">
                    {projects.map((project, index) => (
                        <option key={index} value={project.name}>
                            {project.client.name}
                        </option>
                    ))}
                </datalist>
            </div>

            <div>
                <InputLabel
                    htmlFor="Description"
                    isRequired={true}
                    className="block text-sm font-medium text-gray-900"
                >
                    Description
                </InputLabel>

                <div className="relative mt-1.5">
                    <TextInput
                        type="text"
                        list="DescriptionList"
                        id="Description"
                        className="block w-1/2 mt-1"
                        placeholder="Please select"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.description} />
                </div>

                <datalist name="Description" id="DescriptionList">
                    {descriptions.map((description, index) => (
                        <option key={index} value={description}>
                            {description}
                        </option>
                    ))}
                </datalist>
            </div>

            <div>
                <InputLabel htmlFor="date" value="Date" isRequired={true} />
                <DatePicker
                    className={"border-primary focus:border-teal-950 rounded-md shadow-sm text-lg block mt-1"}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
                <InputError className="mt-2" message={errors.date} />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton
                    onClick={(e) => {
                        e.preventDefault()
                        setStartDate(new Date())
                        onSubmit(e)
                    }}
                    disabled={processing}
                >
                    Save
                </PrimaryButton>

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
