import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import InputError from "@/Components/InputError.jsx"
import { Transition } from "@headlessui/react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { Link } from "@inertiajs/react"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function Form({
    data,
    setData,
    errors,
    processing,
    recentlySuccessful,
    onSubmit,
    projects,
    refreshProjectList
}) {
    const [startDate, setStartDate] = useState(new Date())

    useEffect(() => {
        setData("due_date", startDate)
    }, [startDate])

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
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    className="block w-1/2 mt-1 text-lg rounded-md shadow-sm border-primary focus:border-teal-950"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError className="mt-2" message={errors.description} />
            </div>
            <div>
                <InputLabel
                    htmlFor="Project"
                    isRequired={false}
                    className="block text-sm font-medium text-gray-900"
                >
                    Project
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
                        </Link>
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
                <InputLabel htmlFor="date" value="Due Date" isRequired={false} />
                {/*<TextInput
                    id="date"
                    type={"date"}
                    className="block w-1/2 mt-1"
                    value={data.due_date}
                    onChange={(e) => setData("due_date", e.target.value)}
                />*/}
                <DatePicker
                    className={"border-primary focus:border-teal-950 rounded-md shadow-sm text-lg block mt-1"}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
                <InputError className="mt-2" message={errors.due_date} />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton
                    onClick={(e) => {
                        e.preventDefault()
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
